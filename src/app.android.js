import React, { Component } from 'react'
import {
  Image,
  View,
  Text,
  ToolbarAndroid,
  StyleSheet
} from 'react-native'
import { Tab, TabLayout } from 'react-native-android-tablayout'
import state from './domain/AppState'
import { observer } from 'mobx-react/native'
import BatteryList from './ui/BatteryList'
import BatteryView from './ui/BatteryView'
import AlertsScreen from './ui/AlertsScreen'

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  toolbar: {
    backgroundColor: 'rgb(0, 138, 55)',
    height: 56,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
})

@observer export default class BatMobile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pagePosition: 0
    }

  }

  getComponent(pagePosition) {
    switch (pagePosition) {
      case 0: return BatteryList
      case 1: return AlertsScreen
      default: return View
    }
  }

  hideDetails() {
    state.hideDetails();
  }

  render() {
    const Component = this.getComponent(this.state.pagePosition)
    if (state.renderDetailsView) {
      return (
        <View style={styles.container}>
          <ToolbarAndroid
            navIcon={require('image!ic_arrow_back_white_24dp')}
            title={"Details: " + state.currentTitle}
            titleColor="white"
            style={styles.toolbar}
            onIconClicked={this.hideDetails}
          />
          <BatteryView battery={state.selectedBattery} />
        </View>
    )} else {
        return (
          <View style={styles.container}>
            <ToolbarAndroid
              title={state.currentTitle}
              titleColor="white"
              style={styles.toolbar}
            />

            <Component />
          </View>
        )
    }
  }
}
