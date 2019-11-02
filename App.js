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

function Separator() {
  return <View style={styles.separator} />;
}
class SignInScreen extends React.Component {
  static navigationOptions = {
    title: "Please sign in"
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("App");
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "귤가다에 오신 것을 환영합니다"
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="앱  이용하기" onPress={this._showMoreApp} />
        <Separator />
        <Button title="로그아웃" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

class OtherScreen extends React.Component {
  state = {
    value: ""
  };
  static navigationOptions = {
    title: "성명을 입력하세요"
  };

  storeData = async () => {
    try {
      await AsyncStorage.setItem("NAME", this.state.value);
    } catch (e) {
      console.log(e);
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem("NAME");
      if (value !== null) {
        console.log("Before Sending Name.... ", value);
      }
    } catch (e) {
      console.log(e);
    }
  };
  onChangeText = async text => {
    this.setState({ value: text });
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            width: 100,
            borderWidth: 1
          }}
          keyboardType="email-address"
          onChangeText={text => this.onChangeTextTitle(text)}
        />
        <Button title="입력" onPress={this._phoneNumberApp} />
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _phoneNumberApp = async () => {
    console.log("input value is ", this.state.value);
    await this.storeData();
    await this.getData();
    data = {
      name
    };
    const name = await axios.get("http://70.12.227.203:4000", {
      params: {
        name: this.state.value
      }
    });
    console.log(name);
    await this.props.navigation.navigate("Number");
  };
}

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
  Number: NumberScreen
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
