import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import DigimonListScreen from './screens/DigimonListScreen';
import DigimonDetailScreen from './screens/DigimonDetailScreen';
import TypesScreen from './screens/TypesScreen';
import LevelsScreen from './screens/LevelsScreen';
import LevelDetailScreen from './screens/LevelDetailScreen';
import AboutScreen from './screens/AboutScreen';
import TypeDetailScreen from './screens/TypeDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator untuk Digimon screens
const DigimonStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="DigimonList" 
        component={DigimonListScreen}
        options={{ title: 'Digimon List' }}
      />
      <Stack.Screen 
        name="DigimonDetail" 
        component={DigimonDetailScreen}
        options={({ route }) => ({ title: route.params?.name || 'Digimon Detail' })}
      />
    </Stack.Navigator>
  );
};

// Stack Navigator untuk Level screens
const LevelStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="LevelsList" 
        component={LevelsScreen}
        options={{ title: 'Digimon Levels' }}
      />
      <Stack.Screen 
        name="LevelDetail" 
        component={LevelDetailScreen}
        options={({ route }) => ({ title: `${route.params?.levelName || 'Level'} Digimon` })}
      />
      <Stack.Screen 
        name="DigimonDetail" 
        component={DigimonDetailScreen}
        options={({ route }) => ({ title: route.params?.name || 'Digimon Detail' })}
      />
    </Stack.Navigator>
  );
};

// Stack Navigator untuk Type screens
const TypeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TypesList" 
        component={TypesScreen}
        options={{ title: 'Digimon Types' }}
      />
      <Stack.Screen 
        name="TypeDetail" 
        component={TypeDetailScreen}
        options={({ route }) => ({ 
          title: `${route.params?.typeName || 'Type'} Digimon` 
        })}
      />
      <Stack.Screen 
        name="DigimonDetail" 
        component={DigimonDetailScreen}
        options={({ route }) => ({ 
          title: route.params?.name || 'Digimon Detail' 
        })}
      />
    </Stack.Navigator>
  );
};

// Main App Component
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Digimon':
                iconName = focused ? 'list' : 'list-outline';
                break;
              case 'Types':
                iconName = focused ? 'grid' : 'grid-outline';
                break;
              case 'Levels':
                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                break;
              case 'About':
                iconName = focused ? 'information-circle' : 'information-circle-outline';
                break;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0084FF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen 
          name="Digimon" 
          component={DigimonStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Types" 
          component={TypeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Levels" 
          component={LevelStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;