import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AboutScreen = () => {
  const openEmail = () => {
    Linking.openURL('mailto:indar.hafi@gmail.com');
  };

  const openGithub = () => {
    Linking.openURL('https://github.com/yourusername');
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Image
            source={require('../assets/foto.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.name}>INDAR HAFIAN</Text>
            <Text style={styles.title}>Digimon App Developer</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>ID</Text>
              <Text style={styles.infoValue}>21120122120026</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Role</Text>
              <Text style={styles.infoValue}>Mahasiswa</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>University</Text>
              <Text style={styles.infoValue}>UNDIPZ</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.sectionTitle}>About The App</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.appDescription}>
            AppDig adalah aplikasi yang dirancang khusus bagi para penggemar Digimon untuk menjelajahi dunia Monster Digital secara mendalam. Dengan antarmuka yang intuitif dan mudah digunakan, AppDig menyediakan informasi lengkap dan terperinci tentang berbagai Digimon, termasuk tingkat evolusi mereka, jenis, dan atribut uniknya. Aplikasi ini memungkinkan pengguna untuk menemukan Digimon favorit mereka, mempelajari sejarah dan karakteristiknya, serta memahami jalur evolusi yang kompleks.
          </Text>
          
          <Text style={[styles.appDescription, styles.secondParagraph]}>
            AppDig hadir sebagai sumber informasi komprehensif yang membantu pengguna mengenali setiap Digimon secara lebih dekat, baik untuk penggemar baru yang ingin belajar maupun veteran yang ingin memperluas wawasan mereka. Dengan fitur pencarian yang canggih dan data yang selalu diperbarui, AppDig memastikan pengalaman yang kaya dan mendalam bagi semua penggunanya. Jelajahi dunia digital dengan AppDig dan temukan detail menarik tentang Digimon favorit Anda di satu tempat!
          </Text>
        </View>
      </View>
    </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Key Features</Text>
          </View>
          <View style={[styles.cardContent, styles.featuresList]}>
            {[
              'Complete Digimon Database',
              'Detailed Evolution Chains',
              'Type Classifications',
              'Level Categories',
              'Search Functionality'
            ].map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.contactButton} onPress={openEmail}>
            <Text style={styles.contactButtonText}>Contact Developer</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.githubButton} onPress={openGithub}>
            <Text style={styles.githubButtonText}>Visit GitHub</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
  },
  headerTextContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  title: {
    fontSize: 18,
    color: '#e8e8e8',
    marginTop: 5,
  },
  content: {
    padding: 20,
    marginTop: -20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 15,
  },
  cardContent: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  appDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    textAlign: 'justify', // Membuat teks rata kanan kiri
    paddingHorizontal: 4, // Memberikan sedikit padding di sisi kanan dan kiri
    letterSpacing: 0.3, // Memberikan sedikit jarak antar huruf
  },
  secondParagraph: {
    marginTop: 15, // Memberikan jarak antara paragraf
  },
  featuresList: {
    paddingVertical: 5,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3498db',
    marginRight: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#34495e',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  contactButton: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  githubButton: {
    flex: 1,
    backgroundColor: '#2c3e50',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  githubButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  version: {
    textAlign: 'center',
    fontSize: 14,
    color: '#95a5a6',
    marginTop: 10,
    marginBottom: 30,
  },
});

export default AboutScreen;