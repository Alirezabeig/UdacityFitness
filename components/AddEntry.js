import React, {Component} from "react";
import {View, Text, Platform, StyleSheet} from "react-native";
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from "../utils/helpers";
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import DateHeader from './DateHeader';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import {connect } from 'react-redux'
import {addEntry} from '../actions'
import { white, purple } from "../utils/colors";




function SubmitBtn ({onPress}) { 
    return (
        <TouchableOpacity
            style={Platform.OS ==='ios' ? styles.iosSubmitBtn :styles.androidSubmitBtn }
            onPress= {onPress}>
                <Text style={styles.submitBtnText}>
                    Submit
                </Text>
                
            </TouchableOpacity>
    )
}

class AddEntry extends Component {
    state= {
        run:0,
        bike:0,
        swim:0,
        sleep:0,
        eat:0,
    }

    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)
    
        this.setState((state) => {
          const count = state[metric] + step
    
          return {
            ...state,
            [metric]: count > max ? max : count,
        }
        })
    }
    
    decrement = (metric) => {
        this.setState((state) => {
          const count = state[metric] - getMetricMetaInfo(metric).step
    
          return {
            ...state,
            [metric]: count < 0 ? 0 : count,
      }
    })
  }

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }


slide = ( metric, value) =>{
    this.setState(()=>({
        [metric]:value,
    }))
}

submit =() => {
    const key = timeToString()
    const entry =this.state

    this.props.dispatch(addEntry({
        [key]:entry

    }))

    this.setState(()=>({

        run:0,
        bike:0,
        swim:0,
        sleep:0,
        eat:0,
    }))
    //update redux 
    //Navigate to home 
    //save to database

    submitEntry({ key, entry })
    // clear local notification 


}

reset =()=> {
    const key = timeToString()
    this.props.dispatch(addEntry({
        [key]: getDailyReminderValue()
    }))
    removeEntry(key)
}

    render (){
        const metaInfo = getMetricMetaInfo()

        if (this.props.alreadylogged){

            return (
                <View style={styles.center}>
                    <Ionicons 
                    name="ios-happy"
                    size={100} 
                    />
                    <Text>Alraedy logged in today's information</Text>
                    <TextButton onPress={this.reset}>Reset</TextButton>
                </View>
        )   
    }

        return (
            <View style={styles.container}>
                <DateHeader date ={(new Date()).toLocaleDateString()}/>
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]

                    return (
                            <View key={key} style={styles.row}>
                            {getIcon()}

                            {type === 'slider'
                                ? <UdaciSlider
                                    value={value}
                                    onChange={(value) => this.slide(key, value)}
                                    {...rest}
                                    />
                                : <UdaciStepper
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                    />}
                            </View>     
                    )
    })}

    <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:white,
    },
    row: {
        flexDirection:'row',
        alignItems:'center',
        flex:1,

    },

    iosSubmitBtn:{
        backgroundColor:purple,
        padding:10,
        borderRadius:7,
        height:45,
        marginLeft:40,
        marginRight:40,
    },
    androidSubmitBtn:{},
    submitBtnText:{
        color:white,
        fontSize:22,
        textAlign:"center"
    },
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginRight:30,
        marginLeft:30,
    }
    

})


function mapStateToProps (state){
    const key = timeToString()

    return {
        alreadylogged: state[key] && typeof state[key].today ==='undefined'
    }
}


export default connect(mapStateToProps) (AddEntry)