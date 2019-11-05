//This is an example of Calender//
import React, { Component } from "react";
//import react in our code.
import { StyleSheet, Text, View } from "react-native";
//import all the components we are going to use.
import CalendarPicker from "react-native-calendar-picker";
//import CalendarPicker from the package we installed
function getMonth(monthStr) {
  return new Date(monthStr + "-1-01").getMonth() + 1;
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //set value in state for start and end date
      selectedStartDate: null,
      selectedEndDate: null
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    //function to handle the date change
    if (type === "END_DATE") {
      var EndDate = date.toString();
      var formatedData1 = EndDate.split(" ");
      //console.log(formatedData);
      var Date2 =
        getMonth(formatedData1[1]) +
        "-" +
        formatedData1[2] +
        "-" +
        formatedData1[3];
      console.log(Date2);
      this.setState({
        selectedEndDate: Date2
      });
    } else {
      var StartDate = date.toString();
      var formatedData = StartDate.split(" ");
      //console.log(formatedData);
      var Date1 =
        getMonth(formatedData[1]) +
        "-" +
        formatedData[2] +
        "-" +
        formatedData[3];
      console.log(Date1);
      this.setState({
        selectedStartDate: Date1,
        selectedEndDate: null
      });
    }
  }

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Min date
    const maxDate = new Date(2050, 6, 3); // Max date
    const startDate = selectedStartDate ? selectedStartDate : ""; //Start date
    const endDate = selectedEndDate ? selectedEndDate : ""; //End date

    return (
      <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          weekdays={["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]}
          months={[
            "January",
            "Febraury",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ]}
          previousTitle="Previous"
          nextTitle="Next"
          todayBackgroundColor="#e6ffe6"
          selectedDayColor="#66ff33"
          selectedDayTextColor="#000000"
          scaleFactor={375}
          textStyle={{
            fontFamily: "Cochin",
            color: "#000000"
          }}
          onDateChange={this.onDateChange}
        />

        <View style={{ padding: 16 }}>
          <Text style={{ padding: 16 }}>SELECTED START DATE :</Text>
          <Text style={{ padding: 16 }}>{startDate}</Text>
          <Text style={{ padding: 16 }}>SELECTED END DATE : </Text>
          <Text style={{ padding: 16 }}>{endDate}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 100
  }
});
