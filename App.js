import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";
import { TextInput } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as axios from "axios";
import SignInScreen from "./components/SignInScreen";
import HomeScreen from "./components/HomeScreen";
import OtherScreen from "./components/OtherScreen";
import UploadGongGoScreen from "./components/UploadGongGoScreen";

class NumberScreen extends React.Component {
  state = {
    value: "전화번호"
  };

  static navigationOptions = {
    title: "전화번호를 입력하세요"
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.halfContainer}>
          <Text style={styles.title}>휴대폰 번호를 입력해주세요</Text>
          <Text style={styles.subtitle}>휴대폰 번호</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="phone-pad"
            placeholder="하이픈(-) 없이 입력해주세요."
          ></TextInput>
        </View>
      </View>
    );
  }
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
    marginBottom: 30,
    textAlign: "left"
  },
  subtitle: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 15,
    textAlign: "left",
    marginBottom: 10
  },
  textInput: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    fontSize: 23
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Other: OtherScreen,
  Number: NumberScreen,
  UploadGongGo: UploadGongGoScreen
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
