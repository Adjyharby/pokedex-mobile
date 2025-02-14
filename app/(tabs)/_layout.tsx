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
              ios: { position: 'absolute' },
              default: {},
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
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            }}
          />

          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              href: '/settings',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
            }}
          />
        </Tabs>
      </ThemeProvider>
    </DataProvider>
  );
}
