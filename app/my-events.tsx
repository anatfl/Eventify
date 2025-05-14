// app/my-events.tsx
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import EventCard from '../components/EventCard';

export default function MyEventsScreen() {
  const router = useRouter();
  // פה תחליפי בנתונים אמיתיים כשתתחברי לבקאנד
  const [events] = useState([
    { id: '1', title: 'יום הולדת לענת המלכה', datetime: '08-08-2025' },
    { id: '2', title: 'חוגגים שענת התקבלה לעבודה', datetime: 'מחר בעזרת השם' },
  ]);

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'My Events',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'PermanentMarker_400Regular',
            fontSize: 28,
          },
        }} 
      />

      <View style={styles.container}>
        <FlatList
          data={events}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <EventCard 
              event={item}
              onPress={() => {
                router.push(`/${item.id}`);
              }} // ניווט לפרטי אירוע
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>אין אירועים להצגה</Text>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    padding: 16,
  },
  list: {
    paddingTop: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#666',
  },
});
