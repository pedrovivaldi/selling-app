import * as React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Badge } from 'react-native-elements';
import { DefaultRootState, useSelector } from 'react-redux';

import { gStyle } from '../constants';

import SvgCart from './icons/Svg.Cart';

const NavigationCart = ({ navigation }) => {
  const cart: any = useSelector<any[]>((state) => state);

  return (
    <TouchableOpacity
      accessible
      accessibilityLabel="cart"
      activeOpacity={gStyle.activeOpacity}
      onPress={() => navigation.navigate('Cart')}
      style={{ paddingHorizontal: 16, paddingVertical: 8 }}
    >
      <SvgCart active />
      {cart.length > 0 ? (
        <Badge
          value={cart.length}
          containerStyle={{ position: 'absolute', top: -4, right: 0 }}
        />
      ) : (
        <View></View>
      )}
    </TouchableOpacity>
  );
};

NavigationCart.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default NavigationCart;
