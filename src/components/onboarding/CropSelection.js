import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useApp } from '../../contexts/AppContext';
import { getTranslation } from '../../utils/translations';

const crops = [
  { id: 'almond', nameKey: 'almond', emoji: '🌰' },
  { id: 'apple', nameKey: 'apple', emoji: '🍎' },
  { id: 'apricot', nameKey: 'apricot', emoji: '🍑' },
  { id: 'banana', nameKey: 'banana', emoji: '🍌' },
  { id: 'barley', nameKey: 'barley', emoji: '🌾' },
  { id: 'bean', nameKey: 'bean', emoji: '🫘' },
  { id: 'bitter-gourd', nameKey: 'bitterGourd', emoji: '🥒' },
  { id: 'black-gram', nameKey: 'blackGram', emoji: '⚫' },
  { id: 'brinjal', nameKey: 'brinjal', emoji: '🍆' },
  { id: 'cabbage', nameKey: 'cabbage', emoji: '🥬' },
  { id: 'canola', nameKey: 'canola', emoji: '🌻' },
  { id: 'capsicum', nameKey: 'capsicum', emoji: '🫑' },
  { id: 'chilli', nameKey: 'chilli', emoji: '🌶️' },
  { id: 'corn', nameKey: 'corn', emoji: '🌽' },
  { id: 'cotton', nameKey: 'cotton', emoji: '☁️' },
  { id: 'cucumber', nameKey: 'cucumber', emoji: '🥒' },
  { id: 'garlic', nameKey: 'garlic', emoji: '🧄' },
  { id: 'ginger', nameKey: 'ginger', emoji: '🫚' },
  { id: 'grape', nameKey: 'grape', emoji: '🍇' },
  { id: 'green-gram', nameKey: 'greenGram', emoji: '🟢' },
  { id: 'mango', nameKey: 'mango', emoji: '🥭' },
  { id: 'onion', nameKey: 'onion', emoji: '🧅' },
  { id: 'potato', nameKey: 'potato', emoji: '🥔' },
  { id: 'rice', nameKey: 'rice', emoji: '🍚' },
  { id: 'sugarcane', nameKey: 'sugarcane', emoji: '🎋' },
  { id: 'tomato', nameKey: 'tomato', emoji: '🍅' },
  { id: 'wheat', nameKey: 'wheat', emoji: '🌾' },
];

const CropSelection = ({ onNext }) => {
  const { state, dispatch } = useApp();
  const [selectedCrops, setSelectedCrops] = useState([]);
  const maxCrops = 8;

  const toggleCrop = (cropId) => {
    setSelectedCrops(prev => {
      if (prev.includes(cropId)) {
        return prev.filter(id => id !== cropId);
      } else if (prev.length < maxCrops) {
        return [...prev, cropId];
      }
      return prev;
    });
  };

  const handleNext = () => {
    dispatch({ type: 'SET_CROPS', payload: selectedCrops });
    onNext();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{getTranslation(state.selectedLanguage, 'selectCrops')}</Text>
        <Text style={styles.subtitle}>
          {getTranslation(state.selectedLanguage, 'selectCropsDesc')}
        </Text>
        <Text style={styles.counter}>
          {selectedCrops.length}/{maxCrops}
        </Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.cropsGrid}>
        {crops.map((crop) => (
          <TouchableOpacity
            key={crop.id}
            style={[
              styles.cropItem,
              selectedCrops.includes(crop.id) && styles.selectedCrop
            ]}
            onPress={() => toggleCrop(crop.id)}
          >
            <Text style={styles.cropEmoji}>{crop.emoji}</Text>
            <Text style={[
              styles.cropName,
              selectedCrops.includes(crop.id) && styles.selectedCropName
            ]}>
              {getTranslation(state.selectedLanguage, crop.nameKey)}
            </Text>
            {selectedCrops.includes(crop.id) && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.nextButton,
            selectedCrops.length === 0 && styles.disabledButton
          ]} 
          onPress={handleNext}
          disabled={selectedCrops.length === 0}
        >
          <Text style={[
            styles.nextButtonText,
            selectedCrops.length === 0 && styles.disabledText
          ]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22,
  },
  counter: {
    fontSize: 18,
    fontWeight: '600',
    color: '#22C55E',
  },
  scrollView: {
    flex: 1,
  },
  cropsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  cropItem: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  selectedCrop: {
    backgroundColor: '#EEF2FF',
    borderColor: '#22C55E',
  },
  cropEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  cropName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  selectedCropName: {
    color: '#22C55E',
    fontWeight: '600',
  },
  checkmark: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    backgroundColor: '#22C55E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  nextButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#9CA3AF',
  },
});

export default CropSelection;