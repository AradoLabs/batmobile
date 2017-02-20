import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native'
import ChargeStatusView from './ChargeStatusView'
import ChargeStatusViewType from '../domain/ChargeStatusViewType'

const DeviceWidth = Dimensions.get('window').width
import EvilIcon from 'react-native-vector-icons/EvilIcons'

export default BatteryListItem = ({
  battery,
  handleNavigateToBattery
}) => (
  <TouchableHighlight
    onPress={() => handleNavigateToBattery(battery)}
    underlayColor={'rgba(100, 100, 100, 0.1)'}>
    <View style={styles.container}>
      <ChargeStatusView battery={battery} />
      <View style={styles.rightContainer}>
        <View style={styles.hostContainer}>
          <Text style={styles.host}>{battery.host.name}</Text>
        </View>
        <View style={styles.chevronContainer}>
          <EvilIcon
            name="chevron-right"
            style={styles.chevron}
          />
        </View>
      </View>
    </View>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    width: DeviceWidth,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    width: 0.7 * DeviceWidth,
  },
  host: {
    fontSize: 20,
    color: 'black',
    lineHeight: 28,
    textAlign: 'left',
  },
  hostContainer: {
    width: 0.55 * DeviceWidth,
    justifyContent: 'center',
  },
  chevronContainer: {
    width: 0.15 * DeviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevron: {
    fontSize: 45,
    color: 'black'
  },
})
