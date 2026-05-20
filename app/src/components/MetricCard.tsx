import { StyleSheet, Text, View } from 'react-native';
import { palette } from '@/src/theme';

interface MetricCardProps {
  label: string;
  value: string;
}

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 22,
    padding: 16,
    backgroundColor: '#fbf8f1',
    borderWidth: 1,
    borderColor: palette.line,
    gap: 8,
  },
  label: {
    color: palette.copy,
    fontWeight: '700',
  },
  value: {
    color: palette.ink,
    fontSize: 24,
    fontWeight: '800',
  },
});
