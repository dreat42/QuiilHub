import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonLoading = () => {
  return (
    <SkeletonPlaceholder highlightColor="#C7C7C9" backgroundColor="#E1E1E2">
      <View
        style={{
          marginLeft: '6.5%',
          marginRight: '6.5%',
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
              <View
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
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: '5%',
                }}>
                <View style={{height: 20, width: 20, borderRadius: 50}} />
                <View
                  style={{
                    height: 17,
                    width: 100,
                    marginLeft: '10%',
                    borderRadius: 5,
                  }}
                />
              </View>
              <View
                style={{
                  height: 17,
                  width: '89%',
                  borderRadius: 5,
                  marginTop: '3%',
                  marginBottom: '3%',
                }}
              />
              <View
                style={{
                  height: 17,
                  width: '70%',
                  borderRadius: 5,
                  marginTop: '1%',
                  marginBottom: '3%',
                }}
              />
              <View
                style={{
                  height: 17,
                  width: 76,
                  borderRadius: 5,
                  marginTop: '4%',
                  marginBottom: '10%',
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default SkeletonLoading;
