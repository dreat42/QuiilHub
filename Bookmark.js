import React, {useContext, useState, useEffect, useRef} from 'react';
import {Text, View, Image, Animated, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Item from './Components/Item';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Share from 'react-native-share';

import {useIsFocused} from '@react-navigation/native';
import BookmarkLoading from './Components/Loading/BookmarkLoading';


import { MyContext } from './Components/Context/MyContextProvider';

const Bookmark = ({navigation}) => {
  const { setItemId } = useContext(MyContext);
  
  const translation = useRef(new Animated.Value(-100)).current;
  
  const isFocused = useIsFocused();

    
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null); 

 
  const Boiler = async () => {

    console.log("ubbubb");
    setLoader(true)

    const token = await AsyncStorage.getItem('token');
      
          fetch('http://192.168.42.218:3000/bookmarkData', {
            headers: new Headers({
              Authorization: 'Bearer ' + token,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
      
              // Update the states with the fetched data

              console.log("asaskma");
                setData(data.feeds);
                setUserId(data.userId);
                setLoader(false);
      
             
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
              setLoader(false);
            });
        
    
   
  };

     const setReload =()=>{
      Boiler();
      
     }
    


   
     
      useEffect(() => {
        Boiler();

       
       }, [isFocused]);
     

       const share = async (data) => {
   

        const options = {
          url: data.imgPath,
          message:
          data.content,
        email: data.email,
        subject: data.title,
        
        };


        
        try {
          const res = await Share.open(options);
          console.log(res);
        } catch (err) {
          console.log(err);
        }

  };

   
  

  const handleDelete = (itemToDelete) => {
    // Find the index of the item in the data array
    const indexToDelete = data.findIndex((item) => item === itemToDelete);

    if (indexToDelete !== -1) {
      // Create a copy of the data array and remove the item using splice
      const updatedData = [...data];
      updatedData.splice(indexToDelete, 1);
      setData(updatedData); // Update the data source (state) with the new array

      setItemId(itemToDelete._id);

      fetch(`http://192.168.42.218:3000/deleteFromUserBookmark/${itemToDelete._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId })
      });
    
    }
  };



  
 
  


  const header = () => {
    return (
      <View>
        <View
          style={{
            margin: '2%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              padding: '2%',
              paddingLeft: '4%',
              color: '#1C1C1C',
              fontFamily: 'SF-Pro-Display-Semibold',
              fontSize: 25,
            }}>
            Bookmarks
          </Text>
          <TouchableOpacity
            style={{padding: '2%', paddingRight: '4%'}}
            onPress={() => setReload()}>
            <Image
              tintColor="#1c1c1c"
              source={require('./assets/reload.png')}
              style={{height: 30, width: 30}}
            />
          </TouchableOpacity>
        </View>
        {loader ? (
          <View>
            <BookmarkLoading  />
            <BookmarkLoading />
            <BookmarkLoading />
            <BookmarkLoading />
            <BookmarkLoading />
            <BookmarkLoading />
            {/* <BookmarkLoading /> */}
            
          </View>
        ) : null}
        {data.length == 0 ? (
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: '50%',
              marginBottom: '30%',
              marginLeft: '6.5%',
              marginRight: '6.5%',
            }}>
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Bold',
                color: '#434343',
                fontSize: 26,
                textAlign: 'center',
              }}>
              Add Bookmarks
            </Text>
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Bold',
                color: '#666666',
                fontSize: 16,
                textAlign: 'center',
                marginTop: '5%',
              }}>
             Don't forget to bookmark the posts you like the most so that you can easily find them later. Additionally, you can perform various actions on posts, such as swapping their positions, deleting them, or sharing them with others.
            </Text>
          </View>
         ) : null} 
      </View>
    );
  };

  
 

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FAFAFC',
      }}>
      {/* {DialogVisible ? ( */}
        <Animated.View
          style={{
            padding: '0.5%',
            position: 'absolute',
            width: '100%',
            top: 0,
            zIndex: 3,
            flexDirection: 'row',
            backgroundColor: '#E65538',
            alignItems: 'center',
            transform: [{translateY: translation}],
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{padding: '0.7%'}}
            activeOpacity={1}
            onPress={() => onCloseDialog()}>
            <Image
              tintColor="#FAFAFC"
              style={{width: 30, height: 30}}
              source={require('./assets/close.png')}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: 'SF-Pro-Display-Semibold',
              color: '#FAFAFC',
              fontSize: 17,
            }}>
            Swipe left to delete items
          </Text>

          <View />
        </Animated.View>
      {/* ) : null} */}
      <View style={{flex:1}}>
        <FlatList 
         data={loader ? null : data}
           ListHeaderComponent={header}
           renderItem={({item,index})=>{
                 return <Item item={item} index={index}
                
                 onShare={(x)=>{
                  var sDATA=JSON.stringify(x)
                  // console.log(sDATA);


                  share(x)
                

                 }}
                
                 onDelete={(x)=>{
                  var sDelte=JSON.stringify(x)
                  
                  // console.log(sDelte);
                  handleDelete(x);
                 }}
                 
                 />;
                
           } 
          }

        />
        

        
      </View>
    </View>
  );
};

export default Bookmark;

