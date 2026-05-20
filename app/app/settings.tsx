import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { palette } from '@/src/theme';

export default function SettingsRoute() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          eyebrow="Ops"
          title="Audit hazirligi"
          subtitle="Kullanicinin rapor olusturmadan once hangi bilgileri gorecegini gosteren destek ekran."
          onBackPress={() => router.back()}
        />

        <View style={styles.card}>
          <Text style={styles.title}>Kapali dongu akisi</Text>
          <Text style={styles.body}>
            1. Kullanici FAB ile issue notu toplar. 2. Markdown raporu export eder. 3. Coding agent
            raporu okuyup onarim cycle baslatir. 4. Insan review ile ratchet korunur.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.mist,
  },
  content: {
    padding: 20,
    gap: 18,
    paddingBottom: 120,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.line,
    gap: 12,
  },
  title: {
    color: palette.ink,
    fontSize: 20,
    fontWeight: '800',
  },
  body: {
    color: palette.copy,
    lineHeight: 23,
    fontSize: 15,
  },
});
