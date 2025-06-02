import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { createAccount, login, logout } from "@/lib/appwriteConfig";
import { useUser } from "@/lib/UserContext";

export default function SignIn() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signUp, setSignUp] = useState(false);
    const [name, setName] = useState("");

    const { setUser } = useUser();

    const handleCreateAccount = async () => {
        const result = await createAccount(email, password, name);
        if (result) {
            const loginResult = await login(email, password, setUser);
        }
    }

    const handleLogin = async () => {
        const result = await login(email, password, setUser);
    };

    const toggleSignInSignUp = () => {
        setSignUp(!signUp);
        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <View className="flex-1 px-4 items-center justify-center">
            {signUp ? (
                <React.Fragment>
                    <Text className="text-2xl font-bold mb-4" onPress={() => logout(setUser)}>Sign Up</Text>
                    <View className="w-full gap-5">
                        <View className="flex flex-row items-center w-full p-4 gap-4 rounded-full bg-slate-200">
                            <Ionicons name="person" size={24} color={colors.black} />
                            <TextInput 
                                className="flex-1"
                                placeholder="Name"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                        <View className="flex flex-row items-center w-full p-4 gap-4 rounded-full bg-slate-200">
                            <Ionicons name="mail" size={24} color={colors.black} />
                            <TextInput 
                                className="flex-1"
                                placeholder="Email Address"
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                        <View className="flex flex-row items-center w-full p-4 gap-4 rounded-full bg-slate-200">
                            <Ionicons name="key" size={24} color={colors.black} />
                            <TextInput 
                                className="flex-1"
                                placeholder="Password"
                                secureTextEntry={!passwordVisible}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                <Ionicons name={!passwordVisible ? "eye-off" : "eye"} size={24} color={colors.black} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity className="w-full p-4 bg-red-600 rounded-full items-center" onPress={handleCreateAccount}>
                            <Text className="text-white font-bold">Sign Up</Text>
                        </TouchableOpacity>
                        <View className="flex flex-row gap-2 justify-center">
                            <Text>Already have an account?</Text>
                            <TouchableOpacity onPress={toggleSignInSignUp}>
                                <Text className="text-red-600">Sign In</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='flex px-6 flex-row items-center justify-center gap-4'>
                            <View className="h-[1px] bg-slate-300 flex-1" />
                            <Text className="text-slate-500">or</Text>
                            <View className="h-[1px] bg-slate-300 flex-1" />
                        </View>
                    </View>
                </React.Fragment>
            ) : (
            <React.Fragment>
                <Text className="text-2xl font-bold mb-4" onPress={() => logout(setUser)}>Sign In</Text>
                <View className="w-full gap-5">
                    <View className="flex flex-row items-center w-full p-4 gap-4 rounded-full bg-slate-200">
                        <Ionicons name="mail" size={24} color={colors.black} />
                        <TextInput 
                            className="flex-1"
                            placeholder="Email Address"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View className="flex flex-row items-center w-full p-4 gap-4 rounded-full bg-slate-200">
                        <Ionicons name="key" size={24} color={colors.black} />
                        <TextInput 
                            className="flex-1"
                            placeholder="Password"
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Ionicons name={!passwordVisible ? "eye-off" : "eye"} size={24} color={colors.black} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity className="w-full p-4 bg-red-600 rounded-full items-center" onPress={handleLogin}>
                        <Text className="text-white font-bold">Sign In</Text>
                    </TouchableOpacity>
                    <View className="flex flex-row gap-2 justify-center">
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity onPress={toggleSignInSignUp}>
                            <Text className="text-red-600">Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='flex px-6 flex-row items-center justify-center gap-4'>
                        <View className="h-[1px] bg-slate-300 flex-1" />
                        <Text className="text-slate-500">or</Text>
                        <View className="h-[1px] bg-slate-300 flex-1" />
                    </View>
                </View>
            </React.Fragment>
            )}
        </View>
    );
};