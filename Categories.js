import { NavigationContainer } from '@react-navigation/native';
import React,{useState} from 'react'
import { StyleSheet, Text,Animated, View,FlatList,Image,Dimensions, TouchableOpacity, ImageBackground ,Button} from 'react-native'

import Catlog from './Catlog';

export default function Categories({ navigation }) {

  const animatedButtonScale = new Animated.Value(1);
  const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{scale: animatedButtonScale}],
  };


  const [category, setCategory] = useState([
    { name: "Entertainment", id: "1", source: require('./assets/bg_1.png') },
    { name: "Food", id: "2", source: require('./assets/bg_2.png') },
    { name: "Fashion", id: "2", source: require('./assets/bg_3.png') },
    { name: "Books", id: "2", source: require('./assets/bg_4.png') },
    { name: "Music", id: "2", source: require('./assets/bg_5.png') },
    { name: "Sports", id: "2", source: require('./assets/bg_6.png') },
    { name: "Technology", id: "2", source: require('./assets/bg_7.png') },
    { name: "Politics", id: "1", source: require('./assets/bg_8.png') },
    { name: "Lifestyle", id: "2", source: require('./assets/bg_9.png') },
    { name: "Travel", id: "2", source: require('./assets/bg_10.png') },
    { name: "Movies", id: "2", source: require('./assets/bg_11.png') },
    { name: "Business", id: "2", source: require('./assets/bg_12.png') },
    { name: "Fitness", id: "2", source: require('./assets/bg_13.png') },
    { name: "Game", id: "2", source: require('./assets/bg_14.png') },
    { name: "Religion", id: "2", source: require('./assets/bg_15.png') },
    { name: "Health", id: "2", source: require('./assets/bg_16.png') },
  // and so on...
  ]);

 
  return (
    
    <View style={{flex:1,padding:40,flexDirection:'column',alignItems:'center',alignSelf:'center'}}> 
    <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold',marginBottom:15}}>Top Viewd Blog In each Categories</Text>
      <FlatList
      key={'6786'}
      numColumns={2}
        keyExtractor={(item) => item.id}
        data={category}
        renderItem={({ item }) => (
          <View style={{padding:10}}>
          <TouchableOpacity
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              onPress={() =>{
            
                navigation.navigate('Catlog', {
                  catlog: item.name,
                })
                console.log(category.name);
              }
              }
              style={[
                animatedScaleStyle,
                {
                  alignItems: 'center',
                  width: '85.7%',

                  marginLeft: '2%',

                  marginBottom: '2.5%',
                  justifyContent: 'space-between',
                },
              ]}
              activeOpacity={1}>

          <ImageBackground source={item.source}
          style = {{margin: 1,
            height: Dimensions.get('window').width / 4,
            width: Dimensions.get('window').width / 3,
            resizeMode: 'cover'}} 
          >
          

        
            </ImageBackground>

          </TouchableOpacity>
          </View>
        )}
      />

    </View>
  )
}

const styles = StyleSheet.create({})






