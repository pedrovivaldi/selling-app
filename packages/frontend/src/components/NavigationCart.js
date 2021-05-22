import * as React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { gStyle } from '../constants';

import SvgCart from './icons/Svg.Cart';

const NavigationCart = ({ navigation }) => (
  <TouchableOpacity
    accessible
    accessibilityLabel="cart"
    accessibilityComponentType="button"
    accessibilityTraits="button"
    activeOpacity={gStyle.activeOpacity}
    onPress={() => navigation.navigate('Cart')}
    style={{ paddingHorizontal: 16, paddingVertical: 8 }}
  >
    <SvgCart active />
  </TouchableOpacity>
);

NavigationCart.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default NavigationCart;
