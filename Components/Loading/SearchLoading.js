import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const SearchLoading = () => {
  return (
    <View style={{flex: 1}}>
      {/* <ShimmerPlaceHolder shimmerColors={['#d8d8d8','#e5e5e5','#f2f2f2']}> */}
      <View
        style={{
          marginLeft: '6.5%',
          marginRight: '6.5%',
          paddingTop: '3%',
          paddingBottom: '1%',
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <ShimmerPlaceHolder
            shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
            style={{
              height: 15,
              width: '30%',
              borderRadius: 5,
              marginTop: '6%',
              marginBottom: '8%',
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <View style={{width: 70, height: 70}}>
            <ShimmerPlaceHolder
              shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 50,
              }}
            />
             <ShimmerPlaceHolder
            shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
            style={{
              height: 8,
              width: '100%',
              borderRadius: 5,
              marginTop: '20%',
              marginBottom: '10%',
             
              
            }}
          />
          </View>
          <View style={{width: 70, height: 70}}>
            <ShimmerPlaceHolder
              shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 50,
              }}
            />
             <ShimmerPlaceHolder
            shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
            style={{
              height: 8,
              width: '100%',
              borderRadius: 5,
              marginTop: '20%',
              marginBottom: '10%',
             
              
            }}
          />
          </View>
          <View style={{width: 70, height: 70}}>
            <ShimmerPlaceHolder
              shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 50,
              }}
            />
               <ShimmerPlaceHolder
            shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
            style={{
              height: 8,
              width: '100%',
              borderRadius: 5,
              marginTop: '20%',
              marginBottom: '10%',
             
              
            }}
          />
          </View>
        </View>
      </View>





      <View
        style={{
          marginLeft: '6.5%',
          marginRight: '6.5%',
          paddingTop: '15%',
          paddingBottom: '1%',
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <ShimmerPlaceHolder
            shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
            style={{
              height: 15,
              width: '50%',
              borderRadius: 35,
              marginTop: '16%',
              marginBottom: '8%',
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 15,
          }}>
          
          <View style={{width: 250, height: 150}}>
            <ShimmerPlaceHolder
              shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
              style={{
                height: '100%',
                width: '100%',
                borderRadius:10
              
              }}
            />

<ShimmerPlaceHolder
            shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
            style={{
              height: 8,
              width: '60%',
              borderRadius: 5,
              marginTop: '8%',
              marginBottom: '10%',
             
              
            }}
          />
           
          </View>
          
          
        </View>
        </View>

      {/* </ShimmerPlaceHolder> */}
    </View>
  );
};

export default SearchLoading;
