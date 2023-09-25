import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
export const HEIGHT = 86;

const ProfileFlatListRender = ({item}) => {
  const navigation = useNavigation();

  return (
    
    <TouchableOpacity activeOpacity={1} onPress={() =>{
            
      navigation.navigate('Bug', {photo:item.imagePath,views:item.views,name:item.name,profilePhoto:item.profilePhoto,title:item.title,category:item.category,content:item.content,date:item.date})
    }} >
    <View
    key={item.key}
      style={{
        height: 160,
        width: 115,
        margin: 7,
        borderRadius: 10,
        shadowColor: '#C7C7C9',
        elevation: 6,
        backgroundColor: 'transparent',
      }}>
        
      <Image
        source={{
          uri: item.photo,
        }}
        resizeMode="cover"
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 10,
        }}
      />
       
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          padding: '5%',
          height: '45%',
        }}>
         
        <Text
          style={{
            color: 'rgba(0,0,0,0.3)',
            fontSize: 15.5,
            fontFamily: 'SF-Pro-Display-Bold',
          }}>
          {item.date}
        </Text>
       
        <Text numberOfLines={2}
          style={{
            fontSize: 14.5,
            color: '#2B2B2E',
            fontFamily: 'SF-Pro-Display-Semibold',
          }}>
          {item.title}
        </Text>
       

        </View>
       
        </View>
</TouchableOpacity>
  );
};

export default ProfileFlatListRender;
