import { Pressable, StyleSheet, Text, View } from 'react-native';
//import React from 'react'
import { Link } from "expo-router";
import { useContext } from "react";
import { AppContext } from "../_layout";
import { globalStyles } from '../styles/globalStyles';


    const formatTime = (ms) => 
    {
      const minutes = Math.floor(ms / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);
      // const milliseconds = ms % 1000;
      const hundredths = Math.floor((ms % 1000) / 10);


      return (
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(hundredths).padStart(2, "0")
        );
    };

export default function Finish() {

        const { levelcounter3, setLevelcounter3, selectedLangs,
         setSelectedLangs, modeOfTheBoard,  setModeOfTheBoard} = useContext(AppContext);

  return (
    // <View>
    //     <button className="backToStartBtnFinish"  onClick={() => {setLevelcounter3(0); navigate('/') }}>
    //         Completed - Back to Start
    //     </button>
    // </View>
    <View style={globalStyles.startBtn}>
        <Link href="/(tabs)/" asChild>
        <Pressable style={globalStyles.button} onPress={()=>{setLevelcounter3(0)}}>
            <Text style={globalStyles.buttonText}>Completed - Back to Start</Text>
        </Pressable>
        </Link>
    </View>
  )
}

const styles = StyleSheet.create({})