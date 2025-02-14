import { createContext, useState, useEffect, ReactNode } from 'react';

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default?: string;
    front_shiny?: string;
    back_shiny?: string;
    other?: {
      'official-artwork'?: {
        front_default?: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
  types: { type: { name: string } }[];
}

interface DataContextType {
  storage: Pokemon[] | null;
  setStorage: React.Dispatch<React.SetStateAction<Pokemon[] | null>>;
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
  search: string | null;
  setSearch: React.Dispatch<React.SetStateAction<string | null>>;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [storage, setStorage] = useState<Pokemon[] | null>(null);
  const [allPokemon, setAllPokemon] = useState<Pokemon[] | null>(null); // Store all Pokémon for searching
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const limit = 18;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (!allPokemon) {
          // Fetch ALL Pokémon for local search
          response = await fetch(`${POKEMON_API}?limit=1000&offset=0`);
          const data = await response.json();
          const detailedData = await Promise.all(
            data.results.map(async (pokemon: { url: string }) => {
              const res = await fetch(pokemon.url);
              return await res.json();
            })
          );
          setAllPokemon(detailedData);
        }
      } catch (error) {
        console.error("Error fetching full Pokémon list:", error);
        setAllPokemon(null);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!search && !selected) {
          // Fetch paginated Pokémon for default view
          const response = await fetch(`${POKEMON_API}?limit=${limit}&offset=${offset}`);
          const data = await response.json();
          const detailedData = await Promise.all(
            data.results.map(async (pokemon: { url: string }) => {
              const res = await fetch(pokemon.url);
              return await res.json();
            })
          );
          setStorage(detailedData);
        } else if (selected) {
          // Fetch a specific Pokémon
          const response = await fetch(`${POKEMON_API}/${selected}`);
          const data = await response.json();
          setStorage([data]); // Wrap in an array for consistency
        } else if (search && allPokemon) {
          // Filter locally for partial matches
          const filteredData = allPokemon.filter((pokemon) =>
            pokemon.name.includes(search.toLowerCase())
          );
          setStorage(filteredData);
        }
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setStorage(null);
      }
    };

    fetchData();
  }, [search, selected, offset, allPokemon]);

  return (
    <DataContext.Provider value={{ storage, setStorage, selected, setSelected, search, setSearch, offset, setOffset, limit }}>
      {children}
    </DataContext.Provider>
  );
}
