import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import useStorage from '../../hooks/useStorage';
import { PasswordItem } from './components/passworditem'


export function Passwords(){
    const [listPasswords, setListPasswords] = useState([])
    const focused = useIsFocused()
    const { getItem, removeItem } = useStorage() 

    useEffect(()=>{
        async function loadPasswords(){
            const passwords = await getItem('@pass')
            setListPasswords(passwords)
        }

        loadPasswords()
    }, [focused])

    async function handleDeletePassword(password){
        const passwords = await removeItem('@pass', password.id)

        setListPasswords(passwords)
    }
    
    return(
        <SafeAreaView style={{ flex:1, }}>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas Senhas</Text>
            </View>

            <View style={styles.content}>
                <FlatList
                    style={{ flex:1, paddingTop: 14 }}
                    data={listPasswords}
                    keyExtractor= {(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <PasswordItem password={item} removePassword={handleDeletePassword} />
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>  
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#25AE88',
        paddingTop: 58,
        paddingBottom: 18,
        paddingLeft: 14,
        paddingRight: 14,
    },
    title: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 14,
    },
})