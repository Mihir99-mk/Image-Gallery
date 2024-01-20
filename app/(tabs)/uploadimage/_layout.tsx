import React from 'react';
import { Stack } from 'expo-router';

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Images',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen name="[id]" options={{ title: 'View Image' }} />
    </Stack>
  );
}
