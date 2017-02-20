import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ListView,
  Platform
} from 'react-native'
import mobx from 'mobx'
import { observer } from 'mobx-react/native'
import { fetchBatteries } from '../actions/batteryActions'
import state from '../domain/AppState'
import BatteryListItem from './BatteryListItem'
import Loader from './Loader'
import ChargeStatusViewType from '../domain/ChargeStatusViewType'
import * as constants from '../constants'

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

@observer export default class BatteryList extends React.Component {
  constructor(props) {
    super(props)
    this.handleNavigateToBattery = this.handleNavigateToBattery.bind(this)
  }

  componentDidMount() {
    fetchBatteries()
  }

  handleNavigateToBattery(battery) {
    // Until react-native-navigation has Android-support,
    // we'll do little platform-specific logic here
    state.showDetails(battery)
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        screen: constants.BatteryView,
        title: battery.host.name,
        passProps: {battery},
        animated: true,
        backButtonTitle: undefined,
        backButtonHidden: false,
        navigatorStyle: {},
        navigatorButtons: {}
      })
    }
  }

  render() {
    if (!state ||
        state.loadingBatteries)
    {
      return <Loader />
    }

    var batteryArray = state.batteries.slice()
    var batteriesSource = ds.cloneWithRows(batteryArray)
    return (
      <ListView
        dataSource={batteriesSource}
        renderRow={battery => (
          <BatteryListItem
            key={Math.random()}
            battery={battery}
            handleNavigateToBattery={this.handleNavigateToBattery}
          />
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})