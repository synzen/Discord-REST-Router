class Stats {
  static averageResponseTime = -1
  static highestResponseTime = -1
  static bucketRateLimitHits = 0
  static globalRateLimitHits = 0

  static recordResponseTime (time: number) {
    if (this.averageResponseTime === -1) {
      this.averageResponseTime = time
    } else {
      this.averageResponseTime = (this.averageResponseTime + time) / 2
    }
    if (time > this.highestResponseTime) {
      this.highestResponseTime = time
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
