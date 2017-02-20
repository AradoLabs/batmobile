import _ from 'lodash'
import { observable, computed } from "mobx"

export default class Battery {
  id = null
  host = null
  @observable currentCharge = null
  @observable chargeHistory = []

  @computed get currentChargeValue() {
    return Math.round(this.currentCharge * 100) / 100 + "V"
  }

  @computed get hostName() {
    if (!this.host) return null 
    var hostName = this.host.name.split(",")[0].trim()
    return hostName
  }

  @computed get hostLocation() {
    if (!this.host) return null 
    var hostLocation = this.host.name.split(",")[1].trim()
    return hostLocation
  }

  @computed get hostLatitude() {
    if (!this.host) return null 
    var latitude = this.host.location.split(",")[0].trim()
    return parseFloat(latitude)
  }

  @computed get hostLongitude() {
    if (!this.host) return null 
    var latitude = this.host.location.split(",")[1].trim()
    return parseFloat(latitude)
  }
  
  @computed get percentage() {
    const highestCharge = 12.77
    const lowestCharge = 12.1
    var batteryPercentage = ((this.currentCharge - lowestCharge) * 100) / (highestCharge - lowestCharge)
    var roundedPercentage = Math.round(batteryPercentage * 100) / 100
    return roundedPercentage
  }

  @computed get daysLeft() {
    const averageBatteryDurationDays = 31
    var batteryPercentage = this.percentage / 100
    var daysLeft = Math.round(batteryPercentage * averageBatteryDurationDays)
    return daysLeft
  }

  @computed get newestUpdateTimestamp() {
    var orderedHistory = _.orderBy(this.chargeHistory, 'timestamp', 'desc');
    if (0 < orderedHistory.length) {
      var newestHistoryItem = _.take(orderedHistory, 1)
      return newestHistoryItem[0].timestamp
    }
    return new Date();
  }

  @computed get newestHistoryEvents() {
    var newestHistoryItems = _.take(_.orderBy(this.chargeHistory, 'timestamp', 'desc'), 50)
    return newestHistoryItems.reverse()
  }

}