import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataTable } from 'react-native-paper';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

export default function ViewHistory({ route, navigation }) {
  const [data, setdata] = useState(route.params.history);
  const deletedata = (index) => {
    setdata((data) => data.filter((item) => data.indexOf(item) != index));
  }
  const cleardata=()=>{
    setdata([])
  }
  const renderTableData = () => {
    return data.map((record, index) => {
      const { op, dp } = record; //destructuring
      return (
        <DataTable.Row>
          <DataTable.Cell>{op}</DataTable.Cell>
          <DataTable.Cell>{dp}</DataTable.Cell>
          <DataTable.Cell>{op - (op / 100) * dp}</DataTable.Cell>
          <DataTable.Cell>
            <Button
              title="Delete"
              color="#ff0000"
              accessibilityLabel="Delete Record"
              onPress={() => deletedata(index)}
            />
          </DataTable.Cell>
        </DataTable.Row>
      );
    });
  };
  navigation.setOptions({
    headerLeft: () => (
      <View style={{ paddingLeft: 10 }}>
        <Ionicons
          name="arrow-back"
          size={32}
          color="black"
          onPress={() => navigation.navigate('StartScreen', { returnData: data })}
        />
      </View>
    ),
  });
  return (
    <View>
      <Button
        title="Clear Data"
        color="#ff0000"
        accessibilityLabel="Delete Record"
        onPress={() => cleardata()}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Original Price</DataTable.Title>
          <DataTable.Title>Discount %</DataTable.Title>
          <DataTable.Title>After discount</DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>
        {data.length > 0 ? (
          renderTableData()
        ) : (
          <Text style={{ textAlign: 'center', fontSize: 30 }}>
            No Records Left!
          </Text>
        )}
      </DataTable>
    </View>
  );
}
