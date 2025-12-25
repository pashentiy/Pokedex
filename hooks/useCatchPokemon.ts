import { useCallback, useState } from "react";
import { Alert } from "react-native";

import { PokemonWithImage } from "@/schema/pokemon";
import { CaughtPokemon } from "@/types";
import { removeCaughtPokemon, saveCaughtPokemon } from "@/utils/caughtPokemonStorage";
import { addPokemonToContacts, removePokemonFromContacts } from "@/utils/contactsManager";

export function useCatchPokemon() {
  const [isCatching, setIsCatching] = useState(false);

  const catchPokemon = useCallback(async (pokemon: PokemonWithImage) => {
    setIsCatching(true);
    try {
      const caughtPokemon: CaughtPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        number: pokemon.number,
        imageUrl: pokemon.imageUrl,
        caughtAt: new Date().toISOString(),
      };

      const contactId = await addPokemonToContacts(caughtPokemon);

      if (contactId) {
        caughtPokemon.contactId = contactId;
      }

      await saveCaughtPokemon(caughtPokemon);

      Alert.alert("Success!", `${pokemon.name} has been caught! 🎉`);
      return true;
    } catch (error) {
      Alert.alert("Error", "Failed to catch Pokemon");
      console.error(error);
      return false;
    } finally {
      setIsCatching(false);
    }
  }, []);

  const releasePokemon = useCallback(async (pokemonId: number, contactId?: string) => {
    setIsCatching(true);
    try {
      if (contactId) {
        await removePokemonFromContacts(contactId);
      }

      await removeCaughtPokemon(pokemonId);

      Alert.alert("Released", "Pokemon has been released");
      return true;
    } catch (error) {
      Alert.alert("Error", "Failed to release Pokemon");
      console.error(error);
      return false;
    } finally {
      setIsCatching(false);
    }
  }, []);

  return { catchPokemon, releasePokemon, isCatching };
}
