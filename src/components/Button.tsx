import { Text, TouchableOpacity } from "react-native";
import { fonts } from "../styles";

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps {
  title?: string;
  variant?: ButtonVariant;
  children?: React.ReactNode;
  onPress?: () => void;
}

export default function ButtonComponent({ title, variant = 'tertiary', children, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: variant === 'tertiary'
          ? '#2E2F38'
          : variant === 'secondary'
          ? '#4E505F'
          : '#4B5EFC',
        minHeight: 72,
        minWidth: 72,
        flex: 1,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
      }}
      activeOpacity={0.8}
      {...props}
    >
      {
        children ||
        <Text
          style={{
            color: '#fff',
            fontSize: 24,
            fontFamily: fonts.regular,
          }}
        >
          {title}
        </Text>
      }
    </TouchableOpacity>
  );
}