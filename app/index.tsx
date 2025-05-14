// app/index.tsx
import React from 'react';
import { View, Text, StyleSheet,  TouchableOpacity } from 'react-native';
import { Stack, useRouter} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts, PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';

// to hold screen loading until font is fully loading
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({ PermanentMarker_400Regular });
    useEffect(() => {
        if (fontsLoaded) {
          SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) return null;
    
    
    return (
    <>
    <Stack.Screen  options={{ title: 'EVENTIFY', headerTitleAlign: 'center',
            headerTitleStyle: { 
            fontFamily: 'PermanentMarker_400Regular',
            fontSize: 30,
        },
            }}/>
    <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={() => {router.push('/create-event')}}>
        <Text style={styles.buttonText}>Create New Event</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {router.push('/my-events')}}>
        <Text style={styles.buttonText}>My Events</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'gray',
      justifyContent: 'center',  
      alignItems: 'center',
    },
    button: {
        backgroundColor: '#003366',    // כחול כהה
        borderRadius: 12,              // קצוות עגולים
        paddingVertical: 40,
        paddingHorizontal: 80,
        marginVertical: 12,
    },
    buttonText: {
        color: '#ffffff',              // טקסט לבן
        fontSize: 16,
        fontFamily: 'PermanentMarker_400Regular',
    },
  });
  