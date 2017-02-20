import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})

export default AlertsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
      ilmoitukset
    </Text>
  </View>
)
