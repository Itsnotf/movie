import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated } from "react-native";
import { Colors } from "../constants/Colors";
import banner from '../assets/images/hero2.png';
import { useRouter } from "expo-router";
import { Gyroscope } from "expo-sensors";

export default function Onboarding() {
    const router = useRouter();
    const [rotation] = useState(new Animated.Value(0)); // Rotation value
    const [floatValue] = useState(new Animated.Value(-50)); // Floating value, start from -50

    useEffect(() => {
        // Gyroscope subscription for rotation effect
        const subscription = Gyroscope.addListener((gyroscopeData) => {
            const rotationValue = gyroscopeData.y * 12; // Adjust multiplier

            Animated.timing(rotation, {
                toValue: rotationValue,
                duration: 100,
                useNativeDriver: true,
            }).start();
        });

        // Floating animation effect
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatValue, {
                    toValue: 25, // Move to 25
                    duration: 3000, // Duration of floating upwards
                    useNativeDriver: true,
                }),
                Animated.timing(floatValue, {
                    toValue: 25, // Stay at 25
                    duration: 0, // No duration for staying
                    useNativeDriver: true,
                }),
                Animated.timing(floatValue, {
                    toValue: -50, // Move back to -50
                    duration: 3000, // Duration of floating downwards
                    useNativeDriver: true,
                }),
                Animated.timing(floatValue, {
                    toValue: -50, // Stay at -50
                    duration: 0, // No duration for staying
                    useNativeDriver: true,
                }),
            ])
        ).start();

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Jelajahi Keindahan Pagar Alam Di Ujung Jari Anda
            </Text>
            <Animated.View
                style={[
                    styles.imgContainer,
                    {
                        transform: [
                            {
                                rotate: rotation.interpolate({
                                    inputRange: [-50, 50],
                                    outputRange: ['-5deg', '5deg']
                                })
                            },
                            {
                                translateY: floatValue // Apply floating effect
                            }
                        ]
                    }
                ]}
            >
                <ImageBackground
                    source={banner}
                    style={styles.image}
                    resizeMode="cover"
                />
            </Animated.View>
            <Text style={styles.desk}>
                Discover Information Media Pagar Alam (DIMPA) Adalah aplikasi yang menyajikan gambar & video tentang destinasi wisata di Pagar Alam.
            </Text>
            <TouchableOpacity style={styles.btn} onPress={() => router.push('/home')}>
                <Text style={styles.btnDesk}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 25,
        paddingVertical: 70
    },
    heading: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        color: Colors.PRIMARY
    },
    imgContainer: {
        width: 300,
        height: 250,
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    desk: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        width: 300,
    },
    btn: {
        backgroundColor: Colors.PRIMARY,
        width: '80%',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    btnDesk: {
        color: 'white',
        fontFamily: 'Poppins-Regular'
    }
});
