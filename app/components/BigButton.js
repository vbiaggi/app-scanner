import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BigButton({ title, text, image, onPress }) {
  return (
    <TouchableOpacity style={styles.bigButtonContainer} onPress={onPress}>
      <Image source={image} />
      <View style={styles.textsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bigButtonContainer: {
    flexDirection: "row",
    borderRadius: 16,
    backgroundColor: "#F2BEA0",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  textsContainer: {
    margin: 10,
  },
  title: {
    color: "#404459",
    fontWeight: "700",
    fontSize: 24,
  },
  text: {
    color: "#8448D9",
    fontSize: 12,
  },
});
