import React from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import { Colors } from '../constants/Colors';

const SkeletonLoading = () => {
    // Animated opacity for skeleton effect
    const animation = new Animated.Value(0.5);

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(animation, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    return (
        <View style={styles.skeletonCard}>
            <Animated.View
                style={[
                    styles.skeletonImage,
                    {
                        opacity: animation,
                    },
                ]}
            />
            <View style={styles.skeletonTextContainer}>
                <Animated.View
                    style={[
                        styles.skeletonTitle,
                        {
                            opacity: animation,
                        },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.skeletonDate,
                        {
                            opacity: animation,
                        },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    skeletonCard: {
        width: 160,
        height: 280,
        marginRight: 10,
        marginBottom: 15,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: Colors.GRAY,
    },
    skeletonImage: {
        width: '100%',
        height: '80%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    skeletonTextContainer: {
        padding: 5,
    },
    skeletonTitle: {
        width: '60%',
        height: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        marginBottom: 5,
        borderRadius: 4,
    },
    skeletonDate: {
        width: '40%',
        height: 14,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 4,
    },
});

export default SkeletonLoading;
