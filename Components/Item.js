

import {View, Text, Image, Dimensions} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');

const Item = ({item, onShare, onDelete}) => {
  const navigation = useNavigation();
  const ref = useRef();

   
 


  useEffect(() => {
    if (item.opened == false) {
      ref.current.close();
    }
  });

  const leftSwipe = () => {
    return (
      <View
        style={{backgroundColor: '#fff', height: 100, flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 100,
            backgroundColor: '#ffcccc',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {

            
            onDelete(item);


          }}>
          <Image
            source={require('../assets/delete_bookmark.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={{
            width: 100,
            height: 100,
            backgroundColor: '#3D7BED',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            onShare(item);
          }}>
          <Image
            // source={require('../images/editing.png')}
            style={{width: 30, height: 30, tintColor: '#fff'}}
          />
        </TouchableOpacity> */}
      </View>
    );
  };
  const rightSwipe = () => {
    return (
      <View
        style={{backgroundColor: '#fff', height: 100, flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 100,
            backgroundColor: '#a1b3a8',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            onShare(item);
          }}>
          <Image
      
            source={require('../assets/share_bookmark.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable
      ref={ref}
      renderLeftActions={rightSwipe}
      renderRightActions={leftSwipe}>
      <View
        style={{
          width: width,
          marginBottom: 10,
          backgroundColor: '#F4F4F4',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('Bug', {
            photo: item.imagePath,
            views: item.views,
            name: item.name,
            profilePhoto: item.profilePhoto,
            title: item.title,
            category: item.category,
            content: item.content,
            date: item.date,
          });
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Bug', {
              photo: item.imagePath,
              views: item.views,
              name: item.name,
              profilePhoto: item.profilePhoto,
              title: item.title,
              category: item.category,
              content: item.content,
              date: item.date,
            });
          }}>
          <View
            style={{
              marginLeft: '6.5%',
              marginRight: '6.5%',
              paddingTop: '1%',
              paddingBottom: '1%',
            }}>
            <View style={{flexDirection: 'column'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: 70, height: 70}}>
                  <Image
                    resizeMode="cover"
                    source={{uri: item.imgPath}}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 10,
                    }}
                  />
                </View>

                <View
                  style={{
                    width: '72%',
                    flexDirection: 'column',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginBottom: '10%',
                        justifyContent: 'space-between',

                        width: '100%',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('UserProfile', {
                            author: item.email,
                          });
                        }}>
                        <Text
                          style={{
                            color: '#5E5D5E',
                            // marginLeft: '2%',
                            fontFamily: 'SF-Pro-Display-Regular',
                            fontSize: 13,
                          }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>

                      <Text
                        style={{
                          color: '#5E5D5E',
                          fontFamily: 'SF-Pro-Display-Regular',
                          fontSize: 13,
                        }}>
                        {item.date}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      navigation.navigate('Bug', {
                        views: item.views,
                        name: item.name,
                        photo: item.photo,
                        profilePhoto: item.profilePhoto,
                        title: item.title,
                        category: item.category,
                        content: item.content,
                        date: item.date,
                      });
                    }}>
                    <Text
                      style={{
                        color: '#2A292E',
                        fontSize: 14,
                        fontFamily: 'SF-Pro-Display-Bold',
                        marginBottom: '2%',
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>

                  <Text
                    style={{
                      marginBottom: '1%',
                      marginTop: '2%',
                      alignSelf: 'flex-start',
                      color: '#5c6892',
                      fontFamily: 'SF-Pro-Display-Medium',
                      fontSize: 13,
                      backgroundColor: '#e6ecff',
                      padding: '0.5%',
                      paddingHorizontal: '2%',
                      borderRadius: 15,
                    }}>
                    {item.category}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: '4%',
                      marginBottom: '1%',
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

export default Item;
