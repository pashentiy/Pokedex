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

export const PaginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
  hasMore: z.boolean(),
});

export const PaginatedPokemonsResponseSchema = z.object({
  data: PokemonsSchema,
  pagination: PaginationSchema,
});

export type PokemonWithImage = z.infer<typeof PokemonWithImageSchema>;
export type PokemonsWithImage = z.infer<typeof PokemonsWithImageSchema>;
export type PaginatedPokemonsWithImageResponse = {
  data: PokemonsWithImage;
  pagination: z.infer<typeof PaginationSchema>;
};
