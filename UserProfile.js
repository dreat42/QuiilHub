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
  Touchable,
  StatusBar,
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

export default function UserProfile({route, navigation}) {
  // const {name,profilePhoto,blogs,Followers,votes,email,Following,id} = route.params;

  console.log(route.params.following);

  const [data, setData] = useState([]);

  const [UserBlogs, setUserBlogs] = useState([]);

  const [user, setUser] = useState('loading');
  const UserData = route.params.followingData[0];

  // console.log(UserData);

  const [isFollowing, setIsFollowing] = useState(true);
  const [isFollowback, setIsFollowback] = useState(true);

  function toggleFollow() {
    setIsFollowing(prev => {
      prev ? DeleteFollowing() : AddFollowing();
      return !prev;
    });
  }

  function SearchtoggleFollow() {
    setIsFollowing(prev => {
      prev ? AddFollowing() : DeleteFollowing();
      return !prev;
    });
  }

  function toggleFollowback() {
    console.log('toggleFollowback');
    setIsFollowback(prev => {
      prev ? AddFollowback() : DeleteFollowback();
      return !prev;
    });
  }

  // console.log(user.email);

  // console.log(UserData._id);

  const UserMain = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://192.168.42.218:3000/', {
      headers: new Headers({
        Authorization: 'Bearer ' + token,
      }),
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setUser(data);
      });
  };

  const JsonUserData = JSON.stringify(UserData.blogs);

  // console.log("kdksksddsknds"+JsonUserData);

  const UserFollowingBlogs = async () => {
    fetch(`http://192.168.42.218:3000/UserBlogs/${JsonUserData}`, {})
      .then(res => res.json())
      .then(data => {
        const alterdata = JSON.stringify(data);

        const changealterdata = JSON.parse(alterdata);

        // console.log(changealterdata);

        setUserBlogs(changealterdata);
      });
  };

  // console.log(UserBlogs[0]);

  const [followingData, setFollowingData] = useState([]);
  const [followersData, setFollowersData] = useState([]);
  const [loader, setLoader] = useState(false);

  const Boiler = async () => {
    const profiledata = [];
    const followersDataArray = [];
    const followingDataArray = [];

    //  console.log(UserData.Followers);

    for (const profile of UserData.blogs) {
      const blogData = await GetProfileBlogById(profile._id);
      // profiledata.push(blogData);
    }

    for (const followerId of UserData.Followers) {
      const followerData = await GetUserFollowersById(followerId._id);
      // console.log("followerData =====>",followerData);

      followersDataArray.push(followerData);
    }

    for (const followingId of UserData.Following) {
      console.log(followingId);
      const followingData = await GetUserFollowingById(followingId._id);

      followingDataArray.push(followingData);
    }

    setData(profiledata);
    setFollowersData(followersDataArray);
    setFollowingData(followingDataArray);

    // setLoader(false);
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
          // console.log("followersdata");
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

  useEffect(() => {
    // React.useCallback(() => {

    Boiler();
    UserFollowingBlogs();
    UserMain();

    // }, [])
  }, [UserData]);

  // console.log(data);

  const DeleteFollowing = () => {
    // console.log("Delete");

    fetch(
      `http://192.168.42.218:3000/Userprofile/Following/Delete/${UserData._id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: user.email}),
      },
    )
      .then()
      .catch(err => {
        console.log(err);
      });
  };

  const AddFollowing = () => {
    fetch(
      `http://192.168.42.218:3000/Userprofile/Following/Insert/${UserData._id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: user.email}),
      },
    );
  };

  const AddFollowback = () => {
    console.log('Delete');

    fetch(`http://192.168.42.218:3000/Userprofile/Followback/Insert/${user._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: UserData.email}),
    })
      .then()
      .catch(err => {
        console.log(err);
      });
  };

  const DeleteFollowback = () => {
    fetch(`http://192.168.42.218:3000/Userprofile/Followback/Delete/${user._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: UserData.email}),
    });
  };

  // if(isFollowing)
  // {
  // console.log(UserData._id);
  // DeleteFollowing(UserData._id)

  // }
  // else{
  //   console.log("add id");
  //   AddFollowing(UserData._id)
  // }

  const ProfileFlatListRender = ({item}) => {
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
                  }}>
                  {/* <Image
              tintColor="#2B2B2E"
              style={{width: 18, height: 18}}
              source={require('./assets/delete.png')}
            /> */}
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

  // useEffect(() => {
  //   if (true) {
  //     Animated.timing(translation, {
  //       toValue: 0.1,
  //       delay: 200,
  //       useNativeDriver: true,
  //     }).start();

  //     setDialogVisible(true);
  //   }
  // }, []);
  const onCloseDialog = () => {
    Animated.timing(translation, {
      toValue: -100,
      useNativeDriver: true,
    }).start();
    setTimeout(function () {
      setDialogVisible(false);
    }, 200);
  };

  const renderContent = () => {
    if (route.params.following == 'followingScreen') {
      console.log('kninkn');
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar />
          <SafeAreaView style={styles.container}>
            <View style={styles.titleBar}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>  navigation.goBack()}>
                <Image
                  tintColor="#2B2B2E"
                  source={require('./assets/back.png')}
                  style={{height: 32, width: 32}}
                />
              </TouchableOpacity>

              <View style={styles.titleCenter}>
                <Text
                  style={{
                    color: '#444343',
                    fontFamily: 'SF-Pro-Display-Semibold',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  User Profile
                </Text>
              </View>
            </View>

            <View style={{alignSelf: 'center'}}>
              <View style={styles.profileImage}>
                {/* <Image source={require("./assets/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image> */}
                <Image
                  source={{uri: UserData.profilePhoto}}
                  style={styles.image}
                  resizeMode="center"></Image>
              </View>

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
                {UserData.name}
              </Text>
              <Text style={[styles.text, {color: '#AEB5BC', fontSize: 20}]}>
                Developer
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  toggleFollow();
                }}
                style={[
                  styles.button,
                  isFollowing ? styles.following : styles.follow,
                ]}
                // !bookmark ? bookmarkAdd() : bookmarkRemove();
              >
                <Text style={styles.buttonText}>
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                <Text style={[styles.text, {fontSize: 24}]}>
                  {UserData.blogs.length}
                  {/* 23 */}
                </Text>
                <Text style={[styles.text, styles.subText]}>Blogs</Text>
              </View>

              <View
                style={[
                  styles.statsBox,
                  {
                    borderColor: '#DFD8C8',
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('FollowersList', {followersData});
                  }}>
                  <Text style={[styles.text, {fontSize: 24}]}>
                    {UserData.Followers.length}
                    {/* 23 */}
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.text, styles.subText]}>Followers</Text>
              </View>

              <View
                style={[
                  styles.statsBox,
                  {
                    borderColor: '#DFD8C8',
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('FollowingList', {followingData});
                  }}>
                  <Text style={[styles.text, {fontSize: 24}]}>
                    {UserData.Following.length}
                    {/* 12 */}
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.text, styles.subText]}>Following</Text>
              </View>
              <View style={styles.statsBox}>
                <Text style={[styles.text, {fontSize: 24}]}>
                  {UserData.votes}
                  {/* 33 */}
                </Text>
                <Text style={[styles.text, styles.subText]}>Votes</Text>
              </View>
            </View>

            <View style={{marginTop: 32}}>
              <View
                style={{paddingTop: '5%', paddingBottom: '5%', padding: '5%'}}>
                <FlatList
                  horizontal
                  data={UserBlogs}
                  keyExtractor={(y, z) => z.toString()}
                  renderItem={({item, index}) => (
                    <ProfileFlatListRender item={item} />
                  )}
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              {UserBlogs.length > 0 ? (
                // {3>0?
                <View style={styles.mediaCount}>
                  <Text
                    style={[
                      styles.text,
                      {fontSize: 14, color: '#DFD8C8', fontWeight: '300'},
                    ]}>
                    {UserBlogs.length}
                    {/* 3 */}
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 10,
                        color: '#DFD8C8',
                        textTransform: 'uppercase',
                      },
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
    if (route.params.following === 'followersScreen') {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar />
          <SafeAreaView style={styles.container}>
            <View style={styles.titleBar}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>  navigation.goBack()}>
                <Image
                  tintColor="#2B2B2E"
                  source={require('./assets/back.png')}
                  style={{height: 32, width: 32}}
                />
              </TouchableOpacity>

              <View style={styles.titleCenter}>
                <Text
                  style={{
                    color: '#444343',
                    fontFamily: 'SF-Pro-Display-Semibold',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  User Profile
                </Text>
              </View>
            </View>

            <View style={{alignSelf: 'center'}}>
              <View style={styles.profileImage}>
                {/* <Image source={require("./assets/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image> */}
                <Image
                  source={{uri: UserData.profilePhoto}}
                  style={styles.image}
                  resizeMode="center"></Image>
              </View>

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
                {UserData.name}
              </Text>
              <Text style={[styles.text, {color: '#AEB5BC', fontSize: 20}]}>
                Developer
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  toggleFollowback();
                }}
                style={[
                  styles.button,
                  isFollowback ? styles.followback : styles.following,
                ]}
                // !bookmark ? bookmarkAdd() : bookmarkRemove();
              >
                <Text style={styles.buttonText}>
                  {isFollowback ? 'Follow Back' : 'Following'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                <Text style={[styles.text, {fontSize: 24}]}>
                  {UserData.blogs.length}
                  {/* 23 */}
                </Text>
                <Text style={[styles.text, styles.subText]}>Blogs</Text>
              </View>

              <View
                style={[
                  styles.statsBox,
                  {
                    borderColor: '#DFD8C8',
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('FollowersList', {followersData});
                  }}>
                  <Text style={[styles.text, {fontSize: 24}]}>
                    {UserData.Followers.length}
                    {/* 23 */}
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.text, styles.subText]}>Followers</Text>
              </View>

              <View
                style={[
                  styles.statsBox,
                  {
                    borderColor: '#DFD8C8',
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('FollowingList', {followingData});
                  }}>
                  <Text style={[styles.text, {fontSize: 24}]}>
                    {UserData.Following.length}
                    {/* 12 */}
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.text, styles.subText]}>Following</Text>
              </View>
              <View style={styles.statsBox}>
                <Text style={[styles.text, {fontSize: 24}]}>
                  {UserData.votes}
                  {/* 33 */}
                </Text>
                <Text style={[styles.text, styles.subText]}>Votes</Text>
              </View>
            </View>

            <View style={{marginTop: 32}}>
              <View
                style={{paddingTop: '5%', paddingBottom: '5%', padding: '5%'}}>
                <FlatList
                  horizontal
                  data={UserBlogs}
                  keyExtractor={(y, z) => z.toString()}
                  renderItem={({item, index}) => (
                    <ProfileFlatListRender item={item} />
                  )}
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              {UserBlogs.length > 0 ? (
                // {3>0?
                <View style={styles.mediaCount}>
                  <Text
                    style={[
                      styles.text,
                      {fontSize: 14, color: '#DFD8C8', fontWeight: '300'},
                    ]}>
                    {UserBlogs.length}
                    {/* 3 */}
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 10,
                        color: '#DFD8C8',
                        textTransform: 'uppercase',
                      },
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

    if (route.params.following == 'SearchUserScreen') {
      console.log('kninkn');
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar />
          <SafeAreaView style={styles.container}>
            <View style={styles.titleBar}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('Profile')}>
                <Image
                  tintColor="#2B2B2E"
                  source={require('./assets/back.png')}
                  style={{height: 32, width: 32}}
                />
              </TouchableOpacity>

              <View style={styles.titleCenter}>
                <Text
                  style={{
                    color: '#444343',
                    fontFamily: 'SF-Pro-Display-Semibold',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  User Profile
                </Text>
              </View>
            </View>

            <View style={{alignSelf: 'center'}}>
              <View style={styles.profileImage}>
                {/* <Image source={require("./assets/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image> */}
                <Image
                  source={{uri: UserData.profilePhoto}}
                  style={styles.image}
                  resizeMode="center"></Image>
              </View>

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
                {UserData.name}
              </Text>
              <Text style={[styles.text, {color: '#AEB5BC', fontSize: 20}]}>
                Developer
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  SearchtoggleFollow();
                }}
                style={[
                  styles.button,
                  isFollowing ? styles.follow : styles.following,
                ]}
                // !bookmark ? bookmarkAdd() : bookmarkRemove();
              >
                <Text style={styles.buttonText}>
                  {isFollowing ? 'Follow' : 'Following'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                <Text style={[styles.text, {fontSize: 24}]}>
                  {UserData.blogs.length}
                  {/* 23 */}
                </Text>
                <Text style={[styles.text, styles.subText]}>Blogs</Text>
              </View>

              <View
                style={[
                  styles.statsBox,
                  {
                    borderColor: '#DFD8C8',
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('FollowersList', {followersData});
                  }}>
                  <Text style={[styles.text, {fontSize: 24}]}>
                    {UserData.Followers.length}
                    {/* 23 */}
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.text, styles.subText]}>Followers</Text>
              </View>

              <View
                style={[
                  styles.statsBox,
                  {
                    borderColor: '#DFD8C8',
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('FollowingList', {followingData});
                  }}>
                  <Text style={[styles.text, {fontSize: 24}]}>
                    {UserData.Following.length}
                    {/* 12 */}
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.text, styles.subText]}>Following</Text>
              </View>
              <View style={styles.statsBox}>
                <Text style={[styles.text, {fontSize: 24}]}>
                  {UserData.votes}
                  {/* 33 */}
                </Text>
                <Text style={[styles.text, styles.subText]}>Votes</Text>
              </View>
            </View>

            <View style={{marginTop: 32}}>
              <View
                style={{paddingTop: '5%', paddingBottom: '5%', padding: '5%'}}>
                <FlatList
                  horizontal
                  data={UserBlogs}
                  keyExtractor={(y, z) => z.toString()}
                  renderItem={({item, index}) => (
                    <ProfileFlatListRender item={item} />
                  )}
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              {UserBlogs.length > 0 ? (
                // {3>0?
                <View style={styles.mediaCount}>
                  <Text
                    style={[
                      styles.text,
                      {fontSize: 14, color: '#DFD8C8', fontWeight: '300'},
                    ]}>
                    {UserBlogs.length}
                    {/* 3 */}
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 10,
                        color: '#DFD8C8',
                        textTransform: 'uppercase',
                      },
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
  };

  return <View>{renderContent()}</View>;
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
    alignItems: 'center',
    marginTop: 44,
    marginHorizontal: 16,
    marginBottom: 40,
  },
  titleCenter: {
    flex: 1,
    alignItems: 'center',
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
  button: {
    width: 150,

    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  followback: {
    backgroundColor: '#8fbc8f',
    borderColor: '#8fbc8f',
  },
  follow: {
    backgroundColor: '#42a5f5',
    borderColor: '#42a5f5',
  },
  following: {
    backgroundColor: '#bdbdbd',
    borderColor: '#bdbdbd',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
