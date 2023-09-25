import React from 'react';
import {View, Text, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';
const SearchingItem = ({ item}) => {

  const navigation = useNavigation();

  
 
  return (



   <>
   <TouchableOpacity
   
  
   onPress={() => 
    
    // navigation.navigate('UserProfile',{name:item.name,profilePhoto:item.profilePhoto,blogs:item.blogs,Followers:item.Followers,votes:item.votes,email:item.email,Following:item.Following,photo:item.photo,date:item.date,title:item.title
      navigation.navigate('UserProfile', {
        followingData: [item],
        following: 'SearchUserScreen',
      // })
    })}
   
   >
    <View style={{flexDirection: 'row' ,padding:15 , backgroundColor: "#e2e2e2",borderRadius:10,}}>
      <Image
        source={{uri: item.profilePhoto}}
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          marginLeft: "8%"
        }}
      />
      <View>
        
        <View style={{marginLeft:'10%'}}><Text style={{fontSize:20,color:'black'}}>{item.name}</Text></View>
        
        <View style={{alignItems:'center', marginLeft: "7%",}}><Text style={{color:'black'}}>{item.email}</Text></View>
        
        </View>
       
      </View>
      {/* <View style={{height:1,width:'100%',backgroundColor:'#A7A7A7'}}/> */}
      </TouchableOpacity>
 </>
  );
};

export default SearchingItem;
