import React, {useEffect, useRef, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Animated,
  ScrollView,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Touchable,
  StatusBar,
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
// import ProfileFlatListRender from './ProfileFlatListRender';
// import {LoginContext} from './Context/Context';
import AsyncStorage from '@react-native-community/async-storage';

import {useFocusEffect} from '@react-navigation/native';
import HomeLoading from './Components/Loading/HomeLoading';
import ProfileLoading from './Components/Loading/ProfiileLoading';

export default function Profile({navigation}) {



  const [user, setUser] = useState('loading');

  const [vote, setVote] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const toggleModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [blogslength, setBlogslength] = useState(0);
  const [followerslength, setFollowerslength] = useState(0);
  const [followinglength, setFollowinglength] = useState(0);
  const [data, setData] = useState([]);

  const [datalength, setDatalength] = useState(0);

  const [followingData, setFollowingData] = useState([]);
  const [followersData, setFollowersData] = useState([]);
  const [loader, setLoader] = useState(true);

  // console.log(followingData);

  // const [profile, setProfile] = useState();

  // const User = async ()=>{
  //    const token = await AsyncStorage.getItem("token")
  //  fetch('http://192.168.194.129:3000/',{
  //  headers:new Headers({
  //    Authorization:"Bearer "+token
  //  })
  //  }).then(res=>res.json())
  //  .then(
  //    data=>{

  //      setUser(data)
  //    }
  //      )
  //    }

  //    const Feed = async () => {
  //     fetch("http://192.168.194.129:3000/feeds"
  //       )
  //       .then(res=>res.json())
  //       .then(data=>{

  //                setData(data);

  //       })
  //     }

  // const Boiler = async () => {
  //   const profiledata = [];

  //   const token = await AsyncStorage.getItem("token");

  //   fetch('http://192.168.42.218:3000/', {
  //     headers: new Headers({
  //       Authorization: "Bearer " + token
  //     })
  //   })
  //     .then(res => res.json())

  //     .then(async data =>

  //       {
  //         setUser(data)

  //       for (const profile of data.blogs) {

  //         const blogData = await GetProfileBlogById(profile._id);

  //         profiledata.push(blogData);
  //       }

  //       setData(profiledata);
  //       setLoader(false);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //       setLoader(false);
  //     });
  // };

  // const  GetProfileBlogById = async (id) => {

  //   return new Promise((resolve, reject) => {
  //     fetch(`http://192.168.42.218:3000/GetProfileBlogById/${id}`, {
  //       method: "GET",
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //     })
  //       .then(response => response.json())
  //       .then(profiledata => {
  //         resolve(profiledata);
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // };

  const Boiler = async () => {
    const profiledata = [];
    const followersDataArray = [];
    const followingDataArray = [];

    const token = await AsyncStorage.getItem('token');

    fetch('http://192.168.42.218:3000/', {
      headers: new Headers({
        Authorization: 'Bearer ' + token,
      }),
    })
      .then(res => res.json())
      .then(async data => {
        // console.log(data);
        setUser(data);
        for (const item of data.blogs) {
          setBlogslength(blogslength + 1);
        }

        // setBlogslength(data.blogs.length)
        // setFollowerslength(data.followers.length)
        // setFollowinglength(data.following.length)

        for (const profile of data.blogs) {
          const blogData = await GetProfileBlogById(profile._id);
          profiledata.push(blogData);
        }

        for (const followerId of data.Followers) {
          console.log(followerId);

          const followerData = await GetUserFollowersById(followerId._id);
          followersDataArray.push(followerData);
        }

        for (const followingId of data.Following) {
          const followingData = await GetUserFollowingById(followingId._id);

          followingDataArray.push(followingData);
        }

        setData(profiledata);

        var sum = 0;

        for (let i = 0; i < profiledata.length; i++) {
          sum += profiledata[i].votes;
        }

        setVote(sum);

        setFollowersData(followersDataArray);
        setFollowingData(followingDataArray);

        // console.log(profiledata.length);
        setDatalength(profiledata.length);
        setLoader(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoader(false);
      });
  };

  const GetProfileBlogById = async id => {
    return new Promise((resolve, reject) => {
      fetch(`http://192.168.42.218:3000/GetProfileBlogById/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(profiledata => {
          resolve(profiledata);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const GetUserFollowersById = async id => {
    // console.log(id);
    return new Promise((resolve, reject) => {
      fetch(`http://192.168.42.218:3000/GetUserFollowersById/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(followersdata => {
          resolve(followersdata);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  const GetUserFollowingById = async id => {
    return new Promise((resolve, reject) => {
      fetch(`http://192.168.42.218:3000/GetUserFollowingById/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(followingdata => {
          resolve(followingdata);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      Boiler();
    }, []),
  );

  // console.log(followingData);

  // console.log(followersData);

  // const foundObject = data.find(obj => obj.email === user.email);
  // console.log(foundObject.name);

  // foundObjectdata.push(foundObject)
  // setProfile(foundObject)

  // console.log(foundObjectdata[0].name);

  // console.log(profile);

  //  data.forEach(document => {

  //   const searchValue = user.email;

  //     for (const obj of document) {
  //       if (obj.email == searchValue) {
  //        profile.push(document);
  //       //  break;

  //       }
  //     }

  //  })

  //  useEffect(() => {

  //   Feed();
  //   User();

  // },[])

  // const {profilePhoto,name,blogs,Followers,Following,email,date,photo,title} = route.params;

  // const {user} = useContext(LoginContext);
  // console.log(user);

  // const [sec, setSec] = useState([{
  //   id: '1',
  //   title:
  //     'Racist White Gamers Came For This Black Woman Writer. Here What ',
  //   photo:
  //     'https://www.anthropics.com/portraitpro/img/page-images/homepage/v21/sky-replacement-B.jpg',
  //   date: '25 July',
  // },
  // {
  //   id: '2',
  //   title: 'This Long-Awaited Technology May Finally Change the World',
  //   photo:
  //     'https://www.anthropics.com/portraitpro/img/page-images/homepage/v21/new-features-B.jpg',
  //   date: '25 July',
  // },
  // {
  //   id: '3',
  //   title:
  //     'Item text 1Item text 1Item text 1Item text 1Item text 1Item text 1',
  //   photo:
  //     'https://www.anthropics.com/portraitpro/img/page-images/homepage/v21/clone-tool-B.jpg',
  //   date: '25 July',
  // }]);

  // const readFunction = () => {
  //   let feed = [];
  //   user.blogs.forEach(document => {
  //     const subscriber = firestore()
  //       .collection('feeds')
  //       .doc(document)
  //       .get()
  //       .then(documentSnapshot => {
  //         if (documentSnapshot.exists) {
  //           feed.push({
  //             ...documentSnapshot.data(),
  //             key: documentSnapshot.id,
  //           });

  //           setData(feed);
  //         }
  //       });

  //     return () => subscriber();
  //   });
  // };

  // useEffect(() => {
  //   readFunction();

  //   }, []);

  const ProfileFlatListRender = ({item, onDelete}) => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
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
              height: 250,
              width: 147,
              margin: 7,
              borderRadius: 10,
              shadowColor: '#C7C7C9',
              elevation: 6,
              backgroundColor: 'transparent',
            }}>
            <Image
              source={{
                uri: item.imgPath,
              }}
              resizeMode="cover"
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                backgroundColor: 'white',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                padding: '5%',
                height: '45%',
              }}>
              <Text
                style={{
                  color: 'rgba(0,0,0,0.3)',
                  fontSize: 15.5,
                  fontFamily: 'SF-Pro-Display-Bold',
                }}>
                {item.date}
                {/* 23 may */}
              </Text>
              <Text
                style={{
                  fontSize: 14.5,
                  color: '#2B2B2E',
                  fontFamily: 'SF-Pro-Display-Semibold',
                }}>
                {item.title}
                {/* this is the title of component */}
              </Text>
              <View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => {
                    // deleteAddress();
                    //   const newItems = [...datas];
                    //   newItems.splice(newItems.indexOf(item), 1);
                    //   setData(newItems);

                    onDelete(item);
                  }}>
                  <Image
                    tintColor="#2B2B2E"
                    style={{width: 18, height: 18}}
                    source={require('./assets/delete.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // const SECTIONS = [
  //   {
  //     id: '1',
  //     title:
  //       'Racist White Gamers Came For This Black Woman Writer. Here What ',
  //     photo:
  //       'https://www.anthropics.com/portraitpro/img/page-images/homepage/v21/sky-replacement-B.jpg',
  //     date: '25 July',
  //   },
  //   {
  //     id: '2',
  //     title: 'This Long-Awaited Technology May Finally Change the World',
  //     photo:
  //       'https://www.anthropics.com/portraitpro/img/page-images/homepage/v21/new-features-B.jpg',
  //     date: '25 July',
  //   },
  //   {
  //     id: '3',
  //     title:
  //       'Item text 1Item text 1Item text 1Item text 1Item text 1Item text 1',
  //     photo:
  //       'https://www.anthropics.com/portraitpro/img/page-images/homepage/v21/clone-tool-B.jpg',
  //     date: '25 July',
  //   },
  // ];

  const [DialogVisible, setDialogVisible] = useState(true);
  const translation = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (true) {
      Animated.timing(translation, {
        toValue: 0.1,
        delay: 200,
        useNativeDriver: true,
      }).start();
      setDialogVisible(true);
    }
  }, []);
  const onCloseDialog = () => {
    Animated.timing(translation, {
      toValue: -100,
      useNativeDriver: true,
    }).start();
    setTimeout(function () {
      setDialogVisible(false);
    }, 200);
  };

  const handleDelete = itemToDelete => {
    // Find the index of the item to be deleted
    const indexToDelete = data.findIndex(item => item.id === itemToDelete.id);

    if (indexToDelete !== -1) {
      // Create a copy of the data array and remove the item using splice
      const newData = [...data];
      newData.splice(indexToDelete, 1);

      // Update the state with the new data
      setData(newData);

      fetch(
        `http://192.168.42.218:3000/deleteFromDatabase/${itemToDelete._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: user.email}),
        },
      );

      setDatalength(prevDataLength => prevDataLength - 1);

      console.log(datalength);

      console.log(user.email);
    }
  };

  return loader ? (
    <View>
      <ProfileLoading />
    </View>
  ) : (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        {DialogVisible ? (
          <Animated.View
            style={{
              padding: '1%',
              width: '100%',
              top: 0,
              flexDirection: 'row',
              backgroundColor: '#F6C800',
              alignItems: 'center',
              transform: [{translateY: translation}],
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{padding: '0.7%'}}
              activeOpacity={1}
              onPress={() => onCloseDialog()}>
              <Image
                tintColor="#2B2B2E"
                style={{width: 30, height: 30}}
                source={require('./assets/close.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('Account')}>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Display-Semibold',
                  color: '#2B2B2E',
                  fontSize: 17,
                }}>
                Complete or Change your profile
              </Text>
            </TouchableOpacity>
            <View />
          </Animated.View>
        ) : null}

        <View style={styles.titleBar}>
          <Text
            style={{
              color: '#444343',
              fontFamily: 'SF-Pro-Display-Semibold',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            My Profile
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Image
              tintColor="#1a0e06"
              style={{width: 34, height: 34}}
              source={require('./assets/menu.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity onPress={() => toggleModal(user.profilePhoto)}>
          <View style={styles.profileImage}>
            {/* <Image source={require("./assets/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image> */}
            <Image
              source={{uri: user.profilePhoto}}
              style={styles.image}
              resizeMode="center"></Image>
          </View>
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={closeModal}>
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={styles.overlay} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Image
                source={{uri: user.profilePhoto}}
                style={{width: 300, height: 300}}
              />
             
            </View>
          </Modal>

          <View style={styles.dm}>
            <Image
              tintColor="#d3c9c2"
              style={{width: 22, height: 22}}
              source={require('./assets/form.png')}
            />
          </View>

          {/* <View style={styles.active}></View> */}
          <View style={styles.add}>
            <Image
              tintColor="#d3c9c2"
              style={{width: 28, height: 28}}
              source={require('./assets/account.png')}
            />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, {fontWeight: '200', fontSize: 36}]}>
            {user.name}
          </Text>
          <Text style={[styles.text, {color: '#AEB5BC', fontSize: 20}]}>
            Developer
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, {fontSize: 24}]}>{datalength}</Text>
            <Text style={[styles.text, styles.subText]}>Blogs</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {borderColor: '#DFD8C8', borderLeftWidth: 1, borderRightWidth: 1},
            ]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FollowersList', {followersData});
              }}>
              <Text style={[styles.text, {fontSize: 24}]}>
                {user.Followers.length}
                {/* 23 */}
                {/* { followerslength} */}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.text, styles.subText]}>Followers</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {borderColor: '#DFD8C8', borderLeftWidth: 1, borderRightWidth: 1},
            ]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FollowingList', {followingData});
              }}>
              <Text style={[styles.text, {fontSize: 24}]}>
                {user.Following.length}
                {/* 12 */}
                {/* { followinglength} */}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.text, styles.subText]}>Following</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, {fontSize: 24}]}>
              {/* {user.votes} */}
              {vote}
            </Text>
            <Text style={[styles.text, styles.subText]}>Votes</Text>
          </View>
        </View>

        <View style={{marginTop: 32}}>
          <View style={{paddingTop: '5%', paddingBottom: '5%', padding: '5%'}}>
            <FlatList
              horizontal
              data={data}
              keyExtractor={(y, z) => z.toString()}
              renderItem={({item, index}) => (
                <ProfileFlatListRender onDelete={handleDelete} item={item} />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {datalength > 0 ? (
            // {3>0?
            <View style={styles.mediaCount}>
              <Text
                style={[
                  styles.text,
                  {fontSize: 14, color: '#DFD8C8', fontWeight: '300'},
                ]}>
                {datalength}
                {/* 3 */}
              </Text>
              <Text
                style={[
                  styles.text,
                  {fontSize: 10, color: '#DFD8C8', textTransform: 'uppercase'},
                ]}>
                Blogs
              </Text>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
  },
  image: {
    flex: 1,
    // height: 500,
    // width: 500,
    borderRadius: 5,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,

    justifyContent: 'space-between',
  },
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  dm: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // active: {
  //     backgroundColor: "#34FFB9",
  //     position: "absolute",
  //     bottom: 28,
  //     left: 10,
  //     padding: 4,
  //     height: 20,
  //     width: 20,
  //     borderRadius: 10
  // },
  add: {
    backgroundColor: '#41444B',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: '50%',
    marginTop: -150,
    marginLeft: 30,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.38)',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: '#CABFAB',
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
  tFollowcard: {
    width: '100%',
    height: 470,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  tFlatSyle: {
    flex: 1,
    padding: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -150 }],
    backgroundColor: 'white',
    width: 300,
    height: 300,
  },
 
});

// import { View, Text } from 'react-native'
// import React from 'react'

// const Profile = () => {
//   return (
//     <View>
//       <Text>Profile</Text>
//     </View>
//   )
// }

// export default Profile
