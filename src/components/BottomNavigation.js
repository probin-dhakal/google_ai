import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Leaf, Users, ShoppingBag, User } from 'lucide-react-native';
import { useApp } from '../contexts/AppContext';
import { getTranslation } from '../utils/translations';

const BottomNavigation = ({ activeTab, onTabPress }) => {
  const { state } = useApp();
  
  const tabs = [
    { id: 'home', labelKey: 'yourCrops', icon: Leaf },
    { id: 'community', labelKey: 'community', icon: Users },
    { id: 'market', labelKey: 'market', icon: ShoppingBag },
    { id: 'profile', labelKey: 'you', icon: User },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabPress(tab.id)}
          >
            <IconComponent 
              size={24} 
              color={isActive ? '#22C55E' : '#9CA3AF'} 
            />
            <Text style={[
              styles.tabLabel,
              isActive && styles.activeTabLabel
            ]}>
              {getTranslation(state.selectedLanguage, tab.labelKey)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingVertical: 8,
    paddingBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  activeTabLabel: {
    color: '#22C55E',
    fontWeight: '600',
  },
});

export default BottomNavigation;