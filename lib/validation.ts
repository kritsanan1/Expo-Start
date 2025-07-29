
import { SecurityMonitoring } from './analytics';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  phone?: boolean;
  age?: { min: number; max: number };
  custom?: (value: any) => string | null;
}

export interface ValidationSchema {
  [field: string]: ValidationRule;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
  sanitizedData: Record<string, any>;
}

export class FormValidator {
  static validate(data: Record<string, any>, schema: ValidationSchema): ValidationResult {
    const errors: Record<string, string[]> = {};
    const sanitizedData: Record<string, any> = {};

    Object.keys(schema).forEach(field => {
      const value = data[field];
      const rules = schema[field];
      const fieldErrors: string[] = [];

      // Sanitize input
      let sanitizedValue = value;
      if (typeof value === 'string') {
        sanitizedValue = SecurityMonitoring.sanitizeInput(value);
      }
      sanitizedData[field] = sanitizedValue;

      // Required validation
      if (rules.required && (!sanitizedValue || sanitizedValue.toString().trim() === '')) {
        fieldErrors.push(`${field} is required`);
      }

      // Skip other validations if field is empty and not required
      if (!sanitizedValue && !rules.required) {
        return;
      }

      // Length validations
      if (rules.minLength && sanitizedValue.toString().length < rules.minLength) {
        fieldErrors.push(`${field} must be at least ${rules.minLength} characters`);
      }

      if (rules.maxLength && sanitizedValue.toString().length > rules.maxLength) {
        fieldErrors.push(`${field} must not exceed ${rules.maxLength} characters`);
      }

      // Pattern validation
      if (rules.pattern && !rules.pattern.test(sanitizedValue)) {
        fieldErrors.push(`${field} format is invalid`);
      }

      // Email validation
      if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedValue)) {
        fieldErrors.push(`${field} must be a valid email address`);
      }

      // Phone validation (Thai format)
      if (rules.phone && !/^(\+66|0)[0-9]{8,9}$/.test(sanitizedValue.replace(/[-\s]/g, ''))) {
        fieldErrors.push(`${field} must be a valid Thai phone number`);
      }

      // Age validation
      if (rules.age) {
        const age = parseInt(sanitizedValue);
        if (isNaN(age) || age < rules.age.min || age > rules.age.max) {
          fieldErrors.push(`${field} must be between ${rules.age.min} and ${rules.age.max}`);
        }
      }

      // Custom validation
      if (rules.custom) {
        const customError = rules.custom(sanitizedValue);
        if (customError) {
          fieldErrors.push(customError);
        }
      }

      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors;
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      sanitizedData
    };
  }

  // Pre-defined validation schemas
  static getAuthValidationSchema(): ValidationSchema {
    return {
      email: {
        required: true,
        email: true,
        maxLength: 255
      },
      password: {
        required: true,
        minLength: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        custom: (value: string) => {
          if (!value) return null;
          if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
          if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
          if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
          if (!/(?=.*[@$!%*?&])/.test(value)) return 'Password must contain at least one special character';
          return null;
        }
      },
      name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Zก-๙\s]+$/
      },
      age: {
        required: true,
        age: { min: 18, max: 100 }
      }
    };
  }

  static getProfileValidationSchema(): ValidationSchema {
    return {
      name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Zก-๙\s]+$/
      },
      age: {
        required: true,
        age: { min: 18, max: 100 }
      },
      bio: {
        maxLength: 500
      },
      location: {
        required: true,
        maxLength: 100
      },
      interests: {
        custom: (value: string[]) => {
          if (!Array.isArray(value)) return 'Interests must be an array';
          if (value.length > 10) return 'Maximum 10 interests allowed';
          return null;
        }
      }
    };
  }

  static getMessageValidationSchema(): ValidationSchema {
    return {
      content: {
        required: true,
        minLength: 1,
        maxLength: 1000,
        custom: (value: string) => {
          // Check for inappropriate content (basic implementation)
          const inappropriateWords = ['spam', 'scam', 'fake'];
          const lowercaseValue = value.toLowerCase();
          for (const word of inappropriateWords) {
            if (lowercaseValue.includes(word)) {
              return 'Message contains inappropriate content';
            }
          }
          return null;
        }
      }
    };
  }
}

// Real-time validation for form fields
export class RealTimeValidator {
  private static debounceTimers: Record<string, NodeJS.Timeout> = {};

  static validateField(
    fieldName: string,
    value: any,
    rules: ValidationRule,
    callback: (errors: string[]) => void,
    debounceMs: number = 300
  ) {
    // Clear existing timer
    if (this.debounceTimers[fieldName]) {
      clearTimeout(this.debounceTimers[fieldName]);
    }

    // Set new timer
    this.debounceTimers[fieldName] = setTimeout(() => {
      const result = FormValidator.validate({ [fieldName]: value }, { [fieldName]: rules });
      callback(result.errors[fieldName] || []);
    }, debounceMs);
  }

  static clearValidation(fieldName: string) {
    if (this.debounceTimers[fieldName]) {
      clearTimeout(this.debounceTimers[fieldName]);
      delete this.debounceTimers[fieldName];
    }
  }
}
