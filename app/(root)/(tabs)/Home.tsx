import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { SafeAreaView, Text, View } from 'react-native'

export default function Page() {
  const { user } = useUser()

  return (
    <SafeAreaView className='bg-general-500'>
    <View >
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
     
    </View>
    </SafeAreaView>
  )
}