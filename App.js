import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import ExplorerScreen from "./containers/ExplorerScreen";
import FavoritesScreen from "./containers/FavoritesScreen";
import PlusScreen from "./containers/PlusScreen";
import ProfileScreen from "./containers/ProfileScreen";
import RestaurantScreen from "./containers/RestaurantScreen";
import SignupScreen from "./containers/SingupScreen";
import LoginScreen from "./containers/LoginScreen";
import MapScreen from "./containers/MapScreen";

import {
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

const App = () => {
  const [userToken, setUserToken] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleIdToken = async (token, id) => {
    if (token && id) {
      await AsyncStorage.multiSet([
        ["userToken", token],
        ["userId", id],
      ]);
    } else {
      await AsyncStorage.multiRemove(["userToken", "userId"]);
    }
    setUserToken(token);
    setUserId(id);
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      setUserId(userId);
      setUserToken(userToken);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#9069CD",
          tabBarInactiveTintColor: "grey",
        }}
      >
        <Tab.Screen
          options={{
            tabBarLabel: "Explorer",
            tabBarIcon: ({ size, color }) => {
              return <Feather name="search" size={size} color={color} />;
            },
          }}
          name="TabExplorer"
        >
          {() => (
            <Stack.Navigator
              screenOptions={{
                headerBackTitleVisible: false,
                headerTitle: () => {
                  return (
                    <Image
                      source={require("./assets/happycow-logo-text.png")}
                      style={{ width: 120, height: 25 }}
                    />
                  );
                },

                headerTitleAlign: "center",
                headerTintColor: "white",
              }}
            >
              <Stack.Screen
                options={({ navigation }) => ({
                  headerStyle: {
                    backgroundColor: "#9069CD",
                    color: "white",
                  },
                  headerRight: () => {
                    return (
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Map")}
                      >
                        <Ionicons name="map-sharp" size={24} color="white" />
                      </TouchableOpacity>
                    );
                  },
                })}
                name="Explorer"
              >
                {() => <ExplorerScreen userToken={userToken} />}
              </Stack.Screen>

              <Stack.Screen
                options={{
                  headerStyle: {
                    backgroundColor: "#1FAD9E",
                  },
                }}
                name="Restaurant"
              >
                {() => <RestaurantScreen userToken={userToken} />}
              </Stack.Screen>
              <Stack.Screen
                options={({ navigation }) => ({
                  headerStyle: {
                    backgroundColor: "#9069CD",
                    color: "white",
                  },
                  headerRight: () => {
                    return (
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesome name="list-ul" size={24} color="white" />
                      </TouchableOpacity>
                    );
                  },
                })}
                name="Map"
                component={MapScreen}
              />
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome5 name="user" size={size} color={color} />;
            },
          }}
          name="Me"
        >
          {() => (
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: "#9069CD" },
                headerTitle: () => {
                  return (
                    <Image
                      source={require("./assets/happycow-logo-text.png")}
                      style={{ width: 120, height: 25 }}
                    />
                  );
                },
                headerTitleAlign: "center",
                headerBackTitleVisible: false,

                headerTintColor: "white",
              }}
            >
              {userToken === null ? (
                <>
                  <Stack.Screen name="LogIn">
                    {() => <LoginScreen handleIdToken={handleIdToken} />}
                  </Stack.Screen>
                  <Stack.Screen name="SignUp">
                    {() => <SignupScreen handleIdToken={handleIdToken} />}
                  </Stack.Screen>
                </>
              ) : (
                <>
                  <Stack.Screen name="Profile">
                    {() => (
                      <ProfileScreen
                        handleIdToken={handleIdToken}
                        userToken={userToken}
                        userId={userId}
                      />
                    )}
                  </Stack.Screen>

                  <Stack.Screen name="Favorites">
                    {() => <FavoritesScreen userToken={userToken} />}
                  </Stack.Screen>
                  <Stack.Screen
                    options={{
                      headerStyle: {
                        backgroundColor: "#1FAD9E",
                      },
                    }}
                    name="Restaurant"
                  >
                    {() => <RestaurantScreen userToken={userToken} />}
                  </Stack.Screen>
                </>
              )}
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          options={{
            tabBarLabel: "Plus",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="menu" size={size} color={color} />
            ),
          }}
          name="TabPlus"
        >
          {() => (
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: "#9069CD" },

                headerTitleStyle: { color: "white", fontWeight: "900" },
                headerTitleAlign: "center",
              }}
            >
              <Stack.Screen name="Plus">
                {() => <PlusScreen userId={userId} userToken={userToken} />}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
