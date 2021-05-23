import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import { removeproduct } from '../actions/CartActions';
import { useSelector, useDispatch } from 'react-redux';

import NavigationBack from '../components/NavigationBack';

const CartScreen = () => {
  const theme = useTheme();

  const cart: any = useSelector((state) => state);
  const dispatch = useDispatch();
  const removeProduct = (id) => dispatch(removeproduct(id));

  const styles = StyleSheet.create({
    cart: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      marginBottom: '5%'
    },
    image: {
      width: '15%',
      resizeMode: 'stretch'
    }
  });

  const cartProducts = cart.map((product) => {
    return (
      <View key={product.id} style={styles.cart}>
        <Image
          style={styles.image}
          source={{
            uri: `${product.imageUrl}`
          }}
        />
        <Text style={gStyle.text[theme]}>{product.name}</Text>
        <Button
          onPress={() => removeProduct(product.id)}
          title="Remove"
          color="#e42424"
        />
      </View>
    );
  });
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center' }}
      style={gStyle.container[theme]}
    >
      <View style={gStyle.spacer16} />

      <Text style={gStyle.text[theme]}>
        {cart.length} produtos adicionados:
      </Text>

      <View style={gStyle.spacer16} />

      {cartProducts}
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
