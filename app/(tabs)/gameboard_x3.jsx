import { StyleSheet, View } from 'react-native';
//import React from 'react'
import { ScrollView } from 'react-native';
// import React from 'react';
//import { useRef } from 'react';
import { useEffect, useState } from 'react';
import levelsData from "../../data/levels_x18.json";
import { AppContext } from "../_layout";
// import { globalStyles } from '../styles/globalStyles';
import { useContext } from "react";
import { Dimensions } from "react-native";
import Card from './card';
const SCREEN_SIZE = (Dimensions.get("window").width)-20;

export default function Gameboard_x3() {

    //Need to move that to REDUX!!!
    const { levelcounter3, setLevelcounter3, selectedLangs,
         setSelectedLangs, modeOfTheBoard,  setModeOfTheBoard} = useContext(AppContext);
    const levelcounter = levelcounter3;

    const firstLang = Object.keys(levelsData)[0];
    const totalLevels = Object.keys(levelsData[firstLang]).length;

    const getTotalLevels = () => {
      const firstLang = Object.keys(levelsData || {})[0];
      return firstLang
        ? Object.keys(levelsData[firstLang] || {}).length
        : 0;
    };

    const [items, setItems] = useState([]);

    //generating mixed limited lang but according to id's
    const generateMultilingualLevel = (languages, levelcounter, limitPerLanguage) => {
      const ids = levelsData[languages[0]][levelcounter].map(item => item.id);
      const shuffledIds = [...ids].sort(() => Math.random() - 0.5);
      const selectedIds = shuffledIds.slice(0, limitPerLanguage);
      const combined = languages.flatMap(lang => {
        const items = levelsData[lang][levelcounter];
        const limited = items.filter(item => selectedIds.includes(item.id));
        return limited.map(item => ({
          ...item, lang
        }));
      });
      return combined.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {

      if (levelcounter >= getTotalLevels()) {
        //   navigate("/finish", {state: {moves, time}});
      router.push({pathname: "/finish",params: { moves, time }});
      return;
      }

      const freshItems = generateMultilingualLevel(selectedLangs ,levelcounter, (modeOfTheBoard/3));
      setItems(freshItems);

    }, [levelcounter, totalLevels]);  //OLD: [levelcounter, totalLevels, navigate]);
    
    function vanishCheck(id)
    {
        const statExist = items[id].stat.includes('vanish');
        return statExist;
    }

    const [prevprev, setPrevprev] = useState(-1);
    const [prev, setPrev] = useState(-2);
    const [disabled, setDisabled] = useState(false);
    const [moves, setMoves] = useState(0);

    function checkThree(current)
          {
              setDisabled(true);  
    
              if(items[current].id == items[prev].id && items[current].id == items[prevprev].id )
              {
                
                items[current].stat = "correct";
                items[prevprev].stat = "correct";
                items[prev].stat = "correct";
                setItems([...items])            
    
                setTimeout(()=>{
                  items[current].stat = "vanish"
                  items[prevprev].stat = "vanish"
                  items[prev].stat = "vanish"
                  setPrev(-2),
                  setPrevprev(-1)
    
                  //important code - level finish
                  if (items.every(item => item.stat.includes("vanish"))) {
                  //navigate('/nextboard', {state: {moves, time, levelcounter} });
                  navigate('/nextboard_x3', {state: {moves, time} });
                //   stopTimer();
                //   resetTimer();
                  }
    
                  setDisabled(false); 
                },2000)
              }
              else{
                items[current].stat = "wrong";
                items[prevprev].stat = "wrong";
                items[prev].stat = "wrong";
                setItems([...items])
    
                setTimeout(()=>{
                    items[current].stat = ""
                    items[prevprev].stat = ""
                    items[prev].stat = ""
                    setPrev(-2),
                    setPrevprev(-1)
                    setDisabled(false); 
                },3000)
              }
          }

        function handleClick(id){
                if((!vanishCheck(id))){
                  if(prev == -2)
                  {    
                    items[id].stat = 'active'
                    setItems([...items])
                    setPrev(-1);
                    setPrevprev(id);
                    // startTimer();
                    
                  }
                  else if(prev == -1)
                  {
                    if(id === prevprev){return}
    
                    items[id].stat = 'active'
                    setItems([...items])
                    setPrev(id);
                    
                  }
                  else{
    
                    if(id === prev || id === prevprev){return}
    
                    setMoves(moves+1);
                    //items[id].stat = 'card3'
                    checkThree(id);
                    
                  }
                }
          }
    

  return (
    // <ScrollView style={globalStyles.settingsContainer}>  margin:5
    <ScrollView style={{backgroundColor:"orange"}}>
        <View style={[styles.grid,{marginTop:100}]}>

            {items.map((item, index) => (

            <Card 
            key={index} 
            item={item} 
            id={index} 
            handleClick={handleClick} 
            disabled={disabled}
            />

            ))}

        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    grid: {
    //flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    // marginRight:40,
    // marginLeft:40,
    //maxWidth:"SCREEN_SIZE",
  },
})