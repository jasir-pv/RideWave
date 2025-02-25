import RideCard from "@/components/RideCard"
import React from "react"
import { useFetch } from "@/lib/fetch"
import { Ride } from "@/types/type"
import { useUser } from "@clerk/clerk-expo"
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { images } from "@/constants"


const Rides = () => {

  const { user } = useUser();

   const {data: recentRides, loading, error,} =
    useFetch<Ride[]>(`/(api)/ride/${user?.id}`);


  return (
    <SafeAreaView>
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
             <Text className="text-2xl font-JakartaBold my-5">
              All rides
             </Text>
          </>
        }
      />
    </SafeAreaView>
  )
}

export default Rides
