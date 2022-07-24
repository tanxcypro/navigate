import React from "react";
import { Button } from "react-native";
import {
  NavigationContainer,
  DrawerActions,
  getFocusedRouteNameFromRoute
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LandingScreen from "./src/Landing/LandingScreen";
import HomeScreen from "./src/Home/HomeScreen";
import SignInScreen from "./src/SignIn/SignInScreen";
import SignUpScreen from "./src/SignUp/SignUpScreen";
import PasswordForgotScreen from "./src/ForgotPassword/PasswordForgotScreen";
import Account from "./src/Account/AccountScreen";
import PasswordChangeScreen from "./src/PasswordChange/PasswordChangeScreen";
import AdminScreen from "./src/Admin/AdminScreen";
import ProfileScreen from "./src/Profile/ProfileScreen";

const RootStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
const HomeDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="Password Forget" component={PasswordForgotScreen} />
      <Drawer.Screen name="Password Change" component={PasswordChangeScreen} />
      <Drawer.Screen name="Admin" component={AdminScreen} />
    </Drawer.Navigator>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleSignIn = () => {
    //TODO implement real sign in mechanism

    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    //TODO implement real sign out mechanism

    setIsAuthenticated(false);
  };

  const handleSignUp = () => {
    setIsAuthenticated(true);
  };
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {isAuthenticated ? (
          <RootStack.Screen
            name="Home"
            component={HomeDrawer}
            options={({ route, navigation }) => ({
              headerTitle: getFocusedRouteNameFromRoute(route),
              headerLeft: () => (
                <Button
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                  title="Menu"
                />
              ),
              headerRight: () => (
                <Button onPress={handleSignOut} title="Sign Out" />
              )
            })}
          />
        ) : (
          <>
            <RootStack.Screen
              name="Landing"
              component={LandingScreen}
              options={{
                animationTypeForReplace: "pop"
              }}
            />
            <RootStack.Screen name="Sign In">
              {(props) => <SignInScreen {...props} onSignIn={handleSignIn} />}
            </RootStack.Screen>
            <RootStack.Screen name="Sign Up">
              {(props) => <SignUpScreen {...props} onSignUp={handleSignUp} />}
            </RootStack.Screen>

            <RootStack.Screen
              name="Password Forget"
              component={PasswordForgotScreen}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
