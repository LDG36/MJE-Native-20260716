import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { createContext, useState } from "react";
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

// LDG 20260720: it is worth to transform this to Redux in the final shape!!!
type AppContextType = {
  levelcounter3: number;
  setLevelcounter3: React.Dispatch<React.SetStateAction<number>>;
  selectedLangs: string[];
  setSelectedLangs: React.Dispatch<React.SetStateAction<string[]>>;
  modeOfTheBoard: number;
  setModeOfTheBoard: React.Dispatch<React.SetStateAction<number>>;
};
// export const AppContext = createContext(null);
export const AppContext = createContext<AppContextType | null>(null);

//this was before
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [levelcounter3, setLevelcounter3] = useState(0);
  const [selectedLangs, setSelectedLangs] = useState(["english","spanish"]);
  const [modeOfTheBoard, setModeOfTheBoard] = useState(12);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppContext.Provider value={{ levelcounter3, setLevelcounter3,
         selectedLangs, setSelectedLangs, modeOfTheBoard, setModeOfTheBoard  }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
