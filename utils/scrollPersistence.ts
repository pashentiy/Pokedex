import AsyncStorage from "@react-native-async-storage/async-storage";

import { PokemonListOrder, PokemonType } from "@/types";

const SCROLL_POSITION_KEY = "@pokedex_scroll_position";
const PAGE_KEY = "@pokedex_last_page";
const ORDER_KEY = "@pokedex_order";
const TYPE_KEY = "@pokedex_type";

export const saveScrollPosition = async (offset: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(SCROLL_POSITION_KEY, offset.toString());
  } catch (error) {
    console.error("Error saving scroll position:", error);
  }
};

export const getScrollPosition = async (): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem(SCROLL_POSITION_KEY);
    return value ? parseFloat(value) : 0;
  } catch (error) {
    console.error("Error getting scroll position:", error);
    return 0;
  }
};

export const saveLastPage = async (page: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(PAGE_KEY, String(page));
  } catch (error) {
    console.error("Error saving last page:", error);
  }
};

export const getLastPage = async (): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem(PAGE_KEY);
    return value ? Number(value) : 1;
  } catch (error) {
    console.error("Error getting last page:", error);
    return 1;
  }
};

export const removeScrollPosition = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(SCROLL_POSITION_KEY);
  } catch (error) {
    console.error("Error removing scroll position:", error);
  }
};

export const removeLastPage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(PAGE_KEY);
  } catch (error) {
    console.error("Error removing last page:", error);
  }
};

export const saveOrder = async (order: PokemonListOrder): Promise<void> => {
  try {
    await AsyncStorage.setItem(ORDER_KEY, order);
  } catch (error) {
    console.error("Error saving order:", error);
  }
};

export const getOrder = async (): Promise<PokemonListOrder> => {
  try {
    const value = await AsyncStorage.getItem(ORDER_KEY);
    return value === "desc" ? "desc" : "asc";
  } catch (error) {
    console.error("Error getting order:", error);
    return "asc";
  }
};

export const saveType = async (type: PokemonType): Promise<void> => {
  try {
    if (type === null) {
      await AsyncStorage.removeItem(TYPE_KEY);
    } else {
      await AsyncStorage.setItem(TYPE_KEY, type);
    }
  } catch (error) {
    console.error("Error saving type:", error);
  }
};

export const getType = async (): Promise<PokemonType> => {
  try {
    const value = await AsyncStorage.getItem(TYPE_KEY);
    return value as PokemonType;
  } catch (error) {
    console.error("Error getting type:", error);
    return null;
  }
};
