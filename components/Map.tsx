import { View, Text } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps'

const Map = () => {
  return (
    <MapView
        provider={PROVIDER_DEFAULT} 
        className='w-full h-full rounded-2xl z-30'
        tintColor='black'
        mapType='mutedStandard'
        showsPointsOfInterest={false}
        // initialRegion={region}
        showsUserLocation={true}
        userInterfaceStyle='light'

     >
        <Text> Map</Text>
    </MapView>
  )
}

export default Map