import { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
export const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const route = useRoute();
  console.log("MapScreen=====>", route);
  useEffect(() => {
    if (route.params) {
      setLocation(route.params.location);
    }
  }, [route.params]);
  console.log("MapScreen===+++==>", location);
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        // initialRegion={{
        //   latitude: 50.4289302,
        //   longitude: 14.9183271,
        //   latitudeDelta: 0.1,
        //   longitudeDelta: 0.1,
        // }}
        region={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }
            : null
        }
      >
        {location && <Marker coordinate={location} />}
      </MapView>
    </View>
  );
};

const screenSize = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
