import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const HomeLoading = () => {
  return (
    <View style={{flex: 1}}>
      {/* <ShimmerPlaceHolder shimmerColors={['#d8d8d8','#e5e5e5','#f2f2f2']}> */}
      <View
        style={{
          marginLeft: '2%',
          marginRight: '2%',
          paddingTop: '3%',
          paddingBottom: '1%',
        }}>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: 70, height: 70}}>
              <ShimmerPlaceHolder
                shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
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
              
                <ShimmerPlaceHolder
                  shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
                  style={{
                    height: 10,
                    width: '100%',
                    borderRadius: 5,
                    marginTop: '3%',
                    marginBottom: '3%',
                  }}
                />

               

              <ShimmerPlaceHolder
                shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
                style={{
                  height: 10,
                  width: '85%',
                  borderRadius: 5,
                  marginTop: '4%',
                  marginBottom: '3%',
                }}
              />


              <ShimmerPlaceHolder
                shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
                style={{
                  height: 10,
                  width: '50%',
                  borderRadius: 5,
                  marginTop: '4%',
                  marginBottom: '5%',
                }}
              />
             

             
            </View>
          </View>
        </View>
      </View>
      {/* </ShimmerPlaceHolder> */}
    </View>
  );
};

export default HomeLoading;
