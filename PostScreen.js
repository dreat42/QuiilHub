import React, {useState,useEffect,useContext} from 'react';
import {
  View,

  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar , PermissionsAndroid,
} from 'react-native';
import RadioButton from './Components/RadioButton';
import {launchImageLibrary} from 'react-native-image-picker';
import {Input,Text, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const PostScreen = ({navigation}) => {
  
  const [selectedRadio, setSelectedRadio] = useState();
  const [title, setTitle] = useState('');

  const [user,setUser] = useState("loading")
  const [filePath, setFilePath] = useState({});

  const [imgPath, setImgPath] = useState('');

  const [data, setData] = useState({});
  
  const [imgErr, setImgErr] = useState(false);

  const [titleError1, setTitleError1] = useState(false);



  const handleTitleError = () => {
    if (title.length < 12 || title.length > 30) {
      setTitleError1(true);
      return false;
    } else {
      setTitleError1(false);
      return true;
    }
  };





  const handleImg = () => {
  if(imgPath == '')
  {
    setImgErr(true)
    return false;
  }
  else {
    setImgErr(false);
    return true;
  }
}


const onSubmit=()=>{
  console.log(data);
  navigation.navigate('Description', {data:data})
            
}














  const readFunction = async () => {
    checkData()

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const d = new Date();
    const data = {
      date: `${d.getDate()} ${monthNames[d.getMonth()]}`,
      category: selectedRadio,
      content: '',
      bookmarked: [],
      downvote: [],
      upvote: [],
      count:[],
      Followers:[],
      blogs:[],
      views: 0,
      votes: 0,
      title: title,
      profilePhoto: user.profilePhoto,
      name: user.name,
      email: user.email,
      imgPath: imgPath,
      profession:''
     
    
    };
   

    setData(data)


  
  }
 


 


  const checkData = () => {

    handleTitleError();


    handleImg();
    if (

      handleTitleError() &&
      handleImg()

             
      
    ) {

      
      onSubmit();
     
      // navigation.navigate('Home');
      
      
    } else {
      console.log('data is incorrect');
    }
  };

  const Boiler = async () => {

   const token = await AsyncStorage.getItem("token")
   fetch('http://192.168.1.5:3000/',{
   headers:new Headers({
     Authorization:"Bearer "+token
   })
   }).then(res=>res.json())
   .then(
     data=>{
      
       setUser(data)
     }
       )

  }
  
   useEffect(() => {
  
    Boiler();
    },[])





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
    console.log("dd");
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
        console.log(response.assets[0].type);
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
            setImgPath(newData.secure_url)

          
          
          })
         
          .catch((error) => {
            console.log(error);
          });

  };
  


 
  

  

  return (
    <>
    <StatusBar/>
    <View
            style={{
              margin: '4%',
              marginBottom:'5%',
              marginTop:'10%'
            }}>

            <Text
              style={{
                padding: '2%',
                paddingLeft: '4%',
                color: '#1C1C1C',
                fontFamily: 'SF-Pro-Display-Semibold',
                fontSize: 40,
                
                
              }}>
              Post Screen
            </Text>
            </View>
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        height: '100%',
        backgroundColor: '#FAFAFC',
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: '#FAFAFC',
          padding: '5%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('TabsScreen')}>
        
        
        </TouchableOpacity>
      </View>


    
      <View
        style={{
          margin: '2%',
        }}>
      
        <View style={styles.child}>
          

          <Input
           style={{color:'#2B2B2E',borderBottomColor:'#2B2B2E',borderBottomWidth:0.7,fontSize: 21.5,}}
           
        labelStyle={{color:'#2B2B2E'}}
        placeholderTextColor="rgba(0,0,0,0.7)"
            label={<Text style={{fontSize: 30}}>Title</Text>}
            placeholder="Enter title"
       
            onChangeText={userInput => setTitle(userInput)}
            value={title}
          />
          {titleError1 ? (
            <View style={{padding: 1,paddingLeft:'3%'}}>
              <Text style={{color: '#D63D1C', fontWeight: 'bold'}}>
                Title must be 12-30 characters long.
              </Text>
            </View>
          ) : null}
        </View>
        <View
          style={{
            marginTop: '8%',
          }}>
          <Text
            style={{color:'#2B2B2E',borderBottomColor:'#2B2B2E',fontSize: 25.5,marginBottom:8,padding:10}}>
            Select category
          </Text>
          <RadioButton onPress={()=>{console.log("gg")}} setSelectedRadio={setSelectedRadio} />
         
        </View>
<>
<View
          style={{
            marginTop: '8%',
          }}>
          <Text
            style={{color:'#2B2B2E',borderBottomColor:'#2B2B2E',fontSize: 25.5,marginTop:10,marginBottom:11,padding:10}}>
            Choose Image
          </Text>

          
          </View>
        <View
        style={{
          height: 220,
          width: '100%',
          backgroundColor: '#F2F4F5',
          marginBottom:40,
         
        }}>
          <View>
      </View>
        <Image
          style={{height: '100%', width: '100%'}}
          source={{uri: filePath.uri != {} ? filePath.uri : null}}
        />
        
        <TouchableOpacity
          onPress={() => chooseFile()}
          activeOpacity={0.9}
          style={{
            borderRadius: 20,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            paddingLeft: '2%',
            paddingRight: '2%',
            padding: '1%',
            top: '45%',
            backgroundColor: '#FAFAFC',
          }}>
          <Text
            style={{
              fontSize: 17,
              fontFamily: 'SF-Pro-Display-Regular',
              color: '#1CB8FE',
            }}>
            Choose Image
          </Text>
        </TouchableOpacity>
            
      {imgErr ? (
            <View style={{padding: 1,paddingLeft:'3%',marginTop:20}}>
            <Text style={{color: '#D63D1C', fontWeight: 'bold',}}>
              Insert Image
            </Text>
          </View>
          ) : null}
      </View>


      </>
    
      </View>
      <View style={styles.child}>
          <Button
    
            title="Next"
            buttonStyle={{
              borderRadius: 5,
              backgroundColor: '#4cb3e3',
            }}
            titleStyle={{
              color: 'white',
              fontWeight: 'bold',
              
              letterSpacing: 5,
              fontSize: 18,
            }}
            onPress={() =>{ readFunction(); }}
          />
        </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({

  textInput: {
    borderWidth: 1,
    color: '#2B2B2E',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 17.5,
    borderColor: 'rgba(0,0,0,0.1)',
    width: '100%',
    borderRadius: 10,
    paddingLeft: '3%',
    paddingRight: '3%',
    
  },
  header: {
    padding: '2%',
    paddingLeft: '4%',
    color: '#98999B',
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 24,
  },
  textInput: {
    borderWidth: 1,
    color: '#2B2B2E',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 17.5,
    borderColor: 'rgba(0,0,0,0.1)',
    width: '100%',
    borderRadius: 10,
    paddingLeft: '3%',
    paddingRight: '3%',
    textAlignVertical: 'top',
  },
  child: {
    paddingTop: '5%',
  },

});
export default PostScreen;


