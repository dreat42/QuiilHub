import React, { useState } from "react";
import { Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import ImgToBase64 from 'react-native-image-base64';
import ImagePicker from 'react-native-image-crop-picker';
import RadioButton from "./RadioButton";

const MyEditor = () => {

  const [activeToolbar1, setActiveToolbar1] = useState(false);
  const [activeToolbar2, setActiveToolbar2] = useState(false);
  const [activeToolbar3, setActiveToolbar3] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loader, setLoader] = useState(false);

  const [fieldLength, setFieldLength] = useState(0);
  const [imagePath, setImagePath] = useState('');
  const [filecon, setFilecon] = useState(false);

  const [titleError1, setTitleError1] = useState(false);
  const [descError, setDescError] = useState(false);
  const [caterr, setCaterr] = useState(false);

  const handleTitleError = () => {
    if (title.length < 17 || title.length > 40) {
      setTitleError1(true);
      return false;
    } else {
      setTitleError1(false);
      return true;
    }
  };

  const handleDescError = () => {
    if (content.length < 20 || content.length > 120) {
      setDescError(true);
      return false;
    } else {
      setDescError(false);
      return true;
    }
  };

  const handleImgErr = () => {
    if (imagePath === '') {
      setFilecon(true);
    } else {
      setFilecon(false);
    }
  };

  const checkData = () => {
    handleTitleError();
    handleDescError();
    handleImgErr();
    if (handleTitleError() && handleDescError() && handleImgErr()) {
      onSubmit();
    } else {
      console.log('Data is incorrect');
    }
  };

  const readFunction = async () => {
    setLoader(true);
    checkData();

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const d = new Date();
    const data = {
      date: `${d.getDate()} ${monthNames[d.getMonth()]}`,
      category: selectedRadio,
      content: content,
      bookmarked: [],
      downvotes: [],
      upvotes: [],
      count: [],
      Followers: [],
      Following: [],
      blogs: [],
      views: 0,
      title: title,
      imagePath: imagePath,
    };
  };

  const richTitle = React.useRef();
  const richContent = React.useRef();
  const richImage = React.useRef();

  const [state, setState] = useState(1);
  const [selectedRadio, setSelectedRadio] = useState();

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      convertBase64(image);
    });
  };

  const convertBase64 = (image) => {
    ImgToBase64.getBase64String(image.path)
      .then(base64String => {
        const str = `data:${image.mime};base64,${base64String}`;
        richTitle.current.insertImage(str);
        console.log(str);
        setImagePath(str);
      })
      .catch(err => console.log(err));
  };

  let isImageOptionDisabled = true;
  if (selectedRadio === 0 || selectedRadio === 1) {
    isImageOptionDisabled = false;
  }

  return (
    // <SafeAreaView>
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        {/* <KeyboardAvoidingView> */}
          
        <Text style={styles.header}>Title</Text>
          <RichEditor
            placeholder="Enter Title "
            ref={richTitle}
            onChange={titleText => {
              setTitle(titleText);
              setActiveToolbar1(true);
              setActiveToolbar2(false);
              setActiveToolbar3(false);
            }}
          />
          {titleError1 ? (
            <View style={{ padding: 1, paddingLeft: '3%' }}>
              <Text style={{ color: '#D63D1C', marginBottom: 25, marginTop: 10 }}>
                Title must be 17-40 characters long.
              </Text>
            </View>
          ) : null}

<Text style={styles.header}>Content</Text>
          <RichEditor
            placeholder="Enter Content "
            ref={richContent}
            onChange={descriptionText => {
              setContent(descriptionText);
              setActiveToolbar1(false);
              setActiveToolbar2(true);
              setActiveToolbar3(false);
            }}
          />
          {descError ? (
            <View style={{ padding: 1, paddingLeft: '3%' }}>
              <Text style={{ color: '#D63D1C', marginBottom: 25, marginTop: 10 }}>
                Description must be 40-150 characters long.
              </Text>
            </View>
          ) : null}

<Text style={styles.header}>Image</Text>
          <RichEditor
            placeholder="Insert Image"
            ref={richImage}
            onChange={descriptionText => {
              setActiveToolbar1(false);
              setActiveToolbar2(false);
              setActiveToolbar3(true);
            }}
          />

        {/* </KeyboardAvoidingView> */}
     

      <View style={{ bottom: 0, marginTop: 30 }}>
        {/* {activeToolbar1 && !activeToolbar2 && !activeToolbar3 && ( */}
          <RichToolbar
            editor={richTitle}
            actions={[
              // actions.setBold,
              // actions.setItalic,
              actions.keyboard,
              actions.setStrikethrough,
              actions.setUnderline,
              actions.removeFormat,
              actions.checkboxList,
              actions.undo,
              actions.redo,
            ]}
          />
        {/* )} */}

        {/* {!activeToolbar1 && activeToolbar2 && !activeToolbar3 && ( */}
          <RichToolbar
            editor={richContent}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.keyboard,
              actions.setStrikethrough,
              actions.setUnderline,
              actions.removeFormat,
              actions.checkboxList,
              actions.undo,
              actions.redo,
            ]}
          />
        {/* )} */}

        {/* {!activeToolbar1 && !activeToolbar2 && activeToolbar3 && ( */}
          <RichToolbar
            editor={richImage}
            actions={[actions.insertImage]}
            onPressAddImage={() => {
              pickImage();
            }}
          />
        {/* )} */}

        <RadioButton onPress={() => { console.log("gg") }} setSelectedRadio={setSelectedRadio} />
      </View>

      <TouchableOpacity onPress={() => { readFunction(); }} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      </ScrollView>
    // </SafeAreaView>
  );
};

const styles = {
  button: {
    backgroundColor: '#8989ff',
    padding: 10,
    borderRadius: 5,
    margin: 40
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    fontSize: 14,
    // fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color:'black'
  },
};

export default MyEditor;
