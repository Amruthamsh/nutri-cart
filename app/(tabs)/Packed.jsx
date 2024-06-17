import { useState } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);
export default function Packed() {
  const [imageURI, setImage] = useState(null);
  const [imageURI2, setImage2] = useState(null);
  const [nutritionData, setNutrtionData] = useState(null);

  const generateResult = async () => {
    try {
      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const base64ImageData1 = await FileSystem.readAsStringAsync(imageURI, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const base64ImageData2 = await FileSystem.readAsStringAsync(imageURI2, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Combine image data into an array
      const images = [
        {
          inlineData: {
            data: base64ImageData1,
            mimeType: "image/png",
          },
        },
        {
          inlineData: {
            data: base64ImageData2,
            mimeType: "image/png",
          },
        },
      ]; 

      const prompt = ` Please review the attached images of a food product for detailed analysis. The (front) displays the front packaging, while the (back) features the back where nutritional information is located. From these images, extract and provide the specific name of the item as presented on the front packaging. Additionally, summarize key nutritional details such as calories, fats, carbohydrates, proteins, vitamins, and minerals per serving, obtained from the back image. Finally, assess the safety of consuming the product, rating its safety level on a scale of 1 to 10 and dont include formatting for headings and subheadings like bold or italics etc`; // Adjust prompt as needed

      const result = await model.generateContent([prompt, ...images]);

      const response = await result.response;
      const text = response.text();
      setNutrtionData(text);
      console.log(text);
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,

      quality: 1,
      selectionLimit: 1,
    });

    if (!imageURI) setImage(result.assets[0].uri);
    else setImage2(result.assets[0].uri);
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
        selectionLimit: 2,
      });

      if (!result.canceled) {
        if (!imageURI) setImage(result.assets[0].uri);
        else setImage2(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
       <Text style={styles.instruction}>
          Please provide images of the front and back packaging of the food product.
        </Text>
        <View style={styles.buttons}>
          <Button
            title="Use Camera to click a Food pic"
            onPress={camImage}
            style={styles.button}
            color="#34C759"
          />
          <Button
            title="Pick an image from camera roll"
            onPress={pickImage}
            style={styles.button}
            color="#34C759"
          />
          
        </View>
        {imageURI && <Image source={{ uri: imageURI }} style={styles.image} />}
        {imageURI2 && (
          <Image source={{ uri: imageURI2 }} style={styles.image} />
        )}
        {imageURI && imageURI2 && (
          <Button title="Generate Data" onPress={generateResult} />
        )}

        {nutritionData && (
          <Text style={styles.generatedText}>{nutritionData}</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    backgroundColor: "#000",
  },
  buttons: {
    marginTop: 10,
    gap: 10,
    flexDirection: "column", // Add this to make the buttons inline
  },
  button: {},
  image: {
    marginVertical: 10,
    width: 240,
    height: 180,
  },
  generatedText: {
    color: "white",
    paddingVertical: 10
  },
  instruction:{
    color:"white",
    textAlign: "center",
    paddingVertical: 20
  }
});
