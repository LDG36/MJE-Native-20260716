import { Link } from "expo-router";
import { useContext } from "react";
import { Pressable, ScrollView, Text, View } from 'react-native';
import { AppContext } from "../_layout";
import { globalStyles } from '../styles/globalStyles';


export default function HomeScreen() {

  const { levelcounter3, setLevelcounter3 } = useContext(AppContext)!;
  //added "!" (quick fix) it is for the states to not be null (I do not etirely understand that)
  //everything works but this solution removes a red highlight on levelcounter3...

  return (
    // <View style={{flex:1, backgroundColor: "yellow",padding: 60}}>
    <View>
      <ScrollView style={globalStyles.settingsContainer}>
        <Text style={globalStyles.landingHeader}>Play & Learn Languages Faster</Text>
        <View style={globalStyles.stylePara}>
          <View style={globalStyles.funContainer}>
            <Text style={{fontSize:24, textAlign:'center'}}>
                This is a Google Play moblie app (MJE) by Lukasz Galik as part of Honours Project at Edinburgh Napier University.
                It is an easy way to learn languages subconsciously. Learn languages on your mobile device even abroad, 
                traveling by train or plane - offline!
            </Text>

          </View>
        </View>
        <View style={globalStyles.startBtn}>
          <Link href="/(tabs)/selection" asChild>
            <Pressable style={globalStyles.button} onPress={()=>{setLevelcounter3(0)}}>
              <Text style={globalStyles.buttonText}>START</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}

// const styles = StyleSheet.create({
//   settingsContainer: {
//     backgroundColor: "orange"
//     // animation: slowFocus 1s linear;
//   },
//   landingHeader: {
//     fontSize:48, 
//     textAlign:'center',
//     marginTop:50,
//     color:'#ffffff',
//     textShadowColor: 'black',
//     textShadowOffset: { width: 2, height: 2 },
//   },
//   stylePara: {
//     // paddingTop:60,
//     padding:20,
//     marginTop:60,
//     maxWidth:900,
//     marginLeft:'auto',
//     marginRight:'auto',
//     backgroundColor: 'white',
//     borderWidth:3,
//     borderColor:'black',
    
    
//   },
//   funContainer: {

//   },
//   startBtn: {
//     paddingTop:60,
//     minWidth:300,
//     marginLeft:'auto',
//     marginRight:'auto',
//   },
//   button: {
//     // backgroundColor: '#3498db',
//     backgroundColor: 'green',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },

// });
