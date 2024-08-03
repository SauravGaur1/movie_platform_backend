class Sanitize {
    /**
     * Trims whitespace from both ends of a string.
     * 
     * @param {string} value - The string to trim.
     * @returns {string} - The trimmed string.
     */
    static trim(value) {
      if (typeof value === 'string') {
        return value.trim();
      }
      return value;
    }
  
    /**
     * Removes all HTML tags from a string.
     * 
     * @param {string} value - The string to strip HTML tags from.
     * @returns {string} - The string without HTML tags.
     */
    static stripHTML(value) {
      if (typeof value === 'string') {
        return value.replace(/<\/?[^>]+(>|$)/g, '');
      }
      return value;
    }
  
    /**
     * Escapes special characters in a string to prevent XSS attacks.
     * 
     * @param {string} value - The string to escape.
     * @returns {string} - The escaped string.
     */
    static escape(value) {
      if (typeof value === 'string') {
        return value
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      }
      return value;
    }
  
    /**
     * Converts a string to lowercase.
     * 
     * @param {string} value - The string to convert.
     * @returns {string} - The lowercase string.
     */
    static toLowerCase(value) {
      if (typeof value === 'string') {
        return value.toLowerCase();
      }
      return value;
    }
  
    /**
     * Converts a string to uppercase.
     * 
     * @param {string} value - The string to convert.
     * @returns {string} - The uppercase string.
     */
    static toUpperCase(value) {
      if (typeof value === 'string') {
        return value.toUpperCase();
      }
      return value;
    }
  
    /**
     * Sanitizes an array by applying a sanitizer function to each element.
     * 
     * @param {Array} array - The array to sanitize.
     * @param {Function} sanitizer - The sanitizer function to apply.
     * @returns {Array} - The sanitized array.
     */
    static sanitizeArray(array, sanitizer) {
      if (Array.isArray(array) && typeof sanitizer === 'function') {
        return array.map(sanitizer);
      }
      return array;
    }
  
    /**
     * Sanitizes an object by applying a sanitizer function to each value.
     * 
     * @param {Object} obj - The object to sanitize.
     * @param {Function} sanitizer - The sanitizer function to apply.
     * @returns {Object} - The sanitized object.
     */
    static sanitizeObject(obj, sanitizer) {
      if (typeof obj === 'object' && !Array.isArray(obj) && typeof sanitizer === 'function') {
        const sanitizedObj = {};
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            sanitizedObj[key] = sanitizer(obj[key]);
          }
        }
        return sanitizedObj;
      }
      return obj;
    }
  }

module.exports = {
    trim: Sanitize.trim,
    stripHTML: Sanitize.stripHTML,
    escape: Sanitize.escape,
    toLowerCase: Sanitize.toLowerCase,
    toUpperCase: Sanitize.toUpperCase,
    sanitizeArray: Sanitize.sanitizeArray,
    sanitizeObject: Sanitize.sanitizeObject
};
  