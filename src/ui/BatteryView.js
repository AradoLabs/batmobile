import _ from 'lodash'
import moment from 'moment'
var fiLocale = require('moment/locale/fi');
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PixelRatio
} from 'react-native'

import mobx from 'mobx'
import { observer } from 'mobx-react/native'
import MapView from 'react-native-maps'
import state from '../domain/AppState'
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis
} from 'victory-chart-native'

const DeviceWidth = Dimensions.get('window').width
const DeviceHeight = Dimensions.get('window').height

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    width: DeviceWidth * 0.85,
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(151, 151, 151, 0.5)'
  },
  headerTitleContainer: {
    flex: 2.5,
  },
  headerTitle: {
    fontSize: 21,
    color: '#4E4E4E',
    marginBottom: 7
  },
  headerValueTitle: {
    fontSize: 21,
    color: '#09d200',
    marginBottom: 7
  },
  headerBatteryValues: {
    flex: 1,
    alignItems: 'flex-end',
  },
  map: {
    flex: 2,
    width: DeviceWidth,
  },
  chart: {
    flex: 3,
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 5,
    width: DeviceWidth,
  }
})


@observer export default class BatteryView extends React.Component {

  componentDidMount() {
    moment.updateLocale('fi', fiLocale)
  }

  render() {
    if (!state.selectedBattery) {
      return null
    }
    // We'll create a new Battery to get access to computed funcs.
    // Navigation passprops in iOS get rid of them due to native-bridging.
    var battery = state.selectedBattery
    var newestUpdateFromNow = moment(battery.newestUpdateTimestamp).fromNow()

    var chartTickValues = [
      moment(battery.newestUpdateTimestamp).subtract(48, 'hours').toDate(),
      moment(battery.newestUpdateTimestamp).subtract(24, 'hours').toDate(),
      moment(battery.newestUpdateTimestamp).toDate()
    ]

    var chartData =  _.map(battery.newestHistoryEvents, (event) => {
      return {
        x: new Date(event.timestamp),
        y: parseFloat(event.charge)
      }
    })
    var showRedColor = battery.daysLeft <= 0

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{battery.hostName}</Text>
            <Text style={[styles.headerTitle, { fontSize: 18 }]}>{battery.hostLocation}</Text>
            <Text style={[styles.headerTitle, { fontSize: 14, fontWeight: '300' }]}>
              päivitetty {newestUpdateFromNow}
            </Text>
          </View>
          <View style={styles.headerBatteryValues}>
            <Text style={[styles.headerValueTitle, { color: showRedColor ? 'red' : '#09d200' }]}>
              {battery.percentage} %
            </Text>
            <Text style={[styles.headerValueTitle, { fontSize: 18, color: showRedColor ? 'red' : '#09d200' }]}>
              {battery.currentChargeValue}
            </Text>
            <Text style={[styles.headerValueTitle, { fontSize: 14, color: showRedColor ? 'red' : '#09d200' }]}>
              {battery.daysLeft} päivää
            </Text>
          </View>
        </View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: battery.hostLatitude,
            longitude: battery.hostLongitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: battery.hostLatitude,
              longitude: battery.hostLongitude
            }}
            title={battery.hostName}
            pinColor='#09d200'
          />
        </MapView>
        <VictoryChart
          height={DeviceHeight * 0.3}
          scale={{
            x: "time"
          }}
        >
          <VictoryAxis
            padding={5}
            tickValues={chartTickValues}
            tickFormat={(x) => moment(x).format('D.M.')}
          />
          <VictoryAxis
            padding={5}
            dependentAxis
          />
          <VictoryLine
            data={chartData}
          />
        </VictoryChart>
      </View>
    )
  }
}
