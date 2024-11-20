import React, { useState, useEffect } from 'react';
import { EnhancedScreen } from '../screens/DigimonScreens';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const getTypeIcon = (typeName) => {
  const icons = {
    'Reptile': 'snake',
    'Fire': 'fire',
    'Water': 'water',
    'Beast': 'paw',
    'Dragon': 'dragon',
    'Nature': 'leaf',
    'Machine': 'robot',
    'Dark': 'moon-waning-crescent',
    'Light': 'white-balance-sunny',
    'Ice': 'snowflake',
    'Lightning': 'lightning-bolt',
    'Air': 'weather-windy',
    'Earth': 'mountain',
    'Holy': 'star-four-points',
    'Evil': 'ghost',
    'Warrior': 'sword',
    'Metal': 'cog',
    'Rock': 'mountain-peak',
    'Demon': 'ghost-outline',
    'Ancient': 'clock-time-eight',
    'Fairy': 'butterfly',
    'Spirit': 'spirit-level',
    'Legend': 'crown',
    'Aqua': 'waves',
    'Mystic': 'crystal-ball',
    'Insect': 'beetle',
    'Puppet': 'human-dolly',
    'Bird': 'bird',
    'Angel': 'angel',
    'Alien': 'alien',
  };
  return icons[typeName] || 'shape';
};

const getTypeDescription = (typeName) => {
  const descriptions = {
    'Reptile': 'Digimon tipe reptil dengan kulit keras dan serangan kuat',
    'Fire': 'Digimon pengguna api dengan kemampuan pembakaran intens',
    'Water': 'Digimon air yang ahli dalam teknik berbasis air',
    'Beast': 'Digimon mirip hewan dengan insting alami',
    'Dragon': 'Digimon naga dengan kekuatan luar biasa',
    'Nature': 'Digimon berbasis tumbuhan dengan kemampuan alam',
    'Machine': 'Digimon mekanik dengan teknologi canggih',
    'Dark': 'Digimon atribut gelap dengan kekuatan misterius',
    'Light': 'Digimon berbasis cahaya dengan kemampuan suci',
    'Ice': 'Digimon es dengan serangan pembekuan',
    'Lightning': 'Digimon listrik dengan kekuatan mengejutkan',
    'Air': 'Digimon terbang yang menguasai pertarungan udara',
    'Earth': 'Digimon tanah dengan pertahanan solid',
    'Holy': 'Digimon suci dengan kekuatan ilahi',
    'Evil': 'Digimon jahat dengan kemampuan korup',
    'Warrior': 'Digimon pejuang dengan keahlian bertarung',
    'Metal': 'Digimon berbasis logam dengan pertahanan tinggi',
    'Rock': 'Digimon berbatu dengan ketahanan ekstrim',
    'Demon': 'Digimon iblis dengan kekuatan kegelapan',
    'Ancient': 'Digimon kuno dengan kekuatan legendaris',
    'Fairy': 'Digimon peri dengan kemampuan magis',
    'Spirit': 'Digimon roh dengan kekuatan supernatural',
    'Legend': 'Digimon legendaris dengan kekuatan mistis',
    'Aqua': 'Digimon air dengan kendali sempurna atas air',
    'Mystic': 'Digimon mistis dengan kekuatan gaib',
    'Insect': 'Digimon serangga dengan kemampuan unik',
    'Puppet': 'Digimon boneka dengan kemampuan manipulasi',
    'Bird': 'Digimon burung dengan keahlian udara',
    'Angel': 'Digimon malaikat dengan kekuatan suci',
    'Alien': 'Digimon alien dengan teknologi luar angkasa',
  };
  return descriptions[typeName] || 'Tipe Digimon unik dengan karakteristik khusus';
};

const TypesScreen = ({ navigation }) => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllTypes();
  }, []);

  const fetchAllTypes = async () => {
    try {
      setLoading(true);
      // Meningkatkan jumlah type yang di-fetch menjadi 30
      const typePromises = Array.from({ length: 30 }, (_, i) =>
        fetch(`https://digi-api.com/api/v1/type/${i + 1}`)
          .then(response => response.json())
          .catch(error => {
            console.error(`Error fetching type ${i + 1}:`, error);
            return null;
          })
      );

      const results = await Promise.all(typePromises);
      const validTypes = results
        .filter(type => type && type.name)
        .sort((a, b) => a.id - b.id);

      // Menambahkan custom types jika diperlukan
      const customTypes = [
        // Tambahkan custom types di sini jika API tidak menyediakan cukup types
      ];

      setTypes([...validTypes, ...customTypes]);
      setError(null);
    } catch (error) {
      setError('Failed to load types. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTypePress = (type) => {
    navigation.navigate('TypeDetail', {
      typeId: type.id,
      typeName: type.name,
      description: getTypeDescription(type.name)
    });
  };

  return (
    <EnhancedScreen
      title="Digimon Types"
      subtitle="Jelajahi berbagai spesies Digimon dan kemampuan unik mereka"
      data={types}
      loading={loading}
      error={error}
      onRetry={fetchAllTypes}
      onItemPress={handleTypePress}
      getIcon={(item) => getTypeIcon(item.name)}
      getDescription={(item) => getTypeDescription(item.name)}
    />
  );
};

export default TypesScreen;