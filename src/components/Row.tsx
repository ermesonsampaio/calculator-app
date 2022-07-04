import React from 'react';
import { View } from 'react-native';

export default function RowComponent({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {children}
    </View>
  );
}