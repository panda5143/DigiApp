// screens/DigimonDetailScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const DetailSection = ({ title, children }) => (
  <View style={styles.section}>
    <LinearGradient
      colors={['#0084FF', '#9B30FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.sectionHeader}
    >
      <Text style={styles.sectionTitle}>{title}</Text>
    </LinearGradient>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

const DigimonDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [digimon, setDigimon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDigimonDetails();
  }, []);

  const fetchDigimonDetails = async () => {
    try {
      const response = await fetch(`https://digi-api.com/api/v1/digimon/${id}`);
      const data = await response.json();
      setDigimon(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching digimon details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0084FF" />
      </View>
    );
  }

  if (!digimon) {
    return (
      <View style={styles.centered}>
        <Text>Error loading Digimon details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: digimon.images[0].href }}
        style={styles.image}
        resizeMode="contain"
      />

      <DetailSection title="Basic Information">
        <Text style={styles.infoText}>Name: {digimon.name}</Text>
        <Text style={styles.infoText}>Level: {digimon.levels[0]?.level || 'N/A'}</Text>
        <Text style={styles.infoText}>Type: {digimon.types[0]?.type || 'N/A'}</Text>
        <Text style={styles.infoText}>Attribute: {digimon.attributes[0]?.attribute || 'N/A'}</Text>
        <Text style={styles.infoText}>Release Date: {digimon.releaseDate || 'N/A'}</Text>
      </DetailSection>

      <DetailSection title="Description">
        {digimon.descriptions.map((desc, index) => (
          <View key={index} style={styles.descriptionContainer}>
            <Text style={styles.languageText}>Language: {desc.language}</Text>
            <Text style={styles.descriptionText}>{desc.description}</Text>
          </View>
        ))}
      </DetailSection>

      <DetailSection title="Skills">
        {digimon.skills.map((skill, index) => (
          <View key={index} style={styles.skillContainer}>
            <Text style={styles.skillName}>{skill.skill}</Text>
            <Text style={styles.skillTranslation}>({skill.translation})</Text>
            <Text style={styles.skillDescription}>{skill.description}</Text>
          </View>
        ))}
      </DetailSection>

      <DetailSection title="Evolution">
        <Text style={styles.evolutionHeader}>Prior Evolutions:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {digimon.priorEvolutions.map((evo, index) => (
            <View key={index} style={styles.evolutionCard}>
              <Image source={{ uri: evo.image }} style={styles.evolutionImage} />
              <Text style={styles.evolutionName}>{evo.digimon}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.evolutionHeader}>Next Evolutions:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {digimon.nextEvolutions.map((evo, index) => (
            <View key={index} style={styles.evolutionCard}>
              <Image source={{ uri: evo.image }} style={styles.evolutionImage} />
              <Text style={styles.evolutionName}>{evo.digimon}</Text>
              {evo.condition && (
                <Text style={styles.evolutionCondition}>{evo.condition}</Text>
              )}
            </View>
          ))}
        </ScrollView>
      </DetailSection>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  sectionHeader: {
    padding: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    padding: 15,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  languageText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  skillContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  skillName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0084FF',
  },
  skillTranslation: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginVertical: 5,
  },
  skillDescription: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  evolutionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  evolutionCard: {
    width: 150,
    marginRight: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  evolutionImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  evolutionName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0084FF',
    textAlign: 'center',
  },
  evolutionCondition: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default DigimonDetailScreen;