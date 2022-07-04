import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_700Bold,
} from '@expo-google-fonts/work-sans';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardRef } from './src/components';

export default function App() {
  const [fontsLoaded] = useFonts({
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_700Bold,
  });

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    hideSplashScreen();
  }, [fontsLoaded]);

  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [resultIsFocused, setResultIsFocused] = useState(false);

  const keyboardRef = useRef<KeyboardRef>(null);

  const [lastExpression, setLastExpression] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<string | null>(null);

  const expressionScaleAnim = useRef(new Animated.Value(64)).current;
  const resultScaleAnim = useRef(new Animated.Value(40)).current;
  
  const expressionColorAnim = useRef(new Animated.Value(0)).current;
  const resultColorAnim = useRef(new Animated.Value(1)).current;

  const expressionColorInterpolation = expressionColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#747477'],
  });

  const resultColorInterpolation = resultColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#747477'],
  });

  function transition(anim: Animated.Value, toValue: number, duration = 400) {
    Animated.timing(anim, {
      toValue,
      duration,
      useNativeDriver: false,
    }).start();
  }

  useEffect(() => {
    if (resultIsFocused) {
      transition(expressionScaleAnim, 40);
      transition(resultScaleAnim, 64);

      transition(expressionColorAnim, 1);
      transition(resultColorAnim, 0);
    } else {
      transition(expressionScaleAnim, 64);
      transition(resultScaleAnim, 40);

      transition(expressionColorAnim, 0);
      transition(resultColorAnim, 1);
    }
  }, [resultIsFocused]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingVertical: 24,
          flexDirection: 'column',
          width: '100%',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        <Animated.Text
          style={{
            color: expressionColorInterpolation,
            fontSize: expressionScaleAnim,
            fontFamily: 'WorkSans_300Light',
          }}
        >
          {expression || lastExpression}
        </Animated.Text>

        <Animated.Text
          style={{
            color: resultColorInterpolation,
            fontSize: resultScaleAnim,
            fontFamily: 'WorkSans_300Light',
          }}
        >
          {result ?? lastResult}
        </Animated.Text>
      </View>

      <Keyboard
        ref={keyboardRef}
        onChangeResult={(result) => setResult(result?.toString() || null)}
        onPressEqual={() => {
          setResultIsFocused(true);

          if (expression) setLastExpression(expression);
          if (result) setLastResult(result?.toString());

          keyboardRef.current?.clearExpression();
        }}
        onChangeExpression={(expression) => {
          if (expression.length > 0 && resultIsFocused) {
            setLastExpression(null);
            setLastResult(null);
          }

          if (expression.length === 1) setResultIsFocused(false);
          
          setExpression(expression);
        }}
        onClear={() => {
          setLastExpression(null);
          setLastResult(null);
        }}
      />

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171C',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 16,
  },
});
