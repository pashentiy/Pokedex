import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

import { Text } from "@/components/Themed";
import { useCatchPokemon } from "@/hooks/useCatchPokemon";
import { PokemonWithImage } from "@/schema/pokemon";
import { getCaughtPokemonById, isCaught } from "@/utils/caughtPokemonStorage";

interface CatchButtonProps {
  pokemon: PokemonWithImage;
}

export function CatchButton({ pokemon }: CatchButtonProps) {
  const [caught, setCaught] = useState(false);
  const [contactId, setContactId] = useState<string | undefined>();
  const { catchPokemon, releasePokemon, isCatching } = useCatchPokemon();

  useEffect(() => {
    checkCaughtStatus();
  }, [pokemon.id]);

  const checkCaughtStatus = async () => {
    const isCaughtStatus = await isCaught(pokemon.id);
    setCaught(isCaughtStatus);

    if (isCaughtStatus) {
      const caughtData = await getCaughtPokemonById(pokemon.id);
      setContactId(caughtData?.contactId);
    }
  };

  const handlePress = async () => {
    if (caught) {
      const success = await releasePokemon(pokemon.id, contactId);
      if (success) {
        setCaught(false);
        setContactId(undefined);
      }
    } else {
      const success = await catchPokemon(pokemon);
      if (success) {
        setCaught(true);
        await checkCaughtStatus();
      }
    }
  };

  if (isCatching) {
    return (
      <Pressable style={[styles.button, styles.disabled]} disabled>
        <ActivityIndicator color="#fff" size="small" />
        <Text style={styles.buttonText}>Processing...</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[styles.button, caught ? styles.caught : styles.notCaught]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>{caught ? "✓ Caught" : "⚪ Catch"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 140,
    flexDirection: "row",
    gap: 8,
  },
  notCaught: {
    backgroundColor: "#ff4444",
  },
  caught: {
    backgroundColor: "#4CAF50",
  },
  disabled: {
    backgroundColor: "#999",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
