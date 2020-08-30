class Stats {
  private static totalResponseTimes = 0
  private static totalResponseTimesCount = 0
  static averageResponseTime = -1
  static highestResponseTime = -1
  static bucketRateLimitHits = 0
  static globalRateLimitHits = 0

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
}

export default Stats
