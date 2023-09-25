import React, {useContext, useState, useEffect} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Account = ({navigation}) => {


 


  useEffect(() => {

    Boiler();

  }, []);

  const [loader, setLoader] = useState(false);
  const [profession, setProfession] = useState();

  const [ID, setID] = useState('');
  const [filePath, setFilePath] = useState({});
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [profilePhoto , setProfilePhoto] = useState();

  const [data, setData] = useState({});
  // console.log(user.profession);


  const postFunction = () => {

    
  const data = {
  
    name: name,
    email: email,
    profilePhoto: profilePhoto,
    profession:profession,
    id:ID
  };


  setData(data)
  

    fetch(`http://192.168.42.218:3000/AlterProfileData`,{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify(data)
    })
    .then(
      navigation.navigate('Profile')

    ).catch(err=>{console.log(err);})
  

  }


  const Boiler = async () => {
  
  
    const token = await AsyncStorage.getItem("token");
  
    fetch('http://192.168.42.218:3000/', {
      headers: new Headers({
        Authorization: "Bearer " + token
      })
    })
      .then(res => res.json())
      .then(async data => {

        // console.log(data);
      
        setID(data._id);
     
      setProfession(data.profession);
      setEmail(data.email);
      setName(data.name);
      setProfilePhoto(data.profilePhoto);


      })
      .catch(error => {
        console.error('Error fetching data:', error);
     
      });
  };



  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission error', err);
      }
      return false;
    } else return true;
  };




  const chooseFile = async () => {
  
    let options = {
      mediaType: 'photo',
      maxWidth: 512,
      maxHeight: 512,
      quality: 1,
    };
    // console.log("dd");
    let isStoragePermitted = await requestExternalWritePermission();

    if (isStoragePermitted) {

      launchImageLibrary(options, response => {
        if (response.didCancel) {
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          return;
        } else if (response.errorCode == 'permission') {
          return;
        } else if (response.errorCode == 'others') {
          return;
        }
        // console.log(response.assets[0].type);
        
        setFilePath({
          fileName: response.assets[0].fileName,
          uri: response.assets[0].uri,
          type: response.assets[0].type,

        });

        let newfile = {
          uri: response.assets[0].uri,
          type: `test/${response.assets[0].type.split('.')[1]}`,
          name: `test.${response.assets[0].type.split('.')[1]}`,
        };
        handleUpload(newfile);



        
        
      });
    }
    return true;

    
  };



  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "blogApp");
    data.append("cloud_name", "den2bbarg");



            fetch("https://api.cloudinary.com/v1_1/den2bbarg/image/upload", {
          method: "POST",
          body: data,
        })
          .then((response) => response.json())
          .then((data) => {

            const newData = { ...data };

       
      
            setProfilePhoto(newData.secure_url)

          
          
          })
         
          .catch((error) => {
            console.log(error);
          });

  };
  

 

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        height: '100%',
        backgroundColor: '#FAFAFC',
      }}>
      {loader ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 10,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 140,
              width: 140,
              backgroundColor: '#f2f3f0',
              alignItems: 'center',
              justifyContent: 'center',

              borderRadius: 15,
            }}>
          </View>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FAFAFC',
          padding: '5%',
          alignItems: 'center',
        }}>
        <TouchableOpacity activeOpacity={1} onPress={() =>  navigation.navigate('Settings')}>
          <Image
            tintColor="#2B2B2E"
            source={require('./assets/back.png')}
            style={{height: 32, width: 32}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            postFunction()
          }>
          <View
            style={{
              padding: 6,
              backgroundColor: '#1FB7FC',
              borderRadius: 15,
            }}>
            <Image
              tintColor="#FAFAFC"
              source={require('./assets/done.png')}
              style={{height: 36, width: 36}}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          margin: '2%',
        }}>
        <Text
          style={{
            padding: '2%',
            paddingLeft: '4%',
            color: '#1C1C1C',
            fontFamily: 'SF-Pro-Display-Semibold',
            fontSize: 23,
          }}>
          Edit profile
        </Text>
      </View>
      <View
        style={{
          margin: '2%',
          padding: '2%',
          paddingLeft: '4%',
          flexDirection: 'column',
          paddingBottom: '30%',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={styles.fieldName}>Photo</Text>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft: '19%',
            }}>
            <Image
              resizeMode="cover"
              source={{
                uri:
                  profilePhoto
              }}
              style={{
                height: 85,
                width: 85,
                borderRadius: 50,
              }}
            />
            <TouchableOpacity activeOpacity={1} onPress={() => chooseFile()}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'SF-Pro-Display-Regular',
                  color: '#1CB8FE',
                  marginTop: '15%',
                }}>
                Change Image
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{marginTop: '8%', flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.fieldName, {width: '30%'}]}>Name</Text>
          <TextInput
            style={[styles.input, {width: '67%'}]}
            value={name}
            onChangeText={userInput => setName(userInput)}
            placeholderTextColor="#2B2B2E"

          />
        </View>
       
           
       

        <View
          style={{
            marginTop: '8%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={[styles.fieldName, {width: '30%'}]}>Email</Text>
          <TextInput
            // editable={false}
            style={[styles.input, {width: '67%'}]}
            value={email}
            onChangeText={userInput => setEmail(userInput)}
            placeholderTextColor="#2B2B2E"
          />
        </View>
        <View
          style={{
            marginTop: '8%',
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>
          <Text style={[styles.fieldName, {width: '30%'}]}>Profession</Text>
          
           <TextInput
            // editable={false}
            style={[styles.input, {width: '67%'}]}
            value={profession}
            placeholderTextColor="#2B2B2E"
            onChangeText={userInput => setProfession(userInput)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    color: '#2B2B2E',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 17.5,
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  fieldName: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Display-Semibold',
    color: '#B8B9C8',
    marginBottom:20,
    marginTop:20
  },
});

export default Account;
