import { Navigation } from 'react-native-navigation'
import * as constants from './constants'
import AlertsScreen from './ui/AlertsScreen'
import BatteryList from './ui/BatteryList'
import BatteryView from './ui/BatteryView'

Navigation.registerComponent(constants.AlertsScreen, () => AlertsScreen);
Navigation.registerComponent(constants.BatteryList, () => BatteryList);
Navigation.registerComponent(constants.BatteryView, () => BatteryView);

Navigation.startSingleScreenApp({
  screen: {
    label: 'Akut',
    screen: constants.BatteryList,
    icon: require('./images/charge_battery.png'),
    title: 'Akut',
    navigatorStyle: {},
    navigatorButtons: {}
  }     
})