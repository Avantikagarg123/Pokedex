import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Image, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface PokemonDetailsScreenProps extends AppStackScreenProps<"PokemonDetails"> {}

export const PokemonDetailsScreen: FC<PokemonDetailsScreenProps> = observer(
  function PokemonDetailsScreen(props: any) {
    const { route } = props
    const {
      id,
      name,
      image,
      height,
      weight,
      base_experience,
      types,
      abilities,
      stats,
      moves,
      held_items,
    } = route.params
    console.log(
      "id",
      id,
      name,
      image,
      height,
      weight,
      base_experience,
      types,
      abilities,
      stats,
      moves,
      held_items,
    )
    return (
      <Screen style={$root}>
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", marginTop: 50 }}>
          {name.toUpperCase()}
        </Text>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              height: 380,
              width: 380,
              borderWidth: 1,
              borderColor: "black",
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                height: 350,
                width: 350,
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: "#2B1D04",
              }}
            />
          </View>
        </View>
        <View style={{ margin: 20,marginBottom:200 }}>
          <Text style={{ fontWeight: "bold" }}>HEIGHT: {height}</Text>
          <Text style={{ fontWeight: "bold" }}>WEIGHT: {weight}</Text>
          <Text style={{ fontWeight: "bold" }}>EXPERIENCE: {base_experience}</Text>
          <Text style={{ fontWeight: "bold" }}>TYPES: {types.join(", ")}</Text>
          <Text style={{ fontWeight: "bold" }}>ABILITIES: {abilities.join(", ")}</Text>
          {stats.map((stat: any) => (
            <Text key={stat.name} style={{ fontWeight: "bold" }}>
              {stat.name.toUpperCase()}: {stat.value}
            </Text>
          ))}
          <Text style={{ fontWeight: "bold" }}>MOVES: {moves.join(", ")}</Text>

        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFA500",
}
