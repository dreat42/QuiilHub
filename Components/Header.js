import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
// import LottieView from 'lottie-react-native';

const Header = props => {
  const {dataSetter, stateChanger, headerHeight} = props;
  const [Input, setInput] = useState('');

  const [data , setData]=useState([]);
  //transiton on click on search bar
  const [iconWidth1, setIconWidth1] = useState({
    iconWidth: '20%',
    imageWidth: 26,
  });
  const [iconWidth2, setIconWidth2] = useState({
    iconWidth: '0%',
    imageWidth: 0,
  });
  const [loader, setLoader] = useState(false);
  // const translation = useRef(new Animated.Value(100)).current;
  const animatedButtonScale = new Animated.Value(1);
  const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  //function for fetching user query from firestore
  // const queryFetcher = async userInput => {
  //   setLoader(true);
  //   const snapshot = await firestore()
  //     .collection('users')
  //     .where('username', '>=', `@${userInput.toLowerCase()}`)
  //     .where('username', '<=', `@${userInput.toLowerCase()}` + '~')
  //     .get();
  //   if (snapshot.empty) {
  //     dataSetter([]);
  //     setLoader(false);
  //     return;
  //   }
  //   let feed = [];
  //   snapshot.forEach(documentSnapshot => {
  //     feed.push({
  //       ...documentSnapshot.data(),
  //       key: documentSnapshot.id,
  //     });
  //     if (feed.length != 0) {
  //       dataSetter(feed);
  //       setLoader(false);
  //     }
  //   });
  // };





  const queryFetcher = async userInput => {

    // console.log(Input);
    setLoader(true);

    // try {
      await fetch(
        `http://192.168.120.129:3000/users/${Input}`
      ).then(res=>res.json())
      .then(
        data=>{
        // console.log(data);
        //   setData(data)
          dataSetter(data);
          setLoader(false);
            }
          )
  }
 


      // console.log(response);
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // const jsonData = await response.json();

      // if (jsonData.length === 0) {
      //   setData([]);
      // } else {
      //   const feed = jsonData.map(document => ({
      //     ...document,
      //     key: document._id
      //   }));

      //   setData(feed);
      // }
    // } catch (error) {
    //   // Handle error
    //   console.error(error);
    // } finally {
    //   setLoader(false);
    // }
  // };





  const SearchBarActive = () => {
    setIconWidth1({iconWidth: '0%', imageWidth: 0});
    setIconWidth2({iconWidth: '20%', imageWidth: 32});

    // Animated.timing(translation, {
    //   toValue: 0,
    //   useNativeDriver: true,
    // }).start();
  };
  const SearchBarInActive = () => {
    setIconWidth2({iconWidth: '0%', imageWidth: 0});
    setIconWidth1({iconWidth: '20%', imageWidth: 26});
    // Animated.timing(translation, {
    //   toValue: 100,
    //   useNativeDriver: true,
    // }).start();
  };

  return (
    <>
      <View
        style={[
          styles.subHeader,
          {
            height: headerHeight / 1.8,
          },
        ]}>
        <Text style={styles.conversation}>Search</Text>
      </View>
      <View
        style={[
          styles.subHeader,
          {
            height: headerHeight / 1.8,
          },
        ]}>
        <View style={styles.searchBox}>
          <Animated.View
            style={{
              width: iconWidth1.iconWidth,
              alignItems: 'center',
            }}>
            <Image
              tintColor="#2B2B2E"
              source={require('../assets/search.png')}
              style={{height: 26, width: iconWidth1.imageWidth}}
            />
          </Animated.View>

          <TextInput
            style={styles.searchText}
            placeholder="Search for articles or users"
            placeholderTextColor="black"
            defaultValue={Input}
            onChangeText={userInput => {
              if (userInput.length > 0) {
                setInput(userInput);
                SearchBarActive();
                stateChanger({hideCatog: true, loader: true});
                queryFetcher(userInput);
              } else if (userInput.length == 0) {
                setInput(userInput);
                SearchBarInActive();
                stateChanger({hideCatog: false, loader: false});
              }
            }}
          />
          <Animated.View
            style={{
              width: iconWidth2.iconWidth,
              alignItems: 'center',
              transform: [
                // {translateX: translation},
                {scale: animatedButtonScale},
              ],
            }}>
            <View>
              {loader ? (
                <View
                  style={{
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                  {/* <LottieView
                    source={require('../assets/loader.json')}
                    autoPlay
                    loop
                    style={{height: 70, width: 70}}
                  /> */}
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setInput('');
                    SearchBarInActive();
                    stateChanger({hideCatog: false, loader: false});
                  }}
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}>
                  <Image
                    tintColor="#2b2b2e"
                    source={require('../assets/close.png')}
                    style={{height: 32, width: iconWidth2.imageWidth}}
                  />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    width: '100%',
    paddingHorizontal: 0,
    backgroundColor: '#f2f3f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversation: {
    padding: '2%',
    color: '#1C1C1C',
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 35,
  },
  searchText: {
    color: '#2B2B2E',
    fontSize: 19,
    marginLeft: '3%',
    width: '80%',
    height: 50,
    fontFamily: 'SF-Pro-Display-Regular',
  },
  searchBox: {
    // paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: '1.5%',
    marginBottom: '1.5%',
    backgroundColor: '#e8e8e9',
    borderRadius: 10,
    width: '100%',
    height:50,
    alignItems:'center',
 
    flexDirection: 'row',
    flexShrink: 1,
  },
});
export default Header;
