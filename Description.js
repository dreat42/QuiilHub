import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

export default function Description({ route, navigation}) {
  const {data} = route.params;
  const richText = useRef();

  const [desc, setDesc] = useState("");
  
  const [showDescError, setShowDescError] = useState(false);

  const richTextHandle = (descriptionText) => {
    if (descriptionText) {
      setShowDescError(false);
      setDesc(descriptionText);
    } else {
      setShowDescError(true);
      setDesc("");
    }
  };

  const submitContentHandle = () => {
    const replaceHTML = desc.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();


    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
    } else {
      setShowDescError(false);

   data.content  = replaceWhiteSpace;
console.log(data);

  
    fetch(`http://192.168.221.129:3000/PostData`,{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify(data)
    })
    .then(
      navigation.navigate('Home')

    ).catch(err=>{console.log(err);})
  }
  
  };


 

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <View style={styles.container}>
          <Text style={styles.headerStyle}>Your Content</Text>
          <RichEditor
            ref={richText}
            onChange={richTextHandle=>{
              setDesc(richTextHandle)
            }}
            placeholder="Write your content here "
            androidHardwareAccelerationDisabled={true}
            style={styles.richTextEditorStyle}
            initialHeight={250}
          />
        <View style={styles.richTextContainer}>
          
        
          <RichToolbar
            editor={richText}
            selectedIconTint="#873c1e"
            iconTint="#312921"
            actions={[
              actions.insertImage,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.setStrikethrough,
              actions.setUnderline,
            ]}
            style={styles.richTextToolbarStyle}
          />
        </View>
        {showDescError && (
          <Text style={styles.errorTextStyle}>
            Your content shouldn't be empty 
          </Text>
        )}

        <TouchableOpacity
          style={styles.saveButtonStyle}
          onPress={submitContentHandle}>
          <Text style={styles.textButtonStyle}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#cecece",
    padding: 20,
    alignItems: "center",
  },

  headerStyle: {
    fontSize: 30,
    fontWeight: "600",
    color: "#312921",
    marginBottom: 30,
    marginTop:60
  },



  richTextContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "100%",
    marginBottom: 10,
  },

  richTextEditorStyle: {
    height: 200,
    width: 330,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },

  richTextToolbarStyle: {
    backgroundColor: "#d8d8d8",
    borderColor: "#d8d8d8",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },

  errorTextStyle: {
    color: "#FF0000",
    marginBottom: 10,
  },

  saveButtonStyle: {
    backgroundColor: "#d8d8d8",
    borderWidth: 1,
    borderColor: "#c6c3b3",
    borderRadius: 10,
    padding: 10,
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
    marginTop:20
  },

  textButtonStyle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#312921",
  },
});