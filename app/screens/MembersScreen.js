import React from "react";
import { View, StyleSheet, ScrollView, Text, Image } from "react-native";

import Abel from "../../assets/images/Abel.png";
import Camila from "../../assets/images/Camila.png";
import Karen from "../../assets/images/Karen.png";
import Takeshi from "../../assets/images/Takeshi.png";
import Valeria from "../../assets/images/Valeria.png";
import Yoshikazu from "../../assets/images/Yoshikazu.png";

const members = [
  {
    name: "Abel Loayza Silva",
    photo: Abel,
  },
  {
    name: "Camila Urquizo Suca",
    photo: Camila,
  },
  {
    name: "Karen Montenegro Marcañaupa",
    photo: Karen,
  },
  {
    name: "Takeshi Higa Arakaki",
    photo: Takeshi,
  },
  {
    name: "Valeria Biaggi Gurreonero",
    photo: Valeria,
  },
  {
    name: "Yoshikazu Higa Arakaki",
    photo: Yoshikazu,
  },
];

export default function MembersScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        {members.map((element, index) => (
          <View key={index} style={styles.membersContainer}>
            <Image source={element.photo} style={styles.photo} />
            <View style={styles.dash} />
            <Text style={styles.name}>{element.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  membersContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  photo: {
    width: 60,
  },
  dash: {
    backgroundColor: "#656B8C",
    width: 25,
    height: 7,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  name: {
    color: "#404459",
    fontWeight: "bold",
  },
});
