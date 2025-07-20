import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Leaf } from 'lucide-react-native';
import { useApp } from '../../contexts/AppContext';
import { getTranslation } from '../../utils/translations';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'hi', name: 'हिंदी (Hindi)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'bn', name: 'বাংলা (Bangla)' },
  { code: 'ml', name: 'മലയാളം (Malayalam)' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
];

const LanguageSelection = ({ onNext }) => {
  const { state, dispatch } = useApp();
  const [selectedLanguage, setSelectedLanguage] = useState(state.selectedLanguage);

  const handleAccept = () => {
    dispatch({ type: 'SET_LANGUAGE', payload: selectedLanguage });
    onNext();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Leaf size={60} color="#22C55E" />
        <Text style={styles.title}>{getTranslation(selectedLanguage, 'selectLanguage')}</Text>
      </View>

      <View style={styles.languageList}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageOption,
              selectedLanguage === language.name && styles.selectedOption
            ]}
            onPress={() => setSelectedLanguage(language.name)}
          >
            <View style={[
              styles.radioButton,
              selectedLanguage === language.name && styles.selectedRadio
            ]}>
              {selectedLanguage === language.name && <View style={styles.radioInner} />}
            </View>
            <Text style={[
              styles.languageText,
              selectedLanguage === language.name && styles.selectedText
            ]}>
              {language.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.termsText}>
          {getTranslation(selectedLanguage, 'termsText')}{' '}
          <Text style={styles.linkText}>{getTranslation(selectedLanguage, 'termsOfUse')}</Text> {getTranslation(selectedLanguage, 'and')}{' '}
          <Text style={styles.linkText}>{getTranslation(selectedLanguage, 'privacyPolicy')}</Text>
        </Text>
        
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.acceptButtonText}>{getTranslation(selectedLanguage, 'accept')}</Text>
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
    marginTop: 20,
  },
  languageList: {
    marginBottom: 40,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#F9FAFB',
  },
  selectedOption: {
    backgroundColor: '#EEF2FF',
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 15,
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
  languageText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  selectedText: {
    color: '#22C55E',
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  linkText: {
    color: '#22C55E',
    textDecorationLine: 'underline',
  },
  acceptButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LanguageSelection;