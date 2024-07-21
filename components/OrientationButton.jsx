// components/OrientationButton.js
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function OrientationButton() {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      setIsLandscape(orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
    };

    checkOrientation();

    const orientationListener = ScreenOrientation.addOrientationChangeListener(({ orientationInfo }) => {
      setIsLandscape(orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
    });

    return () => ScreenOrientation.removeOrientationChangeListener(orientationListener);
  }, []);

  const toggleOrientation = async () => {
    if (isLandscape) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }
    setIsLandscape(!isLandscape);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toggleOrientation}>
      <Icon name="screen-rotation" size={24} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    padding: 10,
  },
});
