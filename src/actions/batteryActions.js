import { FakePylons } from '../data/fakePylons'
import state from '../domain/AppState'
import Battery from '../domain/Battery'

function parseBattery(json) {
  var currentCharge = new Number(json.currentState / 100)
  var battery = new Battery()
  battery.id = json.batteryId
  battery.host = json.host
  battery.currentCharge = currentCharge
  json.stateHistory.forEach(stateEvent => {
    battery.chargeHistory.push({
      charge: new Number(stateEvent.state / 100),
      timestamp: stateEvent.timestamp
    })
  })
  return battery
}

export function fetchBatteries() {
  state.loadingBatteries = true
  state.batteries = []

  const fakePylon = FakePylons[0];
  console.log('fetched batteries')
  var singleBattery = parseBattery(fakePylon)
  state.batteries.push(singleBattery)

  var secondBatteryJson = JSON.parse(JSON.stringify(fakePylon))
  var secondBattery = parseBattery(secondBatteryJson)
  secondBattery.currentCharge = secondBattery.currentCharge * 1.01
  secondBattery.host.name = 'Opastepylon 07 (demo), Jätkäsaari'
  secondBattery.host.location = '60.151323, 24.915559'
  state.batteries.push(secondBattery)

  var thirdBatteryJson = JSON.parse(JSON.stringify(fakePylon))
  var thirdBattery = parseBattery(thirdBatteryJson)
  thirdBattery.currentCharge = thirdBattery.currentCharge * 1.07
  thirdBattery.host.name = 'Opastepylon 08 (demo), Jätkäsaari'
  thirdBattery.host.location = '60.158296, 24.907214'
  state.batteries.push(thirdBattery)

  state.loadingBatteries = false
}
