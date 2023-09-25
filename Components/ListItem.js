import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ListItem = ({item}) => {
  const navigation = useNavigation();
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
  return (
    <TouchableOpacity
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() =>
        navigation.navigate('CategoryBlog', {
          catog: item.catogName,
        })
      }
      style={[
        animatedScaleStyle,
        {
          alignItems: 'center',
          width: '30.7%',

          marginLeft: '2%',

          marginBottom: '2.5%',
          justifyContent: 'space-between',
        },
      ]}
      activeOpacity={1}>
      <View style={styles.Button}>
        <Image
          tintColor="#1c1c1c"
          style={{width: 40, height: 40}}
          source={item.imgPath}
        />
        <Text style={styles.text}>{item.catogName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    borderRadius: 15,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafc',
    padding: '15%',
    paddingTop: '20%',
    paddingBottom: '20%',
    width: '99%',
  },

  text: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 15,
    marginTop: '20%',
    color: 'black',
  },
});

export default ListItem;
