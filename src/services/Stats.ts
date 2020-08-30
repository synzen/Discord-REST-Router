class Stats {
  private static totalResponseTimes = 0
  private static totalResponseTimesCount = 0
  private static highestResponseTime = -1
  private static bucketRateLimitHits = 0
  private static globalRateLimitHits = 0
  private static abortedRequests = 0
  private static invalidRequests = 0

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

  static toJSON () {
    return {
      totalResponseTimes: this.totalResponseTimes,
      totalResponseTimesCount: this.totalResponseTimesCount,
      averageResponseTime: this.getAverageResponseTime(),
      highestResponseTime: this.highestResponseTime,
      bucketRateLimitHits: this.bucketRateLimitHits,
      globalRateLimitHits: this.globalRateLimitHits,
      abortedRequests: this.abortedRequests,
      invalidRequests: this.invalidRequests
    }
  }
}

export default Stats
