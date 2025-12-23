import { z } from "zod";

export const PokemonSchema = z.object({
  id: z.number(),
  number: z.number(),
  name: z.string(),
  type_one: z.string(),
  type_two: z.string(),
  total: z.number(),
  hit_points: z.number(),
  attack: z.number(),
  defense: z.number(),
  special_attack: z.number(),
  special_defense: z.number(),
  speed: z.number(),
  generation: z.number(),
  legendary: z.boolean(),
});

export const PokemonWithImageSchema = PokemonSchema.extend({ imageUrl: z.string() });
export const PokemonsSchema = z.array(PokemonSchema);
export const PokemonsWithImageSchema = z.array(PokemonWithImageSchema);

export type PokemonWithImage = z.infer<typeof PokemonWithImageSchema>;
export type Pokemons = z.infer<typeof PokemonsSchema>;
export type PokemonsWithImage = z.infer<typeof PokemonsWithImageSchema>;
