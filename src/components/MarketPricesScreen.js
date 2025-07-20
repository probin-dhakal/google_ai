import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator 
} from 'react-native';
import { ArrowLeft, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react-native';
import { callGeminiAPI } from '../config/gemini';
import { useApp } from '../contexts/AppContext';
import { getTranslation } from '../utils/translations';

const crops = [
  { id: 'tomato', nameKey: 'tomato', emoji: '🍅' },
  { id: 'wheat', nameKey: 'wheat', emoji: '🌾' },
  { id: 'rice', nameKey: 'rice', emoji: '🍚' },
  { id: 'onion', nameKey: 'onion', emoji: '🧅' },
  { id: 'potato', nameKey: 'potato', emoji: '🥔' },
  { id: 'corn', nameKey: 'corn', emoji: '🌽' },
];

const MarketPricesScreen = ({ onBack }) => {
  const { state } = useApp();
  const [selectedCrop, setSelectedCrop] = useState(crops[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [priceData, setPriceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [marketInsights, setMarketInsights] = useState('');

  useEffect(() => {
    fetchMarketData();
  }, [selectedCrop]);

  const fetchMarketData = async () => {
    try {
      setIsLoading(true);
      
      // Simulate market data
      const mockPriceData = {
        currentPrice: Math.floor(Math.random() * 50) + 20,
        change: (Math.random() - 0.5) * 20,
        unit: 'kg',
        lastUpdated: new Date().toLocaleTimeString(),
      };
      
      setPriceData(mockPriceData);
      
      // Get AI insights
      const prompt = `Provide market analysis and selling recommendations for ${selectedCrop.name} with current price trends.`;
      const insights = await callGeminiAPI(prompt);
      setMarketInsights(insights);
    } catch (error) {
      console.error('Failed to fetch market data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectCrop = (crop) => {
    setSelectedCrop(crop);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getTranslation(state.selectedLanguage, 'marketPrices')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Crop Selector */}
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorLabel}>{getTranslation(state.selectedLanguage, 'selectCrop')}</Text>
          <TouchableOpacity 
            style={styles.dropdown} 
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <View style={styles.dropdownContent}>
              <Text style={styles.cropEmoji}>{selectedCrop.emoji}</Text>
              <Text style={styles.dropdownText}>{getTranslation(state.selectedLanguage, selectedCrop.nameKey)}</Text>
            </View>
            <ChevronDown size={20} color="#6B7280" />
          </TouchableOpacity>
          
          {showDropdown && (
            <View style={styles.dropdownMenu}>
              {crops.map((crop) => (
                <TouchableOpacity
                  key={crop.id}
                  style={styles.dropdownItem}
                  onPress={() => selectCrop(crop)}
                >
                  <Text style={styles.cropEmoji}>{crop.emoji}</Text>
                  <Text style={styles.dropdownItemText}>{getTranslation(state.selectedLanguage, crop.nameKey)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Price Display */}
        {priceData && (
          <View style={styles.priceCard}>
            <View style={styles.priceHeader}>
              <Text style={styles.cropName}>{getTranslation(state.selectedLanguage, selectedCrop.nameKey)}</Text>
              <View style={[
                styles.changeIndicator,
                priceData.change >= 0 ? styles.positiveChange : styles.negativeChange
              ]}>
                {priceData.change >= 0 ? 
                  <TrendingUp size={16} color="#10B981" /> : 
                  <TrendingDown size={16} color="#EF4444" />
                }
                <Text style={[
                  styles.changeText,
                  priceData.change >= 0 ? styles.positiveText : styles.negativeText
                ]}>
                  {priceData.change >= 0 ? '+' : ''}{priceData.change.toFixed(1)}%
                </Text>
              </View>
            </View>
            
            <View style={styles.priceDisplay}>
              <Text style={styles.currentPrice}>
                ₹{priceData.currentPrice}/{priceData.unit}
              </Text>
              <Text style={styles.lastUpdated}>
                {getTranslation(state.selectedLanguage, 'lastUpdated')}: {priceData.lastUpdated}
              </Text>
            </View>
          </View>
        )}

        {/* Market Data Section */}
        <View style={styles.marketDataSection}>
          <Text style={styles.sectionTitle}>{getTranslation(state.selectedLanguage, 'marketData')}</Text>
          <View style={styles.marketDataCard}>
            <Text style={styles.marketDataText}>
              {getTranslation(state.selectedLanguage, 'todaysPrice')}: {getTranslation(state.selectedLanguage, selectedCrop.nameKey)} ₹{priceData?.currentPrice || 0}/{priceData?.unit || 'kg'}
            </Text>
          </View>
        </View>

        {/* Loading State */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#22C55E" />
            <Text style={styles.loadingText}>{getTranslation(state.selectedLanguage, 'fetchingInsights')}</Text>
          </View>
        )}

        {/* AI Market Insights */}
        {marketInsights && !isLoading && (
          <View style={styles.insightsSection}>
            <Text style={styles.sectionTitle}>{getTranslation(state.selectedLanguage, 'aiMarketInsights')}</Text>
            <View style={styles.insightsCard}>
              <Text style={styles.insightsText}>{marketInsights}</Text>
            </View>
          </View>
        )}

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>{getTranslation(state.selectedLanguage, 'quickStats')}</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>₹{(priceData?.currentPrice || 0) - 5}</Text>
              <Text style={styles.statLabel}>{getTranslation(state.selectedLanguage, 'yesterday')}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>₹{(priceData?.currentPrice || 0) + 3}</Text>
              <Text style={styles.statLabel}>{getTranslation(state.selectedLanguage, 'weekHigh')}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>₹{(priceData?.currentPrice || 0) - 8}</Text>
              <Text style={styles.statLabel}>{getTranslation(state.selectedLanguage, 'weekLow')}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  selectorContainer: {
    marginBottom: 20,
    position: 'relative',
    zIndex: 1000,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cropEmoji: {
    fontSize: 20,
    marginRight: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#374151',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginTop: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#374151',
  },
  priceCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cropName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  positiveChange: {
    backgroundColor: '#ECFDF5',
  },
  negativeChange: {
    backgroundColor: '#FEF2F2',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  positiveText: {
    color: '#10B981',
  },
  negativeText: {
    color: '#EF4444',
  },
  priceDisplay: {
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#6B7280',
  },
  marketDataSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  marketDataCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#22C55E',
  },
  marketDataText: {
    fontSize: 16,
    color: '#374151',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 10,
  },
  insightsSection: {
    marginBottom: 20,
  },
  insightsCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  insightsText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  statsSection: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default MarketPricesScreen;