import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { useTasks } from '@/src/providers/TaskProvider';
import { palette } from '@/src/theme';

export default function TaskDetailRoute() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getTask, removeTask, toggleTask } = useTasks();
  const task = getTask(id);

  if (!task) {
    return (
      <View style={styles.screen}>
        <View style={styles.content}>
          <ScreenHeader
            eyebrow="Durum"
            title="Gorev bulunamadi"
            subtitle="Bu kayit silinmis olabilir. Ana panele donerek devam edebilirsin."
            onBackPress={() => router.replace('/')}
          />
        </View>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert('Gorevi sil', 'Bu gorev panelden kaldirilacak.', [
      { text: 'Vazgec', style: 'cancel' },
      {
        text: 'Sil',
        style: 'destructive',
        onPress: () => {
          void removeTask(task.id);
          router.replace('/');
        },
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          eyebrow="Detay"
          title={task.title}
          subtitle="Kullanici burada durum, zaman ve kapsam bilgisini gozden gecirir."
          onBackPress={() => router.back()}
        />

        <View style={styles.card}>
          <View style={[styles.statusBanner, task.completed ? styles.statusBannerDone : styles.statusBannerOpen]}>
            <Text style={[styles.statusBannerText, task.completed ? styles.statusBannerDoneText : styles.statusBannerOpenText]}>
              {task.completed
                ? 'Bu gorev tamamlandi olarak kayitli.'
                : 'Bu gorev halen aktif ve takip bekliyor.'}
            </Text>
          </View>

          <View style={styles.block}>
            <Text style={styles.blockLabel}>Aciklama</Text>
            <Text style={styles.blockText}>{task.description}</Text>
          </View>

          <View style={styles.metaGrid}>
            <View style={styles.metaCard}>
              <Text style={styles.metaLabel}>Kategori</Text>
              <Text style={styles.metaValue}>{task.category}</Text>
            </View>
            <View style={styles.metaCard}>
              <Text style={styles.metaLabel}>Oncelik</Text>
              <Text style={styles.metaValue}>{task.priority}</Text>
            </View>
          </View>

          <View style={styles.block}>
            <Text style={styles.blockLabel}>Teslim zamani</Text>
            <Text style={styles.blockText}>{task.dueLabel}</Text>
          </View>

          <View style={styles.actions}>
            <Pressable onPress={() => void toggleTask(task.id)} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>
                {task.completed ? 'Tekrar aktif yap' : 'Tamamlandi olarak isaretle'}
              </Text>
            </Pressable>

            <Pressable onPress={handleDelete} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Gorevi sil</Text>
            </Pressable>
          </View>
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
    gap: 18,
  },
  statusBanner: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  statusBannerOpen: {
    backgroundColor: '#faecd8',
  },
  statusBannerDone: {
    backgroundColor: palette.greenSoft,
  },
  statusBannerText: {
    fontWeight: '700',
  },
  statusBannerOpenText: {
    color: '#88550a',
  },
  statusBannerDoneText: {
    color: palette.greenText,
  },
  block: {
    gap: 8,
  },
  blockLabel: {
    color: palette.copy,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  blockText: {
    color: palette.ink,
    lineHeight: 23,
    fontSize: 15,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  metaCard: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#f6f0e3',
    gap: 6,
  },
  metaLabel: {
    color: palette.copy,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  metaValue: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: palette.pine,
  },
  primaryButtonText: {
    color: palette.white,
    fontWeight: '800',
  },
  deleteButton: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: palette.redSoft,
  },
  deleteButtonText: {
    color: palette.redText,
    fontWeight: '800',
  },
});
