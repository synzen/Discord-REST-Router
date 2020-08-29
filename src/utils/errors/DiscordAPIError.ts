class DiscordAPIError extends Error {
  code: number

  constructor(message: string, code: number) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DiscordAPIError)
    }
    
    this.code = code
    this.name = 'DiscordAPIError'

    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, DiscordAPIError.prototype);
  }
}

export default DiscordAPIError
