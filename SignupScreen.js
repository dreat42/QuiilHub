
import React,{useState} from 'react';
import { Button ,TextInput} from 'react-native-paper';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SignupScreen = (props) => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword]=useState('')

  const sendCred= async (props)=>{
     fetch("http://192.168.1.5:3000/signup",{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "email":email,
        "password":password,
        "name":name
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
             
              await AsyncStorage.setItem('token',data.token)
              props.navigation.replace("login")
            } catch (e) {
              console.log("error ",e)
            }
     })
  }
  return (
   <> 
   <View>
    
      <Text
      style={{
        fontSize:20,marginLeft:18,marginTop:20,color:'black'
      }}
      
      >SignupScreen</Text>
       <TextInput
        label='Name'
        mode="outlined"
        value={name}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>setName(text)}
     
      />
      <TextInput
        label='Email'
        mode="outlined"
        value={email}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>setEmail(text)}
     
      />
      <TextInput
        label='password'
        mode="outlined"
        secureTextEntry={true}
        value={password}
        onChangeText={(text)=>{setPassword(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
     
      />
      <Button 
        mode="contained"
        style={{marginLeft:18,marginRight:18,marginTop:18}}
       onPress={() => sendCred(props)}>
        signup
      </Button>
      <TouchableOpacity>
        <Text
      style={{
        fontSize:18,marginLeft:18,marginTop:20,color:'black'
      }}
      onPress={()=>props.navigation.replace("login")}
      >already have a account ?</Text>
      </TouchableOpacity>
      
      </View>
   </>
  );
};



export default SignupScreen;
