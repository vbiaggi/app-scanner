import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import BigButton from "../components/BigButton";
import Header from "../components/Header";
import Tabs from "../components/Tabs";

import btnScan from "../../assets/btnScan.png";
import btnHistory from "../../assets/btnHistory.png";
import ScannerScreen from "./ScannerScreen";
import HistoryScreen from "./HistoryScreen";
import MembersScreen from "./MembersScreen";

const tabs = ["Servicios", "Historial", "Integrantes"];

export default function HomeScreen() {
  const [screen, setScreen] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  const renderScreen = () => {
    if (!selectedTab && !screen) {
      return (
          <BigButton
            image={btnScan}
            title="Escanear"
            text="Escanea todo tipo de QR"
            onPress={() => setScreen("Scanner")}
          />
      );
    } else if (selectedTab === 1) {
      return <HistoryScreen />;
    } else if (screen === "Scanner") {
      return <ScannerScreen goBack={() => setScreen("")} />;
    } else {
      return (
        <MembersScreen />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Tabs
        items={tabs}
        selected={selectedTab}
        setSelected={(index) => setSelectedTab(index)}
      />

      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
