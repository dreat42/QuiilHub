import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import FollowersList from './Components/FollowersList';
import firestore from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';
import {LoginContext} from './Context/Context';


const ProfileList = ({navigation}) => {
//   const {header, list} = route.params;
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  const {user} = useContext(LoginContext);

  const readFunction = () => {
    setData(user);
  };

  useEffect(() => {
    readFunction();
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#FAFAFC',
        flex: 1,
      }}>
      {loader ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 10,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 140,
              width: 140,
              backgroundColor: '#f2f3f0',
              alignItems: 'center',
              justifyContent: 'center',

              borderRadius: 15,
            }}>
            <LottieView
              source={require('./assets/loader.json')}
              autoPlay
              loop
              style={{height: 150, width: 150}}
            />
          </View>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FAFAFC',
          padding: '5%',
          alignItems: 'center',
        }}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Image
            tintColor="#2B2B2E"
            source={require('./assets/close.png')}
            style={{height: 32, width: 32}}
          />
        </TouchableOpacity>
      </View>
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
            fontSize: 26.5,
          }}>
          {/* {header} */}ddd
        </Text>
      </View>

      <View style={{margin: '7%'}}>
        <FlatList
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingBottom: '1%',
            width: '100%',
          }}
          data={data}
          renderItem={object => <FollowersList item={object.item} />}
          keyExtractor={item => item.key}
        />
      </View>
    </View>
  );
};

export default ProfileList;
