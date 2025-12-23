export const getPokemonTypeColor = (type: string) => {
  const colors: Record<string, any> = {
    Grass: { backgroundColor: "#78C850" },
    Poison: { backgroundColor: "#A040A0" },
    Fire: { backgroundColor: "#F08030" },
    Water: { backgroundColor: "#6890F0" },
    Electric: { backgroundColor: "#F8D030" },
    Normal: { backgroundColor: "#A8A878" },
    Fighting: { backgroundColor: "#C03028" },
    Flying: { backgroundColor: "#A890F0" },
    Ground: { backgroundColor: "#E0C068" },
    Rock: { backgroundColor: "#B8A038" },
    Bug: { backgroundColor: "#A8B820" },
    Ghost: { backgroundColor: "#705898" },
    Steel: { backgroundColor: "#B8B8D0" },
    Ice: { backgroundColor: "#98D8D8" },
    Psychic: { backgroundColor: "#F85888" },
    Dragon: { backgroundColor: "#7038F8" },
    Dark: { backgroundColor: "#705848" },
    Fairy: { backgroundColor: "#EE99AC" },
  };
  return colors[type] || { backgroundColor: "#A8A878" };
};
