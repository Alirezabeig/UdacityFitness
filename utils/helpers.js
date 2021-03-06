// utils/helpers.js
import React from "react";
import {View, StyleSheet} from "react-native"
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import {white, red, orange, blue, lightPurp, pink} from './colors'

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
})

export function getMetricMetaInfo(metric){
    const info = {
        run : {
            displayName: "Run",
            max: 50,
            unti: "miles",
            step:1,
            type:"steppers",
            getIcon(){
                return (
                    <View style={[styles.iconContainer, {backgroundColor: red}]}>
                        <MaterialIcons 
                        name ="directions-run" 
                        color="white" 
                        size={35}/>
                    </View>
                );
            }
    },

    bike : {
        displayName: "bike",
        max: 100,
        unti: "miles",
        step:1,
        type:"steppers",
        getIcon(){
            return (
                <View style={[styles.iconContainer, {backgroundColor: orange}]}>
                    <MaterialCommunityIcons 
                    name ="bike" 
                    color="white" 
                    size={32}/>
                </View>
            );
        
    }
},

swim : {
    displayName: "Swim",
    max: 9900,
    unti: "meters",
    step:1,
    type:"steppers",
    getIcon(){
        return (
            <View style={[styles.iconContainer, {backgroundColor: blue}]}>
                <MaterialCommunityIcons
                name ="swim" 
                color="white" 
                size={35}/>
            </View>
        );
    
}
},


sleep : {
    displayName: "Swim",
    max: 24,
    unti: "hours",
    step:0.5,
    type:"slider",
    getIcon(){
        return (
            <View style={[styles.iconContainer, {backgroundColor: lightPurp}]}>
                <FontAwesome 
                name ="bed" 
                color="white" 
                size={30}/>
            </View>
            );
    
        }
    },

    eat : {
        displayName: "Eat",
        max: 10,
        unti: "rating",
        step:1,
        type:"slider",
        getIcon(){
            return (
                <View style={[styles.iconContainer, {backgroundColor: pink}]}>
                    <MaterialCommunityIcons 
                    name ="food" 
                    color="white" 
                    size={30}/>
                </View>
                );
        
            }
        }

};

return typeof metric === "undefined" 
    ? info
    : info[metric];
}

export function isBetween (num, x, y) {
    if (num >= x && num <= y) {
      return true;
    }
  
    return false;
  }
  
  export function calculateDirection (heading) {
    let direction = "";
  
    if (isBetween(heading, 0, 22.5)) {
      direction = "North";
    } else if (isBetween(heading, 22.5, 67.5)) {
      direction = "North East";
    } else if (isBetween(heading, 67.5, 112.5)) {
      direction = "East";
    } else if (isBetween(heading, 112.5, 157.5)) {
      direction = "South East";
    } else if (isBetween(heading, 157.5, 202.5)) {
      direction = "South";
    } else if (isBetween(heading, 202.5, 247.5)) {
      direction = "South West";
    } else if (isBetween(heading, 247.5, 292.5)) {
      direction = "West";
    } else if (isBetween(heading, 292.5, 337.5)) {
      direction = "North West";
    } else if (isBetween(heading, 337.5, 360)) {
      direction = "North";
    } else {
      direction = "Calculating";
    }
  
    return direction;
  }
  

  export function getDailyReminderValue () {
    return {
      today: "👋 Don't forget to log your data today!"
    }
  }
  export function timeToString (time = Date.now()) {
    const date = new Date(time);
    const todayUTC = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return todayUTC.toISOString().split('T')[0];
  }

  