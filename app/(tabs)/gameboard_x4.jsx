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

export default function Gameboard_x4() {

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

      const freshItems = generateMultilingualLevel(selectedLangs ,levelcounter, (modeOfTheBoard/4));
      setItems(freshItems);

    }, [levelcounter, totalLevels]);  //OLD: [levelcounter, totalLevels, navigate]);
    
    function vanishCheck(id)
    {
        const statExist = items[id].stat.includes('vanish');
        return statExist;
    }

    const [prevprevprev, setPrevprevprev] = useState(-1);
    const [prevprev, setPrevprev] = useState(-2);
    const [prev, setPrev] = useState(-3);
    const [disabled, setDisabled] = useState(false);
    const [moves, setMoves] = useState(0);

    function checkFour(current)
          {
              setDisabled(true);  
    
              if(items[current].id == items[prev].id && items[current].id == items[prevprev].id && items[current].id == items[prevprevprev].id )
              {
                
                items[current].stat = "correct";
                items[prevprev].stat = "correct";
                items[prev].stat = "correct";
                items[prevprevprev].stat = "correct";
                setItems([...items])            
    
                setTimeout(()=>{
                  items[current].stat = "vanish"
                  items[prevprev].stat = "vanish"
                  items[prev].stat = "vanish"
                  items[prevprevprev].stat = "vanish"
                  setItems([...items])
                  setPrev(-3)
                  setPrevprev(-2)
                  setPrevprevprev(-1)
    
                  //important code - level finish
                  if (items.every(item => item.stat.includes("vanish"))) {
                  navigate('/nextboard_x4', {state: {moves, time} });
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
                items[prevprevprev].stat = "wrong"
                setItems([...items])
    
                setTimeout(()=>{
                    items[current].stat = ""
                    items[prevprev].stat = ""
                    items[prev].stat = ""
                    items[prevprevprev].stat = ""
                    setItems([...items])
                    setPrev(-3)
                    setPrevprev(-2)
                    setPrevprevprev(-1)
                    setDisabled(false); 
                },3000)
              }
            }

        function handleClick(id){
                if((!vanishCheck(id))){
                  if(prev == -3)
                  {    
                    items[id].stat = 'active'
                    setItems([...items])
                    setPrev(-2);
                    setPrevprev(-1);
                    setPrevprevprev(id);
                    // startTimer();
                    
                  }
                  else if(prev == -2)
                  {
                    if(id === prevprevprev){return}
    
                    items[id].stat = 'active'
                    setItems([...items])
                    setPrev(-1);
                    setPrevprev(id);
                    
                  }
                  else if(prev == -1)
                  {

                    if(id === prevprev || id === prevprevprev){return}
    
                    items[id].stat = 'active'
                    setItems([...items])
                    setPrev(id);

                  }
                  else{
    
                    if(id === prev || id === prevprev || id === prevprevprev ){return}
    
                    setMoves(moves+1);
                    //items[id].stat = 'card3'
                    checkFour(id);
                    
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