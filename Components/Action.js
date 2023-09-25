// import React from 'react';
// import {StyleSheet, Image} from 'react-native';
// import Animated, {
//   divide,
//   interpolateNode,
//   Extrapolate,
//   sub,
//   cond,
//   add,
//   lessThan,
//   multiply,
// } from 'react-native-reanimated';
// import {HEIGHT} from './ItemLayout';

// const Action = ({x, deleteOpacity}) => {
//   const size = cond(lessThan(x, HEIGHT), x, add(x, sub(x, HEIGHT)));
//   const translateX = cond(lessThan(x, HEIGHT), 0, divide(sub(x, HEIGHT), 2));
//   const borderRadius = divide(size, 2);
//   const scale = interpolateNode(size, {
//     inputRange: [20, 30],
//     outputRange: [0.01, 1],
//     extrapolate: Extrapolate.CLAMP,
//   });
//   const iconOpacity = interpolateNode(size, {
//     inputRange: [HEIGHT - 20, HEIGHT - 10],
//     outputRange: [1, 0],
//   });
//   const iconOpacity2 = interpolateNode(size, {
//     inputRange: [HEIGHT - 20, HEIGHT - 10],
//     outputRange: [0.7, 0],
//   });
//   const DeleteIcon = () => {
//     return (
//       <Animated.Image
//         tintColor="white"
//         style={{height: 50, width: 50}}
//         source={require('../assets/delete.png')}
//       />
//     );
//   };
//   const DeleteIcon2 = () => {
//     return (
//       <Animated.Image
//         tintColor="white"
//         style={{
//           height: 32,
//           width: 32,
//           opacity: iconOpacity2,
//           transform: [{scale}],
//         }}
//         source={require('../assets/delete.png')}
//       />
//     );
//   };
//   const textOpacity = sub(1, iconOpacity);
//   return React.createElement(
//     Animated.View,
//     {
//       style: {
//         backgroundColor: '#D93F12',
//         borderRadius,
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: size,
//         width: size,
//         transform: [{translateX}],
//       },
//     },
//     React.createElement(DeleteIcon2),
//     React.createElement(
//       Animated.View,
//       {
//         style: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), {
//           justifyContent: 'center',
//           alignItems: 'center',
//           opacity: multiply(textOpacity, deleteOpacity),
//         }),
//       },

//       React.createElement(DeleteIcon),
//     ),
//   );
// };
// export default Action;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Action() {
  return (
    <View>
      <Text>Action</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
