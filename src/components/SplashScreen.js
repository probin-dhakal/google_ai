import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Leaf } from 'lucide-react-native';
import { useApp } from '../contexts/AppContext';
import { getTranslation } from '../utils/translations';

const SplashScreen = () => {
  const { state } = useApp();
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Leaf size={80} color="#22C55E" />
        <Text style={styles.title}>{getTranslation(state.selectedLanguage, 'appTitle')}</Text>
        <Text style={styles.subtitle}>{getTranslation(state.selectedLanguage, 'appSubtitle')}</Text>
      </View>
      <ActivityIndicator size="large" color="#22C55E" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  loader: {
    marginTop: 30,
  },
});

export default SplashScreen;