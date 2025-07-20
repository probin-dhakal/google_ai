import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Stethoscope, Package, Users } from 'lucide-react-native';
import { useApp } from '../../contexts/AppContext';
import { getTranslation } from '../../utils/translations';

const features = [
  {
    id: 1,
    titleKey: 'instantDiseaseDetection',
    descriptionKey: 'diseaseDetectionDesc',
    icon: Stethoscope,
    color: '#EF4444',
  },
  {
    id: 2,
    titleKey: 'greatProductDeals',
    descriptionKey: 'productDealsDesc',
    icon: Package,
    color: '#F59E0B',
  },
  {
    id: 3,
    titleKey: 'supportiveCommunity',
    descriptionKey: 'communityDesc',
    icon: Users,
    color: '#8B5CF6',
  },
];

const FeatureWalkthrough = ({ currentStep, onNext, onSkip }) => {
  const { state } = useApp();
  const feature = features[currentStep - 2]; // Adjust for 0-based indexing (steps 2-4)
  const IconComponent = feature.icon;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: `${feature.color}20` }]}>
          <IconComponent size={80} color={feature.color} />
        </View>
        
        <Text style={styles.title}>{getTranslation(state.selectedLanguage, feature.titleKey)}</Text>
        <Text style={styles.description}>{getTranslation(state.selectedLanguage, feature.descriptionKey)}</Text>
        
        <View style={styles.pagination}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentStep - 2 && styles.activeDot
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipButtonText}>{getTranslation(state.selectedLanguage, 'skip')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>{getTranslation(state.selectedLanguage, 'next')}</Text>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#22C55E',
    width: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
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
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FeatureWalkthrough;