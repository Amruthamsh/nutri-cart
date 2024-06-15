import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
import { StatusBar } from "expo-status-bar";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2 p-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`mt-2 ${focused ? "font-bold" : "font-normal"}`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#00FF00",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#000000",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
            paddingBottom: 10,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: true,
            headerTintColor: "green",
            headerStyle: { backgroundColor: "black" },
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name=" "
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Nutrition"
          options={{
            title: "Nutrition",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.nutrition}
                color={color}
                name=" "
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="ReciepeSuggestion"
          options={{
            title: "Reciepe Suggestion",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.reciepe}
                color={color}
                name=" "
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="urReciepe"
          options={{
            title: "Your Reciepe",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.suggestion}
                color={color}
                name=" "
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Monthly"
          options={{
            title: "Monthly input",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.monthly}
                color={color}
                name=" "
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="weekly"
          options={{
            title: "weekly input",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.weeklyhighres}
                color={color}
                name=" "
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
