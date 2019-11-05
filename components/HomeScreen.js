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
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "귤가다에 오신 것을 환영합니다"
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="공고를 올리자" onPress={this._uploadgonggo} />
        <Separator />
        <Button title="앱  이용하기" onPress={this._showMoreApp} />
        <Separator />
        <Button title="로그아웃" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };
  _uploadgonggo = () => {
    this.props.navigation.navigate("UploadGongGo");
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
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
