import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function RadioButton({ setSelectedRadio }) {
  const [selectedCategory, setSelectedCategory] = useState('');


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedRadio(category);
  };

  return (
    <View style={styles.container}>
       <Picker
        selectedValue={selectedCategory}
        style={styles.picker}
        onValueChange={handleCategoryChange}
      >
        <Picker.Item label="Tech" value="Tech" />
        <Picker.Item label="Fashion" value="Fashion" />
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Music" value="Music" />
        <Picker.Item label="Lifestyle" value="Lifestyle" />
        <Picker.Item label="Movies" value="Movies" />
        <Picker.Item label="Books" value="Books" />
        <Picker.Item label="Sports" value="Sports" />
        <Picker.Item label="Fitness" value="Fitness" />
        <Picker.Item label="Business" value="Business" />
        <Picker.Item label="Games" value="Games" />
        <Picker.Item label="Political" value="Political" />
        <Picker.Item label="Health" value="Health" />
        <Picker.Item label="Religious" value="Religious" />
        <Picker.Item label="Entertainment" value="Entertainment" />
        <Picker.Item label="Travel" value="Travel" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: '2%',
  },
  label: {
    color: '#2B2B2E',
    borderBottomColor: '#2B2B2E',
    fontSize: 25.5,
    marginBottom: 8,
    padding: 10,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.1)',
    color: 'black',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 17.5,
    width: '100%',
    backgroundColor:'#e1e1e1',
   
    
  },
});
