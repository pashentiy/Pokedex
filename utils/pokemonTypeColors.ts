import { PokemonTypeName } from "@/types";

type TypeColor = { backgroundColor: string };

const TYPE_COLORS: Record<PokemonTypeName, TypeColor> = {
  Bug: { backgroundColor: "#A8B820" },
  Dark: { backgroundColor: "#705848" },
  Dragon: { backgroundColor: "#7038F8" },
  Electric: { backgroundColor: "#F8D030" },
  Fairy: { backgroundColor: "#EE99AC" },
  Fighting: { backgroundColor: "#C03028" },
  Fire: { backgroundColor: "#F08030" },
  Flying: { backgroundColor: "#A890F0" },
  Ghost: { backgroundColor: "#705898" },
  Grass: { backgroundColor: "#78C850" },
  Ground: { backgroundColor: "#E0C068" },
  Ice: { backgroundColor: "#98D8D8" },
  Normal: { backgroundColor: "#A8A878" },
  Poison: { backgroundColor: "#A040A0" },
  Psychic: { backgroundColor: "#F85888" },
  Rock: { backgroundColor: "#B8A038" },
  Steel: { backgroundColor: "#B8B8D0" },
  Water: { backgroundColor: "#6890F0" },
};

export const getPokemonTypeColor = (type: string): TypeColor => {
  return TYPE_COLORS[type as PokemonTypeName] || TYPE_COLORS.Normal;
};
