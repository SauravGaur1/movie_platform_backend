class Validator {

    static isEmpty(value) {
      try {
        if (
          value === null ||
          value === undefined ||
          Number.isNaN(value) ||
          value === "null" ||
          value === "undefined" ||
          value === "NaN" ||
          (typeof value === 'string' && value.trim().length === 0) ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0)
        ) {
          return true;
        }
      } catch {
        return false;
      }
      return false;
    }
  
    static isArray(value) {
      return Array.isArray(value);
    }
  
    static isPlainObject(value) {
      return value !== null && typeof value === 'object' && value.constructor === Object;
    }
  
    static isString(value) {
      return typeof value === 'string' || value instanceof String;
    }

    static isNumber(value) {
      return typeof value === 'number' && !Number.isNaN(value);
    }
  
    static isBoolean(value) {
      return typeof value === 'boolean';
    }
  
    static isEmail(value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return this.isString(value) && emailPattern.test(value);
    }

    static isURL(value) {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }
  
    static isDate(value) {
      return !Number.isNaN(Date.parse(value));
    }

    static isUUID(value) {
      const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return this.isString(value) && uuidPattern.test(value);
    }
  }
  
  module.exports = {
    isEmpty: Validator.isEmpty,
    isArray: Validator.isArray,
    isPlainObject: Validator.isPlainObject,
    isString: Validator.isString,
    isNumber: Validator.isNumber,
    isBoolean: Validator.isBoolean,
    isEmail: Validator.isEmail,
    isURL: Validator.isURL,
    isDate: Validator.isDate,
    isUUID: Validator.isUUID
  };
  