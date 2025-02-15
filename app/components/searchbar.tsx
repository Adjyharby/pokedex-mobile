import { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { DataContext } from '../../context/DataContext';

export default function SearchBar({ theme, onSearch }: { theme: any; onSearch: (text: string | null) => void }) {

  const { setSearch } = useContext(DataContext)!;
  const [inputValue, setInputValue] = useState('');

  const handleChange = (text: string) => {
    setInputValue(text);
  };

 
  const handleSubmit = ({ nativeEvent }: { nativeEvent: { text: string } }) => {
    const searchText = nativeEvent.text.trim();
    onSearch(searchText === '' ? null : searchText.toLowerCase());
  };
  

  return (
    <View style={[styles.container, { backgroundColor: theme.button, borderColor: theme.border }]}>
      <Text style={[styles.label, { color: theme.text }]}>Search:</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.border, color: theme.text }]}
        value={inputValue}
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit} // ✅ Fixed function
        placeholder="Enter Pokémon name..."
        placeholderTextColor={theme.text}
        returnKeyType="search" // Adds a "Search" button on mobile keyboards
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    borderWidth: 2,
    borderRadius: 20,
    textAlign: 'center',
  },
});
