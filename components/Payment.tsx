import { useAuth } from "@clerk/clerk-expo";
import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { PaymentProps } from "@/types/type";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const {
    userAddress,
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationAddress,
    destinationLongitude,
  } = useLocationStore();

  const { userId } = useAuth(); // Get the authenticated user's ID
  const [success, setSuccess] = useState<boolean>(false);

  const initializePaymentSheet = async () => {
    try {
      const data = await fetchAPI("/(api)/(stripe)/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName || email.split("@")[0],
          email: email,
          amount: amount,
        }),
      });

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Ryde Inc.",
        paymentIntentClientSecret: data.paymentIntent.client_secret,
        customerEphemeralKeySecret: data.ephemeralKey.secret,
        customerId: data.customer,
      });

      if (error) {
        console.error("Payment Sheet Initialization Error:", error);
        Alert.alert("Initialization Error", error.message);
        return false; // Return false if initialization fails
      }

      return true; // Return true if initialization succeeds
    } catch (error) {
      console.error("Error initializing payment sheet:", error);
      Alert.alert("Error", "Failed to initialize payment sheet.");
      return false;
    }
  };

  const openPaymentSheet = async () => {
    const initializationSuccess = await initializePaymentSheet();

    if (!initializationSuccess) {
      Alert.alert("Error", "Payment sheet initialization failed.");
      return;
    }

    const { error } = await presentPaymentSheet();

    if (error) {
      console.error("Payment Sheet Presentation Error:", error);
      Alert.alert(`Payment Error: ${error.code}`, error.message);
    } else {
      setSuccess(true);

      // Create a ride record after successful payment
      await fetchAPI("/(api)/ride/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin_address: userAddress,
          destination_address: destinationAddress,
          origin_latitude: userLatitude,
          origin_longitude: userLongitude,
          destination_latitude: destinationLatitude,
          destination_longitude: destinationLongitude,
          ride_time: rideTime.toFixed(0),
          fare_price: parseInt(amount) * 100,
          payment_status: "paid",
          driver_id: driverId,
          user_id: userId, // Use the authenticated user's ID
        }),
      });
    }
  };

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>

          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Thank you for your booking. Your reservation has been successfully
            placed. Please proceed with your trip.
          </Text>

          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payment;