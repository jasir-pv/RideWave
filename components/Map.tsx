import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";


const Map = () => {


  return (
    <View className="w-full h-full flex-1">
      <View className="flex-1 rounded-2xl overflow-hidden">
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          tintColor="black"
          showsPointsOfInterest={false}
          showsUserLocation={true}
          userInterfaceStyle="light"
          
        >
        

        </MapView>
      </View>
    </View>
  );
};




const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject, 
  },
});

export default Map;