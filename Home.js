import React, { useState, useEffect ,useContext} from 'react';
import {
  View,
  Text,
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
// import Bug from './Bug';
import AsyncStorage from '@react-native-community/async-storage';

import { MyContext } from './Components/Context/MyContextProvider';

import HomeLoading from './Components/Loading/HomeLoading';

const Home = ({ navigation }) => {
  const { itemId } = useContext(MyContext);


  const [data, setData] = useState([]);


 

  const [viewcheck, setViewcheck] = useState([]);
  const [loader, setLoader] = useState(true);

  const { height } = useWindowDimensions();
  const loaderHeight = height - height / 3.6;

  const [user, setUser] = useState('loading');

 

  const Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://192.168.42.218:3000/', {
      headers: new Headers({
        Authorization: 'Bearer ' + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //  console.log(data);
        setUser(data);


        fetch('http://192.168.42.218:3000/feeds')
      .then((res) => res.json())
      .then((data) => {
        setData(data);

        setLoader(false);
      });
      });

      
  };

  const UpVoteInsert = async (id) => {
    fetch(`http://192.168.42.218:3000/feeds/UpVote/Insert/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email }),
    });
  };

  const UpVoteDelete = async (id) => {
    fetch(`http://192.168.42.218:3000/feeds/UpVote/Delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email }),
    });
  };

  const DownVoteInsert = async (id) => {
    console.log(id);
    fetch(`http://192.168.42.218:3000/feeds/DownVote/Insert/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email }),
    });
  };

  const DownVoteDelete = async (id) => {
    fetch(`http://192.168.42.218:3000/feeds/DownVote/Delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email }),
    });
  };

  const UpVoteAdd_DownVoteDelete = async (id) => {
    fetch(`http://192.168.42.218:3000/feeds/UpVoteAdd_DownVoteDelete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email }),
    });
  };

  const UpVoteDelete_DownVoteAdd = async (id) => {
    fetch(`http://192.168.42.218:3000/feeds/UpVoteDelete_DownVoteAdd/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email }),
    });
  };



  const BookmarkInsert = async (id) => {
    fetch(`http://192.168.42.218:3000/feeds/Bookmark/Insert/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email }),
    });
  };

  const BookmarkDelete = async (id) => {
    fetch(`http://192.168.42.218:3000/feeds/Bookmark/Delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email }),
    });
  };

  

  // const readFunction = async () => {
    
  // };

  useEffect(() => {
    // readFunction();
    Boiler();
  }, []);


  // useEffect(() => {
  //   readFunction();
  //   Boiler();
  // }, []);


  const header = () => {
    return (
      <View>
        <StatusBar />
        <View
          style={{
            margin: '2%',
          }}
        >
          <View
            style={{
              margin: '4%',
              marginTop: '15%',
            }}
          >
            <Text
              style={{
                padding: '2%',
                paddingLeft: '4%',
                color: '#1C1C1C',
                fontFamily: 'SF-Pro-Display-Semibold',
                fontSize: 56,
              }}
            >
              Home
            </Text>
            {loader ? (
              <View>
                <HomeLoading />
                <HomeLoading />
                <HomeLoading />
                <HomeLoading />
                <HomeLoading />
                <HomeLoading />
              </View>
            ) : null}
          </View>
        </View>

        {loader ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: loaderHeight,
              backgroundColor: '#FAFAFC',
            }}
          ></View>
        ) : null}
      </View>
    );
  };

  const FlatListrender = ({ item, user }) => {


    const handleViewItem = () => {
      if (!visted) {
          
        setvisted(true)
  
        setviews(prev=>prev+1)
        
        fetch(`http://192.168.42.218:3000/ViewsCount/${item.id}`, {
          method: 'POST',
        });
  
      } else {
        console.log('Already Viewed');
      }
    };

 
    const [visted, setvisted] = useState(false);



    const hasUpvoted = item.upvote.some((upvote) => upvote.email == user.email);


    const hasDownvoted = item.downvote.some((upvote) => {
      return upvote.email == user.email;
    });
    const hasBookmarked = user.bookmarked.some((upvote) => {
      return item._id == upvote._id ;
    });

    console.log('user====>',user);

    const [votes, setvotes] = useState(item.votes);
    const [views, setviews] = useState(item.views);

    const [upvoteState, setupvoteState] = useState({
      color: hasUpvoted ? '#73bda8' : '#5E5D5E',
      pressed: hasUpvoted,
    });
    const [downvoteState, setdownvoteState] = useState({
      color: hasDownvoted ? '#cc6b49' : '#5E5D5E',
      pressed: hasDownvoted,
    });

    const [bookmark, setBookmark] = useState(hasBookmarked);


    
  

    const bookmarkAdd = () => {
      BookmarkInsert(item._id);


    
    };

    const bookmarkRemove = () => {
      BookmarkDelete(item._id);
    };

    const upvote = () => {
      if (upvoteState.pressed) {
        UpVoteDelete(item._id);
        setvotes(votes - 1);

        setupvoteState((e) => {
          return {
            color: '#5E5D5E',
            pressed: false,
          };
        });
      } else {
        
        if (downvoteState.pressed) {

          setvotes(votes + 2);


          UpVoteAdd_DownVoteDelete(item._id);
          setdownvoteState({
            color: '#5E5D5E',
            pressed: false,
          });
        }
        else{
          setvotes(votes + 1);
        UpVoteInsert(item._id);

      }
      setupvoteState({
        color: '#73bda8',
        pressed: true,
      });

      }
    };

    const downvote = () => {
      console.log('Downvote');
      if (downvoteState.pressed) {
        DownVoteDelete(item._id);
        setvotes(votes + 1);

        setdownvoteState({
          color: '#5E5D5E',
          pressed: false,
        });
      } else {
       

        if (upvoteState.pressed) {
          setvotes(votes - 2);
          UpVoteDelete_DownVoteAdd(item._id);

          setupvoteState({
            color: '#5E5D5E',
            pressed: false,
          });
        }
        else{
          setvotes(votes - 1);

          DownVoteInsert(item._id);
        }
        setdownvoteState({
          color: '#cc6b49',
          pressed: true,
        });

      }
    };

    // console.log(views);

    // const isSelected = item.id === selectedItemId;
    return (
      <TouchableOpacity
        onPress={() => {
          // console.log(item._id);

          handleViewItem();

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
        <View
          style={{
            marginLeft: '6.5%',
            marginRight: '6.5%',
            paddingTop: '1%',
            paddingBottom: '1%',
          }}
        >
          <View style={{ flexDirection: 'column' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ width: 70, height: 70 }}>
                <Image
                  resizeMode="cover"
                  source={{ uri: item.imgPath }}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 10,
                  }}
                />
              </View>

              <View
                style={{
                  width: '72%',
                  flexDirection: 'column',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom: '4%',
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
                          // marginLeft: '2%',
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
                      photo: item.photo,
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

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: '4%',
                    marginBottom: '1%',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      resizeMode="cover"
                      tintColor="#5E5D5E"
                      source={require('./assets/views.png')}
                      style={{ height: 23, width: 23 }}
                    />
                    <Text
                      style={{
                        color: '#5E5D5E',
                        fontFamily: 'SF-Pro-Display-Regular',
                        fontSize: 13,
                        marginLeft: 3,
                      }}
                    >
                      { views}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {

                      console.log(item);


                      setBookmark(!bookmark);
                      !bookmark ? bookmarkAdd() : bookmarkRemove();
                    }}
                    style={{
                      marginLeft: '3%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      resizeMode="cover"
                      tintColor={bookmark ? '#e5a632' : '#5E5D5E'}
                      source={
                        bookmark
                          ? require('./assets/Bookmark_fill.png')
                          : require('./assets/bookmark.png')
                      }
                      style={{ height: 23, width: 23 }}
                    />
                    <Text
                      style={{
                        color: bookmark ? '#e5a632' : '#5E5D5E',

                        fontFamily: 'SF-Pro-Display-Regular',
                        fontSize: 13,
                        marginLeft: 1,
                      }}
                    >
                      Save{bookmark ? 'd!' : null}
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      marginLeft: 'auto',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        upvote();
                      }}
                    >
                      <Image
                        resizeMode="cover"
                        // tintColor={"green"}
                        tintColor={upvoteState.color}
                        source={
                          upvoteState.pressed
                            ? require('./assets/upvote.png')
                            : require('./assets/upvote_lined.png')

                          // require('./assets/upvote.png')
                        }
                        style={[
                          {
                            height: 25,
                            width: 25,
                          },
                        ]}
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: '#5E5D5E',
                        fontFamily: 'SF-Pro-Display-Semibold',
                        fontSize: 13,
                        padding: 4,
                        marginLeft: 2,
                        marginRight: 2,
                      }}
                    >
                      {votes}
                      {/* saas */}
                    </Text>

                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        downvote();
                      }}
                    >
                      <Image
                        resizeMode="cover"
                        tintColor={downvoteState.color}
                        // tintColor={"red"}
                        source={
                          downvoteState.pressed
                            ? require('./assets/downvote.png')
                            : require('./assets/downvote_lined.png')

                          // require('./assets/downvote.png')
                        }
                        style={[
                          {
                            height: 25,
                            width: 25,
                            alignSelf: 'center',
                          },
                        ]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

 
    const updateBookmark = () => {
          
if(!loader)
{


      setUser((prev)=>{
               return {...prev,bookmarked:prev.bookmarked.filter((x)=>
                x._id != itemId
               )}
      })
    };

  }

    useEffect(()=>{updateBookmark()},[itemId])



  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FAFAFC',
      }}
    >
      <FlatList
        contentContainerStyle={{ paddingBottom: '37%' }}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={(object) => (
          <FlatListrender
           item={object.item} 
           user={user}
         
          
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              width: '100%',
              alignSelf: 'center',
              marginBottom: '6%',
              marginTop: '6%',
              height: 1,
            }}
          />
        )}
        // keyExtractor={(item) => item.id}
        // extraData={selectedItemId}
        ListHeaderComponent={header}
      />

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('PostScreen')}
        style={{
          backgroundColor: '#DBDAE1',

          height: 30,
          width: 30,
          borderRadius: 50,
          right: 0,
          position: 'absolute',
          margin: '5%',

          alignItems: 'center',
          bottom: '10%',
          justifyContent: 'center',
        }}
      >
        <Image
          source={require('./assets/newPost.png')}
          style={{
            height: 42,
            width: 42,
          }}
          tintColor="#1C1C1C"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;