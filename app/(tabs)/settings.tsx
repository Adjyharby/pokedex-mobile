import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useTheme, themes } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const CARD_SIZE = SCREEN_WIDTH / 4 - 20; // 4 columns with spacing

export default function SettingsScreen() {
  const { theme, setTheme } = useTheme();
  const themeKeys = Object.keys(themes); // Get all theme names

  return (
    <LinearGradient colors={theme.background} style={styles.container}>
      <Text style={[styles.text, { color: theme.text }]}>Select Pokémon Theme:</Text>

      {/* Theme Grid */}
      <View style={styles.gridContainer}>
        <FlatList
          data={themeKeys}
          numColumns={3} 
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                { backgroundColor: themes[item].button, borderColor: themes[item].border, width:100, }
              ]}
              onPress={() => setTheme(item as keyof typeof themes)}
            >
              <Text style={[styles.cardText, { color: themes[item].text }]}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  gridContainer: {
    width: '100%',
    height: SCREEN_HEIGHT /1.33, // Takes up half the screen
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 12,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    margin: 8,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
