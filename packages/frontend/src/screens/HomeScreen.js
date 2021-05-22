import * as React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';

import NavigationCart from '../components/NavigationCart';

const HomeScreen = ({ navigation, screenProps }) => {
  const theme = useTheme();

  const [isLoading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch(
      'https://dg2vohfa25.execute-api.us-east-1.amazonaws.com/development/products'
    )
      .then((response) => response.json())
      .then((products) => setProducts(products))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
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
      padding: '10px'
    },
    image: {
      height: '100px',
      resizeMode: 'stretch'
    }
  });

  const productsComponents = products.map((item) => {
    return (
      <View style={styles.product}>
        <Image
          style={styles.image}
          source={{
            uri: `${item.imageUrl}`
          }}
        />
        <Text>{item.name}</Text>
      </View>
    );
  });

  return (
    <View style={gStyle.container[theme]}>
      <ScrollView contentContainerStyle={gStyle.contentContainer}>
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
