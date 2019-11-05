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
export default class SignInScreen extends React.Component {
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
