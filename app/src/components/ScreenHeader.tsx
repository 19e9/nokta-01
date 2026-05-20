import { Pressable, StyleSheet, Text, View } from 'react-native';
import { palette } from '@/src/theme';

interface ScreenHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  actionLabel?: string;
  onActionPress?: () => void;
  onBackPress?: () => void;
}

export function ScreenHeader({
  eyebrow,
  title,
  subtitle,
  actionLabel,
  onActionPress,
  onBackPress,
}: ScreenHeaderProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {onBackPress ? (
          <Pressable onPress={onBackPress} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Geri</Text>
          </Pressable>
        ) : (
          <View />
        )}

        {actionLabel && onActionPress ? (
          <Pressable onPress={onActionPress} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>{actionLabel}</Text>
          </Pressable>
        ) : (
          <View />
        )}
      </View>

      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    padding: 22,
    backgroundColor: palette.pine,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyebrow: {
    color: '#c8e1d8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    color: palette.white,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#e1f1ec',
    lineHeight: 22,
    fontSize: 15,
  },
  primaryButton: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: palette.amber,
  },
  primaryButtonText: {
    color: '#2b1d06',
    fontWeight: '800',
  },
  secondaryButton: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#89b5ab',
  },
  secondaryButtonText: {
    color: palette.white,
    fontWeight: '700',
  },
});
