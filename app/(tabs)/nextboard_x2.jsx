import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
//import React from 'react'
import { AppContext } from "../_layout";
// import { globalStyles } from '../styles/globalStyles';
import { Link, useRouter } from "expo-router";
//import { useContext, useState } from "react";
import { useContext } from "react";
import { globalStyles } from '../styles/globalStyles';

export default function Nextboard_x2() {

    //Need to move that to REDUX!!!
    const { levelcounter3, setLevelcounter3, selectedLangs,
         setSelectedLangs, modeOfTheBoard,  setModeOfTheBoard, refreshKey, setRefreshKey} = useContext(AppContext);

    const router = useRouter();

  return (
    <ScrollView>
        {/* A Bug here!!!!!!!!!!! the repeat level does not load!!!!!!! */}
        <View style={globalStyles.startBtn}>
            <Link href="./gameboard_x2" asChild>
            <Pressable style={globalStyles.button} onPress={()=>{[setLevelcounter3(levelcounter3), setRefreshKey(prev => prev + 1) ]}}>
                <Text style={globalStyles.buttonText}>Repeat</Text>
            </Pressable>
            </Link>
        </View>
        <View style={globalStyles.startBtn}>
            <Link href="./gameboard_x2" asChild>
            <Pressable style={globalStyles.button} onPress={()=>{setLevelcounter3(prev => prev + 1)}}>
                <Text style={globalStyles.buttonText}>Play Next</Text>
            </Pressable>
            </Link>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})