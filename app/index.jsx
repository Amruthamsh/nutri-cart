import { StatusBar } from "expo-status-bar";
import { Text, View , StyleSheet} from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-3xl">nutriCart</Text>
        
        <StatusBar style="auto" />
    </View>
  );
}

