import { Link } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
//import React from 'react'
import { AppContext } from "../_layout";
// import { globalStyles } from '../styles/globalStyles';
import { useRouter } from "expo-router";
import { useContext } from "react";

import logo from '../../assets/logoVersion3.png';

export default function Nextboard_x4() {

    //Need to move that to REDUX!!!
    const { levelcounter3, setLevelcounter3, selectedLangs,
         setSelectedLangs, modeOfTheBoard,  setModeOfTheBoard, refreshKey, setRefreshKey} = useContext(AppContext);

    const router = useRouter();

  return (
    <ScrollView style={{backgroundColor: "orange",}}>
        <View  style={{ marginLeft:-30, marginTop:60, marginBottom:100, flexDirection: "row", flexWrap: "wrap", justifyContent: 'center', alignItems: 'center'}}>
            <Link href="/" asChild>
                <Pressable>
                    <Image resizeMode="contain" source={logo} style={{width:160, height:80 }} />
                </Pressable>
            </Link>

            <Text style={globalStyles.landingHeader}>NextGame x4</Text>
        </View>
        <View style={globalStyles.startBtn}>
            <Link href="./gameboard_x4" asChild>
            <Pressable style={globalStyles.button} onPress={()=>{[setLevelcounter3(levelcounter3), setRefreshKey(prev => prev + 1)]}}>
                <Text style={globalStyles.buttonText}>Repeat</Text>
            </Pressable>
            </Link>
        </View>
        <View style={globalStyles.startBtn}>
            <Link href="./gameboard_x4" asChild>
            <Pressable style={globalStyles.button} onPress={()=>{setLevelcounter3(prev => prev + 1)}}>
                <Text style={globalStyles.buttonText}>Play Next</Text>
            </Pressable>
            </Link>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})