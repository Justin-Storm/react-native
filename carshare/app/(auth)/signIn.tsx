import { useAuthActions } from "@convex-dev/auth/react";
import { Stack } from "expo-router";
import { useState } from "react";
import { Button, TextInput, useColorScheme, View, Text } from "react-native";
import Styles from "../styles";
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
 
export default function SignIn() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signUp" | "signIn">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme();
  const styles = Styles(colorScheme);

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />
      <View className="flex-1 items-center justify-center px-5 gap-4" style={styles.background}>
        <Text style={styles.text} className="font-bold text-4xl">{step === 'signIn' ? 'Sign In' : 'Sign Up'}</Text>
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          inputMode="email"
          autoCapitalize="none"
          style={[styles.text, styles.container]}
          className="w-full p-4 rounded-xl"
        />
        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          style={[styles.text, styles.container]}
          className="w-full p-4 rounded-xl"
        />
        <Button
          title={step === "signIn" ? "Sign in" : "Sign up"}
          onPress={async () => {
            void signIn("password", { email, password, flow: step });
          }}
        />
        <Button
          title={step === "signIn" ? "Sign up instead" : "Sign in instead"}
          onPress={() => setStep(step === "signIn" ? "signUp" : "signIn")}
        />
      </View>
    </>
  );
}