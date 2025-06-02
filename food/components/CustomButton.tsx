import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";

type Props = {
    containerClass?: string;
    textClass?: string;
    text: string;
    style?: StyleProp<ViewStyle>;
};

export default function CustomButton(props: Props) {
    return (
        <TouchableOpacity className={props.containerClass} style={props.style}>
            <Text className={props.textClass}>{props.text}</Text>
        </TouchableOpacity>
    );
};