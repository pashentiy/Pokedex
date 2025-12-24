import AsyncStorage from "@react-native-async-storage/async-storage";

const SCROLL_POSITION_KEY = "@pokedex_scroll_position";
const PAGE_KEY = "@pokedex_last_page";

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
