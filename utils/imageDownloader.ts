import * as FileSystem from "expo-file-system/legacy";

export const downloadImageToFile = async (imageUrl: string): Promise<string | null> => {
  try {
    if (!FileSystem.cacheDirectory) {
      console.warn("FileSystem.cacheDirectory is not available");
      return null;
    }

    const fileUri = `${FileSystem.cacheDirectory}pokemon_${Date.now()}.png`;
    const downloadResult = await FileSystem.downloadAsync(imageUrl, fileUri);

    if (downloadResult.status !== 200) {
      console.error("Failed to download image:", downloadResult.status);
      return null;
    }

    return downloadResult.uri;
  } catch (error) {
    console.error("Error downloading image:", error);
    return null;
  }
};
