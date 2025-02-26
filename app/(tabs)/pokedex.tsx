import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useContext } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { DataContext } from '../../context/DataContext';
import SearchBar from '../components/searchbar';
import Catalog from '../components/catalog';
import Details from '../components/details';
import { Link } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function PokedexScreen() {
  const { theme } = useTheme();
  const { storage, setSearch, selected, setSelected, offset, setOffset, limit } = useContext(DataContext)!;

  function handleSearch(text: string | null) {
    setSearch(text);
  }

  function handleSelect(pokemon: any) {
    console.log("Selected Pokémon:", pokemon.name); // Debugging log
    setSelected(pokemon.name);
  }

  return (
    <LinearGradient  colors={theme.background} style={styles.container}>
      {/* 🔍 Search Bar Stays at the Top */}

      {/* ⚡ Side-by-Side Layout (Catalog on Left, Details on Right) */}
      {storage === null ? (
        <ActivityIndicator size="large" color={theme.text} />
      ) : (
        <View style={styles.flexContainer}>
          {selected === null ? (
            // {/* 📜 Pokémon List (Left) */}
            <View style={styles.catalogContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
          <SearchBar onSearch={handleSearch} theme={theme} />
          </View>
          <Catalog onSelect={handleSelect} theme={theme} />
          </View>

          ):(
          // {/* 📝 Pokémon Details (Right) */}
          <View style={styles.detailsContainer}>
            {selected && <Details theme={theme} />}
          </View>
            
          )}


        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexContainer: {
    // marginLeft: "100%",
    width:'100%',
    flex: 1,
  },
  catalogContainer: {
    flex: 1, // 📜 Takes 50% of the screen
    // paddingRight: 5, // Adds spacing between catalog & details
  },
  detailsContainer: {
    flex: 1, // 📝 Takes 50% of the screen
    // paddingLeft: 5,
  },
});

