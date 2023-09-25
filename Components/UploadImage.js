import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  Platform,
  PermissionsAndroid,
} from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";

export default function UploadImage() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      await requestAndroidPermissions();
    } else if (Platform.OS === "ios") {
      await requestIOSPermissions();
    }
  };

  const requestAndroidPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
      const isAllGranted =
        Object.values(granted).filter((status) => status === "granted")
          .length === Object.keys(granted).length;
      if (!isAllGranted) {
        alert("Permissions denied. Unable to access media library.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const requestIOSPermissions = () => {
    // Implement your own method for requesting permissions on iOS
    // For example, you can use the 'react-native-permissions' library
    // or follow the official Apple documentation for requesting permissions.
  };

  const convertBase64 = (fileUri) => {
    return new Promise((resolve, reject) => {
      ImageCropPicker.openPicker({
        path: fileUri,
        mediaType: "photo",
        includeBase64: true,
      })
        .then((image) => {
          resolve(image.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  function uploadSingleImage(base64) {
    setLoading(true);
    fetch("http://192.168.89.129/uploadImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64 }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data);
        alert("Image uploaded Successfully");
      })
      .then(() => setLoading(false))
      .catch(console.log);
  }

  const uploadImage = async () => {
    ImageCropPicker.openPicker({
      mediaType: "photo",
      includeBase64: true,
    })
      .then((image) => {
        const base64 = image.data;
        uploadSingleImage(base64);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload Photo</Text>

      {url && (
        <View>
          <Text style={styles.fileText}>Access your file at:</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(url)}
            style={styles.linkContainer}
          >
            <Text style={styles.link}>{url}</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading ? (
        <View style={styles.loadingContainer}>
          <Image source={require("../assets/assets.gif")} />
        </View>
      ) : (
        <View style={styles.uploadContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={uploadImage}
          >
            <View style={styles.uploadContent}>
              <Text style={styles.uploadText}>Click to upload</Text>
              <Text style={styles.uploadText}>or drag and drop</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  heading: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  fileText: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  linkContainer: {
    marginBottom: 16,
  },
  link: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadContainer: {
    width: "100%",
    alignItems: "center",
  },
  uploadButton: {
    width: "80%",
    height: 200,
    borderWidth: 2,
    borderColor: "gray",
    borderStyle: "dashed",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadContent: {
    alignItems: "center",
  },
  uploadText: {
    marginBottom: 8,
    fontSize: 14,
    color: "gray",
  },
});
