import * as React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  Button
} from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import { addproduct, removeproduct } from '../actions/CartActions';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NavigationCart from '../components/NavigationCart';
import { LOCAL_STORAGE_KEY } from '../reducers/CartReducer';

const HomeScreen = ({ navigation, screenProps }) => {
  const theme = useTheme();

  const [isLoading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);

  const cart: any = useSelector((state) => state);
  const dispatch = useDispatch();
  const addProduct = (product) => dispatch(addproduct(product));
  const removeProduct = (id) => dispatch(removeproduct(id));

  React.useEffect(() => {
    // Get products
    fetch(
      'https://dg2vohfa25.execute-api.us-east-1.amazonaws.com/development/products'
    )
      .then((response) => response.json())
      .then((products) => setProducts(products))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

    // Get cart from local storage
    AsyncStorage.getItem(LOCAL_STORAGE_KEY).then((value) => {
      if (value) {
        const products = JSON.parse(value);
        for (let product of products) {
          addProduct(product);
        }
      }
    });
  }, []);

  const styles = StyleSheet.create({
    columns: {
      flex: 1,
      width: '90%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start'
    },
    product: {
      width: '50%',
      height: '35%',
      padding: 10
    },
    image: {
      height: 100,
      resizeMode: 'stretch'
    }
  });

  const cartIds = cart.map((product) => product.id);

  const productsComponents = products.map((item) => {
    return (
      <View key={item.id} style={styles.product}>
        <Image
          style={styles.image}
          source={{
            uri: `${item.imageUrl}`
          }}
        />
        <Text style={gStyle.text[theme]}>{item.name}</Text>
        {cartIds.includes(item.id) ? (
          <Button
            // @ts-ignore Component type does not have style
            style={gStyle.text[theme]}
            onPress={() => removeProduct(item.id)}
            title="Remove"
            color="#e42424"
          />
        ) : (
          <Button
            onPress={() => addProduct(item)}
            title="Add"
            color="#60c560"
          />
        )}
      </View>
    );
  });

  return (
    <View style={gStyle.container[theme]}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View style={gStyle.spacer16} />

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.columns}>{productsComponents}</View>
        )}
      </ScrollView>
    </View>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => <View style={{ flex: 1 }} />,
  headerRight: () => <NavigationCart navigation={navigation} />,
  headerTitleStyle: gStyle.headerTitleStyle,
  title: 'Selling App'
});

HomeScreen.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.object.isRequired
};

export default HomeScreen;
