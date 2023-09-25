import React, {useState, useEffect} from 'react';
import {Text, View, Image, AsyncStorage} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import Item from './Components/Item';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

const data = [
  {
    date: '25 March',
    email: 'arjunsethi33@gmail.com',
    id: 1,
    name: 'Rahul',
    photo:
      'https://lh3.googleusercontent.com/a-/AOh14GifYbEmdQTEmZfPm_cqonHf0VrZnOLszuE3Mw7_3w=s96-c',
    profilePhoto:
      'https://lh3.googleusercontent.com/a-/AOh14GifYbEmdQTEmZfPm_cqonHf0VrZnOLszuE3Mw7_3w=s96-c',
    title:
      'Racist White Gamers Came For This Black Woman Writer. Here’s What Happened',
    votes: 25,
  },
  {
    date: '25 March',
    email: 'arjunsethi33@gmail.com',
    id: 2,
    name: 'Arjun Sethi',
    photo:
      'https://lh3.googleusercontent.com/a-/AOh14GifYbEmdQTEmZfPm_cqonHf0VrZnOLszuE3Mw7_3w=s96-c',
    profilePhoto:
      'https://lh3.googleusercontent.com/a-/AOh14GifYbEmdQTEmZfPm_cqonHf0VrZnOLszuE3Mw7_3w=s96-c',
    title: 'This Long-Awaited Technology May Finally Change the World ',
    votes: 30,
  },
  {
    date: '25 March',
    email: 'arjunsethi33@gmail.com',
    id: 3,
    name: 'Arjun Sethi',
    photo:
      'https://lh3.googleusercontent.com/a-/AOh14GifYbEmdQTEmZfPm_cqonHf0VrZnOLszuE3Mw7_3w=s96-c',
    profilePhoto:
      'https://lh3.googleusercontent.com/a-/AOh14GifYbEmdQTEmZfPm_cqonHf0VrZnOLszuE3Mw7_3w=s96-c',
    title: 'This Long-Awaited Technology May Finally Change the World ',
    votes: 30,
  },
  {
    date: '25 March',
    email: 'arjunsethi33@gmail.com',
    id: 4,
    name: 'Arjun Sethi',
    photo:
      'https://lh3.googleusercontent.com/a-/AOh14GifYbEmdQTEmZfPm_cqonHf0VrZnOLszuE3Mw7_3w=s96-c',
    profilePhoto:
      'https://lh3.googleusercontent.com/a-/AOh14GifYbEmdQTEmZfPm_cqonHf0VrZnOLszuE3Mw7_3w=s96-c',
    title: 'This Long-Awaited Technology May Finally Change the World ',
    votes: 30,
  },
  {
    date: '25 March',
    email: 'arjunsethi33@gmail.com',
    id: 5,
    name: 'Arjun Sethi',
    photo:
      'https://lh3.googleusercontent.com/a-/AOh14GifYbEmdQTEmZfPm_cqonHf0VrZnOLszuE3Mw7_3w=s96-c',
    profilePhoto:
      'https://lh3.googleusercontent.com/a-/AOh14GifYbEmdQTEmZfPm_cqonHf0VrZnOLszuE3Mw7_3w=s96-c',
    title: 'This Long-Awaited Technology May Finally Change the World ',
    votes: 30,
  },
  {
    date: '25 March',
    email: 'arjunsethi33@gmail.com',
    id: 6,
    name: 'Arjun Sethi',
    photo:
      'https://lh3.googleusercontent.com/a-/AOh14GifYbEmdQTEmZfPm_cqonHf0VrZnOLszuE3Mw7_3w=s96-c',
    profilePhoto:
      'https://lh3.googleusercontent.com/a-/AOh14GifYbEmdQTEmZfPm_cqonHf0VrZnOLszuE3Mw7_3w=s96-c',
    title: 'This Long-Awaited Technology May Finally Change the World ',
    votes: 30,
  },
  {
    date: '25 March',
    email: 'arjunsethi33@gmail.com',
    id: 7,
    name: 'Arjun Sethi',
    photo:
      'https://lh3.googleusercontent.com/a-/AOh14GifYbEmdQTEmZfPm_cqonHf0VrZnOLszuE3Mw7_3w=s96-c',
    profilePhoto:
      'https://lh3.googleusercontent.com/a-/AOh14GifYbEmdQTEmZfPm_cqonHf0VrZnOLszuE3Mw7_3w=s96-c',
    title: 'This Long-Awaited Technology May Finally Change the World ',
    votes: 30,
  },
];

const UberEatsSwipe = ({navigation}) => {
  const [items, setItems] = useState(data);
  const [isVisible, setIsVisible] = useState(true);

  const onDone = () => {
    //set item in userData showDialog=false, default=true
  };

  const header = () => {
    return (
      <View>
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
              fontSize: 25,
            }}>
            Bookmarks
          </Text>
        </View>
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
      <FlatList
        data={items}
        contentContainerStyle={{paddingBottom: '20%'}}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={header}
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
        renderItem={({item}) => (
          <Item
            onSwipe={() => {
              const newItems = [...items];
              newItems.splice(newItems.indexOf(item), 1);
              setItems(newItems);
            }}
            {...{item}}
          />
        )}
      />
      <Modal
        isVisible={isVisible}
        swipeDirection="down"
        onSwipeComplete={() => {
          setIsVisible(false);
          onDone();
        }}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View
          style={{
            backgroundColor: '#E65539',
            padding: '10%',
            paddingTop: '2%',
            alignItems: 'center',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              tintColor="#FAFAFC"
              source={require('./assets/downvote_lined.png')}
              style={{height: 30, width: 30}}
            />
            <Text
              style={{
                color: '#FAFAFC',
                fontSize: 17,
                fontFamily: 'SF-Pro-Display-Regular',
              }}>
              Swipe down to dismiss
            </Text>
          </View>
          <LottieView
            source={require('./assets/swipe.json')}
            autoPlay
            loop
            style={{height: 250, width: 250}}
          />
          <Text
            style={{
              marginTop: '-20%',
              color: '#FAFAFC',
              fontFamily: 'SF-Pro-Display-Semibold',
              fontSize: 20,
            }}>
            Swipe left to delete items
          </Text>
        </View>
      </Modal>
    </View>
  );
};

export default UberEatsSwipe;
