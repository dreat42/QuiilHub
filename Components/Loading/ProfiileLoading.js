import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const ProfileLoading = () => {
  return (
    <View  >
      {/* <ShimmerPlaceHolder shimmerColors={['#d8d8d8','#e5e5e5','#f2f2f2']}> */}

      <View
        style={{
          // flexDirection: 'row',
          marginLeft: '6.5%',
          marginRight: '6.5%',
          paddingTop: '15%',
          paddingBottom: '1%',
        
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 15,
          }}>
          <View style={{width: 220, height: 220}}>
            <ShimmerPlaceHolder
              shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 500,
              }}
            />

            <View
              style={{
                alignItems: 'center',
              }}>
              <ShimmerPlaceHolder
                shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
                style={{
                  height: 25,
                  width: '100%',
                  borderRadius: 35,
                  marginTop: '16%',
                  marginBottom: '8%',
                }}
              />
              <ShimmerPlaceHolder
                shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
                style={{
                  height: 15,
                  width: '60%',
                  borderRadius: 5,
                  marginTop: '8%',
                  marginBottom: '10%',
                }}
              />

              <View
                style={{
                  flexDirection: 'row', 
                  justifyContent: 'space-between',
                  width: '140%', // Set the width to the maximum required width
                  marginTop: '8%',
                  marginBottom: '10%',
                }}>
                  
                <ShimmerPlaceHolder
                  shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
                  style={{
                    height: 35,
                    width: '15%',
                    borderRadius: 15,
                    marginTop: '8%',
                    marginBottom: '10%',
                  }}
                />
                <ShimmerPlaceHolder
                  shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
                  style={{
                    height: 35,
                    width: '15%',
                    borderRadius: 15,
                    marginTop: '8%',
                    marginBottom: '10%',
                  }}
                />
                <ShimmerPlaceHolder
                  shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
                  style={{
                    height: 35,
                    width: '15%',
                    borderRadius: 15,
                    marginTop: '8%',
                    marginBottom: '10%',
                  }}
                />
                <ShimmerPlaceHolder
                  shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
                  style={{
                    height: 35,
                    width: '15%',
                    borderRadius: 15,
                    marginTop: '8%',
                    marginBottom: '10%',
                  }}
                />
              </View>
            <View>

           

            
            </View>
            </View>




            

           
            


           
           

          </View>

          
          
        </View>
        
        <View
                style={{
                  flexDirection: 'row', 
                  justifyContent: 'space-between',
                  marginTop: '80%',
                }}>
                  
                <ShimmerPlaceHolder
                  shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
                  style={{
                    height: 305,
                    width: '45%',
                    borderRadius: 15,
                    marginTop: '8%',
                    marginBottom: '10%',
                  }}
                />
                <ShimmerPlaceHolder
                  shimmerColors={['#d8d8d8', '#e5e5e5', '#f2f2f2']}
                  style={{
                    height: 305,
                    width: '45%',
                    borderRadius: 15,
                    marginTop: '8%',
                    marginBottom: '10%',
                  }}
                />
                </View>
              

        
      </View>


      

      {/* </ShimmerPlaceHolder> */}
    </View>
  );
};

export default ProfileLoading;
