
import React,{useState} from 'react';
import { Button ,TextInput} from 'react-native-paper';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


const LoginScreen = (props) => {
  const [email,setEmail] = useState('');
  const [password,setPassword]=useState('')
  
  
  const sendCred = async (props)=>{

    fetch("http://192.168.42.218:3000/signin",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
       "email":email,
       "password":password
      })
    })
    .then(res=>res.json())
    .then(async (data)=>{
      
      try {
        await AsyncStorage.setItem('token',data.token)
        props.navigation.replace("homestack")
           } catch (e) {
             console.log("error",e)
             Alert(e)
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
      
      >Login Screen</Text>
      
     
      
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
        Login
      </Button>
      <TouchableOpacity>
        <Text
      style={{
        fontSize:18,marginLeft:18,marginTop:20,color:'black'
      }}
      onPress={()=>props.navigation.replace("signup")}
      >dont have a account ?</Text>
      </TouchableOpacity>
      
      </View>
   </>
  );
};



export default LoginScreen;
