import React,{useState,useEffect} from 'react';

import {View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Home from './Home';
import SearchScreen from './SearchScreen';
import Bookmark from './Bookmark';
import Bug from './Bug';
import UserProfile from './UserProfile';
import Test from './Test';
import AsyncStorage from '@react-native-community/async-storage';


const Tab = createBottomTabNavigator();


export default function TabsScreen() {

  const [img,setImg]=useState('')


  const Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://192.168.42.218:3000/', {
      headers: new Headers({
        Authorization: 'Bearer ' + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setImg(data.profilePhoto);
      });
  };

  
  useEffect(() => {
 
    Boiler();
  }, []);
 


  return (

    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFF',
          borderTopWidth: 0,
          height: 55,
          alignItems: 'center',
       

          
   
        },
        tabBarShowLabel: false,
      }}>

   

     <Tab.Screen
        name="Test"
        component={Test}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            const iconimg = focused
              ? require('./assets/bug.png')
              : require('./assets/bug.png');
            return (
              <Image
                tintColor= '#000000' 
                source={iconimg}
                style={{
                  height: 23,
                  width: 23,
                }}
              />
            );
          },
        }}
      /> 

     







      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            const iconimg = focused
              ? require('./assets/homedark.png')
              : require('./assets/home.png');
            return (
              <Image
                tintColor= '#000000' 
                source={iconimg}
                style={{
                  height: 23,
                  width: 23,
                }}
              />
            );
          },
        }}
      />

<Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            const iconimg = focused
            ? require('./assets/bookmarkdark.png')
              : require('./assets/bookmark.png');
              return (
              <Image
                tintColor= '#000000'
                source={iconimg}
                style={{
                  height: 23,
                  width: 23,
                }}
              />
              );
            },
          }}
          />
         
        
       
    

     <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            const iconimg = focused
              ? require('./assets/searchdark.png')
              : require('./assets/search.png');
            return (
              <Image
                tintColor= '#000000'
                source={iconimg}
                style={{
                  height: 23,
                  width: 23,
                }}
              />
            );
          },
        }}
      />




  


  


<Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
            style={{
              borderRadius: 50,
              borderWidth: focused ? 1.9 : 0,
                borderColor: '#000000',
                padding: 2,
              }}>
              <Image
                source={{uri:img}}
                style={{
                  height: 23,
                  width: 23,
                  borderRadius: 50,
                }}
              />
            </View>
          ),
        }}
      />
     
      
   <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            const iconimg = focused
              ? require('./assets/bug.png')
              : require('./assets/bug.png');
            return (
              <Image
                tintColor= '#000000' 
                source={iconimg}
                style={{
                  height: 23,
                  width: 23,
                }}
              />
            );
          },
        }}
      /> 


    </Tab.Navigator>
  
  );
}
