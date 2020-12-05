import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Device from "expo-device";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";

import trash from "../../assets/trash.png";
import Button from "../components/Button";
import { postBarCodesScanned } from "../services/api";

export default function ScannerScreen({ goBack }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barCodeScanned, setBarCodeScanned] = useState({});
  const [barCodesScanned, setBarCodesScanned] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = (data) => {
    setScanned(true);
    setBarCodeScanned(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleCancel = () => {
    setScanned(false);
    goBack();
  };

  const handleAdd = () => {
    var dt = new Date();

    barCodesScanned.push({
      ...barCodeScanned,
      scanDate: dt.getTime(),
      mobileId: Device.osInternalBuildId,
    });
    setBarCodesScanned(barCodesScanned);
    setScanned(false);
    // goBack();
  };

  const handleSave = () => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Dispositivo",
          onPress: saveFile,
        },
        {
          text: "Nube",
          onPress: async () => {
            const response = await postBarCodesScanned(barCodesScanned);
            if (response.ok) alert(`Guardado correctamente`);
            else alert(`Error inesperado, no se pudo guarda r`);
          },
        },
      ],
      { cancelable: false }
    );

    // setScanned(false);
    // goBack();
  };

  const saveFile = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      var dt = new Date();
      // await FileSystem.writeAsStringAsync(
      //   FileSystem.documentDirectory + `scan-${dt.getTime()}.json`,
      //   JSON.stringify(barCodesScanned)
      // );

      let filename = FileSystem.documentDirectory + `scan-${dt.getTime()}.json`;
      await FileSystem.writeAsStringAsync(
        filename,
        JSON.stringify(barCodesScanned)
      );
      const asset = await MediaLibrary.createAssetAsync(filename);
      await MediaLibrary.createAlbumAsync("ExpoScanners", asset, false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 4, justifyContent: "center", alignItems: "center" }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.barCodeScanner}
        />
        <View style={{ flex: 1, margin: 10 }}>
          <ScrollView
          // contentContainerStyle={{
          //   flex: 1,
          //   width: "100%",
          // }}
          >
            {barCodesScanned.map((element, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  width: "80%",
                  margin: 10,
                  alignSelf: "center",
                }}
              >
                <View style={styles.textListContainer}>
                  <Text style={styles.dataList}>{element.data}</Text>
                  <Text style={styles.typeList}>Tipo: {element.type}</Text>
                </View>
                <TouchableOpacity
                  style={styles.buttonListContainer}
                  onPress={() =>
                    setBarCodesScanned(
                      barCodesScanned.filter((e, i) => i !== index)
                    )
                  }
                >
                  <Image source={trash} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button title="Cancelar" onPress={handleCancel} type="secundary" />
        {scanned && (
          <Button title="Añadir" onPress={handleAdd} type="noOutline" />
        )}
        <Button color="#F2BEA0" title="Guardar" onPress={handleSave} />
      </View>
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
  barCodeScanner: {
    width: 300,
    height: 300,
  },
  textListContainer: {
    width: "80%",
    backgroundColor: "#404459",
    // flex: 3,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  dataList: {
    color: "#fff",
    fontSize: 12,
  },
  typeList: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "700",
  },
  buttonListContainer: {
    width: "20%",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
