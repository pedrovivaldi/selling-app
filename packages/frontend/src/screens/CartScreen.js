import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';

// components
import NavigationBack from '../components/NavigationBack';

const CartScreen = () => {
  const theme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={gStyle.contentContainer}
      style={gStyle.container[theme]}
    >
      <Text style={gStyle.text[theme]}>X produtos adicionados:</Text>
    </ScrollView>
  );
};

CartScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => <NavigationBack navigation={navigation} />,
  headerRight: () => <View style={{ flex: 1 }} />,
  headerTitleStyle: gStyle.headerTitleStyle,
  title: 'Cart'
});

export default CartScreen;
