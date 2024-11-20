import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  ActivityIndicator 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const FeatureCard = ({ title, icon, description, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.cardGradient}
    >
      <Ionicons name={icon} size={32} color="#fff" style={styles.cardIcon} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0084FF" />
          </View>
        )}
        <ImageBackground
          source={{ 
            uri: 'https://sw6.elbenwald.de/thumbnail/67/bd/2f/1714171504/E1079008_1_1920x1920.jpg'
          }}
          style={styles.headerBackground}
          onLoadEnd={() => setIsLoading(false)}
          onLoadStart={() => setIsLoading(true)}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.headerGradient}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Welcome to AppDig</Text>
              <Text style={styles.subtitle}>Digital Monster Database</Text>
              <Text style={styles.description}>
                Jelajahi dunia menakjubkan para Digital Monster! Temukan berbagai Digimon,
                tingkat evolusi, tipe, dan karakteristik unik mereka dalam panduan lengkap ini.
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Fitur Utama</Text>
        
        <View style={styles.featuresGrid}>
          <FeatureCard
            title="Digimon List"
            icon="list-circle"
            description="Temukan dan pelajari berbagai Digimon"
            onPress={() => navigation.navigate('Digimon')}
          />
          <FeatureCard
            title="Types"
            icon="apps"
            description="Pelajari berbagai tipe Digimon"
            onPress={() => navigation.navigate('Types')}
          />
          <FeatureCard
            title="Levels"
            icon="stats-chart"
            description="Eksplorasi tingkat evolusi"
            onPress={() => navigation.navigate('Levels')}
          />
          <FeatureCard
            title="About"
            icon="information-circle"
            description="Tentang aplikasi dan pengembang"
            onPress={() => navigation.navigate('About')}
          />
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1000+</Text>
            <Text style={styles.statLabel}>Digimon</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>15+</Text>
            <Text style={styles.statLabel}>Types</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>9</Text>
            <Text style={styles.statLabel}>Levels</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
          <Text style={styles.footerSubtext}>Made with ❤️ for Digimon fans</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    height: 300,
    position: 'relative',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    zIndex: 1,
  },
  headerBackground: {
    height: 300,
    width: '100%',
    backgroundColor: '#192f6a',
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  header: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e0e0',
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    color: '#f0f0f0',
    marginTop: 10,
    lineHeight: 24,
  },
  content: {
    padding: 20,
    marginTop: -20,
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    marginTop: 10,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardGradient: {
    padding: 20,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    fontSize: 14,
    color: '#95a5a6',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#bdc3c7',
    marginTop: 5,
  },
});

export default HomeScreen;