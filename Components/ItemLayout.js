import React from 'react';
import {Text, View, Image} from 'react-native';
import { AppLoading } from 'expo';
// import { useFonts } from "@use-expo/font";
export const HEIGHT = 110;



function ItemLayout({item}) {


  // const [isLoaded] = useFonts({
  //   // "SourceSans-ExtraLight": require("./assets/fonts/SourceSansPro-ExtraLight.ttf"),
  //   // "SourceSans-Light": require("./assets/fonts/SourceSansPro-Light.ttf"),
  //   // "SourceSans-Regular": require("./assets/fonts/SourceSansPro-Regular.ttf"),
  //   // "SourceSans-SemiBold": require("./assets/fonts/SourceSansPro-SemiBold.ttf"),
  //   // "SourceSans-Bold": require("./assets/fonts/SourceSansPro-Bold.ttf"),
  //   // "SourceSans-Black": require("./assets/fonts/SourceSansPro-Black.ttf"),
  // });


  // if (!isLoaded) {
  //   return <AppLoading />;
  // } else {
  return (
    <View
      style={{
        backgroundColor: '#FAFAFC',
        marginLeft: '6.5%',
        marginRight: '6.5%',
        paddingTop: '3%',
        paddingBottom: '1%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        

        <View
          style={{
            width: '72%',
            flexDirection: 'column',
            height: 110,
           
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '3%',
            }}>

            <Text
              style={{
                color: "black",
                marginLeft: '2%',
                fontFamily: 'SF-Pro-Display-Regular',
                fontSize: 12,
            
              }}>
              {item.name}
            </Text>

     
              
    
          <View style={{ flex:1}}>
            <Text
              style={{
                color: '#5E5D5E',
           
                fontFamily: 'SF-Pro-Display-Regular',
                fontSize: 12,
                justifyContent: 'flex-end',
                marginLeft:'auto'
               
              }}>
              {item.date}
            </Text>
            </View>
         
          </View>
          <Text
            style={{
              color: '#2A292E',
              fontSize: 13,
              fontFamily: 'SF-Pro-Display-Bold',
            
            }}>
            {item.title}
          </Text>
          
<Text style={{marginBottom: '1%',
                marginTop: '2%',
                alignSelf: 'flex-start',
                color: '#5c6892',
                fontFamily: 'SF-Pro-Display-Medium',
                fontSize: 11,
                backgroundColor: '#e6ecff',
                padding: '1%',
                paddingHorizontal: '3%',
                borderRadius: 15, }}>Technology</Text>
          
        </View>
          
          

        <View style={{width: 70, height: 70}}>
          <Image
            source={{uri: item.photo}}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 10,
            }}
          />
          
        </View>
      </View>
    </View>
  );
}
// }


export default ItemLayout;
