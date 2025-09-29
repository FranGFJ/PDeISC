import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Switch,
  Modal,
  SafeAreaView,
} from "react-native";

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const data = [
    { id: "1", name: "Ana" },
    { id: "2", name: "Carlos" },
    { id: "3", name: "María" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <TextInput style={styles.input} placeholder="Escribí algo..." />

        <Image
          source={{
            uri: "https://picsum.photos/400/200",
          }}
          style={styles.image}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Botón presionado")}
        >
          <Text style={styles.buttonText}>Presionar</Text>
        </TouchableOpacity>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>{item.name}</Text>
          )}
        />

        <View style={styles.switchRow}>
          <Text>{isEnabled ? "ON" : "OFF"}</Text>
          <Switch value={isEnabled} onValueChange={setIsEnabled} />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Abrir modal</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text>Hola desde el modal</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f9f9f9" },
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  image: { width: "100%", height: 150, borderRadius: 8, marginBottom: 15 },
  button: {
    backgroundColor: "#4B7BE5",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  listItem: { padding: 10, borderBottomWidth: 1, borderColor: "#eee" },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    margin: 30,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});
