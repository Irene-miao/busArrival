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
  const [duration, setDuration] = useState("");

  function dateConvert(time) {
    const event = new Date(time);
const newEvent = event.toLocaleTimeString('en-US');
return newEvent
  }


  function loadBusStopData() {
    setLoading(true);

    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((responseData) => {
        const myBus = responseData.services.filter(
          (item) => item.no === "106"
        )[0];
        console.log(myBus);
        setArrival(dateConvert(myBus.next.time));
        setDuration(Math.round((myBus.next.duration_ms)/1000));
        setLoading(false);
      });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bus arrival time:</Text>
      <Text style={styles.time}>
        {loading ? <ActivityIndicator size="large" color="blue" /> : arrival}{" "}
      </Text>
      <Text style={styles.header}>
Waiting time in seconds: {duration}
      </Text>
      <TouchableOpacity onPress={loadBusStopData} style={styles.button}>
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
