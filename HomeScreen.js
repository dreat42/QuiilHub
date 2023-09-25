
import React,{useEffect,useState} from 'react';
import { Button ,TextInput} from 'react-native-paper';
import {
  ActivityIndicator,
  Text
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = (props) => {
   const [data,setData] = useState("loading")
   const Boiler = async ()=>{
      const token = await AsyncStorage.getItem("token")
    fetch('http://192.168.42.218:3000/',{
    headers:new Headers({
      Authorization:"Bearer "+token
    })
    }).then(res=>res.json())
    .then(
      data=>{
      setData(data)
    }
    )
   }
useEffect(()=>{
   Boiler()
},[])

   const logout =(props)=>{
      AsyncStorage.removeItem("token").then(()=>{
        props.navigation.replace("login")
      })
   }

  return (
   <> 
    <Text style={{fontSize:18,color:'black'}}>{JSON.stringify(data)}</Text>
    <Button 
        mode="contained"
        style={{marginLeft:18,marginRight:18,marginTop:18}}
         onPress={() => logout(props)}>
        logout
      </Button>
   </>
  );
};



export default HomeScreen;
