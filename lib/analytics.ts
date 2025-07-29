
// Analytics and Performance Monitoring
export class Analytics {
  private static instance: Analytics;
  private isInitialized = false;

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  async initialize() {
    if (this.isInitialized) return;

    // Initialize Google Analytics 4 for web
    if (typeof window !== 'undefined') {
      // Load gtag script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script);

      // Initialize gtag
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'LoveMatch Thailand',
        page_location: window.location.href
      });
    }

    this.isInitialized = true;
  }

  trackEvent(eventName: string, parameters?: Record<string, any>) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: 'user_interaction',
        event_label: parameters?.label || '',
        value: parameters?.value || 1,
        ...parameters
      });
    }
  }

  trackPageView(pageName: string) {
    this.trackEvent('page_view', {
      page_title: pageName,
      page_location: typeof window !== 'undefined' ? window.location.href : ''
    });
  }

  trackUserInteraction(action: string, element: string) {
    this.trackEvent('user_interaction', {
      action,
      element,
      timestamp: new Date().toISOString()
    });
  }

  // Performance monitoring
  async measurePerformance() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const metrics = {
        // Core Web Vitals
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
        
        // Network timing
        dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcpConnection: navigation.connectEnd - navigation.connectStart,
        serverResponse: navigation.responseStart - navigation.requestStart,
        
        timestamp: new Date().toISOString()
      };

      // Send to analytics
      this.trackEvent('performance_metrics', metrics);
      
      return metrics;
    }
  }
}

// Lighthouse Performance Testing
export class LighthouseIntegration {
  private apiKey: string;
  private baseUrl = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async runMobileTest(url: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}?url=${encodeURIComponent(url)}&key=${this.apiKey}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo`
      );
      
      const data = await response.json();
      
      return {
        performance: data.lighthouseResult.categories.performance.score * 100,
        accessibility: data.lighthouseResult.categories.accessibility.score * 100,
        bestPractices: data.lighthouseResult.categories['best-practices'].score * 100,
        seo: data.lighthouseResult.categories.seo.score * 100,
        metrics: {
          firstContentfulPaint: data.lighthouseResult.audits['first-contentful-paint'].displayValue,
          largestContentfulPaint: data.lighthouseResult.audits['largest-contentful-paint'].displayValue,
          speedIndex: data.lighthouseResult.audits['speed-index'].displayValue,
          cumulativeLayoutShift: data.lighthouseResult.audits['cumulative-layout-shift'].displayValue
        }
      };
    } catch (error) {
      console.error('Lighthouse test failed:', error);
      throw error;
    }
  }
}

// Security Monitoring
export class SecurityMonitoring {
  private vulnerabilities: any[] = [];

  // CSP Violation Reporter
  static setupCSPReporting() {
    if (typeof window !== 'undefined') {
      document.addEventListener('securitypolicyviolation', (event) => {
        console.warn('CSP Violation:', {
          blockedURI: event.blockedURI,
          violatedDirective: event.violatedDirective,
          originalPolicy: event.originalPolicy,
          timestamp: new Date().toISOString()
        });
        
        // Send to monitoring service
        Analytics.getInstance().trackEvent('security_violation', {
          type: 'csp',
          blockedURI: event.blockedURI,
          directive: event.violatedDirective
        });
      });
    }
  }

  // XSS Protection
  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  }

  // CSRF Token Generation
  static generateCSRFToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Form Validation
  static validateForm(formData: Record<string, any>, schema: Record<string, any>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    Object.keys(schema).forEach(field => {
      const value = formData[field];
      const rules = schema[field];
      
      if (rules.required && (!value || value.toString().trim() === '')) {
        errors.push(`${field} is required`);
      }
      
      if (value && rules.minLength && value.toString().length < rules.minLength) {
        errors.push(`${field} must be at least ${rules.minLength} characters`);
      }
      
      if (value && rules.pattern && !rules.pattern.test(value)) {
        errors.push(`${field} format is invalid`);
      }
      
      if (value && rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.push(`${field} must be a valid email`);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
