import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F8FAFC' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
