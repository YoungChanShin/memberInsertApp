import React, { Component } from "react";
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
import Calender from "./Calender";

function Separator() {
  return <View style={styles.separator} />;
}

export default class UploadGongGoScreen extends Component {
  render() {
    return (
      <>
        <Calender />
      </>
    );
  }
}
