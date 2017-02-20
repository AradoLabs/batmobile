import React, { Component } from 'react'
import {
  Text,
  View,
  Platform,
  StyleSheet,
  ActivityIndicatorIOS,
  ProgressBarAndroid
} from 'react-native'

export default class Loader extends React.Component {
  render() {
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS
            animating={true}
            size="large"
          />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ProgressBarAndroid />
      </View>
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
