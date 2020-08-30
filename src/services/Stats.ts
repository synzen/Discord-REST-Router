class Stats {
  private static totalResponseTimes = 0
  private static totalResponseTimesCount = 0
  private static highestResponseTime = -1
  private static bucketRateLimitHits = 0
  private static globalRateLimitHits = 0
  private static abortedRequests = 0
  private static invalidRequests = 0
  private static lastInvalidRequestsReset = new Date()

  static recordResponseTime (time: number) {
    this.totalResponseTimes += time
    ++this.totalResponseTimesCount
    if (time > this.highestResponseTime) {
      this.highestResponseTime = time
    }
  }

  static getAverageResponseTime () {
    if (this.totalResponseTimesCount === 0) {
      return -1
    } else {
      return this.totalResponseTimes / this.totalResponseTimesCount
    }
  }

  static addBucketRateLimitHit () {
    ++this.bucketRateLimitHits
  }

  static addGlobalRateLimitHit () {
    ++this.globalRateLimitHits
  }

  static addAbortedRequest () {
    ++this.abortedRequests
  }

  static addInvalidRequest () {
    ++this.invalidRequests
  }

  static resetInvalidRequests () {
    this.invalidRequests = 0
    this.lastInvalidRequestsReset = new Date()
  }

  static resetAll () {
    this.totalResponseTimes = 0
    this.totalResponseTimesCount = 0
    this.highestResponseTime = -1
    this.bucketRateLimitHits = 0
    this.globalRateLimitHits = 0
    this.abortedRequests = 0
    // Don't clear invalid requests stats since it clears on a timer
  }

  static toJSON () {
    return {
      totalResponseTimes: this.totalResponseTimes,
      totalResponseTimesCount: this.totalResponseTimesCount,
      averageResponseTime: this.getAverageResponseTime(),
      highestResponseTime: this.highestResponseTime,
      bucketRateLimitHits: this.bucketRateLimitHits,
      globalRateLimitHits: this.globalRateLimitHits,
      abortedRequests: this.abortedRequests,
      invalidRequests: this.invalidRequests,
      lastInvalidRequestsReset: this.lastInvalidRequestsReset
    }
  }
}

// Record the number of invalid requests every 10 minutes
setInterval(() => {
  Stats.resetInvalidRequests()
}, 1000 * 60 * 10)

export default Stats
