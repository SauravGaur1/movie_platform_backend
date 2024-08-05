class Sanitize {

    static trim(value) {
      if (typeof value === 'string') {
        return value.trim();
      }
      return value;
    }
  
    static stripHTML(value) {
      if (typeof value === 'string') {
        return value.replace(/<\/?[^>]+(>|$)/g, '');
      }
      return value;
    }
  
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
  
    static toLowerCase(value) {
      if (typeof value === 'string') {
        return value.toLowerCase();
      }
      return value;
    }
  
    static toUpperCase(value) {
      if (typeof value === 'string') {
        return value.toUpperCase();
      }
      return value;
    }

    static toUnixPath(path) {
      path = path.replace(/\\/g,'/');
      return path;
    }
  
    static sanitizeArray(array, sanitizer) {
      if (Array.isArray(array) && typeof sanitizer === 'function') {
        return array.map(sanitizer);
      }
      return array;
    }
  
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
    sanitizeObject: Sanitize.sanitizeObject,
    toUnixPath: Sanitize.toUnixPath,
};
  