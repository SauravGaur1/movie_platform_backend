class Validator {
    /**
     * Checks if a value is empty. A value is considered empty if it is:
     * - `null`
     * - `undefined`
     * - `NaN`
     * - the string "null"
     * - the string "undefined"
     * - the string "NaN"
     * - an empty string (after trimming)
     * - an empty array
     * - an empty plain object (an object with no keys)
     * 
     * @param {*} value - The value to check.
     * @returns {boolean} - Returns `true` if the value is empty, `false` otherwise.
     */
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
  
    /**
     * Checks if a value is an array.
     * 
     * @param {*} value - The value to check.
     * @returns {boolean} - Returns `true` if the value is an array, `false` otherwise.
     */
    static isArray(value) {
      return Array.isArray(value);
    }
  
    /**
     * Checks if a value is a plain object (i.e., an object created using `{}` or `new Object()`).
     * 
     * @param {*} value - The value to check.
     * @returns {boolean} - Returns `true` if the value is a plain object, `false` otherwise.
     */
    static isPlainObject(value) {
      return value !== null && typeof value === 'object' && value.constructor === Object;
    }
  
    /**
     * Checks if a value is a string.
     * 
     * @param {*} value - The value to check.
     * @returns {boolean} - Returns `true` if the value is a string, `false` otherwise.
     */
    static isString(value) {
      return typeof value === 'string' || value instanceof String;
    }
  
    /**
     * Checks if a value is a number.
     * 
     * @param {*} value - The value to check.
     * @returns {boolean} - Returns `true` if the value is a number, `false` otherwise.
     */
    static isNumber(value) {
      return typeof value === 'number' && !Number.isNaN(value);
    }
  
    /**
     * Checks if a value is a boolean.
     * 
     * @param {*} value - The value to check.
     * @returns {boolean} - Returns `true` if the value is a boolean, `false` otherwise.
     */
    static isBoolean(value) {
      return typeof value === 'boolean';
    }
  
    /**
     * Checks if a value is a valid email address.
     * 
     * @param {string} value - The email address to check.
     * @returns {boolean} - Returns `true` if the value is a valid email address, `false` otherwise.
     */
    static isEmail(value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return this.isString(value) && emailPattern.test(value);
    }
  
    /**
     * Checks if a value is a valid URL.
     * 
     * @param {string} value - The URL to check.
     * @returns {boolean} - Returns `true` if the value is a valid URL, `false` otherwise.
     */
    static isURL(value) {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }
  
    /**
     * Checks if a value is a valid date.
     * 
     * @param {*} value - The value to check.
     * @returns {boolean} - Returns `true` if the value is a valid date, `false` otherwise.
     */
    static isDate(value) {
      return !Number.isNaN(Date.parse(value));
    }
  
    /**
     * Checks if a value is a valid UUID (version 4).
     * 
     * @param {string} value - The UUID to check.
     * @returns {boolean} - Returns `true` if the value is a valid UUID (version 4), `false` otherwise.
     */
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
  