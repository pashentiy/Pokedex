import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { PokemonType, PokemonTypeName } from "@/types";

interface TypeDropdownProps {
  type: PokemonType;
  types: PokemonTypeName[];
  onTypeChange: (type: PokemonType) => void;
  isLoading?: boolean;
}

export function TypeDropdown({ type, types, onTypeChange, isLoading }: TypeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (newType: PokemonType) => {
    setIsOpen(false);
    if (newType !== type) {
      onTypeChange(newType);
    }
  };

  const displayText = type || "All types";

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Type:</Text>
      <Pressable style={styles.button} onPress={() => setIsOpen(true)} disabled={isLoading}>
        <Text style={styles.buttonText}>{displayText}</Text>
        <Text style={styles.arrow}>▼</Text>
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
          <View style={styles.dropdown}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <Pressable style={styles.dropdownItem} onPress={() => handleSelect(null)}>
                <Text style={styles.dropdownText}>All types</Text>
                {type === null && <Text style={styles.checkmark}>✓</Text>}
              </Pressable>
              <View style={styles.separator} />
              {types.map((typeName) => (
                <View key={typeName}>
                  <Pressable style={styles.dropdownItem} onPress={() => handleSelect(typeName)}>
                    <Text style={styles.dropdownText}>{typeName}</Text>
                    {type === typeName && <Text style={styles.checkmark}>✓</Text>}
                  </Pressable>
                  <View style={styles.separator} />
                </View>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    gap: 8,
    minWidth: 120,
  },
  buttonText: {
    fontSize: 14,
    flex: 1,
  },
  arrow: {
    fontSize: 10,
    opacity: 0.6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    minWidth: 200,
    maxHeight: 400,
    borderRadius: 8,
    overflow: "hidden",
  },
  scrollView: {
    maxHeight: 400,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 16,
  },
  checkmark: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
  },
});
