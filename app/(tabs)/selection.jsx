import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from 'react-native';
import { AppContext } from "../_layout";
import { globalStyles } from '../styles/globalStyles';
//import { useRouter } from "expo-router";

// const english = require('../../assets/flags/BritishFlag.webp');
import english from '../../assets/flags/BritishFlag.webp';
import french from '../../assets/flags/FrenchFlag.webp';
import german from '../../assets/flags/GermanFlag.webp';
import polish from '../../assets/flags/PolishFlag.webp';
import spanish from '../../assets/flags/SpanishFlag.webp';

export default function Selection() {

    const { selectedLangs, setSelectedLangs, modeOfTheBoard,  setModeOfTheBoard} = useContext(AppContext);
    //for some reason it does not like "!" like in index.tsx???!!!

    const [selected, setSelected] = useState(["english","spanish","german","polish"]);
    const [mode, setMode] = useState(12);

    const flagMap = {
        english,
        french,
        german,
        polish,
        spanish
    };

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

    function handleCheckboxChange(e) {
        const value = e.target.value;
        setSelected(prev =>
            prev.includes(value)
            ? prev.filter(v => v !== value)
            : [...prev, value]
        );
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
    }

    function handleX3() {
        if (selected.length !== 3) {
            setValidationMsg("For option 3x please select three flags");
            setMsgKey(prev => prev + 1); 
            return;
        }

        setSelectedLangs(selected);
        setModeOfTheBoard(Number(mode));

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
        //router.push({pathname: "/(tabs)/gameboard_x4"});


    }



  return (
    // <View style={{flex:1, backgroundColor: "yellow",padding: 60}}>
    <View>
      <ScrollView style={globalStyles.settingsContainer}>
        <Text style={globalStyles.landingHeader}>Settings</Text>

        <View style={globalStyles.startBtn}>
          <Link href="/(tabs)/" asChild>
            <Pressable style={globalStyles.button} onPress={()=>{alert(english, polish, french, german, spanish)}}>
              <Text style={globalStyles.buttonText}>Back to Start</Text>
            </Pressable>
          </Link>
        </View>

        <View>

            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop:60, justifyContent: 'center', alignItems: 'center'}}>
            
                <Link href="/(tabs)/gameboard_x2" asChild style={{marginTop:20, maxWidth:160, marginLeft:20, marginRight:20,}}>
                    <Pressable style={globalStyles.button} onPress={()=>{handleX2();}}>
                        <Text style={globalStyles.buttonText}>Game x2</Text>
                    </Pressable>
                </Link>

                {/* <button onClick={handleX2}><Text>x2</Text></button> */}
                {/* <button onClick={handleX3} className="startBtn_x2x3x4"><Text>x3</Text></button>
                <button onClick={handleX4} className="startBtn_x2x3x4"><Text>x4</Text></button> */}


                <Link href="/(tabs)/gameboard_x3" asChild style={{marginTop:20, maxWidth:160, marginLeft:20, marginRight:20,}}>
                    <Pressable style={globalStyles.button} onPress={()=>{handleX3();}}>
                        <Text style={globalStyles.buttonText}>Game x3</Text>
                    </Pressable>
                </Link>

                <Link href="/(tabs)/gameboard_x4" asChild style={{marginTop:20, maxWidth:160,  marginLeft:20, marginRight:20,}}>
                    <Pressable style={globalStyles.button} onPress={()=>{handleX4();}}>
                        <Text style={globalStyles.buttonText}>Game x4</Text>
                    </Pressable>
                </Link>

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
    </View>
  )
}


