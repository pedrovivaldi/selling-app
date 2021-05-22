import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';

import CartScreen from '../screens/CartScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Cart: CartScreen
});

export default HomeStack;
