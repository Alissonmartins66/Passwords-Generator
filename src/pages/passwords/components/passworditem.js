import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard'

export function PasswordItem({ password, removePassword}) {
    const [showPassword, setShowPassword] = useState(false)

    async function handleCopyPassword(){
        const senhaString = Object.values(password.senha).slice(0, -1).join('');


         if (typeof senhaString === 'string') {
            await Clipboard.setStringAsync(senhaString);
            alert('Senha copiada para a área de transferência!');
        } else {
            alert('Erro ao copiar a senha: formato inválido....');
        }
        
    }

    return (
        <TouchableWithoutFeedback onLongPress={handleCopyPassword}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>{showPassword ? Object.values(password.senha).slice(0, -1).join(''): '••••••••'}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}  >
                        <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#fff" style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removePassword(password)}>
                        <Ionicons name="trash-bin" size={24} color="#FF0000" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
      );
        
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0e0e0e',
        padding: 15,
        width: '100%',
        marginBottom: 15,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 15,
    },
    icon: {
        marginRight: 25,
        justifyContent: 'space-around'
    }
})