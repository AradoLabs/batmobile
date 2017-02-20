import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'
import { observer } from 'mobx-react/native'
import ChargeStatusViewType from '../domain/ChargeStatusViewType'
import state from '../domain/AppState'

const DeviceWidth = Dimensions.get('window').width

@observer export default class ChargeStatusView extends Component {
   render() {
     var { battery } = this.props
     var visibleStatusText = battery.currentChargeValue 
     var redColor = battery.daysLeft <= 0
     return (
        <View style={styles.container}>
          <Text style={[styles.text, { color: redColor ? 'red' : 'green' }]}>
            {visibleStatusText}
          </Text>
          <Text style={[styles.subText, { color: redColor ? 'red' : 'green' }]}>
            {battery.daysLeft} päivää
            </Text>
        </View>
     )
   }  
}

const styles = StyleSheet.create({
  container: {
    width: 0.3 * DeviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
  },
  text: {
    alignSelf: "stretch",
    color: 'green',
    fontSize: 21,
    textAlign: 'center',
    justifyContent: 'center'
  },
  subText: {
    alignSelf: "stretch",
    color: 'green',
    fontSize: 17,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 6
  },
})
