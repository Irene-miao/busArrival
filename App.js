import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=09048";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");

  function loadBusStopData() {
    setLoading(true);

    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((responseData) => {
        const myBus = responseData.services.filter(
          (item) => item.no === "106"
        )[0];
        console.log(myBus);
        setArrival(myBus.next.time);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadBusStopData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bus arrival times:</Text>
      <Text style={styles.time}>
        {loading ? <ActivityIndicator size="large" color="blue" /> : arrival}{" "}
      </Text>
      <TouchableOpacity onPress={null} style={styles.button}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 40,
    margin: 10,
  },
  time: {
    fontSize: 30,
    margin: 10,
  },
  button: {
    textAlign: "center",
    backgroundColor: "black",
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 10,
  },
});
