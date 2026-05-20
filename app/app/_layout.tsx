import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TaskProvider } from '@/src/providers/TaskProvider';
import { AuditHost } from '@/src/components/AuditHost';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
        <AuditHost />
      </TaskProvider>
    </SafeAreaProvider>
  );
}
