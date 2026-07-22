// import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
// import { useState } from 'react';

export default function Card({item, id, handleClick, disabled}) {

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
                  // speak(item.text, item.lang)
                };
            };      }}>
          <Text style={[
          item.stat === "active" ? styles.unHideText : styles.hideText   ]}>
              {item.text}{item.icon}
          </Text>{/* {item.id} */}
        </Pressable>

      <Text>card</Text>
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
    maxWidth:120,
  },

  hideText: {
    opacity: 0.5,
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