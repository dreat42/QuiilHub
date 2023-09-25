// import React from 'react';
// import {TouchableOpacity, Text, Image, Animated} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// const TopUsers = ({item}) => {

//   const data=[]



//   const animatedButtonScale = new Animated.Value(1);
//   const navigation = useNavigation();

//   const onPressIn = () => {
//     Animated.spring(animatedButtonScale, {
//       toValue: 0.9,
//       useNativeDriver: true,
//     }).start();
//   };

//   const onPressOut = () => {
//     Animated.spring(animatedButtonScale, {
//       toValue: 1,
//       useNativeDriver: true,
//     }).start();
//   };

 
//   data.push(item)

//   console.log(data);

//   return (
//     <TouchableOpacity
//       activeOpacity={1}
//       onPressIn={onPressIn}
//       onPressOut={onPressOut}
//       // onPress={() =>
//       //   navigation.navigate('UserProfile', {
//       //     email: item.email,
//       //     Followers:item.Followers,
//       //     Following:item.Following,
//       //     blogs:item.blogs,
//       //     profilePhoto:item.profilePhoto,
//       //     photo:item.photo,
//       //     date:item.date,
//       //     title:item.title,
//       //     name:item.name
//       //   })
//       // }

//       onPress={() => navigation.navigate('UserProfile', { followingData: data, following: "SearchUserScreen" })}

//       style={{
//         alignItems: 'center',

//         margin: '5.5%',
//         transform: [{scale: animatedButtonScale}],
//       }}>
//       <Image
//         source={{uri: item.profilePhoto}}
//         style={{height: 65, width: 65, borderRadius: 50}}
//       />
//       <Text style={{fontFamily: 'SF-Pro-Display-Regular', fontSize: 15,color: '#5E5D5E'}}>
//         {item.name}

//         {/* Shagun Sethi */}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// export default TopUsers;

import React from 'react';
import { TouchableOpacity, Text, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const TopUsers = ({ item}) => {
  const data = [item];
  const animatedButtonScale = new Animated.Value(1);
  const navigation = useNavigation();

  const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // console.log(data);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() =>
        navigation.navigate('UserProfile', {
          followingData: data,
          following: 'SearchUserScreen',
        })
      }
      style={{
        alignItems: 'center',
        margin: '5.5%',
        transform: [{ scale: animatedButtonScale }],
      }}
    >
      <Image
        source={{ uri: item.profilePhoto }}
        style={{ height: 65, width: 65, borderRadius: 50 }}
      />
      <Text
        style={{
          fontFamily: 'SF-Pro-Display-Regular',
          fontSize: 15,
          color: '#5E5D5E',
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default TopUsers;