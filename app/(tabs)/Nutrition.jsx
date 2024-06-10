import { useState } from 'react';
import { Button, Image, View, StyleSheet ,Text,ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);
export default function ImagePickerExample() {
  
  const [imageURI, setImage] = useState(null);
  const [nutritionData, setNutrtionData] = useState(null);

  const generateResult = async () =>{
      try{
        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
        const base64ImageData = await FileSystem.readAsStringAsync(imageURI, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        const image = {
          inlineData: {
            data: base64ImageData,
            mimeType: "image/png",
          },
        };
  
        const prompt = "Give nutrition of the food in the image";
  
        const result = await model.generateContent([prompt, image]);
        const response = await result.response;
        const text = response.text();
        setNutrtionData(text);
        console.log(text);
      }catch(error){
        console.log(error);
      }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      generateResult(result.assets[0].uri);
    }
  };

  const camImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
      }
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.6,
        cameraType: "back",
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  return (
    <View  style={styles.container}>
      <View style={styles.buttons}>
        <Button title="Use Camera to click a pic" onPress={camImage} style={styles.button}/>
        <Button title="Pick an image from camera roll" onPress={pickImage} style ={styles.button}/>
      </View>
      {imageURI && <Image source={{ uri: imageURI }} style={styles.image} />}
      {imageURI && <Button title="Generate Data" onPress={generateResult}/>}
      <ScrollView>
      {nutritionData && <Text>{nutritionData}</Text>}
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin:12
  },
  buttons:{
    marginTop: 10
  },
  button:{
    marginBottom:10,
  },
  image: {
    marginVertical:10,
    width: 240,
    height: 180,
  },
});