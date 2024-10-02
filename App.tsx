import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import WeatherScreen from './WeatherScreen';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <WeatherScreen />
      </SafeAreaView>
    </>
  );
};

export default App;
