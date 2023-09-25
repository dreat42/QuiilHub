import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import BookmarkLoading from './Components/Loading/BookmarkLoading';

const Catlog = ({ navigation, route }) => {
  const { catlog } = route.params;
  

console.log(route.params.catlog);


  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);



  const readFunction = async () => {
    fetch('http://192.168.17.129:3000/feeds')
      .then((res) => res.json())
      .then((data) => {
        const categoryObjects = data.filter((item) => item.category === catlog);
        const sortedObjects = categoryObjects.sort((a, b) => b.views - a.views);
        setData(sortedObjects);
        setLoader(false)
        console.log(sortedObjects);
       
      });
  };

  useEffect(() => {
    readFunction();
  }, []);

 

  const CategoriesComponent = ({ item, index }) => {
    return (
      <View
        style={{
          // width: width,
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
        }}
      >
        <View style={{ marginLeft: '6.5%', marginRight: '6.5%', paddingTop: '1%', paddingBottom: '1%' }}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: 70, height: 70 }}>
                <Image
                  resizeMode="cover"
                  source={{ uri: item.imgPath }} // Make sure imagePath is the correct property name
                  style={{ height: '100%', width: '100%', borderRadius: 10 }}
                />
              </View>

              <View style={{ width: '72%', flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom: '10%',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('UserProfile', {
                          author: item.email,
                        });
                      }}
                    >
                      <Text
                        style={{
                          color: '#5E5D5E',
                          fontFamily: 'SF-Pro-Display-Regular',
                          fontSize: 13,
                        }}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: '#5E5D5E',
                        fontFamily: 'SF-Pro-Display-Regular',
                        fontSize: 13,
                      }}
                    >
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
                      photo: item.photo, // Make sure "photo" is the correct property name
                      profilePhoto: item.profilePhoto,
                      title: item.title,
                      category: item.category,
                      content: item.content,
                      date: item.date,
                    });
                  }}
                >
                  <Text
                    style={{
                      color: '#2A292E',
                      fontSize: 14,
                      fontFamily: 'SF-Pro-Display-Bold',
                      marginBottom: '2%',
                    }}
                  >
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
                  }}
                >
                  {item.category}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const header = () => {
    return (
      
        <View
          style={{
            margin: '6%',
          }}
        >
         
<View>
          <Text
            style={{
              padding: '2%',
              color: 'black',
              fontFamily: 'SF-Pro-Display-Semibold',
              fontSize: 35,
              color:'black',
              width:'100%'

            }}
          >
             {catlog}
          </Text>
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
              Empty Category
            </Text>
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Bold',
                color: '#666666',
                fontSize: 16,
                textAlign: 'center',
                marginTop: '5%',
              }}>
              We're sorry, the post you are looking for is not found in the specified category. Please check your selection within a different category.
            </Text>
          </View>
         ) : null} 
       </View>
    
    );
  };

  return (
    
    <View style={{ flex: 1 }}>

      {/* <Text style={{color:'black'}}>efffffffffffffffffffffffffffffffffffffffff</Text> */}
      <FlatList
      
      data={loader ? null : data}
        ListHeaderComponent={header}
        renderItem={({ item, index }) => {
          return <CategoriesComponent item={item} index={index} />;
        }}
        
      />
    </View>
  
  );
};

export default Catlog;
