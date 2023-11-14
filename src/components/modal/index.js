import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de importar os ícones necessários
import useStorage from "../../hooks/useStorage";

export function ModalPassword({ password, handleClose }) {
    const { saveItem } = useStorage();
  
    async function handleCopyPassword() {
      if (password) {
        await Clipboard.setStringAsync(password);
        const passwordObject = { senha: password, id: `${Date.now()}` };
        await saveItem('@pass', passwordObject);
        alert('Senha salva com sucesso!');
        handleClose();
      } else {
        alert('Erro: a senha é nula.');
      }
    }
  
    return (
      <Pressable style={styles.overlay} onPress={handleClose}>
        <View style={styles.container}>
          <View style={styles.content}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
  
            <Text style={styles.title}>Senha Gerada!</Text>
  
            <Pressable style={styles.innerPassword} onLongPress={handleCopyPassword}>
              <Text style={styles.text}>{password ? password : 'Erro: a senha é nula.'}</Text>
            </Pressable>
  
            <View style={styles.buttonArea}>
              <TouchableOpacity style={styles.button} onPress={handleClose}>
                <Text style={styles.buttonText}>Voltar</Text>
              </TouchableOpacity>
  
              <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleCopyPassword}>
                <Text style={styles.buttonSaveText}>Salvar Senha</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 7,
    paddingBottom: 24,
    paddingTop: 24,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
  },
  innerPassword: {
    backgroundColor: '#000',
    width: '100%',
    padding: 14,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 24,
    marginRight: 24,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 14,
    padding: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonSave: {
    backgroundColor: '#25AE88',
    marginLeft: 24,
    padding: 14,
    borderRadius: 8,
    fontSize: 20,
  },
  buttonSaveText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
