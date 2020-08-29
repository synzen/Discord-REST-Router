class APIError extends Error {
  code: number
  errors?: string[]

  constructor(message: string, code: number, errors?: string[]) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError)
    }
    
    this.code = code
    this.name = 'APIError'
    this.errors = errors

    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export default APIError
