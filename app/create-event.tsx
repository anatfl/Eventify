// app/create-event.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function CreateEventScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleSave = () => {
    // TODO: כאן תשלחי את הקובץ ל-backend או תעדכני סטייט גלובלי
    console.log({ title, date });
    router.back(); // חוזר למסך הקודם
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'New Event',
          headerTitleAlign: 'center',
          headerTitleStyle: { 
            fontFamily: 'PermanentMarker_400Regular',
            fontSize: 30,
        },
        }}
      />

      <View style={styles.container}>
        <Text style={styles.label}>Event Name:</Text>
        <TextInput
          placeholder="For example: Anat's Birthday"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <Text style={styles.label}>Date (DD-MM-YYYY):</Text>
        <TextInput
          placeholder="DD-MM-YYYY"
          placeholderTextColor="#888"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',      // רקע אפור כמו במסך הבית
    padding: 16,
    justifyContent: 'center',     // ממרכז אנכית
    color: '#fff',
},
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: 'light gray',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#003366',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
