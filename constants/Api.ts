import Constants from "expo-constants";
import { Platform } from "react-native";

const PORT = 8080;

function getHostIpFromExpo(): string | null {
  const hostUri = Constants.expoConfig?.hostUri;
  if (!hostUri) return null;
  return hostUri.split(":")[0] ?? null;
}

export function getApiUrl(): string {
  if (Platform.OS === "android" && !Constants.isDevice) {
    return `http://10.0.2.2:${PORT}`;
  }

  const host = getHostIpFromExpo();
  if (host) {
    return `http://${host}:${PORT}`;
  }

  return `http://localhost:${PORT}`;
}

export function createApiUrl(path: string): string {
  const baseUrl = getApiUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
