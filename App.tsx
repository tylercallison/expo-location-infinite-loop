import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
// You can import from local files
import * as TaskManager from "expo-task-manager";
// or any pure javascript modules available in npm
import { LocationObject } from "expo-location";
import MapView from "react-native-maps";

const locTaskName = "backgroundLocationTask";

TaskManager.defineTask(locTaskName, ({ data, error }) => {
  if (error) {
    console.warn("Failed to get location data");
    return;
  }
  const locations = data as LocationObject;

  // This line will loop infinitely
  console.log("Received new locations", locations);
});

export default function App() {
  async function startLocationTracking() {
    const foreground = await Location.requestForegroundPermissionsAsync();
    if (foreground.status !== "granted") {
      return;
    }

    if (await Location.hasStartedLocationUpdatesAsync(locTaskName)) {
      await Location.stopLocationUpdatesAsync(locTaskName);
    }

    Location.startLocationUpdatesAsync(locTaskName, {
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 5,
    });
  }

  React.useEffect(() => {
    startLocationTracking();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        followsUserLocation={true}
        showsUserLocation={true}
        showsCompass={false}
        showsMyLocationButton={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
