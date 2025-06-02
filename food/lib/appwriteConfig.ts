import { 
    Client, 
    Account, 
    Databases,
    ID,
    OAuthProvider,
    Avatars,
    Query,
    Storage,
} from 'react-native-appwrite';
import * as Linking from "expo-linking";
import { Alert } from 'react-native';
import { router } from 'expo-router';

export const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
};

export const client = new Client();
client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectID!)
    .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export async function createAccount(email: string, password: string, name: string) {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    return response;
  } catch (error) {
    Alert.alert("Account Creation Failed", "Please check your email and password.");
  }
}

export async function login(email: string, password: string, setUser: Function) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        const user = await account.get();
        setUser(user);
        router.back();
        return session;
    } catch (error) {
        Alert.alert("Login Failed", "Please check your email and password.");
    }
}

export async function logout(setUser: Function) {
  try {
    const result = await account.deleteSession("current");
    Alert.alert("Logout Successful", "You have been logged out.");
    setUser(null);
    router.back();
    return result;
  } catch (error) {
    Alert.alert("Logout Failed", "An error occurred while logging out.");
    return false;
  }
}
