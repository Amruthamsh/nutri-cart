import { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);

export default function RecepieSuggestions() {
  const [text, setText] = useState("");
  const [selectedDiet, setSelectedDiet] = useState();
  const [editNutrition, setEditable] = useState(true);
  const [reciepe, setReciepe] = useState(null);

  const generateResult = async () => {
    try {
      setEditable(true);

      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Here are the ingredients: ${text}. Generate a ${selectedDiet} reciepe for a nutritious dish using these ingredients, dont use heading styles of bold in data formating, dont even bold the heading or sub heading give plain text, give name of the food also and end it with an enter at the end of the text`;

      console.log(prompt);
      const result = await model.generateContent([prompt]);
      const response = await result.response;
      const generatedText = response.text();
      setReciepe(generatedText);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.generatedText}>Write down your ingredients!</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        maxLength={100}
        placeholder={"Your ingredients!"}
        value={text}
        onChangeText={setText}
        editable={editNutrition}
      />
      <Picker
        selectedValue={selectedDiet}
        onValueChange={(itemValue, itemIndex) => setSelectedDiet(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Veg/Non Veg" value="Vegetarian or non vegetarian" />
        <Picker.Item label="Veg" value="vegetarian" />
        <Picker.Item label="Non Veg" value="non vegetarian" />
      </Picker>
      {text && (
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#238636" : "#34C759",
            },
            styles.pressableButton,
          ]}
          onPress={generateResult}
        >
          <Text style={styles.generatedText}>Generate a Reciepe!</Text>
        </Pressable>
      )}

      {reciepe && <Text style={styles.generatedText}>{reciepe}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#000",
  },
  picker: {
    width: "60%", // Adjust button width as needed
    color: "white",
    marginVertical: 10,
    backgroundColor: "#34C759",
  },
  input: {
    backgroundColor: "white",
    width: "90%",
    padding: 12,
    marginVertical: 5,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "green",
    height: 30,
  },
  pressableButton: {
    width: "50%", // Adjust button width as needed
    marginBottom: 10,
    paddingVertical: 8, // Adjust vertical padding
    borderRadius: 8,
    padding: 12,
    marginVertical: 3,
  },
  image: {
    marginVertical: 10,
    width: 240,
    height: 180,
  },
  generatedText: {
    color: "white",
  },
});
