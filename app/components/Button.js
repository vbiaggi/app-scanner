import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Button({ title, onPress, type }) {
  return (
    <TouchableOpacity style={[styles.button, styles[type]]} onPress={onPress}>
      <Text style={[styles.text,styles[`text${type}`]]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 120,
    backgroundColor: "#F2BEA0",
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: "#404459",
    textAlign: "center",
    fontWeight: "700",
  },
  secundary: {
    color: "#404459",
    borderWidth: 1,
    borderColor: "#F2BEA0",
    backgroundColor: "transparent",
  },
  textsecundary: {
    fontWeight: "normal",
  },
  noOutline: {
    backgroundColor: "transparent",
  },
  textnoOutline: {
    fontWeight: "normal",
  }
});
