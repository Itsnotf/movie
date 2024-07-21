import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Colors } from '../constants/Colors';
import { useRoute } from '@react-navigation/native';
import Domain from '../api/Domain';

export default function Detail() {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const route = useRoute();
  const { id } = route.params;
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const [isDescriptionLong, setIsDescriptionLong] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getDataStudents = () => {
    fetch(`${Domain.ipAddress}/api/data/${id}`, {
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

  useEffect(() => {
    if (status.isPlaying) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.unlockAsync();
    }
  }, [status.isPlaying]);

  const handleDescriptionLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    const lineHeight = 30; 
    const maxLines = 3;
    const maxHeight = lineHeight * maxLines;

    setDescriptionHeight(height);
    setIsDescriptionLong(height > maxHeight);
  };

  return (
    <ScrollView>
      <View style={styles.banner}>
        <View style={styles.videoContainer}>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: `${Domain.ipAddress}/storage/${data.video}`,
            }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping
            onPlaybackStatusUpdate={status => setStatus(status)}
          />
        </View>
      </View>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.name}>{data.judul}</Text>
          <View style={styles.title}>
            <Text style={styles.titleText}>{data.created_at}</Text>
            <Text style={styles.titleText}>|</Text>
            <Text style={styles.titleText}>{data.durasi}</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>{data.tipe}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.name}>Deskripsi</Text>
          <Text
            style={styles.description}
            numberOfLines={showFullDescription ? undefined : 3}
            onLayout={handleDescriptionLayout}
          >
            {data.desk}
          </Text>
          {isDescriptionLong && (
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={styles.readMore}>
                {showFullDescription ? 'Tampilkan lebih sedikit' : 'Selengkapnya...'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Colors.PRIMARY
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    color: Colors.GRAY,
    lineHeight: 30,
  },
  container: {
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  banner: {
    width: '100%',
    backgroundColor: '#000',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 5,
    marginVertical: 20,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  readMore: {
    fontFamily: 'Poppins-Regular',
    color: Colors.PRIMARY,
    marginTop: 5,
  },
  title: {
    flexDirection: 'row',
    gap: 20,
  },
  titleText: {
    color: Colors.GRAY,
    fontFamily: 'Poppins-Light',
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
