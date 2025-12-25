import * as Contacts from "expo-contacts";

import { CaughtPokemon } from "@/types";
import { downloadImageToFile } from "@/utils/imageDownloader";

export const requestContactsPermission = async (): Promise<boolean> => {
  const { status } = await Contacts.requestPermissionsAsync();
  return status === "granted";
};

export const addPokemonToContacts = async (pokemon: CaughtPokemon): Promise<string | null> => {
  try {
    const hasPermission = await requestContactsPermission();
    if (!hasPermission) {
      throw new Error("Contacts permission denied");
    }

    const imageFileUri = await downloadImageToFile(pokemon.imageUrl);

    const contact: Contacts.Contact = {
      contactType: Contacts.ContactTypes.Person,
      name: pokemon.name,
      firstName: pokemon.name,
      company: "Pokedex",
      jobTitle: `#${pokemon.number}`,
    };

    try {
      contact.note = `Caught on ${new Date(pokemon.caughtAt).toLocaleDateString()}`;
    } catch (noteError) {
      console.warn("Note field not supported:", noteError);
    }

    if (imageFileUri) {
      contact.image = { uri: imageFileUri };
    }

    const contactId = await Contacts.addContactAsync(contact);
    return contactId;
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
};

export const removePokemonFromContacts = async (contactId: string): Promise<void> => {
  try {
    const hasPermission = await requestContactsPermission();
    if (!hasPermission) return;

    await Contacts.removeContactAsync(contactId);
  } catch (error) {
    console.error("Error removing contact:", error);
    throw error;
  }
};
