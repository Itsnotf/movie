import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Colors } from "../constants/Colors";
import SkeletonLoading from './SkeletonLoading'; // Import the SkeletonLoading component

export default function MovieCard({ imageSrc, title, date, id, loading }) {
    const navigation = useNavigation();

    // Function to format the date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    if (loading) {
        return <SkeletonLoading />;
    }

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail', { id })}>
            <ImageBackground
                source={imageSrc}
                style={styles.imageCard}
                resizeMode="cover"
                imageStyle={styles.imageStyle}
            >
                <View style={styles.overlay} />
            </ImageBackground>
            <View style={styles.textContainer}>
                <Text style={styles.movieTitle} numberOfLines={1} ellipsizeMode="tail">
                    {title}
                </Text>
                <Text style={styles.dateText}>
                    {formatDate(date)}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 160,
        height: 280,
        marginRight: 10,
        marginBottom: 15,
    },
    imageCard: {
        width: '100%',
        height: '80%',
        borderRadius: 5,
        overflow: 'hidden', 
    },
    imageStyle: {
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.1)', 
    },
    textContainer: {
        padding: 5,
    },
    movieTitle: {
        color: Colors.SECOND,
        fontFamily: 'Poppins-Medium',
    },
    dateText: {
        fontFamily: 'Poppins-Regular',
        color: Colors.GRAY,
    },
});
