import React, { useState, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";

const MOODS = [
  { id: "great", label: "😄 Great", color: "#22c55e" },
  { id: "good", label: "😊 Good", color: "#3b82f6" },
  { id: "meh", label: "😐 Meh", color: "#eab308" },
  { id: "bad", label: "😔 Bad", color: "#f97316" },
  { id: "terrible", label: "😭 Terrible", color: "#ef4444" },
];

export default function App() {
  const [selectedMood, setSelectedMood] = useState("good");
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("all");

  function handleAddEntry() {
    if (!selectedMood && !note.trim()) return;

    const now = new Date();
    const newEntry = {
      id: `${now.getTime()}`,
      mood: selectedMood,
      note: note.trim(),
      createdAt: now.toISOString(),
    };
    setEntries((prev) => [newEntry, ...prev]);
    setNote("");
  }

  const filteredEntries = useMemo(() => {
    if (filter === "all") return entries;
    return entries.filter((e) => e.mood === filter);
  }, [entries, filter]);

  function formatDate(isoString) {
    const d = new Date(isoString);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function renderEntry({ item }) {
    const moodMeta = MOODS.find((m) => m.id === item.mood);
    return (
      <View style={styles.entryCard}>
        <View style={styles.entryHeader}>
          <View style={styles.entryMoodBadge}>
            <Text style={styles.entryMoodText}>
              {moodMeta ? moodMeta.label : item.mood}
            </Text>
          </View>
          <Text style={styles.entryDate}>{formatDate(item.createdAt)}</Text>
        </View>
        {item.note ? (
          <Text style={styles.entryNote}>{item.note}</Text>
        ) : (
          <Text style={[styles.entryNote, styles.entryNoteEmpty]}>
            (No note)
          </Text>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>MoodLog</Text>
          <Text style={styles.subtitle}>
            Track how you feel each day in a few taps.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>How are you feeling?</Text>
          <View style={styles.moodRow}>
            {MOODS.map((mood) => {
              const isSelected = selectedMood === mood.id;
              return (
                <TouchableOpacity
                  key={mood.id}
                  style={[
                    styles.moodChip,
                    isSelected && {
                      backgroundColor: mood.color + "33",
                      borderColor: mood.color,
                    },
                  ]}
                  onPress={() => setSelectedMood(mood.id)}
                >
                  <Text
                    style={[
                      styles.moodChipText,
                      isSelected && { color: mood.color },
                    ]}
                  >
                    {mood.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
            Add a short note
          </Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Optional... e.g. 'Had coffee with friends, sunny day'"
            placeholderTextColor="#6b7280"
            style={styles.input}
            multiline
          />
          <TouchableOpacity style={styles.primaryButton} onPress={handleAddEntry}>
            <Text style={styles.primaryButtonText}>Save entry</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.entriesHeader}>
            <Text style={styles.sectionTitle}>Recent entries</Text>
            <View style={styles.filterRow}>
              <FilterChip
                label="All"
                value="all"
                active={filter === "all"}
                onPress={setFilter}
              />
              {MOODS.map((m) => (
                <FilterChip
                  key={m.id}
                  label={m.label.split(" ")[0]}
                  value={m.id}
                  active={filter === m.id}
                  onPress={setFilter}
                />
              ))}
            </View>
          </View>

          {filteredEntries.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No entries yet</Text>
              <Text style={styles.emptyText}>
                Log your first mood above. Over time you can scroll back and see
                how things change.
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredEntries}
              keyExtractor={(item) => item.id}
              renderItem={renderEntry}
              contentContainerStyle={{ paddingVertical: 4 }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

function FilterChip({ label, value, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      style={[
        styles.filterChip,
        active && { backgroundColor: "#1d4ed8", borderColor: "#3b82f6" },
      ]}
    >
      <Text style={[styles.filterChipText, active && { color: "#e5e7eb" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "#020617",
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#e5e7eb",
    letterSpacing: 1.2,
  },
  subtitle: {
    marginTop: 4,
    color: "#9ca3af",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#020617",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(31, 41, 55, 0.9)",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 24,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 1.3,
  },
  moodRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8,
  },
  moodChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(55, 65, 81, 0.9)",
    backgroundColor: "rgba(15, 23, 42, 0.9)",
  },
  moodChipText: {
    fontSize: 13,
    color: "#e5e7eb",
  },
  input: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(55, 65, 81, 0.9)",
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: "#e5e7eb",
    minHeight: 48,
    textAlignVertical: "top",
    backgroundColor: "rgba(15, 23, 42, 0.95)",
  },
  primaryButton: {
    marginTop: 10,
    borderRadius: 999,
    backgroundColor: "#4f46e5",
    paddingVertical: 10,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#e5e7eb",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    fontSize: 13,
  },
  entriesHeader: {
    flexDirection: "column",
    gap: 8,
    marginBottom: 4,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  filterChip: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(55, 65, 81, 0.9)",
    backgroundColor: "rgba(15, 23, 42, 0.9)",
  },
  filterChipText: {
    fontSize: 12,
    color: "#9ca3af",
  },
  emptyState: {
    paddingVertical: 10,
  },
  emptyTitle: {
    color: "#e5e7eb",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyText: {
    marginTop: 4,
    color: "#9ca3af",
    fontSize: 13,
  },
  entryCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(55, 65, 81, 0.9)",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: "rgba(15, 23, 42, 0.96)",
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  entryMoodBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: "rgba(31, 41, 55, 0.9)",
  },
  entryMoodText: {
    fontSize: 13,
    color: "#e5e7eb",
    fontWeight: "500",
  },
  entryDate: {
    fontSize: 11,
    color: "#6b7280",
  },
  entryNote: {
    marginTop: 4,
    fontSize: 13,
    color: "#e5e7eb",
  },
  entryNoteEmpty: {
    fontStyle: "italic",
    color: "#6b7280",
  },
});
