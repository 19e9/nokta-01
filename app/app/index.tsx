import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MetricCard } from '@/src/components/MetricCard';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { TaskCard } from '@/src/components/TaskCard';
import { useTasks } from '@/src/providers/TaskProvider';
import { palette } from '@/src/theme';
import { TASK_FILTERS, type TaskFilter } from '@/src/types/task';

export default function HomeRoute() {
  const router = useRouter();
  const { hydrated, tasks, toggleTask } = useTasks();
  const [filter, setFilter] = useState<TaskFilter>('Tumu');

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  const filteredTasks = (() => {
    if (filter === 'Aktif') {
      return tasks.filter((task) => !task.completed);
    }

    if (filter === 'Tamamlanan') {
      return tasks.filter((task) => task.completed);
    }

    return tasks;
  })().slice().sort((left, right) => Number(left.completed) - Number(right.completed));

  return (
    <View style={styles.screen}>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerStack}>
            <ScreenHeader
              eyebrow="Panel"
              title="Kampus Takip"
              subtitle="Ders, proje ve kulup islerini tek akista topla; agent-ready audit raporlarini ayni host uygulamadan cikar."
              actionLabel="Yeni Gorev"
              onActionPress={() => router.push('/new-task')}
            />

            <View style={styles.metricRow}>
              <MetricCard label="Toplam" value={String(totalTasks)} />
              <MetricCard label="Aktif" value={String(activeTasks)} />
              <MetricCard label="Biten" value={String(completedTasks)} />
            </View>

            <View style={styles.filterCard}>
              <Text style={styles.filterTitle}>Akis filtresi</Text>
              <View style={styles.filterRow}>
                {TASK_FILTERS.map((option) => {
                  const isSelected = option === filter;

                  return (
                    <Pressable
                      key={option}
                      onPress={() => setFilter(option)}
                      style={[styles.filterPill, isSelected && styles.filterPillSelected]}
                    >
                      <Text
                        style={[styles.filterPillText, isSelected && styles.filterPillTextSelected]}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <Pressable onPress={() => router.push('/settings')} style={styles.helperLink}>
                <Text style={styles.helperLinkText}>Audit hazirlik ekranini ac</Text>
              </Pressable>
            </View>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        ListFooterComponent={
          hydrated ? null : (
            <View style={styles.loadingCard}>
              <Text style={styles.loadingTitle}>Liste hazirlaniyor</Text>
              <Text style={styles.loadingText}>
                Kaydedilen gorevler cihaz deposundan yuklenirken kisa bir audit-guvenli bekleme
                gosteriyoruz.
              </Text>
            </View>
          )
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Filtre bu anda bos</Text>
            <Text style={styles.emptyText}>
              Bu gorunumde gorev yok. Ustteki filtreyi degistir veya yeni bir gorev ekle.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onOpenTask={(taskId) => router.push(`/task/${taskId}`)}
            onToggleTask={(taskId) => void toggleTask(taskId)}
          />
        )}
      />
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
    paddingBottom: 120,
  },
  headerStack: {
    gap: 18,
    marginBottom: 18,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 12,
  },
  filterCard: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.line,
    gap: 12,
  },
  filterTitle: {
    color: palette.ink,
    fontWeight: '800',
    fontSize: 15,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterPill: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#efe8da',
  },
  filterPillSelected: {
    backgroundColor: palette.amber,
  },
  filterPillText: {
    color: palette.copy,
    fontWeight: '700',
  },
  filterPillTextSelected: {
    color: '#523606',
  },
  helperLink: {
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  helperLinkText: {
    color: palette.pine,
    fontWeight: '800',
  },
  loadingCard: {
    marginTop: 18,
    borderRadius: 24,
    padding: 18,
    backgroundColor: '#f7f1e6',
    borderWidth: 1,
    borderColor: palette.line,
    gap: 8,
  },
  loadingTitle: {
    color: palette.ink,
    fontWeight: '800',
  },
  loadingText: {
    color: palette.copy,
    lineHeight: 21,
  },
  emptyCard: {
    borderRadius: 24,
    padding: 20,
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.line,
    gap: 10,
  },
  emptyTitle: {
    color: palette.ink,
    fontSize: 20,
    fontWeight: '800',
  },
  emptyText: {
    color: palette.copy,
    lineHeight: 22,
  },
});
