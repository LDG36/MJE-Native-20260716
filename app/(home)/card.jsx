// import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
// import { useState } from 'react';
import { Dimensions } from "react-native";
const CARD_SIZE = (Dimensions.get("window").width / 3)-20; //this loads the window size only at the start!!!
//const { width } = useWindowDimensions();    <=causes crash sth about hooks...
//const DYN_CARD_SIZE = width / 3;
import * as Speech from 'expo-speech';

const langMap = {
  polish: "pl-PL",
  spanish: "es-ES",
  german: "de-DE",
  english: "en-US",
  french: "fr-FR"
};

export default function Card({item, id, handleClick, disabled}) {

  let speakTimeout = null;
  const speak = (message, lang) => {
    // Cancel any pending speech
    if (speakTimeout) {
      clearTimeout(speakTimeout);
      speakTimeout = null;
    }

    // Stop any currently speaking voice
    Speech.stop();

    speakTimeout = setTimeout(() => {
      // Convert your custom language → real locale code
      const langCode = langMap[lang] || "en-US";

      Speech.speak(message, {
        language: langCode,
        pitch: 1.0,
        rate: 1.0,
      });
    }, 50);
  };

  return (
    <View>
        <Pressable style={[
              styles.card,
              item.stat === "active" && styles.active,
              item.stat === "wrong" && styles.wrong,
              item.stat === "correct" && styles.correct,
              item.stat === "vanish" && styles.vanish,
        ]} onPress={()=>{
            if(!disabled)
            {
                handleClick(id);
                
                if(!item.stat.includes("vanish"))
                {
                   speak(item.text, item.lang)
                   //speak(item.text, "polish")

                };
            };      }}>
          <Text style={[
              item.stat === "active" ? styles.unHideText : styles.hideText,
              item.stat === "wrong" && styles.unHideText,
              item.stat === "correct" && styles.unHideText,   ]}>
              {item.text}{item.icon}
          </Text>{/* {item.id} */}
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight:40,
    //maxWidth:120,
    //width: "33%",
    width:CARD_SIZE,
    //width:DYN_CARD_SIZE,
    height:60,
    // aspectRatio: 8,
    // margin: 5,
  },

  hideText: {
    opacity: 0,
  },

// .card span{
//   opacity:0;
// }

  //maybe it is enough to put it in an active class?
  unHideText: {
    opacity: 1,
  },

// .card.active>span{
//   opacity:100;
// }

  active: {
    backgroundColor: 'orange',
  },

// .card.active{
//   background-color: orange;
// }

  wrong: {
    backgroundColor: 'red',
    opacity: 1,
    color: 'black',
  },

// .card.wrong{
//   background-color: red;
// }

  correct: {
    backgroundColor: 'greenyellow',
  },

// .card.correct{
//   background-color: greenyellow;
// }

  vanish: {
    opacity:0,
  },

// .card.vanish{
//   opacity:0;
// }

 })


//  const styles = StyleSheet.create({

//   card: {
//     backgroundColor: "white",
//     borderRadius: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     maxHeight:40,
//     maxWidth:120,
//   },

//   hideText: {
//     opacity: 0.5,
//   },

//   unHideText: {
//     opacity: 1,
//   },

//   active: {
//     backgroundColor: 'orange',
//   },

//   wrong: {
//     backgroundColor: 'red',
//   },

//   correct: {
//     backgroundColor: 'greenyellow',
//   },

//   vanish: {
//     opacity:0,
//   },

//  })