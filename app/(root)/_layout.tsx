import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="Home" />
      <Tabs.Screen name="Chat" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="rides" />
    </Tabs>
  );
}
