import React from 'react';
import RootNavigator from './src/navigator/RootNavigator';
import { Root } from 'native-base';

export default class App extends React.Component {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);

  }
 

  render() {

    return (
        <Root>
          <RootNavigator />
          {/* <SosScreen></SosScreen> */}
        </Root>
    );
  }
};


