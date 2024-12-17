import { Slot, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";

export default function layout(){
    return(
            <GestureHandlerRootView>
                <Stack screenOptions={{
                    headerShown: false,
                }}>
                    <Stack.Screen name="(noBottom)/accountinfo" options={{
                        headerShown: true,
                        headerTitle: "Account Information",
                        headerBackTitle: "Back"
                    }}/>
                </Stack>
           </GestureHandlerRootView> 
    );
}