import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  Button,
  FlatList,
  SectionList,
  Switch,
  Modal,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  // Datos para FlatList
  const flatListData = [
    { id: '1', name: 'Ana' },
    { id: '2', name: 'Carlos' },
    { id: '3', name: 'María' },
    { id: '4', name: 'Pedro' },
    { id: '5', name: 'Laura' },
  ];

  // Datos para SectionList
  const sectionListData = [
    {
      title: 'Nombres con A',
      data: ['Ana', 'Alberto', 'Alicia']
    },
    {
      title: 'Nombres con B', 
      data: ['Beatriz', 'Bruno', 'Bárbara']
    },
    {
      title: 'Nombres con C',
      data: ['Carlos', 'Cecilia', 'Cristian']
    }
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      alert('Lista actualizada!');
    }, 2000);
  };

  // Small helper components
  const Header = () => (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerText}>¡Bienvenido!</Text>
          <Text style={styles.headerSub}>Explora componentes</Text>
        </View>
      </View>
    </View>
  );

  const Card: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <View style={styles.card}>{children}</View>
  );

  const PrimaryButton: React.FC<{ onPress: () => void; title: string }> = ({ onPress, title }) => (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.88}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
      <ScrollView contentContainerStyle={styles.container}>
        <Header />

        <Text style={styles.subtitle}>Explora los componentes</Text>

        <Card>
          <TextInput
            style={styles.input}
            placeholder="Escribí sin miedo..."
            placeholderTextColor="#999"
          />
        </Card>

        <Card>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=5d8c2f4b0b7c5f0d3f3251f0d9f6a6c7' }}
            style={styles.image}
            resizeMode="cover"
          />
        </Card>

        <Card>
          <ScrollView style={styles.scrollView} nestedScrollEnabled>
            <Text style={styles.scrollText}>
              Esto es un ejemplo de contenido scrollable. 
              {'\n\n'}
              AA 
              {'\n\n'}
              AA 
              {'\n\n'}
              AA 
              {'\n\n'}
              AA 
              {'\n\n'}
              AA    
              {'\n\n'}
              AA 
              {'\n\n'}
              AA    
              {'\n\n'}
              AA 
              {'\n\n'}
              
            </Text>
          </ScrollView>
        </Card>

        <PrimaryButton onPress={() => alert('¡Acción principal!')} title="Acción principal" />

        <TouchableHighlight
          style={styles.touchableHighlight}
          underlayColor="#DDDDDD"
          onPress={() => alert('TouchableHighlight')}
        >
          <Text style={styles.touchableHighlightText}>TouchableHighlight</Text>
        </TouchableHighlight>

        <Pressable
          style={({ pressed }) => [
            styles.pressable,
            { opacity: pressed ? 0.8 : 1 }
          ]}
          onPress={() => alert('Acción secundaria')}
        >
          {({ pressed }) => (
            <Text style={styles.pressableText}>
              {pressed ? '¡Presionado!' : 'Acción secundaria'}
            </Text>
          )}
        </Pressable>

        <View style={styles.buttonContainer}>
          <Button
            title="Button Nativo"
            onPress={() => alert('Button nativo')}
            color="#FF6B6B"
          />
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Personas</Text>
          <FlatList
            style={styles.flatList}
            data={flatListData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.personName}>{item.name}</Text>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Listado seccional</Text>
          <SectionList
            style={styles.sectionList}
            sections={sectionListData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text>{item}</Text>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
              </View>
            )}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Switch: {isEnabled ? 'ON' : 'OFF'}</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={setIsEnabled}
            value={isEnabled}
          />
        </View>

        <PrimaryButton onPress={() => setModalVisible(true)} title="Abrir modal" />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>¡HOLA EN MODAL!</Text>
              <Text>Este es un modal de React Native</Text>
              {refreshing && <ActivityIndicator size="large" color="#0000ff" />}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },

  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 18,
    paddingBottom: 40,
    alignItems: 'center',
  },

  header: {
    backgroundColor: '#2563EB',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 20,
    width: '100%',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  avatar: { width: 52, height: 52, borderRadius: 14, marginLeft: 12 },

  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  headerSub: {
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
    fontSize: 13,
  },

  subtitle: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 14,
    alignSelf: 'flex-start',
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },

  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
  },

  scrollView: { width: '100%', height: 160 },
  scrollText: { fontSize: 14, color: '#4B5563' },

  button: {
    backgroundColor: '#1E293B',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: '700', fontSize: 16 },

  touchableHighlight: {
    backgroundColor: '#F97316',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  touchableHighlightText: { color: 'white', fontWeight: '700' },

  pressable: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
  },
  pressableText: { color: 'white', fontWeight: '600' },

  buttonContainer: { width: '100%', marginBottom: 16 },
  listContainer: { width: '100%', marginBottom: 12 },
  listTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  personName: { fontSize: 14, color: '#111827' },
  flatList: { maxHeight: 90 },
  sectionList: { maxHeight: 220 },

  listItem: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },

  sectionHeader: {
    backgroundColor: '#2563EB',
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
  },
  sectionHeaderText: { color: 'white', fontWeight: '700' },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 14,
    padding: 14,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  switchText: { fontSize: 15, color: '#111827' },

  modalButton: {
    backgroundColor: '#10B981',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: { color: 'white', fontWeight: '700' },

  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 14,
    alignItems: 'center',
    width: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  closeButton: {
    backgroundColor: '#EF4444',
    padding: 12,
    borderRadius: 10,
    marginTop: 18,
    width: '70%',
    alignItems: 'center',
  },
  closeButtonText: { color: 'white', fontWeight: '700' },
});
