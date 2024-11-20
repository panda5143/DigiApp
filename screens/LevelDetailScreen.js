import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';

const DigimonCard = ({ item, onPress }) => (
  <TouchableOpacity 
    style={styles.card} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Image 
      source={{ uri: item.image }} 
      style={styles.cardImage}
      resizeMode="contain"
    />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSubtitle}>{item.level}</Text>
      <View style={styles.viewDetailsContainer}>
        <Text style={styles.viewDetailsText}>View Details</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const LevelDetailScreen = ({ route, navigation }) => {
  const { levelName } = route.params;
  const [digimons, setDigimons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 20;

  useEffect(() => {
    fetchDigimonsByLevel();
  }, [page]);

  const fetchDigimonsByLevel = async () => {
    try {
      const response = await fetch(
        `https://digi-api.com/api/v1/digimon?level=${levelName}&page=${page}&pageSize=${PAGE_SIZE}`
      );
      const data = await response.json();
      
      if (data.content && data.content.length > 0) {
        if (page === 1) {
          setDigimons(data.content);
        } else {
          setDigimons(prevDigimons => [...prevDigimons, ...data.content]);
        }
        setHasMore(data.pageable.hasNextPage);
      } else {
        setHasMore(false);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching digimons:', error);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  // Mengubah nama screen tujuan menjadi 'DigimonDetail'
  const handleDigimonPress = (digimon) => {
    navigation.navigate('DigimonDetail', {
      id: digimon.id,
      name: digimon.name,
      image: digimon.image,
      level: digimon.level
    });
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#0084FF" />
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{levelName} Digimons</Text>
      <Text style={styles.headerSubtitle}>
        Total Digimons: {digimons.length}
      </Text>
    </View>
  );

  if (loading && page === 1) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0084FF" />
        <Text style={styles.loadingText}>Loading Digimons...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={digimons}
        renderItem={({ item }) => (
          <DigimonCard
            item={item}
            onPress={() => handleDigimonPress(item)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        numColumns={2}
        columnWrapperStyle={styles.row}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No Digimons found for this level</Text>
        }
        initialNumToRender={PAGE_SIZE}
        maxToRenderPerBatch={PAGE_SIZE}
        windowSize={5}
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
  headerContainer: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0084FF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 5,
  },
  loadingText: {
    marginTop: 10,
    color: '#0084FF',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6c757d',
    marginTop: 20,
    paddingHorizontal: 20,
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
    borderWidth: 1,
    borderColor: '#e9ecef',
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
  viewDetailsContainer: {
    marginTop: 8,
    backgroundColor: '#0084FF20',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  viewDetailsText: {
    fontSize: 12,
    color: '#0084FF',
    fontWeight: '500',
  },
  footerLoader: {
    padding: 10,
    alignItems: 'center',
  },
});

export default LevelDetailScreen;