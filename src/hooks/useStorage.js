import AsyncStorage from '@react-native-async-storage/async-storage';


const useStorage = () => {
    const getItem = async (key) => {
        try {
            const passwords = await AsyncStorage.getItem(key)
            return JSON.parse(passwords) || [];

        }catch(error){
            console.log('Erro ao buscar', error)
            return [];
        }
    }

    const saveItem = async (key, value) => {
        try {   
            let passwords = await getItem(key);
    
            const timestamp = new Date().getTime();
            const passwordId = { senha: value, id: `${timestamp}` }
            passwords.push(passwordId);
    
            await AsyncStorage.setItem(key, JSON.stringify(passwords));
    
        } catch(error) {
            console.log('Erro ao salvar', error)
        }
    }

    const removeItem = async (key, id) => {
        try {
            let passwords = await getItem(key);

            let myPasswords = passwords.filter((password) => password.id !== id);

            await AsyncStorage.setItem(key, JSON.stringify(myPasswords));
            return myPasswords;

        }catch(error){
            console.log('Erro ao remover', error)
        }
    }

    return {
        getItem,
        saveItem,
        removeItem,
    }
}

export default useStorage;