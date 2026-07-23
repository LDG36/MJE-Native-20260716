import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  settingsContainer: {
    backgroundColor: "orange",
    height:2000,
    // animation: slowFocus 1s linear;
  },
  landingHeader: {
    fontSize:48, 
    textAlign:'center',
    marginTop:50,
    color:'#ffffff',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
  },
  stylePara: {

    marginLeft:"auto",
    marginRight:"auto",
    
  },
  funContainer: {

        // paddingTop:60,
    padding:20,
    marginTop:60,
    maxWidth:900,
    marginLeft:50,
    marginRight:50,
    backgroundColor: 'white',
    borderWidth:3,
    borderColor:'black',

  },
  startBtn: {
    paddingTop:60,
    minWidth:300,
    marginLeft:'auto',
    marginRight:'auto',
  },
  button: {
    // backgroundColor: '#3498db',
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

});