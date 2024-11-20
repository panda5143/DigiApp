import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';

const DigimonCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image 
      source={{ uri: item.images[0].href }} 
      style={styles.cardImage}
      resizeMode="contain"
    />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      {item.levels && item.levels.length > 0 && (
        <Text style={styles.cardSubtitle}>{item.levels[0].level}</Text>
      )}
    </View>
  </TouchableOpacity>
);

const DigimonListScreen = ({ navigation }) => {
  const [digimons, setDigimons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDigimons, setFilteredDigimons] = useState([]);

  useEffect(() => {
    fetchDigimons();
  }, []);

  const fetchDigimons = async () => {
    try {
      const totalDigimons = 1000;
      
      const promises = Array.from({ length: totalDigimons }, (_, i) => 
        fetch(`https://digi-api.com/api/v1/digimon/${i + 1}`)
          .then(response => response.json())
          .catch(error => console.error(`Error fetching Digimon ${i + 1}:`, error))
      );

      const results = await Promise.all(promises);
      const validResults = results.filter(result => result && result.name && result.images && result.images.length > 0);
      
      setDigimons(validResults);
      setFilteredDigimons(validResults);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching digimons:', error);
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = digimons.filter(digimon =>
      digimon.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDigimons(filtered);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0084FF" />
        <Text style={styles.loadingText}>Loading Digimons...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Digimon..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredDigimons}
        renderItem={({ item }) => (
          <DigimonCard
            item={item}
            onPress={() => navigation.navigate('DigimonDetail', { 
              id: item.id,
              name: item.name 
            })}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
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
  loadingText: {
    marginTop: 10,
    color: '#0084FF',
    fontSize: 16,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
    elevation: 4,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  list: {
    padding: 5,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    elevation: 3,
    width: '48%',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 120,
    marginBottom: 8,
    borderRadius: 8,
  },
  cardContent: {
    width: '100%',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0084FF',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default DigimonListScreen;