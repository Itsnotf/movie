import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MovieCard from '../../components/MovieCard';
import { Colors } from '../../constants/Colors';
import Domain from '../../api/Domain';

export default function Explore() {
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getDataStudents = () => {
    fetch(`${Domain.ipAddress}/api/data`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          setMsg(json.message);
          setData(json.data);
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
    getDataStudents();
  }, []);

  // Function to handle text input change
  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  // Filter data based on search text
  const filteredData = data.filter(item =>
    item.judul.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Cari Film Favorite Anda!"
          value={searchText}
          onChangeText={handleSearchTextChange}
        />
        <Ionicons name="search" size={24} color={Colors.GRAY} style={styles.searchIcon} />
      </View>

      <View style={styles.cardContainer}>
        {filteredData.map((item, index) => {
          const imageUri = `${Domain.ipAddress}/storage/${item.banner}`;
          return (
            <MovieCard
              id={item.id}
              key={index}
              imageSrc={{ uri: imageUri }} // Pass the image URI as an object with 'uri' key
              title={item.judul}
              date={item.created_at}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 10,
    marginVertical: 20,
    marginRight: 10
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: Colors.GRAY,
    fontFamily: 'Poppins-Regular',
  },
  searchIcon: {
    marginLeft: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
