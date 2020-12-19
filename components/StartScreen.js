import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class StartScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      originalPrice: 'Original Price',
      discountPerct: 'Discount Percentage',
      history: [],
    };
  }

  onChangeText = (text1, text2) => {
    this.setState({ originalPrice: text1, discountPerct: text2 });
  };
  calculateDiscount = () => {
    if (isNaN((this.state.originalPrice / 100) * this.state.discountPerct))
      return 0;
    else return (this.state.originalPrice / 100) * this.state.discountPerct;
  };
  calculatePrice = () => {
    if (
      isNaN(
        this.state.originalPrice -
          (this.state.originalPrice / 100) * this.state.discountPerct
      )
    )
      return 0;
    else
      return (
        this.state.originalPrice -
        (this.state.originalPrice / 100) * this.state.discountPerct
      );
  };
  saveRecord = () => {
    if (!isNaN(this.state.originalPrice) && !isNaN(this.state.discountPerct)) {
      this.setState({
        originalPrice: 'Original Price',
        discountPerct: 'Discount Percentage',
        history: [
          ...this.state.history,
          { op: this.state.originalPrice, dp: this.state.discountPerct },
        ],
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{ position: 'absolute', top: 10, left: '20%', fontSize: 25 }}>
          Discount Calculator
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 20,
          }}
          onChangeText={(pricetext) =>
            this.onChangeText(pricetext, this.state.discountPerct)
          }
          onKeyPress={(e) => {
            if (e.nativeEvent.key == 'Backspace')
              this.setState({ originalPrice: '' });
          }}
          value={this.state.originalPrice}
          keyboardType={'number-pad'}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 20,
          }}
          onChangeText={(percentagetext) =>
            this.onChangeText(this.state.originalPrice, percentagetext)
          }
          onKeyPress={(e) => {
            if (e.nativeEvent.key == 'Backspace')
              this.setState({ discountPerct: '' });
          }}
          value={this.state.discountPerct}
          keyboardType={'number-pad'}
        />
        <Text style={{ textAlign: 'center', fontSize: 20 }}>
          Final Price: {this.calculatePrice() + ' Rs'}
        </Text>
        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 20 }}>
          You Save: {this.calculateDiscount() + ' Rs'}
        </Text>
        <View style={{ marginBottom: 20 }}>
          <Button
            onPress={() => this.saveRecord()}
            title="Save Record"
            color="#841584"
            accessibilityLabel="Save record"
          />
        </View>
        <View>
          <Button
            onPress={() => {
              if (this.props.route.params != undefined){
                this.setState({history:this.props.route.params.returnData})
              }
              if (this.state.history.length != 0) {
                this.props.navigation.navigate('History', {
                  history: this.state.history,
                })
              } else {
                this.props.navigation.navigate('Records');
              }
            }}
            title="Show History"
            color="#841584"
            accessibilityLabel="View History Button"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});
