import React,{useState,useEffect} from 'react'
import {TouchableOpacity, Image, View, Text, StyleSheet, Dimensions, ScrollView, StatusBar} from 'react-native'



const Bug = ({route, navigation}) => {

  const [data, setData] = useState([]);

  const {imagePath,category,title,content,profilePhoto,name,views,blogs,Followers,votes} = route.params;








    
  const [estado, setEstado] = useState(false);

  const agregarFavoritos = () => {
    setEstado(!estado);
  };


    const {width,height} = Dimensions.get('window')



    return (
 
      
//       <View style={{flex: 1, backgroundColor: '#fff'}}>

//       <View>

//       {/* <View id={`item.${data.id}.photo`}> */}


//       <View style={{flexDirection: 'row',alignItems: 'center',position: 'absolute', bottom: 14, left: 10}}>
   
//       {/* <View id={`item.${data.id}.profilePic`}> */}
//       <View>
//         <Image
//         source={{uri: "https://randomuser.me/api/portraits/men/97.jpg"}} 
//         style={{width: 60, height: 60, borderRadius: 10, marginRight: 14}}
//         resizeMode="cover"
//         />
//     </View>

//     <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 50}}>

//       <View>
//       {/* <View id={`item.${data.id}.username`}> */}
//       <View>
//       <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>Shagun Sethi</Text>
//       </View>
//       {/* <View id={`item.${data.id}.readtime`}> */}
//       <View>
//         <Text style={{color: 'black', fontSize: 14,}}>kugscgkusacg my name is shagun sethi </Text>
//       </View>
//       </View>

//       <TouchableOpacity onPress={() => agregarFavoritos()}>
//         {/* <Ionicons name={estado ? 'bookmark-outline' : 'bookmark'} size={24} color='black' /> */}
//       </TouchableOpacity>

//     </View>

//       </View>

//       </View>
<View style={{flex:1}}>
<StatusBar/>
  <View style={{paddingBottom:15}} >
    
        <Image source={{uri:imagePath}} style={{width: '100%', height: height - 550, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, opacity: 0.7}} resizeMode="cover"/>
      </View>

      <TouchableOpacity onPress={() => {navigation.navigate('UserProfile',{name:name,profilePhoto:profilePhoto,blogs:blogs,Followers:Followers,votes:votes})}}>
      </TouchableOpacity>

<TouchableOpacity>
<View style={{flexDirection: 'row',alignItems: 'center', left: 10,backgroundColor:'#edecea'}}>
   
   



   {/* <View id={`item.${data.id}.profilePic`}> */}
   <View>
     <Image
     source={{uri:profilePhoto}} 
     style={{width: 60, height: 60, borderRadius: 10, marginRight: 14}}
     resizeMode="cover"
     />
 </View>

 <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 50}}>

   <View>
 
   <View>
   <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>{name}</Text>
   </View>

   <View>
     <Text style={{color: 'black', fontSize: 14,}}>{title} </Text>
   </View>
   </View>



 </View>
 
 </View>
 </TouchableOpacity>



     <ScrollView style={{paddingHorizontal: 10, paddingTop: 20}}>
     
     <View  style={{ width: width - 30, marginBottom: 0}}>
 

     <Text style={{color: 'black', fontSize: 22,fontWeight: 'bold', lineHeight: 32}}>{title}</Text>


<Text style={{color: 'orange', fontWeight: 'bold',marginTop: 8,marginBottom: 8 }}>{category}</Text>
     </View>

    {/* <Text style={{fontSize: 14, lineHeight: 28, textAlign: 'justify', opacity: 0.5,color: 'black'}}>{content}</Text>     */}

    <Text style={{fontSize: 14, lineHeight: 28, textAlign: 'justify', opacity: 0.5,color: 'black'}}>{content}</Text>   

    {/* <View style={{marginVertical: 25, paddingBottom: 20, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{padding: 12, flexDirection: 'row', alignItems: 'center'}}>
        <Image
        tintColor='orange'
                  source={
                     require('./assets/views.png')
                  }
                  style={{height: 30, width: 30,color:'orange'}}
                />
            <Text style={{fontWeight: 'normal', textAlign: 'center', marginHorizontal: 10,color:'orange',fontSize:20}}>{views}</Text>
        </View>
        <TouchableOpacity style={{padding: 12, width: 100, backgroundColor: 'orange', borderRadius: 10,}}>
            <Text style={{color: 'white',fontWeight: 'bold', textAlign: 'center'}}>Follow</Text>
        </TouchableOpacity>
    </View>      */}

    </ScrollView>
    </View>

    // <View style={{position: 'absolute', top: 40, left: 10}}>

    // <TouchableOpacity >
    //   {/* <Feather name='arrow-left' size={24} color='black' /> */}
    //  </TouchableOpacity>

    // </View>
    
    // </View>  

    );
  };

export default Bug;


// import { View, Text } from 'react-native'
// import React from 'react'

// const Bug = () => {
//   return (
//     <View>
//       <Text>Bug</Text>
//     </View>
//   )
// }

// export default Bug
