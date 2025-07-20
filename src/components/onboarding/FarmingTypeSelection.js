import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Flower, Chrome as Home, Wheat } from 'lucide-react-native';
import { useApp } from '../../contexts/AppContext';
import { getTranslation } from '../../utils/translations';

const farmingTypes = [
  {
    id: 'pots',
    titleKey: 'growInPots',
    descriptionKey: 'potsDesc',
    icon: Flower,
    color: '#EC4899',
  },
  {
    id: 'garden',
    titleKey: 'growInGarden',
    descriptionKey: 'gardenDesc',
    icon: Home,
    color: '#8B5CF6',
  },
  {
    id: 'fields',
    titleKey: 'growInFields',
    descriptionKey: 'fieldsDesc',
    icon: Wheat,
    color: '#F59E0B',
  },
];

const FarmingTypeSelection = ({ onNext, onSkip }) => {
  const { state, dispatch } = useApp();
  const [selectedType, setSelectedType] = useState('');

  const handleNext = () => {
    if (selectedType) {
      dispatch({ type: 'SET_FARMING_TYPE', payload: selectedType });
    }
    onNext();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{getTranslation(state.selectedLanguage, 'chooseFarmingType')}</Text>
        <Text style={styles.subtitle}>{getTranslation(state.selectedLanguage, 'farmingTypeDesc')}</Text>
      </View>

      <View style={styles.optionsList}>
        {farmingTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.option,
                selectedType === type.id && styles.selectedOption
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${type.color}20` }]}>
                <IconComponent size={40} color={type.color} />
              </View>
              
              <View style={styles.optionContent}>
                <View style={styles.optionHeader}>
                  <Text style={[
                    styles.optionTitle,
                    selectedType === type.id && styles.selectedText
                  ]}>
                    {getTranslation(state.selectedLanguage, type.titleKey)}
                  </Text>
                  <View style={[
                    styles.radioButton,
                    selectedType === type.id && styles.selectedRadio
                  ]}>
                    {selectedType === type.id && <View style={styles.radioInner} />}
                  </View>
                </View>
                <Text style={styles.optionDescription}>{getTranslation(state.selectedLanguage, type.descriptionKey)}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipButtonText}>{getTranslation(state.selectedLanguage, 'skip')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.nextButton, !selectedType && styles.disabledButton]} 
          onPress={handleNext}
          disabled={!selectedType}
        >
          <Text style={[styles.nextButtonText, !selectedType && styles.disabledText]}>
            {getTranslation(state.selectedLanguage, 'next')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  optionsList: {
    marginBottom: 40,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#EEF2FF',
    borderColor: '#22C55E',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionContent: {
    flex: 1,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  selectedText: {
    color: '#22C55E',
  },
  optionDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadio: {
    borderColor: '#22C55E',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C55E',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
  nextButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    color: '#9CA3AF',
  },
});

export default FarmingTypeSelection;