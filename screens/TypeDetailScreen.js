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
      <Text style={styles.cardSubtitle}>{item.types.join(', ')}</Text>
      <View style={styles.viewDetailsContainer}>
        <Text style={styles.viewDetailsText}>View Details</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const TypeDetailScreen = ({ route, navigation }) => {
  const { typeId, typeName } = route.params;
  const [digimons, setDigimons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [processedPages, setProcessedPages] = useState(new Set());
  const [allDigimonCount, setAllDigimonCount] = useState(0);
  const PAGE_SIZE = 50;

  useEffect(() => {
    if (!processedPages.has(page) && hasMore) {
      fetchDigimonsByType();
    }
  }, [page]);

  const fetchDigimonsByType = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(
        `https://digi-api.com/api/v1/digimon?page=${page}&pageSize=${PAGE_SIZE}`
      );
      const data = await response.json();

      if (data.content && data.content.length > 0) {
        if (page === 1) {
          setAllDigimonCount(data.pageable.totalElements);
        }

        const batchSize = 10;
        const batches = [];
        for (let i = 0; i < data.content.length; i += batchSize) {
          batches.push(data.content.slice(i, i + batchSize));
        }

        let newDigimons = [];
        for (const batch of batches) {
          const batchResults = await Promise.all(
            batch.map(async (digimon) => {
              try {
                const detailResponse = await fetch(
                  `https://digi-api.com/api/v1/digimon/${digimon.id}`
                );
                const detailData = await detailResponse.json();
                
                if (detailData.types && detailData.types.some(type => type.id === typeId)) {
                  return {
                    ...digimon,
                    types: detailData.types.map(type => type.type)
                  };
                }
                return null;
              } catch (error) {
                console.error(Error `fetching Digimon ${digimon.id} details:, error`);
                return null;
              }
            })
          );
          
          newDigimons = [...newDigimons, ...batchResults.filter(d => d !== null)];
          
          setDigimons(prevDigimons => {
            const uniqueDigimons = [...prevDigimons];
            newDigimons.forEach(newDigimon => {
              if (!uniqueDigimons.some(d => d.id === newDigimon.id)) {
                uniqueDigimons.push(newDigimon);
              }
            });
            return uniqueDigimons;
          });
        }

        setProcessedPages(prev => new Set(prev).add(page));
        setHasMore(data.pageable.hasNextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching digimons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleDigimonPress = (digimon) => {
    navigation.navigate('DigimonDetail', {
      id: digimon.id,
      name: digimon.name,
      image: digimon.image,
      types: digimon.types
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
      <Text style={styles.headerTitle}>{typeName} Digimons</Text>
      <Text style={styles.headerSubtitle}>
        Found: {digimons.length} | Total Digimons: {allDigimonCount}
      </Text>
    </View>
  );

  if (loading && digimons.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0084FF" />
        <Text style={styles.loadingText}>Loading {typeName} Digimons...</Text>
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
          <Text style={styles.emptyText}>No Digimons found for {typeName} type</Text>
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
    backgroundColor: '#f5f6fa',
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
  headerContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    margin: 10,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  list: {
    padding: 5,
  },
  row: {
    justifyContent: 'space-evenly',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 5,
    width: '47%',
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  viewDetailsContainer: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
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
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});

export default TypeDetailScreen;