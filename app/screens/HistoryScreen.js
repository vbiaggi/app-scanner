import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import * as Device from "expo-device";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { getBarCodesScanned, postBarCodesScanned } from "../services/api";

import scan from "../../assets/scan.png";
import Button from "../components/Button";

export default function HistoryScreen() {
  const [barCodesScanned, setBarCodesScanned] = useState([]);

  useEffect(() => {
    getBarCodesScannedFunc();
  }, []);

  const getBarCodesScannedFunc = async () => {
    const response = await getBarCodesScanned(Device.osInternalBuildId);
    setBarCodesScanned(response.data);
  };

  const handleUploadScanners = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    result = await FileSystem.readAsStringAsync(result.uri);
    if (result) {
      const response = await postBarCodesScanned(JSON.parse(result));
      console.log("response:", response);
      if (response.ok) {
        alert(`Guardado correctamente`);
        getBarCodesScannedFunc();
      } else alert(`Error inesperado, no se pudo guardar`);
    } else alert(`Error inesperado, no se encontro informacion`);
  };

  // const handleUploadScanners = () => {
  //   FileSystem.uploadAsync(url, fileUri, options)
  // };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", alignItems: "flex-end", marginBottom: 15 }}>
        <Button
          color="#F2BEA0"
          title="Subir Scanners"
          onPress={handleUploadScanners}
        />
      </View>
      <Text>Se guardaron {barCodesScanned.length} elementos</Text>
      <ScrollView>
        <View style={{ flex: 1, width: "100%", padding: 15 }}>
          {!!barCodesScanned.length &&
            barCodesScanned.map((element, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#F1F1F1",
                  width: "100%",
                  margin: 5,
                  justifyContent: "center",
                  padding: 5,
                }}
              >
                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image source={scan} />
                </View>
                <View style={{ width: "80%", justifyContent: "center" }}>
                  <Text style={{ color: "#404459" }}>{element.data}</Text>
                  <Text
                    style={{
                      color: "#404459",
                      fontSize: 12,
                      fontWeight: "700",
                    }}
                  >
                    Tipo: {element.type}
                  </Text>
                  <Text style={{ color: "#656B8C", fontSize: 10 }}>
                    Día escaneado: {element.saveDate}
                  </Text>
                  <Text style={{ color: "#656B8C", fontSize: 10 }}>
                    Día guardado: {element.saveDate}
                  </Text>
                </View>
              </View>
            ))}
        </View>
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
});
