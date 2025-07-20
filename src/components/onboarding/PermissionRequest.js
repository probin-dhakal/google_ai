import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Bell, MapPin } from 'lucide-react-native';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { useApp } from '../../contexts/AppContext';
import { getTranslation } from '../../utils/translations';

const permissions = {
  notifications: {
    titleKey: 'allowNotifications',
    descriptionKey: 'notificationDesc',
    icon: Bell,
    color: '#3B82F6',
  },
  location: {
    titleKey: 'allowLocation',
    descriptionKey: 'locationDesc',
    icon: MapPin,
    color: '#10B981',
  },
};

const PermissionRequest = ({ type, onNext, onSkip }) => {
  const { state } = useApp();
  const permission = permissions[type];
  const IconComponent = permission.icon;

  const handleAllow = async () => {
    try {
      if (type === 'notifications') {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
          console.log('Notification permission granted');
        } else {
          Alert.alert(
            'Permission Denied',
            'You can enable notifications later in your device settings.',
            [{ text: 'OK' }]
          );
        }
      } else if (type === 'location') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          console.log('Location permission granted');
        } else {
          Alert.alert(
            'Permission Denied',
            'You can enable location access later in your device settings.',
            [{ text: 'OK' }]
          );
        }
      }
      onNext();
    } catch (error) {
      console.error('Permission request error:', error);
      Alert.alert('Error', 'Failed to request permission. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: `${permission.color}20` }]}>
          <IconComponent size={80} color={permission.color} />
        </View>
        
        <Text style={styles.title}>{getTranslation(state.selectedLanguage, permission.titleKey)}</Text>
        <Text style={styles.description}>{getTranslation(state.selectedLanguage, permission.descriptionKey)}</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipButtonText}>{getTranslation(state.selectedLanguage, 'skip')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.allowButton} onPress={handleAllow}>
          <Text style={styles.allowButtonText}>{getTranslation(state.selectedLanguage, 'allow')}</Text>
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
  allowButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
  },
  allowButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PermissionRequest;