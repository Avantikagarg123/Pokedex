import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { FlatList, View, Text, Image, StyleSheet, ActivityIndicator, Pressable } from "react-native"

import { AppStackScreenProps } from "../navigators"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(props:any) {
  const { navigation } = props
  const [pokemonList, setPokemonList] = useState<any[]>([]) // Store Pokémon data
  const [offset, setOffset] = useState(0) // Track pagination offset
  const [loading, setLoading] = useState(false) // Loading state

  const fetchPokemons = async () => {
    if (loading) return // Prevent duplicate requests
    setLoading(true)

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`)
      const data = await response.json()

      // Fetch details for each Pokémon
      const detailedPokemonData = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url)
          return res.json() // Get full Pokémon details
        }),
      )

      setPokemonList((prevList) => [...prevList, ...detailedPokemonData])
      setOffset((prevOffset) => prevOffset + 10)
    } catch (error) {
      console.error("Error fetching Pokémon:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPokemons()
  }, [])
  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
          style={styles.card}
          onPress={() =>
            navigation.navigate("PokemonDetails", {
              id: item.id,
              name: item.name,
              image: item.sprites.front_default,
              height: item.height,
              weight: item.weight,
              base_experience: item.base_experience,
              types: item.types.map((t: any) => t.type.name), // Extract type names
              abilities: item.abilities.map((a: any) => a.ability.name), // Extract ability names
              stats: item.stats.map((s: any) => ({
                name: s.stat.name,
                value: s.base_stat,
              })), // Extract stat values
              moves: item.moves.slice(0, 5).map((m: any) => m.move.name), // Limit moves to 5
              held_items: item.held_items.map((i: any) => i.item.name), // Extract held item names
            })
          }
        >
          <Image source={{ uri: item.sprites.front_default }} style={styles.image} />
          <Text style={styles.name}>{item.name.toUpperCase()}</Text>
        </Pressable>
        
        )}
        onEndReached={fetchPokemons}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="blue" /> : null}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", padding: 10 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  image: { width: 50, height: 50, marginRight: 10 },
  name: { fontSize: 16, fontWeight: "bold" },
})
