import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import cardbanner from '../assets/images/react-logo.png';
import Domain from "../api/Domain";

export default function New() {

    const [msg, setMsg] = useState("");
    const [newr, setNewr] = useState([]);

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
                    setNewr(json.data);
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

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
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
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginLeft: 10,

    }
});
