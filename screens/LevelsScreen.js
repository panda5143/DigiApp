import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Fungsi helper tetap sama
const getLevelDescription = (level) => {
  const descriptions = {
    'Baby I': 'Tahap pertama Digimon setelah menetas dari DigiEgg. Sangat lemah dan membutuhkan perawatan khusus.',
    'Baby II': 'Tahap kedua Digimon dengan kemampuan dasar yang mulai berkembang. Masih membutuhkan perlindungan.',
    'Child': 'Level anak dengan kemampuan bertarung dasar. Mulai dapat melindungi diri sendiri.',
    'Adult': 'Level dewasa dengan kekuatan yang sudah matang. Mampu bertarung dengan baik.',
    'Perfect': 'Level sempurna dengan kekuatan yang sangat besar. Menguasai teknik bertarung tingkat tinggi.',
    'Ultimate': 'Level tertinggi dengan kekuatan maksimal. Sangat kuat dan memiliki teknik spesial.',
    'Armor': 'Evolusi khusus menggunakan DigiMental. Memiliki kemampuan unik sesuai atribut.',
    'Hybrid': 'Gabungan antara manusia dan Digimon. Memiliki kekuatan yang unik dan spesial.',
  };
  return descriptions[level] || 'Level evolusi Digimon dengan karakteristik unik';
};

const getLevelGradient = (levelName) => {
  const gradients = {
    'Baby I': ['#FF6B6B', '#FF8E8E'],
    'Baby II': ['#4ECDC4', '#45B7AF'],
    'Child': ['#FFD93D', '#FFB302'],
    'Adult': ['#6C5CE7', '#814DFF'],
    'Perfect': ['#A8E6CF', '#3EDBAD'],
    'Ultimate': ['#FF3366', '#FF0844'],
    'Armor': ['#45B7AF', '#2E8B57'],
    'Hybrid': ['#814DFF', '#6C5CE7'],
  };
  return gradients[levelName] || ['#0084FF', '#9B30FF'];
};

const LevelCard = ({ level, onPress, index }) => {
  const scaleAnim = useState(new Animated.Value(0))[0];
  const translateY = useState(new Animated.Value(50))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
        delay: index * 100,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          transform: [
            { scale: scaleAnim },
            { translateY: translateY },
          ],
          opacity: scaleAnim,
        },
      ]}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <LinearGradient
          colors={getLevelGradient(level.name)}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.levelIconContainer}>
            <View style={styles.levelIcon}>
              <Text style={styles.levelIconText}>{level.name.charAt(0)}</Text>
            </View>
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelName}>{level.name}</Text>
            <Text style={styles.levelDescription}>
              {getLevelDescription(level.name)}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const LevelsScreen = ({ navigation }) => {
  // Tambahkan state management
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllLevels();
  }, []);

  const fetchAllLevels = async () => {
    try {
      setLoading(true);
      const levelPromises = Array.from({ length: 9 }, (_, i) =>
        fetch(`https://digi-api.com/api/v1/level/${i + 1}`)
          .then(response => response.json())
          .catch(error => {
            console.error(`Error fetching level ${i + 1}:`, error);
            return null;
          })
      );

      const results = await Promise.all(levelPromises);
      const validLevels = results
        .filter(level => level && level.name)
        .sort((a, b) => a.id - b.id);

      setLevels(validLevels);
      setError(null);
    } catch (error) {
      setError('Failed to load levels. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLevelPress = (level) => {
    navigation.navigate('LevelDetail', {
      levelId: level.id,
      levelName: level.name
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0084FF" />
        <Text style={styles.loadingText}>Loading Levels...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchAllLevels}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Evolution Levels</Text>
        <Text style={styles.headerSubtitle}>Explore Digimon growth stages</Text>
      </LinearGradient>

      <FlatList
        data={levels}
        renderItem={({ item, index }) => (
          <LevelCard
            level={item}
            index={index}
            onPress={() => handleLevelPress(item)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No levels found</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
  },
  loadingText: {
    marginTop: 15,
    color: '#0084FF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
  retryButton: {
    backgroundColor: '#0084FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    padding: 15,
    paddingBottom: 30,
  },
  cardContainer: {
    marginBottom: 15,
    borderRadius: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  card: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    minHeight: 100,
  },
  levelIconContainer: {
    marginRight: 15,
  },
  levelIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  levelIconText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  levelInfo: {
    flex: 1,
  },
  levelName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  levelDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default LevelsScreen;