import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

const Hero = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://i.pinimg.com/564x/8f/8c/7c/8f8c7c663e10aba3553a5d43a245796a.jpg",
          }}
          style={styles.image}
          resizeMode="cover"
          borderRadius={10}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Before they sold out
          {"\n"}
          readymade gluten
        </Text>
        <Text style={styles.paragraph}>
          Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
          plant cold-pressed tacos poke beard tote bag. Heirloom echo park
          mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon
          try-hard chambray.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Button 1 pressed")}
          >
            <Text style={styles.buttonText}>Button</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Button 2 pressed")}
          >
            <Text style={styles.buttonText}>Button</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "pace-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4B51EF",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default Hero;
