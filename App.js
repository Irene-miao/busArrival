import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bus arrival times</Text>
      <Text style={styles.sub}>Loading..</Text>
     <TouchableOpacity
      style={styles.button}
     >
     <Text style={styles.buttonText}>Refreshed!</Text>
     </TouchableOpacity>
     
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
fontSize: 40,
margin: 10,
  },
  sub: {
fontSize: 30,
margin: 10,
  },
  button: {
    textAlign: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    padding: 10,
  },
});
