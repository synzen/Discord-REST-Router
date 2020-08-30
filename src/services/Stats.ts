class Stats {
  static totalResponseTimes = 0
  static totalResponseTimesCount = 0
  static averageResponseTime = -1
  static highestResponseTime = -1
  static bucketRateLimitHits = 0
  static globalRateLimitHits = 0
  static abortedRequests = 0

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
    this.abortedRequests++
  }

  static toJSON () {
    return {
      totalResponseTimes: this.totalResponseTimes,
      totalResponseTimesCount: this.totalResponseTimesCount,
      averageResponseTime: this.getAverageResponseTime(),
      highestResponseTime: this.highestResponseTime,
      bucketRateLimitHits: this.bucketRateLimitHits,
      globalRateLimitHits: this.globalRateLimitHits,
      abortedRequests: this.abortedRequests
    }
  }
}

export default Stats
