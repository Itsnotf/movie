import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity, FlatList, Dimensions, ImageBackground } from "react-native";
import Banner from '../../assets/images/banner.png';
import Banner1 from '../../assets/images/hero1.jpg'
import Banner2 from '../../assets/images/hero2.1.jpg';
import Banner3 from '../../assets/images/hero3.jpg';
import Banner4 from '../../assets/images/hero4.jpg';
import Banner5 from '../../assets/images/hero5.jpg';
import Banner6 from '../../assets/images/hero6.jpg';
import { useNavigation } from '@react-navigation/native';
import MovieCard from "../../components/MovieCard";
import { Colors } from "../../constants/Colors";
import Domain from "../../api/Domain";

export default function Home() {
    const [msg, setMsg] = useState("");
    const [newr, setNewr] = useState([]);
    const [ran, setRan] = useState([]);
    const [activeDotIndex, setActiveDotIndex] = useState(0);

    const random = () => {
        fetch(`${Domain.ipAddress}/api/random`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.status) {
                    setMsg(json.message);
                    setRan(json.data);
                } else {
                    setMsg("Failed to fetch data");
                }
            })
            .catch((err) => {
                console.log(err);
                setMsg("Error fetching data");
            });
    };

    const latest = () => {
        fetch(`${Domain.ipAddress}/api/latest`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.status) {
                    setMsg(json.message);
                    setNewr(json.data.slice(0, 4));
                } else {
                    setMsg("Failed to fetch data");
                }
            })
            .catch((err) => {
                console.log(err);
                setMsg("Error fetching data");
            });
    };

    useEffect(() => {
        latest();
    }, []);

    useEffect(() => {
        random();
    }, []);

    const navigation = useNavigation();
    const fullScreenWidth = Dimensions.get('window').width;

    const cdata = [
        {
            id: '1',
            img: Banner
        },
        {
            id: '2',
            img: Banner1,
        },
        {
            id: '3',
            img: Banner2
        },
        {
            id: '3',
            img: Banner3
        },
        {
            id: '3',
            img: Banner4
        },
        {
            id: '3',
            img: Banner5
        },
        {
            id: '3',
            img: Banner6
        },
    ];

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50
    };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveDotIndex(viewableItems[0].index);
        }
    }).current;

    const flatListRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({
                    index: (activeDotIndex + 1) % cdata.length,
                    animated: true,
                });
            }
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [activeDotIndex]);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.banner}>
                <ImageBackground 
                    source={item.img} 
                    style={styles.image} 
                    resizeMode="cover"
                >
                    <View style={styles.overlay} />
                </ImageBackground>
            </View>
        );
    };

    const renderDot = () => {
        return cdata.map((_, index) => {
            return (
                <View
                    key={index}
                    style={{
                        backgroundColor: index === activeDotIndex ? 'white' : Colors.GRAY,
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        marginHorizontal: 6
                    }}
                />
            );
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.carouselContainer}>
                <FlatList 
                    ref={flatListRef}
                    data={cdata} 
                    renderItem={renderItem} 
                    horizontal={true} 
                    pagingEnabled={true} 
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    showsHorizontalScrollIndicator={false}
                />
                <View style={styles.dotContainer}>
                    {renderDot()}
                </View>
            </View>

            <View style={styles.newReleaseContainer}>
                <View style={styles.heading}>
                    <Text style={styles.textHeading}>New Release</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('New')}>
                        <Text style={{ fontFamily: 'Poppins-Medium', color: Colors.PRIMARY }}>See all</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    style={styles.cardContainer}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {newr.map((item, index) => {
                        const imageUri = `${Domain.ipAddress}/storage/${item.banner}`;
                        return (
                            <MovieCard
                                id={item.id}
                                key={index}
                                imageSrc={{ uri: imageUri }}
                                title={item.judul}
                                date={item.created_at}
                            />
                        );
                    })}
                </ScrollView>
            </View>

            <View style={styles.recommendedContainer}>
                <View style={styles.heading}>
                    <Text style={styles.textHeading}>Recommended</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Popular')}>
                        <Text style={{ fontFamily: 'Poppins-Medium', color: Colors.PRIMARY }}>See all</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    style={styles.cardContainer}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {ran.map((item, index) => {
                        const imageUri = `${Domain.ipAddress}/storage/${item.banner}`;
                        return (
                            <MovieCard
                                id={item.id}
                                key={index}
                                imageSrc={{ uri: imageUri }}
                                title={item.judul}
                                date={item.created_at}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    carouselContainer: {
        position: 'relative',
    },
    image: {
        width: Dimensions.get('window').width, // Set width to match screen width
        height: 300,
        resizeMode: 'cover' // Adjust image to fill container, might crop
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust opacity and color
    },
    dotContainer: {
        position: 'absolute',
        bottom: 10, // Adjust the bottom margin as needed
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        width: '100%', // Ensures dot container spans the full width
        justifyContent: 'center',
    },
    heading: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: "space-between"
    },
    textHeading: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: Colors.PRIMARY
    },
    newReleaseContainer: {
        borderBottomWidth: 1,
        borderBlockColor: '#D9D9D9',
        paddingTop: 30,
        marginHorizontal: 10
    },
    recommendedContainer: {
        borderBottomWidth: 1,
        borderBlockColor: '#D9D9D9',
        paddingTop: 30,
        marginHorizontal: 10
    },
    cardContainer: {
        flexDirection: 'row',
    },
    banner: {
        width: Dimensions.get('window').width, // Ensure banner width matches screen width
    },
});
