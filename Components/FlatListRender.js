import React, {useState, useContext} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {LoginContext} from '../Context/Context';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

export function FlatListrender({item, index}) {
  const {user} = useContext(LoginContext);
  // const navigation = useNavigation();
  const hasUpvoted = item.upvotes.indexOf(user.email) >= 0;
  const hasDownvoted = item.downvotes.indexOf(user.email) >= 0;
  const hasBookmarked = item.bookmarked.indexOf(user.email) >= 0;

  const [votes, setvotes] = useState(item.votes);
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
    firestore()
      .collection('feeds')
      .doc(item.key)
      .update({
        bookmarked: firebase.firestore.FieldValue.arrayUnion(user.email),
      });
    firestore()
      .collection('users')
      .doc(user.email)
      .update({
        bookmarks: firebase.firestore.FieldValue.arrayUnion(item.key),
      });
  };
  const bookmarkRemove = () => {
    firestore()
      .collection('feeds')
      .doc(item.key)
      .update({
        bookmarked: firebase.firestore.FieldValue.arrayRemove(user.email),
      });
    firestore()
      .collection('users')
      .doc(user.email)
      .update({
        bookmarks: firebase.firestore.FieldValue.arrayRemove(item.key),
      });
  };

  const upvote = () => {
    if (upvoteState.pressed) {
      firestore()
        .collection('feeds')
        .doc(item.key)
        .update({
          upvotes: firebase.firestore.FieldValue.arrayRemove(user.email),
        });
    } else {
      firestore()
        .collection('feeds')
        .doc(item.key)
        .update({
          upvotes: firebase.firestore.FieldValue.arrayUnion(user.email),
        });
      firestore()
        .collection('feeds')
        .doc(item.key)
        .update({
          downvotes: firebase.firestore.FieldValue.arrayRemove(user.email),
        });
    }
    const voteValue = upvoteState.pressed ? -1 : 1;
    const color = upvoteState.pressed ? '#5E5D5E' : '#73bda8';
    setupvoteState({color: color, pressed: !upvoteState.pressed});
    setdownvoteState({color: '#5E5D5E', pressed: false});

    if (downvoteState.pressed) {
      setvotes(votes + 2);

      firestore()
        .collection('feeds')
        .doc(item.key)
        .update({
          votes: votes + 2,
        });
    } else {
      setvotes(votes + voteValue);
      firestore()
        .collection('feeds')
        .doc(item.key)
        .update({
          votes: votes + voteValue,
        });
    }
  };

  const downvote = () => {
    if (downvoteState.pressed) {
      firestore()
        .collection('feeds')
        .doc(item.key)
        .update({
          downvotes: firebase.firestore.FieldValue.arrayRemove(user.email),
        });
    } else {
      firestore()
        .collection('feeds')
        .doc(item.key)
        .update({
          downvotes: firebase.firestore.FieldValue.arrayUnion(user.email),
        });
      firestore()
        .collection('feeds')
        .doc(item.key)
        .update({
          upvotes: firebase.firestore.FieldValue.arrayRemove(user.email),
        });
    }
    const voteValue = downvoteState.pressed ? -1 : 1;
    const color = downvoteState.pressed ? '#5E5D5E' : '#cc6b49';
    setdownvoteState({color: color, pressed: !downvoteState.pressed});
    setupvoteState({color: '#5E5D5E', pressed: false});

    if (upvoteState.pressed) {
      setvotes(votes - 2);
      firestore()
        .collection('feeds')
        .doc(`${item.key}`)
        .update({
          votes: votes - 2,
        });
    } else {
      setvotes(votes - voteValue);
      firestore()
        .collection('feeds')
        .doc(`${item.key}`)
        .update({
          votes: votes - voteValue,
        });
    }
  };

  return (
    <View
      style={{
        marginLeft: '6.5%',
        marginRight: '6.5%',
        paddingTop: '1%',
        paddingBottom: '1%',
      }}>
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: 70, height: 70}}>
            <Image
              resizeMode="cover"
              source={{uri: item.photo}}
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
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: '4%',
                  justifyContent: 'space-between',

                  width: '100%',
                }}>
                <Text
                  style={{
                    color: '#5E5D5E',
                    // marginLeft: '2%',
                    fontFamily: 'SF-Pro-Display-Regular',
                    fontSize: 13,
                  }}>
                  {item.username}
                </Text>

                {/* <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#5E5D5E',
                    marginLeft: 4,
                    marginRight: 4,
                  }}>
                  ·
                </Text> */}
                <Text
                  style={{
                    color: '#5E5D5E',
                    fontFamily: 'SF-Pro-Display-Regular',
                    fontSize: 13,
                  }}>
                  {item.date}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              // onPress={() =>
              //   navigation.navigate('Blog', {
              //     item: item,
              //   })
              >
              <Text
                style={{
                  color: '#2A292E',
                  fontSize: 14,
                  fontFamily: 'SF-Pro-Display-Bold',
                  marginBottom: '2%',
                }}>
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
              }}>
              {item.category}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: '4%',
                marginBottom: '1%',
                width: '100%',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  resizeMode="cover"
                  tintColor="#5E5D5E"
                  source={require('../assets/views.png')}
                  style={{height: 23, width: 23}}
                />
                <Text
                  style={{
                    color: '#5E5D5E',
                    fontFamily: 'SF-Pro-Display-Regular',
                    fontSize: 13,
                    marginLeft: 3,
                  }}>
                  {item.views}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setBookmark(!bookmark);
                  !bookmark ? bookmarkAdd() : bookmarkRemove();
                }}
                style={{
                  marginLeft: '3%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode="cover"
                  tintColor={bookmark ? '#e5a632' : '#5E5D5E'}
                  source={
                    bookmark
                      ? require('../assets/Bookmark_fill.png')
                      : require('../assets/bookmark.png')
                  }
                  style={{height: 23, width: 23}}
                />
                <Text
                  style={{
                    color: bookmark ? '#e5a632' : '#5E5D5E',
                    fontFamily: 'SF-Pro-Display-Regular',
                    fontSize: 13,
                    marginLeft: 1,
                  }}>
                  Save{bookmark ? 'd!' : null}
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  marginLeft: 'auto',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    upvote();
                  }}>
                  <Image
                    resizeMode="cover"
                    tintColor={upvoteState.color}
                    source={
                      upvoteState.pressed
                        ? require('../assets/upvote.png')
                        : require('../assets/upvote_lined.png')
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
                  }}>
                  {votes}
                </Text>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    downvote();
                  }}>
                  <Image
                    resizeMode="cover"
                    tintColor={downvoteState.color}
                    source={
                      downvoteState.pressed
                        ? require('../assets/downvote.png')
                        : require('../assets/downvote_lined.png')
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
  );
}
