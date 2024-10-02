import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ImageBackground, SafeAreaView, Image, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import { API_KEY, LOCATION_LAT, LOCATION_LON } from './secrets';
import { styles } from './WeatherScreen.styles';
import { formatTime, openODNRWebsite, getWindDirection, getCurrentTime } from './helperMethods';

const WeatherScreen: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${LOCATION_LAT}&lon=${LOCATION_LON}&units=imperial&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setLastRefreshed(getCurrentTime());
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchWeatherData();
  };

  if (loading) {
    return (
      <ImageBackground 
        source={require('./assets/deer2_rainy.webp')} 
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
            source={require('./assets/deer2_rainy.webp')} 
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
        source={require('./assets/deer2_rainy.webp')} 
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
      source={require('./assets/deer2_rainy.webp')} 
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
          <View style={styles.refreshContainer}>
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
              <Text style={styles.refreshIcon}>🔄</Text>
            </TouchableOpacity>
            <Text style={styles.lastRefreshed}>Last updated: {lastRefreshed}</Text>
          </View>
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
              <Text style={[styles.windArrow, { transform: [{ rotate: `${weatherData.wind.deg}deg` }] }]}>
                ↑
              </Text>
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

export default WeatherScreen;
