import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const splashData = [
  {
    title: 'Truck Trouble? Help is Just a Tap Away',
    description:
      'Whether it’s a breakdown or routine maintenance, find trusted mechanics and assistance nearby in minutes – anytime, anywhere.',
    button: 'Next',
    image: require('../assets/truck.png'), // Replace with your actual image path
  },
  {
    title: 'Mechanics You Can Trust',
    description:
      'We connect you with experienced, verified service providers who specialize in repairs, towing, diagnostics, and more.',
    button: 'Next',
    image: require('../assets/truck.png'),
  },
  {
    title: 'Your Journey Starts Here',
    description:
      'Whether you’re a driver needing roadside help or a mechanic offering repair services – this app is built for you.',
    button: 'Get Started',
    image: require('../assets/truck.png'),
  },
];

const IntroductionScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < splashData.length - 1) {
      setIndex(prev => prev + 1);
    } else {
      // Navigate or close splash here
      console.log('Get Started Clicked');
      // navigation.navigate('Home'); // Example
    }
  };

  const handleSkip = () => {
    setIndex(splashData.length - 1);
  };

  const { title, description, button, image } = splashData[index];

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>{button}</Text>
      </TouchableOpacity>

      {index < splashData.length - 1 && (
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default IntroductionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    height: 250,
    width: width * 0.8,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#e60000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  skipText: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'underline',
  },
});
