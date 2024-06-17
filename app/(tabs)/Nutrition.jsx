import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, Text, ScrollView, Platform, StatusBar, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);

export default function ImagePickerExample() {
  const [imageURI, setImage] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [bottomNavHeight, setBottomNavHeight] = useState(0);
  const clearscreen = () => {
    setImage(null)
    setNutritionData(null)
  }
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('#000');
      }

      const { height } = Dimensions.get('window');
      const bottomNavHeight = height - Dimensions.get('window').height;
      setBottomNavHeight(bottomNavHeight);
    })();
  }, []);

  const generateResult = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const base64ImageData = await FileSystem.readAsStringAsync(imageURI, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const image = {
        inlineData: {
          data: base64ImageData,
          mimeType: 'image/png',
        },
      };

      const prompt = 'Give nutrition of the food in the image';

      const result = await model.generateContent([prompt, image]);
      const response = await result.response;
      const text = response.text();
      setNutritionData(text);
      console.log(text);
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      generateResult(result.assets[0].uri);
    }
  };

  const camImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your camera!");
        return;
      }
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.6,
        cameraType: 'back',
      });

      if (!result.cancelled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image: ', error);
    }
  };

  return (
    <ScrollView style={[styles.container, { paddingBottom: bottomNavHeight }]}>
      <View style={styles.gridContainer}>
        <View style={styles.card}>
          {imageURI && <Image source={{ uri: imageURI }} style={styles.image} />}
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>NUTRICAM</Text>
            <ScrollView style={styles.generatedTextContainer}>
              {nutritionData && <Text style={styles.generatedText}>{nutritionData}</Text>}
            </ScrollView>
            <View style={styles.cardFooter}>
              <View style={styles.buttonContainer}>
                <Button title="Click a pic" onPress={camImage} color="#34C759" />
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Pick an image" onPress={pickImage} color="#34C759" />
              </View>
            </View>
          </View>
        </View>
      </View>
      {imageURI && !nutritionData && <Button title="Generate Data" onPress={generateResult} color="#34C759" />}
      {nutritionData && <Button title="Refresh" onPress={clearscreen} color="#34C759" />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    borderWidth: 3,
    borderColor: '#333',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#1e1e1e',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  buttonContainer: {
    borderRadius: 20, // Rounded corners
    overflow: 'hidden',
  },
  image: {
    marginVertical: 20,
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  generatedText: {
    color: 'white',
    fontSize: 16,
  },
});
