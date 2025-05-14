// components/EventCard.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function EventCard({ event, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.datetime}>{event.datetime}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { padding:12, marginVertical:8, backgroundColor:'#003366', borderRadius: 12 },
  title: { fontSize:16, fontWeight:'bold', color: '#ffffff' },
  datetime:{ marginTop:4, color:'#ffffff' },
});
