import { Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";

export default function RootLayout() {
  useFonts({
    "Poppins-Bold": require("./../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("./../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Light": require("./../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Thin": require("./../assets/fonts/Poppins-Thin.ttf"),
  });

  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Onboarding"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Detail"
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="New"
          options={{
            headerTitleAlign: "center",
            headerTitle: "New Release",
            headerTintColor: Colors.PRIMARY,
            headerTitleStyle: {
              fontFamily: "Poppins-Bold",
            },
          }}
        />
        <Stack.Screen
          name="Popular"
          options={{
            headerTitleAlign: "center",
            headerTitle: "Recomended Movie",
            headerTintColor: Colors.PRIMARY,
            headerTitleStyle: {
              fontFamily: "Poppins-Bold",
            },
          }}
        />
      </Stack>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});