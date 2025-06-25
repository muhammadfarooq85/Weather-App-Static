import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';


export default function WelcomeScreen({ navigation } ) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://assets.api.uizard.io/api/cdn/stream/d5cff886-277c-4659-919d-dfee4bdfb271.png',
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Wanderly</Text>
          <Text style={styles.subtitle}>Explore weather with ease</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Start From here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: height * 0.5,
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30, // pull the view up to create a seamless transition
    paddingTop: 40,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // optional shadow for elevation effect
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
  },
  button: {
    borderRadius: 25,
    backgroundColor: '#212121',
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
