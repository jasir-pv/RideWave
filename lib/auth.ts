import * as SecureStore from 'expo-secure-store'
import * as AuthSession from 'expo-auth-session'
import { Platform } from 'react-native'
import { TokenCache } from '@clerk/clerk-expo/dist/cache'
import { fetchAPI } from './fetch'

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key)
        if (item) {
          console.log(`${key} was used 🔐 \n`)
        } else {
          console.log('No values stored under key: ' + key)
        }
        return item
      } catch (error) {
        console.error('secure store get item error: ', error)
        await SecureStore.deleteItemAsync(key)
        return null
      }
    },
    saveToken: (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token)
    },
  }
}

// SecureStore is not supported on the web
export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined


export const googleOAuth = async (startSSOFlow:any) => {
    try {
      const { createdSessionId, setActive, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: AuthSession.makeRedirectUri("/(root)/(tabs)/home"),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        if (setActive){
          setActive!({ session: createdSessionId })

          if(signUp.createdUserId) {
            await fetchAPI('/(api)/user', {
              method: 'POST',
              body: JSON.stringify({
                name: `${signUp.firstName} ${signUp.lastName}`,
                email: signUp.email,
                clerkId: signUp.createdUserId
              })
            })
          }

          return {
            success: true,
            code: 'success',
            message: "You have successfully authenticated",

          }
        }
      } else {
        return {
          success: false,
          message: "An error occurred",
          
        }
      }
    } catch (error: any) {
      console.log(error)

      return {
        success: true,
        message: error?.errors[0]?.longMessage,
        
      }
    }
}