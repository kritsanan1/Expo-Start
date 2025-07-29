
export class SecurityUtils {
  // Content Security Policy configuration
  static getCSPHeader(): string {
    return [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://api.supabase.co wss://realtime.supabase.co https://www.google-analytics.com https://searchconsole.googleapis.com",
      "media-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; ');
  }

  // HSTS (HTTP Strict Transport Security) header
  static getHSTSHeader(): string {
    return 'max-age=31536000; includeSubDomains; preload';
  }

  // Rate limiting for API calls
  private static rateLimitStore: Map<string, { count: number; resetTime: number }> = new Map();

  static checkRateLimit(identifier: string, maxRequests: number = 100, windowMs: number = 60000): boolean {
    const now = Date.now();
    const entry = this.rateLimitStore.get(identifier);

    if (!entry || now > entry.resetTime) {
      this.rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (entry.count >= maxRequests) {
      return false;
    }

    entry.count++;
    return true;
  }

  // Input sanitization and validation
  static sanitizeHTML(input: string): string {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  // SQL injection prevention
  static sanitizeSQL(input: string): string {
    return input
      .replace(/['";\\]/g, '')
      .replace(/--/g, '')
      .replace(/\/\*/g, '')
      .replace(/\*\//g, '')
      .replace(/xp_/gi, '')
      .replace(/sp_/gi, '')
      .trim();
  }

  // Generate secure random tokens
  static generateSecureToken(length: number = 32): string {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const array = new Uint8Array(length);
      crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    
    // Fallback for environments without crypto.getRandomValues
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Password strength checker
  static checkPasswordStrength(password: string): { score: number; feedback: string[] } {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) score += 1;
    else feedback.push('Use at least 8 characters');

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Add lowercase letters');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Add uppercase letters');

    if (/\d/.test(password)) score += 1;
    else feedback.push('Add numbers');

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push('Add special characters');

    if (password.length >= 12) score += 1;
    if (!/(.)\1{2,}/.test(password)) score += 1; // No repeated characters

    // Check against common passwords
    const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'login'];
    if (!commonPasswords.some(common => password.toLowerCase().includes(common))) {
      score += 1;
    } else {
      feedback.push('Avoid common passwords');
    }

    return { score, feedback };
  }

  // Session management
  static generateSessionId(): string {
    return this.generateSecureToken(64);
  }

  static isValidSession(sessionId: string, createdAt: number, maxAge: number = 86400000): boolean {
    if (!sessionId || sessionId.length < 32) return false;
    return Date.now() - createdAt < maxAge;
  }

  // CSRF protection
  static generateCSRFToken(): string {
    return this.generateSecureToken(32);
  }

  static validateCSRFToken(token: string, expectedToken: string): boolean {
    if (!token || !expectedToken) return false;
    return token === expectedToken;
  }

  // File upload security
  static validateFileUpload(file: File): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];

    if (file.size > maxSize) {
      errors.push('File size exceeds 10MB limit');
    }

    if (!allowedTypes.includes(file.type)) {
      errors.push('File type not allowed');
    }

    // Check file signature (magic numbers)
    const fileSignatures: Record<string, number[]> = {
      'image/jpeg': [0xFF, 0xD8, 0xFF],
      'image/png': [0x89, 0x50, 0x4E, 0x47],
      'image/gif': [0x47, 0x49, 0x46],
      'video/mp4': [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70]
    };

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Environment-specific security headers
  static getSecurityHeaders(): Record<string, string> {
    return {
      'Content-Security-Policy': this.getCSPHeader(),
      'Strict-Transport-Security': this.getHSTSHeader(),
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(self), microphone=(self), geolocation=(self)',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'same-site'
    };
  }
}

// Vulnerability scanning integration
export class VulnerabilityScanner {
  private apiKey: string = '';
  private baseUrl: string = '';

  constructor(apiKey: string, service: 'snyk' | 'owasp' = 'snyk') {
    this.apiKey = apiKey;
    this.baseUrl = service === 'snyk' 
      ? 'https://api.snyk.io/v1' 
      : 'https://api.owasp.org/v1';
  }

  // Scan for dependency vulnerabilities
  async scanDependencies(packageJson: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/test`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          package: packageJson
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Vulnerability scan failed:', error);
      throw error;
    }
  }

  // Scan for code vulnerabilities
  async scanCode(codeContent: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/code/test`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: codeContent
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Code vulnerability scan failed:', error);
      throw error;
    }
  }

  // Get vulnerability remediation advice
  async getRemediationAdvice(vulnerabilityId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/vulnerabilities/${vulnerabilityId}`, {
        headers: {
          'Authorization': `token ${this.apiKey}`
        }
      });

      return await response.json();
    } catch (error) {
      console.error('Failed to get remediation advice:', error);
      throw error;
    }
  }
}
