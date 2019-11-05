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
export default class OtherScreen extends React.Component {
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
          onChangeText={text => this.onChangeText(text)}
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
