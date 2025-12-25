import { useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { PokemonListOrder } from "@/types";

interface SortDropdownProps {
  order: PokemonListOrder;
  onOrderChange: (order: PokemonListOrder) => void;
}

export function SortDropdown({ order, onOrderChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (newOrder: PokemonListOrder) => {
    setIsOpen(false);
    if (newOrder !== order) {
      onOrderChange(newOrder);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sort:</Text>
      <Pressable style={styles.button} onPress={() => setIsOpen(true)}>
        <Text style={styles.buttonText}>{order === "asc" ? "Ascending" : "Descending"}</Text>
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
            <Pressable style={styles.dropdownItem} onPress={() => handleSelect("asc")}>
              <Text style={styles.dropdownText}>Ascending</Text>
              {order === "asc" && <Text style={styles.checkmark}>✓</Text>}
            </Pressable>
            <View style={styles.separator} />
            <Pressable style={styles.dropdownItem} onPress={() => handleSelect("desc")}>
              <Text style={styles.dropdownText}>Descending</Text>
              {order === "desc" && <Text style={styles.checkmark}>✓</Text>}
            </Pressable>
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
    borderRadius: 8,
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
