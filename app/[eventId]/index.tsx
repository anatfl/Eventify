// app/[eventId]/index.tsx

import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { EVENTS, type Event } from '../../constants/events';

export default function EventDetailScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const router = useRouter();

  const event = useMemo<Event | undefined>(
    () => EVENTS.find(e => e.id === eventId),
    [eventId]
  );

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Event not found</Text>
      </View>
    );
  }


  return (
    <>
      <Stack.Screen
        options={{
          title: event.title,
          headerTitleAlign: 'center',
        }}
      />

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push({
            pathname: '/[eventId]/what-to-bring',
            params: { eventId },
          })}
        >
          <Text style={styles.buttonText}>What to Bring</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#003366',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
