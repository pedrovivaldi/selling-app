import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';

import CartScreen from '../screens/CartScreen';

// Ignoring errors because react types are not up to date
const HomeStack = createStackNavigator({
  // @ts-ignore
  Home: HomeScreen,
  // @ts-ignore
  Cart: CartScreen
});

export default HomeStack;
