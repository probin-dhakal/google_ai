import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useApp } from '../contexts/AppContext';
import { getTranslation } from '../utils/translations';

const PlaceholderScreen = ({ title, onBack }) => {
  const { state } = useApp();
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.placeholderContent}>
          <Text style={styles.placeholderEmoji}>🚧</Text>
          <Text style={styles.placeholderTitle}>{getTranslation(state.selectedLanguage, 'comingSoon')}</Text>
          <Text style={styles.placeholderText}>
            {getTranslation(state.selectedLanguage, 'featureUnderDevelopment')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  placeholderContent: {
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default PlaceholderScreen;