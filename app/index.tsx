import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import 'react-native-get-random-values';
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://57c79656737ca51f93b6b801ccec13f8@o4508810679222272.ingest.us.sentry.io/4508810680205312",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  // profilesSampleRate is relative to tracesSampleRate.
  // Here, we'll capture profiles for 100% of transactions.
  profilesSampleRate: 1.0,
});


const Home = () => {
  
    const { isSignedIn } = useAuth()


    if (isSignedIn) return <Redirect href="/(root)/(tabs)/home" />;

    return <Redirect href='/(auth)/welcome'/> 
}

export default Sentry.wrap(Home);