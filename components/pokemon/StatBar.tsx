import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

export const StatBar = ({ label, value, maxValue, color }: StatBarProps) => {
  const percentage = (value / maxValue) * 100;

  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <View style={styles.statBarContainer}>
        <View style={[styles.statBarFill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  statLabel: {
    width: 100,
    fontSize: 14,
    fontWeight: "600",
  },
  statValue: {
    width: 40,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  statBarFill: {
    height: "100%",
    borderRadius: 4,
  },
});
