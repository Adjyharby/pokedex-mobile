import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';

export default function Catalog({ theme, onSelect }: { theme: any; onSelect: (pokemon: any) => void }) {
  const { storage, selected, setSelected, offset, setOffset, limit } = useContext(DataContext)!;
  const [counter, setCounter] = useState(1);

  const handleBackCounter = () => setCounter((prev) => prev - 1);
  const handleNextCounter = () => setCounter((prev) => prev + 1);

  const handleNext = () => {
    if (storage && storage.length === limit) {
      setOffset(offset + limit);
    }
  };

  const handleBack = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  // 🔥 Prevent crashes if storage is null
  if (!storage) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.text} />
        <Text style={[styles.loadingText, { color: theme.text }]}>Loading Pokémon...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.button, borderColor: theme.border }]}>
      {selected == null ? (
        <>
          {/* Pagination Buttons */}
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.border }]}
              onPress={() => {
                handleBack();
                handleBackCounter();
              }}
              disabled={offset === 0}
            >
              <Text style={[styles.buttonText, { color: theme.text }]}>Back</Text>
            </TouchableOpacity>

            <Text style={[styles.counter, { color: theme.text }]}>{counter}</Text>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.border }]}
              onPress={() => {
                handleNext();
                handleNextCounter();
              }}
              disabled={storage.length < limit}
            >
              <Text style={[styles.buttonText, { color: theme.text }]}>Next</Text>
            </TouchableOpacity>
          </View>

          {/* Pokémon List */}
          {storage.length > 0 ? (
            <FlatList
              data={storage}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.card, { backgroundColor: theme.background[1], borderColor: theme.border }]}
                  onPress={() => setSelected(item.name)}
                >
                  <View style={styles.imageWrapper}>
                    <Image source={{ uri: item.sprites.front_default }} style={styles.image} resizeMode="contain" />
                  </View>
                  <Text style={[styles.pokemonName, { color: theme.text }]}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={[styles.loadingText, { color: theme.text }]}>No Pokémon found.</Text>
          )}
        </>
      ) : (
        // Selected Pokémon Details (Centered)
        <View style={styles.detailsContainer}>
          {/* <Text style={[styles.pokemonName, { color: theme.text }]}>{storage[0].name}</Text> */}

          {/* 🖼️ Centered Sprite Display */}
          <View style={styles.spriteWrapper}>
            <View style={styles.imageContainer}>
              {storage[0].sprites.front_default && (
                <View style={styles.imageCard}>
                  <Image source={{ uri: storage[0].sprites.front_default }} style={styles.fullSizeImage} resizeMode="contain" />
                </View>
              )}
              {storage[0].sprites.back_default && (
                <View style={styles.imageCard}>
                  <Image source={{ uri: storage[0].sprites.back_default }} style={styles.fullSizeImage} resizeMode="contain" />
                </View>
              )}
              {storage[0].sprites.front_shiny && (
                <View style={styles.imageCard}>
                  <Image source={{ uri: storage[0].sprites.front_shiny }} style={styles.fullSizeImage} resizeMode="contain" />
                </View>
              )}
              {storage[0].sprites.back_shiny && (
                <View style={styles.imageCard}>
                  <Image source={{ uri: storage[0].sprites.back_shiny }} style={styles.fullSizeImage} resizeMode="contain" />
                </View>
              )}
            </View>

            {/* 🔙 Centered Full-Width "Back" Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => setSelected(null)}>
              <Text style={[styles.backText, { color: theme.text }]}>Tap to go back</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 5
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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '10%',
    marginRight:'10%'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    aspectRatio: '1', // Makes the card square
    padding: 10,
    margin: 1,
    // width: 50,
    // height: 50,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonName: {
    fontSize: 12.15,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  image: {
    width: '150%',
    height: '150%',
  },
  detailsContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', // ✅ Centers all content inside
  },
  spriteWrapper: {
    flex: 1,
    justifyContent: 'center', // ✅ Ensures sprites are centered vertically
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imageCard: {
    width: 100, // ✅ Increased for better spacing
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    margin: 3,
    backgroundColor: '#fff',
    marginTop: 0
  },
  fullSizeImage: {
    width: '140%',
    height: '140%',
  },
  backButton: {
    width: '90%',
    marginTop: 5,
    paddingVertical: 15,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#444',
  },
  backText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
