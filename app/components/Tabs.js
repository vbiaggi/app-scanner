import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Tabs({ items, selected, setSelected }) {

  return (
    <View style={styles.tabsContainer}>
      {items &&
        items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelected(index)}
            style={styles.tab}
          >
            <View style={selected === index && styles.selectedTab}>
              <Text
                style={[
                  styles.tabText,
                  selected === index && styles.selectedTabText,
                ]}
              >
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    color: "#404459",
    fontWeight: "300",
  },
  selectedTab: {
    borderTopWidth: 2,
    borderTopColor: "#8448D9",
  },
  selectedTabText: {
    fontWeight: "700",
  },
});
