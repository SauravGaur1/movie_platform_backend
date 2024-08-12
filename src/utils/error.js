class customError extends Error {
  constructor(message='Something went wrong', statusCode = 500, payload = {}) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.payload = payload;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  customError,
};
