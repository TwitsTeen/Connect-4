import { Stack } from "expo-router";
import "./global.css";
import { useColorScheme } from "react-native";
import { AppRegistry } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
