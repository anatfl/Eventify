// app/[eventId]/what-to-bring.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { nanoid } from 'nanoid';

type Item = { id: string; name: string };

export default function WhatToBringScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  // your list of items
  const [items, setItems] = useState<Item[]>([]);
  // UI state: are we showing the “add” form?
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState('');

  const startAdd = () => setAdding(true);
  const cancelAdd = () => { setText(''); setAdding(false); };

  const saveItem = () => {
    if (!text.trim()) return;
    setItems([...items, { id: nanoid(), name: text.trim() }]);
    cancelAdd();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'What to Bring',
          headerTitleAlign: 'center',
        }}
      />
      <View style={styles.container}>
        {/* 1) current list or placeholder */}
        {items.length === 0 ? (
          <Text style={styles.empty}>No current items</Text>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            )}
            style={styles.list}
          />
        )}

        {/* 2) either show “Add Item” button… */}
        {!adding ? (
          <TouchableOpacity style={styles.addButton} onPress={startAdd}>
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
        ) : (
          /* …or show the input + Save/Cancel when adding */
          <View style={styles.addForm}>
            <TextInput
              style={styles.input}
              placeholder="What will you bring?"
              placeholderTextColor="#666"
              value={text}
              onChangeText={setText}
            />
            <View style={styles.formButtons}>
              <TouchableOpacity style={styles.saveBtn} onPress={saveItem}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={cancelAdd}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f0f0' },
  empty: { textAlign: 'center', color: '#666', marginTop: 20 },

  list: { marginBottom: 20 },
  itemRow: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  itemText: { fontSize: 16 },

  addButton: {
    backgroundColor: '#003366',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  addForm: { marginTop: 20 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
  formButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  saveBtn: {
    backgroundColor: '#003366',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveText: { color: '#fff', fontWeight: 'bold' },
  cancelBtn: {
    backgroundColor: '#999',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelText: { color: '#fff', fontWeight: 'bold' },
});
