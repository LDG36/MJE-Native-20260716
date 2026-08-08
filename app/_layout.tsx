import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { createContext, useState } from "react";
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

//This only works with default Android navigation (triangle, circle, square) not a development bottom nav
//  import * as NavigationBar from "expo-navigation-bar";
//  NavigationBar.setVisibilityAsync("hidden");
//20260808 - it works but it hides bar permamentaly and user cannot terminate the app/ or when it shows it stays

// import { requireOptionalNativeModule } from 'expo';
// // Safely access Expo's native developer menu preferences
// const DevMenuPreferences = requireOptionalNativeModule('DevMenuPreferences');
// if (__DEV__ && DevMenuPreferences) {
//   DevMenuPreferences.setPreferencesAsync({
//     showFloatingActionButton: false, // Hides the persistent dev tools panel/bubble
//   });
// }

// LDG 20260720: it is worth to transform this to Redux in the final shape!!!
type AppContextType = {
  levelcounter3: number;
  setLevelcounter3: React.Dispatch<React.SetStateAction<number>>;
  selectedLangs: string[];
  setSelectedLangs: React.Dispatch<React.SetStateAction<string[]>>;
  modeOfTheBoard: number;
  setModeOfTheBoard: React.Dispatch<React.SetStateAction<number>>;
  refreshKey: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};
// export const AppContext = createContext(null);
export const AppContext = createContext<AppContextType | null>(null);

//this was before
// export const unstable_settings = {
//   anchor: '(tabs)',
// };


export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [levelcounter3, setLevelcounter3] = useState(0);
  const [selectedLangs, setSelectedLangs] = useState(["english","spanish"]);
  const [modeOfTheBoard, setModeOfTheBoard] = useState(12);
  const [refreshKey, setRefreshKey] = useState(0);

  // removing the bottom bar - see code above
  //   useEffect(() => {
  //   NavigationBar.setVisibilityAsync("hidden");
  // }, []);

  return (
    
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
      <AppContext.Provider value={{ levelcounter3, setLevelcounter3,
         selectedLangs, setSelectedLangs, modeOfTheBoard, setModeOfTheBoard, refreshKey, setRefreshKey  }}>
        <Stack>
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
