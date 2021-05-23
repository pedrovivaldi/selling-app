import * as React from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Appearance } from 'react-native-appearance';
import { device, func } from './src/constants';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import cartReducer from './src/reducers/CartReducer';

import Stack from './src/navigation/Stack';

const store = createStore(cartReducer);

const NAMESPACE = 'selling-app';
const KEY = 'selling-app-count';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      theme: 'light'
    };

    this.updateTheme = this.updateTheme.bind(this);
  }

  componentDidMount() {
    const colorScheme = Appearance.getColorScheme();

    if (colorScheme !== 'no-preference') {
      this.setState({
        theme: colorScheme
      });
    }

    // Count access
    fetch(
      `https://ttuqiqz600.execute-api.us-east-1.amazonaws.com/production/count/${NAMESPACE}/${KEY}`,
      {
        method: 'POST'
      }
    )
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }

  updateTheme(themeType) {
    this.setState({
      theme: themeType
    });
  }

  render() {
    const isLoading = this.state['isLoading'];
    const theme = this.state['theme'];

    const iOSStatusType = theme === 'light' ? 'dark-content' : 'light-content';

    if (isLoading) {
      return (
        <AppLoading
          onError={console.warn}
          onFinish={() => this.setState({ isLoading: false })}
          startAsync={func.loadAssetsAsync}
        />
      );
    }

    return (
      <Provider store={store}>
        <React.Fragment>
          <StatusBar barStyle={device.iOS ? iOSStatusType : 'light-content'} />

          <Stack
            screenProps={{
              updateTheme: this.updateTheme
            }}
            theme={theme}
          />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
