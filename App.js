import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ViewHistory from './components/ViewHistory';
// You can import from local files
import StartScreen from './components/StartScreen';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="History" component={ViewHistory} />
        <Stack.Screen name="Records" component={NoData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function NoData() {
  return (
    <View>
      <Text style={styles.text}>No Records yet!</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  text: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
