import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
// import Feather from 'react-native-vector-icons/Feather';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import SkeletonLoadingBookmarks from './Components/SkeletonLoadingBookmarks';
import {max} from 'react-native-reanimated';
import UserProfile from './UserProfile';
import Bug from './Bug';

import SearchLoading from './Components/Loading/SearchLoading';

import TopUsers from './Components/TopUsers';
// import SkeletonLoadingBookmarks from './Components/SkeletonLoadingBookmarks';
export default function Main({navigation}) {
  const [data, setData] = useState([]);

  const [Top, setTop] = useState([]);
  // console.log(Top)
  const [Topusers, setTopusers] = useState([]);
  // console.log(Topusers);

  // const [user, setUser] = useState([]);
  // console.log(Topuser[0]);
  const [feed, setFeed] = useState([]);
  const [user, setUser] = useState([]);

  // const [loader, setLoader] = useState(true);

  const [Ent, setEnt] = useState([]);
  const [Tech, setTech] = useState([]);
  // console.log(Tech);
  const [reco, setReco] = useState([]);

  const [reco1, setReco1] = useState([]);
  const [reco2, setReco2] = useState([]);

  const [reco3, setReco3] = useState([]);

  const [reco4, setReco4] = useState([]);

  const [reco5, setReco5] = useState([]);

  // console.log(reco5);
  // console.log(reco2);
  const [loader, setLoader] = useState(true);
  const [notFound, setNotFound] = useState(false);

  //     const Fetchdata = async () =>  {
  //       setLoader(true);
  //       let feed = [];
  //       let user =[]
  //       let entertain=[];
  //       let technology=[];

  //       let subscribers = firestore()
  //       .collection('users')
  //       .orderBy('Followers', 'desc');

  //     subscribers.get().then(querySnapshot => {
  //       querySnapshot.forEach(documentSnapshot => {
  //         user.push({
  //           ...documentSnapshot.data(),
  //           key: documentSnapshot.id,
  //         });
  //         setTopusers(user);
  //         // setTop(feed[0])

  //         const mini=0;
  //         const maxi=user.length/3;

  //         rand4 =  mini + (Math.random() * (maxi-mini));
  //        //  console.log(rand1)
  //         const mini1=maxi+1;
  //         const maxi1=(2*maxi)+1;

  //         rand5 =  mini1 + (Math.random() * (maxi1-mini1));

  //         const mini2=maxi1+1;
  //         const maxi2=user.length;
  //    console.log(maxi2);
  //         rand6 =  mini2 + (Math.random() * (maxi2-mini2));

  //        const four= Math.floor(rand4)
  //         const five=Math.floor(rand5)
  //         const six=Math.floor(rand6)

  //         // console.log(six);
  //        setReco3(user[four]);
  //        setReco4(user[five]);
  //        setReco5(user[six]);
  //       //  console.log(user[six]);

  //       });

  //     //  console.log(reco)
  //     //  console.log(two)
  //     //  console.log(user[two])

  //       });

  //       let subscriber = firestore()
  //         .collection('feeds')
  //         .orderBy('views', 'desc');

  //       subscriber.get().then(querySnapshot => {
  //         querySnapshot.forEach(documentSnapshot => {
  //           feed.push({
  //             ...documentSnapshot.data(),
  //             key: documentSnapshot.id,
  //           });
  //           setFeed(feed);
  //           setTop(feed[0])

  //           const min=0;
  //           const max=feed.length/3;

  //           rand1 =  min + (Math.random() * (max-min));
  //          //  console.log(rand1)
  //           const min1=max+1;
  //           const max1=(2*max)+1;

  //           rand2 =  min1 + (Math.random() * (max1-min1));

  //           const min2=max1+1;
  //           const max2=feed.length;

  //           rand3 =  min2 + (Math.random() * (max2-min2));

  //          const one= Math.floor(rand1)
  //           const two=Math.floor(rand2)
  //           const three=Math.floor(rand3)

  //          setReco(feed[one]);
  //          setReco1(feed[two]);
  //          setReco2(feed[three]);

  //           // console.log(feed[0].photo);
  //           // setReco1(feed[0].photo);

  // {
  //           if(documentSnapshot.data().category=='Entertainment'){
  //           entertain.push({
  //             ...documentSnapshot.data(),
  //             key: documentSnapshot.id,
  //           });
  //         setEnt(entertain)
  //         }
  //         {
  //         if(documentSnapshot.data().category=='Technology'){
  //           technology.push({
  //             ...documentSnapshot.data(),
  //             key: documentSnapshot.id,
  //           });
  //         setTech(technology)

  //         }

  //       }

  //           // setLoader(false);
  //          } });
  //       });

  //       return () => subscriber();

  //   }

  // console.log(Top);

  let objectWithLargestValue = null;

  var largestValue = null;
  const readFunction = async () => {
    fetch('http://192.168.42.218:3000/feeds')
      .then(res => res.json())
      .then(data => {
        setData(data);

        for (const obj of data) {
          const views = obj.views;
          if (largestValue === null || views > largestValue) {
            largestValue = views;
            objectWithLargestValue = obj;
          }
        }

        setTop(objectWithLargestValue);

        ///Random Posts
        const getRandomObjects = (array, count) => {
          // Shuffle the array using the Fisher-Yates algorithm
          const shuffledArray = [...array];
          for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [
              shuffledArray[j],
              shuffledArray[i],
            ];
          }

          // Slice the shuffled array to get the desired number of random objects
          return shuffledArray.slice(0, count);
        };

        const randomObjects = getRandomObjects(data, 3);
        setReco(randomObjects[0]);
        setReco1(randomObjects[1]);
        setReco2(randomObjects[2]);

        ///Random Users
        const getRandomUsers = (array, count) => {
          // Shuffle the array using the Fisher-Yates algorithm
          const shuffledArray = [...array];
          for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [
              shuffledArray[j],
              shuffledArray[i],
            ];
          }

          // Slice the shuffled array to get the desired number of random objects
          return shuffledArray.slice(0, count);
        };

        const randomUsers = getRandomUsers(data, 3);

        setReco3(randomUsers[0]);
        setReco4(randomUsers[1]);
        setReco5(randomUsers[2]);

        // const searchEnt = 'Entertainment';

        // const getObjectContainingText = (array, text) => {
        //   return array.find(obj => {
        //     for (const prop in obj) {
        //       if (typeof obj[prop] === 'string' && obj[prop].includes(text)) {
        //         return true;
        //       }
        //     }
        //     return false;
        //   });
        // };

        // const objectWithText = getObjectContainingText(data, searchEnt);
        // console.log('Object with Text:', objectWithText);

        const searchEnt = 'Entertainment';

        const getObjectsContainingText = (array, text) => {
          return array.filter(obj => {
            for (const prop in obj) {
              if (typeof obj[prop] === 'string' && obj[prop].includes(text)) {
                return true;
              }
            }
            return false;
          });
        };

        const Ent_objects = getObjectsContainingText(data, searchEnt);
        setEnt(Ent_objects);

        const searchTec = 'Technology';

        const getObjectsContainingTec = (array, text) => {
          return array.filter(obj => {
            for (const prop in obj) {
              if (typeof obj[prop] === 'string' && obj[prop].includes(text)) {
                return true;
              }
            }
            return false;
          });
        };

        const Tech_objects = getObjectsContainingTec(data, searchTec);
        setTech(Tech_objects);

        //Top Users

        const getObjectsOfTop3LargestArrays = array => {
          const sortedArrays = array
            .map(obj => obj.Followers)
            .sort((a, b) => b.length - a.length); // Sort arrays by length in descending order

          const top3Arrays = sortedArrays.slice(0, 3); // Select the top 3 largest arrays

          return array.filter(obj => top3Arrays.includes(obj.Followers));
        };

        const objectsOfTop3LargestArrays = getObjectsOfTop3LargestArrays(data);
        setTopusers(objectsOfTop3LargestArrays);
      });
  };

  useEffect(() => {
    readFunction();

    // Fetchdata();
    setTimeout(function () {
      setLoader(false);
      setNotFound(true);
    }, 5500);
  }, []);

  // console.log(data);

  const Entd = [
    {
      id: 1,
      name: 'Shagun Sethi',
      date: '25 July',
      profilePhoto:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      time: '5 min',
      photo:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      title:
        'This is the title Component of your blog his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d',
    },
    {
      id: 144,
      name: 'Shagun Sethi',
      date: '25 July',
      time: '5 min',
      profilePhoto:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      photo:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      title:
        'This is the title Component of your blog his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d',
    },
    {
      id: 14444,
      name: 'Shagun Sethi',
      date: '25 July',
      photo:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      profilePhoto:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      time: '5 min',
      title:
        'This is the title Component of your blog his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d',
    },
  ];

  const datu = [
    {
      id: 1,
      name: 'Shagun Sethi',
      date: '25 July',
      profilePhoto:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      time: '5 min',
      photo:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      title:
        'This is the title Component of your blog his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d',
    },
    {
      id: 144,
      name: 'Shagun Sethi',
      date: '25 July',
      time: '5 min',
      profilePhoto:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      photo:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      title:
        'This is the title Component of your blog his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d',
    },
    {
      id: 14444,
      name: 'Shagun Sethi',
      date: '25 July',
      photo:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      profilePhoto:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      time: '5 min',
      title:
        'This is the title Component of your blog his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d',
    },
  ];

  const Topusers_rrr = [
    {
      id: 1,
      name: 'Shagun Sethi',
      date: '25 July',
      profilePhoto:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      time: '5 min',
      photo:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      title:
        'This is the title Component of your blog his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d',
    },
    {
      id: 144,
      name: 'Shagun Sethi',
      date: '25 July',
      time: '5 min',
      profilePhoto:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      photo:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      title:
        'This is the title Component of your blog his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d',
    },
    {
      id: 14444,
      name: 'Shagun Sethi',
      date: '25 July',
      photo:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      profilePhoto:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      time: '5 min',
      title:
        'This is the title Component of your blog his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d',
    },
    {
      id: 14444,
      name: 'Shagun Sethi',
      date: '25 July',
      photo:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      profilePhoto:
        'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      time: '5 min',
      title:
        'This is the title Component of your blog his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d his is the description of the blog that you have edited Desc is the short form of d',
    },
  ];

  const DListItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Bug', {
            photo: item.photo,
            views: item.views,
            name: item.name,
            profilePhoto: item.profilePhoto,
            title: item.title,
            category: item.category,
            content: item.content,
            email: item.email,
          })
        }>
        <View style={styles.titem}>
          <Image
            source={{
              uri: 'https://picsum.photos/id/1002/200',
            }}
            style={styles.titemPhoto}
            resizeMode="cover"
          />
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: 'https://picsum.photos/id/1002/200',
              }}
              style={{height: 17, width: 17, borderRadius: 50, top: 7}}
            />
            <Text
              style={{
                color: '#5E5D5E',
                marginLeft: '2%',
                fontFamily: 'SF-Pro-Display-Regular',
                fontSize: 13,
                top: 6,
              }}>
              {item.name}
              {/* Shagun */}
            </Text>
          </View>

          <Text numberOfLines={3} style={{color: '#000000', marginTop: 9}}>
            {item.title}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#5E5D5E',
                fontFamily: 'SF-Pro-Display-Regular',
                fontSize: 13,
                top: 4,
              }}>
              {item.date}
              {/* 12 dec */}
            </Text>
           
           
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const TListItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Bug', {
            photo: item.photo,
            views: item.views,
            name: item.name,
            profilePhoto: item.profilePhoto,
            title: item.title,
            category: item.category,
            content: item.content,
            email: item.email,
          })
        }>
        <View style={styles.titem}>
          <Image
            source={{
              uri: 'https://picsum.photos/id/1002/200',
            }}
            style={styles.titemPhoto}
            resizeMode="cover"
          />
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: 'https://picsum.photos/id/1002/200',
              }}
              style={{height: 17, width: 17, borderRadius: 50, top: 7}}
            />
            <Text
              style={{
                color: '#5E5D5E',
                marginLeft: '2%',
                fontFamily: 'SF-Pro-Display-Regular',
                fontSize: 13,
                top: 6,
              }}>
              {/* {item.name} */}
              Shagun sethi
            </Text>
          </View>

          <Text numberOfLines={3} style={{color: '#000000', marginTop: 9}}>
            {/* {item.title} */}
            This is the title of the post
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#5E5D5E',
                fontFamily: 'SF-Pro-Display-Regular',
                fontSize: 13,
                top: 4,
              }}>
              {/* {item.date} */}
              12 dec
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#5E5D5E',
                marginLeft: 4,
                marginRight: 4,
                top: 5,
              }}>
              ·
            </Text>
            <Text
              style={{
                color: '#5E5D5E',
                fontFamily: 'SF-Pro-Display-Regular',
                fontSize: 13,
                top: 5,
              }}>
              {/* {item.time} */}5 min read
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // "https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg"
  const Users = ({item}) => {
    return (
      <View style={[styles.listcontainer]}>
        <Image
          style={styles.listimage}
          source={{uri: 'https://picsum.photos/id/1002/200'}}
        />
        <View style={styles.contentlist}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: 'https://picsum.photos/id/1002/200',
              }}
              style={{height: 17, width: 17, borderRadius: 50, bottom: 5}}
            />
            <Text
              style={{
                color: '#5E5D5E',
                marginLeft: '2%',
                fontFamily: 'SF-Pro-Display-Regular',
                fontSize: 13,
                bottom: 5,
              }}>
              {/* {item.name} */}
              Shagun sethi
            </Text>
          </View>
          <Text numberOfLines={2} style={{fontSize: 13, color: '#5E5D5E'}}>
            {/* {item.title} */}
            This is the title of the post
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#5E5D5E',
                fontFamily: 'SF-Pro-Display-Regular',
                fontSize: 13,
                top: 4,
              }}>
              {/* {item.date} */}
              23 july
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#5E5D5E',
                marginLeft: 4,
                marginRight: 4,
                top: 5,
              }}>
              ·
            </Text>
            <Text
              style={{
                color: '#5E5D5E',
                fontFamily: 'SF-Pro-Display-Regular',
                fontSize: 13,
                top: 5,
              }}>
              5 min
              {/* {item.time} */}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const SECTIONS = [
    {
      key: '10',
      uri: 'https://picsum.photos/id/1/200',
      name: 'Shagun Sethi',
    },
    {
      key: '20',
      uri: 'https://picsum.photos/id/10/200',
      name: 'Shagun Sethi',
    },

    {
      key: '30',
      uri: 'https://picsum.photos/id/1002/200',
      name: 'Shagun Sethi',
    },
    {
      key: '40',
      uri: 'https://picsum.photos/id/1006/200',
      name: 'Shagun Sethi',
    },
    {
      key: '50',
      uri: 'https://picsum.photos/id/1008/200',
      name: 'Shagun Sethi',
    },
  ];

  const ListItems = ({item}) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://picsum.photos/id/1002/200',
            }}
            style={styles.itemPhotos}
            resizeMode="cover"
          />
          <Text
            style={{
              color: '#5E5D5E',
              marginTop: 10,
              fontFamily: 'SF-Pro-Display-Regular',
              fontSize: 10,
            }}>
            {/* {feed[0].name} */}
            shagun
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ListItem = ({item}) => {
    return (
      <View style={styles.items}>
        <Image
          source={{
            uri: 'https://picsum.photos/id/1002/200',
          }}
          style={{height: 100, width: 100, borderRadius: 15}}
          resizeMode="cover"
        />
        <Text
          style={{
            color: '#5E5D5E',
            marginLeft: 22,
            fontFamily: 'SF-Pro-Display-Regular',
            fontSize: 17,
          }}>
          {item.name}
        </Text>

        <Text numberOfLines={2} style={styles.itemText}>
          {/* {item.title} */}
          This is the title of the Component screen
        </Text>

        <Button title="Follow" />
      </View>
    );
  };

  return (
    <>
      {loader ? (
        <View style={{minHeight:'100%'}}>
          <SearchLoading  />
          
        </View>
      ) : null}
      {notFound ? (
        <View>
          <View>
            {loader ? null : (
              <ScrollView>
                <View style={styles.FlatSyle}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginBottom: '5%',
                    }}>
                    <View style={{marginTop: '5%'}}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        Top Users
                      </Text>
                    </View>
                  </View>
                  <Animated.FlatList
                    scrollEventThrottle={16}
                    contentContainerStyle={{
                      // paddingTop: headerHeight + headerHeight * 0.15,
                      paddingBottom: '1%',
                      // backgroundColor: 'red',
                      width: '100%',
                    }}
                    // onScroll={handleScroll}
                    // ref={ref}
                    key={'-'}
                    horizontal
                    // onMomentumScrollEnd={handleSnap}
                    data={Topusers}
                    renderItem={object => <TopUsers item={object.item} />}
                    keyExtractor={item => '-' + item.key}
                  />
                </View>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Bug', {
                      photo: Top.photo,
                      views: Top.views,
                      name: Top.name,
                      profilePhoto: Top.profilePhoto,
                      title: Top.title,
                      category: Top.category,
                      content: Top.content,
                      email: Top.email,
                      photo: Top.photo,
                      date: Top.date,
                      title: Top.title,
                    })
                  }>
                  <View>
                    <View style={styles.maincard}>
                      <View
                        style={{
                          height: 1,
                          width: '100%',
                          backgroundColor: '#A7A7A7',
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          alignSelf: 'center',
                          marginTop: '10%',
                        }}>
                        {/* <Feather name="trending-up" size={20} color="#00000" /> */}

                        <Text
                          style={{
                            marginLeft: '2%',
                            fontSize: 28,
                            color: '#5E5D5E',
                          }}>
                          Top Trending
                        </Text>
                      </View>

                      <Image
                        style={styles.image}
                        source={{uri: 'https://picsum.photos/id/1002/200'}}
                      />
                      <View style={styles.contentcontainer}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 8,
                          }}>
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                              marginBottom: '5%',
                            }}>
                            <Image
                              source={{
                                uri: Top.profilePhoto,
                              }}
                              style={{height: 23, width: 23, borderRadius: 50}}
                            />
                            <Text
                              style={{
                                color: '#5E5D5E',
                                marginLeft: '2%',
                                fontFamily: 'SF-Pro-Display-Regular',
                                fontSize: 13,
                              }}>
                              {/* {Top.name} */}
                              Shagun Sethi
                            </Text>

                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: '#5E5D5E',
                                marginLeft: 4,
                                marginRight: 4,
                              }}>
                              ·
                            </Text>
                            <Text
                              style={{
                                color: '#5E5D5E',
                                fontFamily: 'SF-Pro-Display-Regular',
                                fontSize: 13,
                              }}>
                              {/* {Top.date} */}
                              12 dec
                            </Text>
                          </View>
                        </View>
                        <Text
                          numberOfLines={3}
                          style={{fontSize: 13, color: '#5E5D5E'}}>
                          {/* {Top.title} */}
                          This is the title of post
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{height: 1, width: '100%', backgroundColor: '#A7A7A7'}}
                />

                <>
                  {/* 


<View>       */}
                  <View style={styles.listcard}>
                    <View style={{alignItems: 'center', alignSelf: 'center'}}>
                      <Text style={{fontSize: 28, color: '#5E5D5E'}}>
                        Recommended
                      </Text>
                    </View>
                    <FlatList
                      // key={'assscscsc'}
                      data={feed}
                      renderItem={({item}) => <Users item={item} />}
                      showsHorizontalScrollIndicator={false}
                    />
                    <>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Bug', {
                            photo: reco.photo,
                            views: reco.views,
                            name: reco.name,
                            profilePhoto: reco.profilePhoto,
                            title: reco.title,
                            category: reco.category,
                            content: reco.content,
                            email: reco.email,
                          })
                        }>
                        <View style={[styles.listcontainer]}>
                          <Image
                            style={styles.listimage}
                            source={{uri: reco.imgPath}}
                          />
                          <View style={styles.contentlist}>
                            <View style={{flexDirection: 'row'}}>
                              <Image
                                source={{
                                  uri: reco.profilePhoto,
                                }}
                                style={{
                                  height: 17,
                                  width: 17,
                                  borderRadius: 50,
                                  bottom: 5,
                                }}
                              />
                              <Text
                                style={{
                                  color: '#5E5D5E',
                                  marginLeft: '2%',
                                  fontFamily: 'SF-Pro-Display-Regular',
                                  fontSize: 13,
                                  bottom: 5,
                                }}>
                                {reco.name}
                                {/* Shagun Sethi */}
                              </Text>
                            </View>
                            <Text
                              numberOfLines={2}
                              style={{fontSize: 13, color: '#5E5D5E'}}>
                              {reco.title}

                              {/* this is the title */}
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  color: '#5E5D5E',
                                  fontFamily: 'SF-Pro-Display-Regular',
                                  fontSize: 13,
                                  top: 4,
                                }}>
                                {reco.date}
                                {/* 23 july */}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: '#5E5D5E',
                                  marginLeft: 4,
                                  marginRight: 4,
                                  top: 5,
                                }}></Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Bug', {
                            photo: reco1.photo,
                            views: reco1.views,
                            name: reco1.name,
                            profilePhoto: reco1.profilePhoto,
                            title: reco1.title,
                            category: reco1.category,
                            content: reco1.content,
                            email: reco1.email,
                          })
                        }>
                        <View style={[styles.listcontainer]}>
                          <Image
                            style={styles.listimage}
                            source={{uri: reco1.imgPath}}
                          />
                          <View style={styles.contentlist}>
                            <View style={{flexDirection: 'row'}}>
                              <Image
                                source={{
                                  uri: reco1.profilePhoto,
                                }}
                                style={{
                                  height: 17,
                                  width: 17,
                                  borderRadius: 50,
                                  bottom: 5,
                                }}
                              />
                              <Text
                                style={{
                                  color: '#5E5D5E',
                                  marginLeft: '2%',
                                  fontFamily: 'SF-Pro-Display-Regular',
                                  fontSize: 13,
                                  bottom: 5,
                                }}>
                                {reco1.name}
                                {/* Shagun */}
                              </Text>
                            </View>
                            <Text
                              numberOfLines={2}
                              style={{fontSize: 13, color: '#5E5D5E'}}>
                              {reco1.title}
                              {/* This is the title */}
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  color: '#5E5D5E',
                                  fontFamily: 'SF-Pro-Display-Regular',
                                  fontSize: 13,
                                  top: 4,
                                }}>
                                {reco1.date}
                                {/* 12 dec */}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: '#5E5D5E',
                                  marginLeft: 4,
                                  marginRight: 4,
                                  top: 5,
                                }}></Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Bug', {
                            photo: reco2.photo,
                            views: reco2.views,
                            name: reco2.name,
                            profilePhoto: reco2.profilePhoto,
                            title: reco2.title,
                            category: reco2.category,
                            content: reco2.content,
                            email: reco2.email,
                          })
                        }>
                        <View style={[styles.listcontainer]}>
                          <Image
                            style={styles.listimage}
                            source={{uri: reco2.imgPath}}
                          />
                          <View style={styles.contentlist}>
                            <View style={{flexDirection: 'row'}}>
                              <Image
                                source={{
                                  uri: reco2.profilePhoto,
                                }}
                                style={{
                                  height: 17,
                                  width: 17,
                                  borderRadius: 50,
                                  bottom: 5,
                                }}
                              />
                              <Text
                                style={{
                                  color: '#5E5D5E',
                                  marginLeft: '2%',
                                  fontFamily: 'SF-Pro-Display-Regular',
                                  fontSize: 13,
                                  bottom: 5,
                                }}>
                                {reco2.name}
                                {/* Shagun */}
                              </Text>
                            </View>
                            <Text
                              numberOfLines={2}
                              style={{fontSize: 13, color: '#5E5D5E'}}>
                              {reco2.title}
                              {/* This is the title */}
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  color: '#5E5D5E',
                                  fontFamily: 'SF-Pro-Display-Regular',
                                  fontSize: 13,
                                  top: 4,
                                }}>
                                {reco2.date}

                                {/* 12 dec */}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: '#5E5D5E',
                                  marginLeft: 4,
                                  marginRight: 4,
                                  top: 5,
                                }}></Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </>

                    {/* <View> */}
                    {/* <View style={[styles.listcontainer]}> */}
                    {/* <Image  style={styles.listimage} source={{uri:reco[0].photo}}/> */}
                    {/* </View> */}

                    {/* </View> */}
                  </View>
                  {/* </View>
   
</View> */}
                </>

                <View
                  style={{height: 1, width: '100%', backgroundColor: '#A7A7A7'}}
                />

                <View style={styles.tFollowcard}>
                  <View style={styles.tFlatSyle}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        paddingBottom: '5%',
                      }}>
                      <Text
                        style={{
                          marginLeft: '2%',
                          fontSize: 28,
                          color: '#5E5D5E',
                        }}>
                        Entertainment
                      </Text>
                    </View>
                    <FlatList
                      horizontal
                      key={'a'}
                      data={Ent}
                      renderItem={({item}) => <DListItem item={item} />}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                </View>
                <View
                  style={{height: 1, width: '100%', backgroundColor: '#A7A7A7'}}
                />

                <View style={styles.Followcard}>
                  <View style={{padding: 20}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      {/* <Entypo  name="add-user" size={23} color="#00000" /> */}
                      <Text
                        style={{
                          marginLeft: '2%',
                          fontSize: 28,
                          color: '#5E5D5E',
                        }}>
                        Who To Follow
                      </Text>
                    </View>
                    {/* <FlatList
      key={'aaaa'}
        horizontal
        data={[{
          name:'Shagun',
          profilephoto:'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png',
          title:'owo'
        }]}
        renderItem={({item}) => <ListItem item={item} />}
        showsHorizontalScrollIndicator={false}
      /> */}

                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() =>
                          

                          navigation.navigate('UserProfile',{
                            followingData:[reco3],
                            following: 'SearchUserScreen',
                          })
                        }
                        
                        >
                        <View style={styles.items}>
                          <Image
                            source={{
                              uri: reco3.profilePhoto,
                            }}
                            style={{height: 70, width: 70, borderRadius: 5}}
                            resizeMode="cover"
                          />
                          <Text
                            style={{
                              color: '#5E5D5E',
                              alignItems: 'center',
                              fontFamily: 'SF-Pro-Display-Regular',
                              fontSize: 13,
                            }}>
                            {reco3.name}
                            {/* Shagun sethi */}
                          </Text>

                          {/* <Text numberOfLines={2} style={styles.itemText}>this is the title section where we write title </Text>
                           */}
                          <Button title="Follow" />
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                         onPress={() =>
                          

                          navigation.navigate('UserProfile',{
                            followingData:[reco4],
                            following: 'SearchUserScreen',
                          })
                        }
                        >

                        <View style={styles.items}>
                          <Image
                            source={{
                              uri: reco4.profilePhoto,
                            }}
                            style={{height: 70, width: 70, borderRadius: 5}}
                            resizeMode="cover"
                          />
                          <Text
                            style={{
                              color: '#5E5D5E',
                              alignItems: 'center',
                              fontFamily: 'SF-Pro-Display-Regular',
                              fontSize: 13,
                            }}>
                            {reco4.name}
                            {/* Shagun */}
                          </Text>

                          <Button title="Follow" />
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          

                          navigation.navigate('UserProfile',{
                            followingData:[reco5],
                            following: 'SearchUserScreen',
                          })
                        }
                        >
                        <View style={styles.items}>
                          <Image
                            source={{
                              uri: reco5.profilePhoto,
                            }}
                            style={{height: 70, width: 70, borderRadius: 5}}
                            resizeMode="cover"
                          />
                          <Text
                            style={{
                              color: '#5E5D5E',
                              alignItems: 'center',
                              fontFamily: 'SF-Pro-Display-Regular',
                              fontSize: 13,
                            }}>
                            {reco5.name}
                            {/* Shagun sethi */}
                          </Text>

                          <Button title="Follow" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View
                  style={{height: 1, width: '100%', backgroundColor: '#A7A7A7'}}
                />

                <View style={styles.tFollowcard}>
                  <View style={styles.tFlatSyle}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        paddingBottom: '5%',
                      }}>
                      <Text
                        style={{
                          marginLeft: '2%',
                          fontSize: 28,
                          color: '#5E5D5E',
                        }}>
                        Technology
                      </Text>
                    </View>
                    <FlatList
                      horizontal
                      key={'a'}
                      data={Tech}
                      renderItem={({item}) => <TListItem item={item} />}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  FlatSyle: {
    padding: 20,
  },
  item: {
    flexDirection: 'row',
  },
  items: {
    flexDirection: 'column',
    padding: 20,
  },
  itemPhotos: {
    width: 60,
    height: 60,
    borderRadius: 80,
  },
  itemText: {
    color: '#000000',
  },
  contentcontainer: {
    padding: 5,
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 30,
  },
  image: {
    width: 250,
    height: 150,
    marginLeft: 50,
    marginTop: 20,
    borderRadius: 4,
  },
  listcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 0,
    height: 100,
    padding: 10,
    margin: 20,
  },
  listimage: {
    flex: 0.35,
    height: '100%',
  },
  contentlist: {flex: 0.65, paddingHorizontal: 5},
  maincard: {
    width: '100%',
    height: 400,

    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },

  Followcard: {
    width: '100%',
    height: 300,
    overflow: 'hidden',
    backgroundColor: '#efeff2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  listcard: {
    width: '100%',

    marginTop: 30,
    marginBottom: 30,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#efeff2',
    flexDirection: 'column',
  },
  titem: {
    margin: 10,
    flexDirection: 'column',
    width: 220,
  },
  itemPhoto: {
    width: '100%',
    height: 150,
  },
  titemPhoto: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  tFollowcard: {
    width: '100%',
    height: 400,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  tFlatSyle: {
    flex: 1,
    padding: 20,
  },
});
