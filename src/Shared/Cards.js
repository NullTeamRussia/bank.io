import { AsyncStorage } from 'react-native'

export async function storeCards (cards) {
    await AsyncStorage.setItem('Cards', JSON.stringify(cards));
}

export async function retrieveCards (callback) {
    const value = await AsyncStorage.getItem('Cards', callback);
    return JSON.parse(value)
}

export async function storeAutoIncrement (autoIncrement) {
    await AsyncStorage.setItem('autoIncrement', JSON.stringify(autoIncrement));
}

export async function retrieveAutoIncrement (callback) {
    const value = await AsyncStorage.getItem('autoIncrement', callback);
    return JSON.parse(value)
}
