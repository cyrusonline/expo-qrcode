import React,{useState} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App(){
  const [scanned,setScanned] = useState(false)
  const [hasCameraPermission,setCameraPermission] = useState(null)
  // state = {
  //   hasCameraPermission: null,
  //   scanned: false,
  // };

  // async componentDidMount() {
  //   this.getPermissionsAsync();
  // }
  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    // this.setState({ hasCameraPermission: status === 'granted' });
    setCameraPermission("granted");
  };
  getPermissionsAsync();


  handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  // render() {
  //   const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => setScanned(false) }/>
        )}
      </View>
    );
  // }


}