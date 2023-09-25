import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabsScreen from './TabsScreen';
import PostScreen from './PostScreen';
import Settings from './Settings';
import Account from './Account';
import Profile from './Profile';
// import BugsScreen from './BugsScreen';
// import Start from './Start';
// import Test from './Test';
import Catlog from './Catlog';
import UserProfile from './UserProfile';
// import FollowersList from './FollowersList';
// import List from './List';

import Bookmark from './Bookmark';

import Bug from './Bug';
import LoginScreen from './LoginScreen';

import FollowersList from './Components/FollowersList';
import FollowingList from './Components/FollowingList';
import Description from './Description';

import BugsScreen from './BugsScreen';

const Stack = createStackNavigator();

function HomeStack({navigation, route}) {
  return (
    <NavigationContainer independent={true}>
      
      <Stack.Navigator>

      {/* <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            headerShown: false,
          }}
        /> */}




      <Stack.Screen
          name="homestack"
          component={TabsScreen}
          options={{
            headerShown: false,
          }}
        />

      <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />

      <Stack.Screen
          name="Account"
          component={Account}
          options={{
            headerShown: false,
          }}
        />
      
      <Stack.Screen
          name="Catlog"
          component={Catlog}
          options={{
            headerShown: false,
          }}
        />
       

        
<Stack.Screen
          name="Description"
          component={Description}
          options={{
            headerShown: false,
          }}
        />

 <Stack.Screen
          name="FollowersList"
          component={FollowersList}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="FollowingList"
          component={FollowingList}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="BugsScreen"
          component={BugsScreen}
          options={{
            headerShown: false,
          }}
        />


     {/* <Stack.Screen
          name="List"
          component={List}
          options={{
            headerShown: false,
          }}
        /> */}
 
 
        

       {/* <Stack.Screen
          name="Start"
          component={Start}
          options={{
            headerShown: false,
          }}
        /> */}
       <Stack.Screen 
         name="PostScreen"
          component={PostScreen}
          options={{
            headerShown: false,
          }}
        /> 
       

    
        <Stack.Screen 
         name="UserProfile"
          component={UserProfile}
          options={{
            headerShown: false,
          }}
        />


  
         <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />

  <Stack.Screen
            name="Bug"
            component={Bug}
            options={{
              headerShown: false,
            }}
          />
        {/* <Stack.Screen
          name="BugsScreen"
          component={BugsScreen}
          options={{
            headerShown: false,
          }}
        /> */}
        {/* <Stack.Screen
          name="Account"
          component={Account}
          options={{
            headerShown: false,
          }}
        /> */}
        {/* <Stack.Screen
          name="Catlog"
          component={Catlog}
          options={{
            headerShown: false,
          }}
        />  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
