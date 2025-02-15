import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';

export default function Details({ theme }: { theme: any }) {
  const { storage, selected } = useContext(DataContext)!;

  if (!storage || storage.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.text} />
        <Text style={[styles.loadingText, { color: theme.text }]}>Loading Pokémon...</Text>
      </View>
    );
  }

  const pokemon = storage[0]; // Get selected Pokémon

  return (
    <View style={[styles.container, { backgroundColor: theme.button, borderColor: theme.border }]}>
      {selected == null ? (
        // No Pokémon selected
        <View style={styles.defaultContainer}>
          <Text style={[styles.defaultText, { color: theme.text }]}>Please select a Pokémon</Text>
          <View style={[styles.imageContainer, { backgroundColor: theme.background[1] }]}>
            <Text style={[styles.imagePlaceholder, { color: theme.text }]}>Image here</Text>
          </View>
        </View>
      ) : (
        // Pokémon Selected - Show Details
        <View >
          <View style={styles.detailsContainer}>
          <View style={[styles.scroller]}>
          <Text style={[styles.pokemonName, { color: theme.text }]}>{pokemon.name}</Text>

{/* Pokémon Image */}
<View style={[styles.imageContainer, { backgroundColor: theme.background[1] }]}>
  {pokemon.sprites?.other?.['official-artwork']?.front_default ? (
    <Image source={{ uri: pokemon.sprites.other['official-artwork'].front_default }} style={styles.largeImage} />
  ) : (
    <Text style={[styles.imagePlaceholder, { color: theme.text }]}>No Image</Text>
  )}
</View>
            </View>

            {/* Pokémon Stats (Now Below Image) */}
            <View style={styles.statsContainer}>
              {/* Left Stats Column */}
              <View style={[styles.statColumn, { borderColor: theme.border }]}>
                <View style={styles.statRow}>
                  <Text style={[styles.statLabel, { color: theme.text }]}>HP:</Text>
                  <Text style={[styles.statValue, { color: theme.text }]}>{pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat || '-'}</Text>
                </View>

                <View style={styles.statRow}>
                  <Text style={[styles.statLabel, { color: theme.text }]}>Attack:</Text>
                  <Text style={[styles.statValue, { color: theme.text }]}>{pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || '-'}</Text>
                </View>

                <View style={styles.statRow}>
                  <Text style={[styles.statLabel, { color: theme.text }]}>Defense:</Text>
                  <Text style={[styles.statValue, { color: theme.text }]}>{pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat || '-'}</Text>
                </View>

                <View style={styles.statRow}>
                  <Text style={[styles.statLabel, { color: theme.text }]}>Speed:</Text>
                  <Text style={[styles.statValue, { color: theme.text }]}>{pokemon.stats.find(stat => stat.stat.name === 'speed')?.base_stat || '-'}</Text>
                </View>
              </View>

              {/* Right Stats Column */}
              <View style={[styles.statColumn, { borderColor: theme.border }]}>
                <View style={styles.statRow}>
                  <Text style={[styles.statLabel, { color: theme.text }]}>Sp. Atk:</Text>
                  <Text style={[styles.statValue, { color: theme.text }]}>{pokemon.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat || '-'}</Text>
                </View>

                <View style={styles.statRow}>
                  <Text style={[styles.statLabel, { color: theme.text }]}>Sp. Def:</Text>
                  <Text style={[styles.statValue, { color: theme.text }]}>{pokemon.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat || '-'}</Text>
                </View>

                <View style={styles.statRow}>
                  <Text style={[styles.statLabel, { color: theme.text }]}>Type 1:</Text>
                  <Text style={[styles.statValue, { color: theme.text }]}>{pokemon.types[0]?.type.name || '-'}</Text>
                </View>

                <View style={styles.statRow}>
                  <Text style={[styles.statLabel, { color: theme.text }]}>Type 2:</Text>
                  <Text style={[styles.statValue, { color: theme.text }]}>{pokemon.types[1]?.type.name || '-'}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scroller:{
    // flex: 1,
    flexDirection: 'row',
    },
  container: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  defaultContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  defaultText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    aspectRatio: 1,
    width: '40%', // 📌 Increased image size
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    marginTop: 5,
  },
  imagePlaceholder: {
    fontSize: 16,
  },
  largeImage: {
    width: '100%', // 📌 Ensures full size inside container
    height: '100%',
  },
  detailsContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  pokemonName: {
    fontSize: 25, // 📌 Increased font size
    fontWeight: 'bold',
    textTransform: 'capitalize',
    alignContent: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginRight: 10
  },
  statsContainer: { // 📌 Moves the stats below the image
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  statColumn: { // 📌 Ensures stats are grouped into two columns
    flex: 1,
    padding: 10,
    borderWidth: 2,
    borderRadius: 15,
  },
  statRow: { // 📌 Puts label and value on the same row
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: 12,
  },
});
