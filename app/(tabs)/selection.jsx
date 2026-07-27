//linear graddient requires instalation of: npx expo install expo-linear-gradient
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { AppContext } from "../_layout";
import { globalStyles } from '../styles/globalStyles';

// const english = require('../../assets/flags/BritishFlag.webp');
import english from '../../assets/flags/BritishFlag.webp';
import french from '../../assets/flags/FrenchFlag.webp';
import german from '../../assets/flags/GermanFlag.webp';
import polish from '../../assets/flags/PolishFlag.webp';
import spanish from '../../assets/flags/SpanishFlag.webp';

import logo from '../../assets/logoVersion3.png';


export default function Selection() {

    const { selectedLangs, setSelectedLangs, modeOfTheBoard,  setModeOfTheBoard} = useContext(AppContext);
    //for some reason it does not like "!" like in index.tsx???!!!

    const [selected, setSelected] = useState(["english","spanish"]);
    const [mode, setMode] = useState(12);

    const [isSelected, setIsSelected] = useState([]);

    const flagMap = {
        english,
        french,
        german,
        polish,
        spanish
    };

    const router = useRouter();

    //displayin validation message with fade out effect
    const [validationMsg, setValidationMsg] = useState("");
    const [showMsg, setShowMsg] = useState(false);
    const [fade, setFade] = useState(false);
    const [msgKey, setMsgKey] = useState(0);
    useEffect(() => {
        if (!validationMsg) return;
        setShowMsg(true);
        setFade(false);
        const fadeTimer = setTimeout(() => {
            setFade(true);
        }, 2000); // small delay so CSS transition triggers
        const hideTimer = setTimeout(() => {
            setShowMsg(false);
        }, 6000);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(hideTimer);
        };
    }, [msgKey]); //[validationMsg][msgKey]

    function handleCheckboxChange(lang) {
        const value = lang;
        setSelected(prev =>
            prev.includes(value)
            ? prev.filter(v => v !== value)
            : [...prev, value]
        );
        //console.log(flagMap[lang]);
    }

    function handleX2() {
        if (selected.length !== 2) {
            setValidationMsg("For option 2x please select two flags");
            setMsgKey(prev => prev + 1); 
            return;
        }
            setSelectedLangs(selected);
            setModeOfTheBoard(Number(mode));     
            // navigate('/gameboard_x2', { }); //included in a button

            router.push({pathname: "./gameboard_x2"});
    }

    function handleX3() {
        if (selected.length !== 3) {
            setValidationMsg("For option 3x please select three flags");
            setMsgKey(prev => prev + 1); 
            return;
        }

        setSelectedLangs(selected);
        setModeOfTheBoard(Number(mode));

        router.push({pathname: "./gameboard_x3"});

    }

    function handleX4() {
        if (selected.length !== 4) {
            setValidationMsg("For option 4x please select four flags");
            setMsgKey(prev => prev + 1); 
            return;
        }

        setSelectedLangs(selected);
        setModeOfTheBoard(Number(mode));

        //router.push({pathname: "/finish",params: { moves, time }});
        router.push({pathname: "./gameboard_x4"});


    }

    

  return (
    // <View style={{flex:1, backgroundColor: "yellow",padding: 60}}>
      <ScrollView style={globalStyles.settingsContainer}>

        <View  style={{ marginLeft:-30, marginTop:60, marginBottom:100, flexDirection: "row", flexWrap: "wrap", justifyContent: 'center', alignItems: 'center'}}>
          <Link href="/" asChild>
            <Pressable>
                <Image resizeMode="contain" source={logo} style={{width:160, height:80 }} />
            </Pressable>
          </Link>

            <Text style={globalStyles.landingHeader}>Settings</Text>
        </View>

        {/* <View style={globalStyles.startBtn}>
          <Link href="/(tabs)/" asChild>
            <Pressable style={globalStyles.button} onPress={()=>{}}>
              <Text style={globalStyles.buttonText}>Back to Start</Text>
            </Pressable>
          </Link>
        </View> */}

        <View>

            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop:20, justifyContent: 'center', alignItems: 'center'}}>
            
                {/* <Link href="/(tabs)/gameboard_x2" asChild style={{marginTop:20, maxWidth:160, marginLeft:20, marginRight:20,}}> */}
                    <Pressable style={[globalStyles.button,{marginTop:20, maxWidth:160,  marginLeft:10, marginRight:10,}]} onPress={()=>{handleX2();}}>
                        <Text style={globalStyles.buttonText}>Game x2</Text>
                    </Pressable>
                {/* </Link> */}

                {/* <button onClick={handleX2}><Text>x2</Text></button> */}
                {/* <button onClick={handleX3} className="startBtn_x2x3x4"><Text>x3</Text></button>
                <button onClick={handleX4} className="startBtn_x2x3x4"><Text>x4</Text></button> */}


                {/* <Link href="/(tabs)/gameboard_x3" asChild style={{marginTop:20, maxWidth:160, marginLeft:20, marginRight:20,}}> */}
                    <Pressable style={[globalStyles.button,{marginTop:20, maxWidth:160,  marginLeft:10, marginRight:10,}]} onPress={()=>{handleX3();}}>
                        <Text style={globalStyles.buttonText}>Game x3</Text>
                    </Pressable>
                {/* </Link> */}

                {/* <Link href="/(tabs)/gameboard_x4" asChild style={{marginTop:20, maxWidth:160,  marginLeft:20, marginRight:20,}}> */}
                    <Pressable style={[globalStyles.button,{marginTop:20, maxWidth:160,  marginLeft:10, marginRight:10,}]} onPress={()=>{handleX4();}}>
                        <Text style={globalStyles.buttonText}>Game x4</Text>
                    </Pressable>
                {/* </Link> */}

            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop:60, justifyContent: 'center', alignItems: 'center'}}>
                {["english","spanish", "french", "polish", "german" ].map(lang => (  
                <Pressable key={lang} onPress={() => {handleCheckboxChange(lang); console.log(selected);}}>
                    <Image source={flagMap[lang]} style={{opacity: selected.includes(lang) ? 1 : 0.5, borderWidth:2, borderColor:"white", borderRadius:5, width: 60, height: 40, marginLeft:5, marginRight:5, }} />
                </Pressable>
                ))}
                
                 {/* <Image source={require("../../assets/flags/BritishFlag.webp")} />
                 <Image source={english} />
                 <Image source={flagMap["english"]}  style={{ width: 132, height: 132 }} /> */}
            </View>
            <View style={{ marginTop:30, marginBottom:30, justifyContent: 'center', alignItems: 'center',  }}>
                {showMsg && (
                <Text style={{color: "red", fontSize:20,}}>
                    {validationMsg}
                </Text>
                )}
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop:0, justifyContent: 'center', alignItems: 'center'}}>
                {[12, 24, 36].map(option => (
                // <label key={option} className={`mode-btn ${mode === option ? "active" : ""}`}>
                <Pressable  key={option} onPress={() => setMode(option)}>
                    <LinearGradient colors={["yellow", "orange"]} style={{opacity: mode === option ? 1 : 0.5, marginRight:10, marginLeft:10, justifyContent: 'center', alignItems: 'center', width: 80, height: 60, borderColor:"white", borderWidth: 2, borderRadius: 5,}}>
                            <Text style={{fontSize:24}}>{option}</Text>
                    </LinearGradient>
                </Pressable>
            ))}
            </View>


            {/* --------------------------------------------------------------------------  */}
            {/* {["english","spanish", "french", "polish", "german" ].map(lang => (
            <label key={lang}  className="image-selector">
                <input type="checkbox" value={lang} checked={selected.includes(lang)} onChange={handleCheckboxChange}/>
                <img src={flagMap[lang]} alt="" />
            </label>
            ))}

            
            {showMsg && (
            <Text className={`validMsg ${fade ? "fade-out" : ""}`}>
                {validationMsg}
            </Text>
            )}


            <View className="mode-selector">
            {["12", "24", "36"].map(option => (
                <label key={option} className={`mode-btn ${mode === option ? "active" : ""}`}>
                <input type="radio" name="mode" value={option} checked={mode === option} onChange={() => setMode(option)}/>
                <Text>{option}</Text>
                </label>
            ))}
            </View> */}
            {/* ---------------------------------------------------------- */}

         </View>

      </ScrollView>
  )
}


