import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import logo from '../../assets/logo.png'

export default function Header() {
  return (
    <View style={styles.header}>
      <Image source={logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#404459',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 40
  },
});