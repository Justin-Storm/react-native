import { Background } from "@react-navigation/elements";
import { useColorScheme, StyleSheet, ColorSchemeName } from "react-native";


export default function Styles(colorScheme: ColorSchemeName) {
    const isDark = colorScheme === 'dark';

    const lightColors = StyleSheet.create({
        "background": {
            backgroundColor: '#fff'
        },
        "text": {
            color: '#000'
        },
        "input": {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            padding: 15,
            color: '#000',
            borderRadius: 20,
        },
        "container": {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }
    });

    const darkColors = StyleSheet.create({
        "background": {
            backgroundColor: '#111'
        },
        "text": {
            color: '#fff'
        },
        "input": {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: 15,
            color: '#fff',
            borderRadius: 20
        },
        "container": {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }
    });

    return isDark ? darkColors : lightColors;
}

