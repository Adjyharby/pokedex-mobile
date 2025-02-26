import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProvider } from '@/context/ThemeContext'; // 🎨 Theme Context
import { DataProvider } from '@/context/DataContext';   // 🔥 Data Context
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <DataProvider> {/* 🔥 Wrap in DataProvider for global Pokémon data */}
      <ThemeProvider> {/* 🎨 Wrap in ThemeProvider for global theme management */}
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: {
                position: 'absolute',
                backgroundColor: 'black', // Change tab background color
                borderTopWidth: 0, // Optional: Remove top border for a clean look
              },
              android: {
                backgroundColor: 'black', // Change background for Android as well
                elevation: 10, // Adds a shadow effect on Android
              },
              default: {
                backgroundColor: 'black',
              },
            }),
            
          }}>
          {/* 🔥 Hidden index.tsx (it won't appear in the tab bar) */}
          <Tabs.Screen
            name="index"
            options={{ href: null }} // 👈 Hides index.tsx from the tabs
          />

          <Tabs.Screen
            name="pokedex"
            options={{
              title: 'Pokédex',
              href: '/pokedex',
              tabBarIcon: () =><AntDesign name="book" size={24} color="white" />,
            }}
          />

          <Tabs.Screen
            name="settings"
            options={{
              title: 'Themes',
              href: '/settings',
              tabBarIcon: () => <MaterialCommunityIcons name="theme-light-dark" size={24} color="white" />
            }}
          />
          <Tabs.Screen
            name="camera"
            options={{
              title: 'Camera',
              href: '/camera',
              tabBarIcon: () => <MaterialCommunityIcons name="camera" size={24} color="white" />
            }}
          />
        </Tabs>
      </ThemeProvider>
    </DataProvider>
  );
}