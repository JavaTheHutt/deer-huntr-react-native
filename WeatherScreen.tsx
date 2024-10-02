import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground, SafeAreaView, Image, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import { API_KEY, LOCATION_LAT, LOCATION_LON } from './secrets';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install this package

const WeatherScreen: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${LOCATION_LAT}&lon=${LOCATION_LON}&units=imperial&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data');
      setLoading(false);
    }
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const openODNRWebsite = () => {
    Linking.openURL('https://oh-web.s3licensing.com/Harvest/Index');
  };

  const degreesToCompass = (degrees: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const getWindDirection = (degrees: number): string => {
    const compassDirection = degreesToCompass(degrees);
    const fromDirection = degreesToCompass((degrees + 180) % 360);
    return `${fromDirection} -> ${compassDirection}`;
  };

  if (loading) {
    return (
      <ImageBackground 
        source={require('./assets/deer1.webp')} 
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Loading weather data...</Text>
        </View>
      </ImageBackground>
    );
  }

  if (error) {
    return (
      <ImageBackground 
            source={require('./assets/deer1.webp')} 
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </ImageBackground>
    );
  }

  if (!weatherData) {
    return (
      <ImageBackground 
        source={require('./assets/deer1.webp')} 
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.errorText}>No weather data available</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground 
      source={require('./assets/deer1.webp')} 
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
          <View style={styles.topRight}>
            <Text style={styles.city}>{weatherData.name}</Text>
            <Text style={styles.temperature}>{Math.round(weatherData.main.temp)}°F</Text>
            <Text style={styles.description}>{weatherData.weather[0].description}</Text>
          </View>
          <View style={styles.bottomContent}>
            <Text style={styles.details}>Humidity: {weatherData.main.humidity}%</Text>
            <Text style={styles.details}>
              Wind: {weatherData.wind.speed} mph {getWindDirection(weatherData.wind.deg)}
            </Text>
            <View style={styles.windDirection}>
              <Text style={styles.details}>Wind Direction: </Text>
              <Icon 
                name="arrow-up" 
                size={20} 
                color="#ffffff" 
                style={[styles.windArrow, { transform: [{ rotate: `${weatherData.wind.deg}deg` }] }]}
              />
            </View>
            <Text style={styles.details}>Sunrise: {formatTime(weatherData.sys.sunrise)}</Text>
            <Text style={styles.details}>Sunset: {formatTime(weatherData.sys.sunset)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logo} onPress={openODNRWebsite}>
          <Image 
            source={require('./assets/logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // semi-transparent overlay
  },
  topRight: {
    position: 'absolute',
    top: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'right',
  },
  bottomContent: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  details: {
    fontSize: 18,
    marginBottom: 5,
    color: '#ffffff',
  },
  loadingText: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: '#ffffff',
  },
  logo: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 80,  // Increased size
    height: 80, // Increased size
    zIndex: 10, // Ensure it's on top of other elements
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  windDirection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  windArrow: {
    marginLeft: 10,
  },
});

export default WeatherScreen;
