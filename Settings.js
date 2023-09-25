import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

// import Fontisto from 'react-native-vector-icons/Fontisto';




const Settings = ({props,navigation}) => {

   const Boiler = async ()=>{
      const token = await AsyncStorage.getItem("token")
    fetch('http://192.168.221.129:3000/',{
    headers:new Headers({
      Authorization:"Bearer "+token
    })
    })
    
   }
useEffect(()=>{
   Boiler()
},[])

   const LogOut =()=>{
      AsyncStorage.removeItem("token").then(()=>{
       navigation.replace("LoginScreen")
      })
   }


  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        height: '100%',
        backgroundColor: '#FAFAFC',
        flex: 1,
      }}>
       
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FAFAFC',
          padding: '3%',
        }}>
       
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FAFAFC',
          padding: '5%',
          alignItems: 'center',
  
        }}>
        <TouchableOpacity activeOpacity={1} onPress={() =>  navigation.navigate('Profile')}>
          <Image
            tintColor="#2B2B2E"
            source={require('./assets/back.png')}
            style={{height: 32, width: 32}}
          />
        </TouchableOpacity>
        </View>
        
        <TouchableOpacity

        onPress={()=>{LogOut()}}
  
          activeOpacity={1}
          style={{
            padding: '4%',
            flexDirection: 'row',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Image
            tintColor="#E3486D"
            source={require('./assets/signout.png')}
            style={{height: 30, width: 30}}
          />
          <Text style={styles.logout}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          margin: '2%',
        }}>
        <Text style={styles.header}>Settings</Text>
      </View>
      <View style={{margin: '7%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#E6F8FF',
              padding: 7,
              borderRadius: 15,
            }}>
            <Image
              tintColor="#00A2EC"
              source={require('./assets/mention.png')}
              style={styles.image}
            />
          </View>
          <View style={{marginLeft: '4%'}}>
            <Text style={styles.itemHead}>Profile settings</Text>
            <Text style={styles.itemSubHead}>
              Settings of your personal profile
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Account')}
            style={{marginLeft: 'auto'}}>
            <Image
              source={require('./assets/forward.png')}
              style={styles.Arrow}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.itemSeperater} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              padding: 7,
              borderRadius: 15,
            }}>
            <Image
              tintColor="rgba(0,0,0,0.75)"
              source={require('./assets/bug.png')}
              style={styles.image}
            />
          </View>
          <View style={{marginLeft: '4%'}}>
            <Text style={styles.itemHead}>Bug report</Text>
            <Text style={styles.itemSubHead}>Report bugs very simply</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('BugsScreen')}
            activeOpacity={1}
            style={{marginLeft: 'auto'}}>
            <Image
              source={require('./assets/forward.png')}
              style={styles.Arrow}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.itemSeperater} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: '2%',
    paddingLeft: '4%',
    color: '#1C1C1C',
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 26.5,
  },
  image: {
    height: 30,
    width: 30,
  },
  Arrow: {
    height: 35,
    width: 35,
  },
  itemHead: {
    fontSize: 21,
    fontFamily: 'SF-Pro-Display-Semibold',
    color:'#000000'
  },
  itemSubHead: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Display-Regular',
    color: 'rgba(0,0,0,0.7)',
  },
  itemSeperater: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 1,
    marginTop: '5%',
    marginBottom: '5%',
  },
  logout: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 17,
    color: '#1D1D1D',
    marginLeft: '2%',
  },
});
export default Settings;
