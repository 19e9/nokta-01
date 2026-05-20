import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Task } from '@/src/types/task';
import { palette } from '@/src/theme';

interface TaskCardProps {
  task: Task;
  onOpenTask: (taskId: string) => void;
  onToggleTask: (taskId: string) => void;
}

export function TaskCard({ task, onOpenTask, onToggleTask }: TaskCardProps) {
  return (
    <View style={[styles.card, task.completed && styles.cardCompleted]}>
      <View style={styles.row}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>

        <View style={[styles.badge, task.completed ? styles.doneBadge : styles.openBadge]}>
          <Text style={[styles.badgeText, task.completed && styles.doneBadgeText]}>
            {task.completed ? 'Bitti' : task.priority}
          </Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>{task.category}</Text>
        <Text style={styles.metaDivider}>•</Text>
        <Text style={styles.metaText}>{task.priority}</Text>
        <Text style={styles.metaDivider}>•</Text>
        <Text style={styles.metaText}>{task.dueLabel}</Text>
      </View>

      <View style={styles.actionsRow}>
        <Pressable onPress={() => onOpenTask(task.id)} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Detay</Text>
        </Pressable>
        <Pressable onPress={() => onToggleTask(task.id)} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>
            {task.completed ? 'Tekrar Ac' : 'Tamamla'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.line,
    gap: 14,
  },
  cardCompleted: {
    backgroundColor: '#f2f8f4',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleBlock: {
    flex: 1,
    gap: 6,
  },
  title: {
    color: palette.ink,
    fontSize: 20,
    fontWeight: '800',
  },
  description: {
    color: palette.copy,
    lineHeight: 21,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  openBadge: {
    backgroundColor: '#f9ead1',
  },
  doneBadge: {
    backgroundColor: palette.greenSoft,
  },
  badgeText: {
    color: '#8a5608',
    fontSize: 12,
    fontWeight: '800',
  },
  doneBadgeText: {
    color: palette.greenText,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    color: palette.copy,
    fontWeight: '700',
  },
  metaDivider: {
    color: '#9fadab',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 13,
    backgroundColor: palette.amber,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#2b1d06',
    fontWeight: '800',
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 13,
    backgroundColor: '#ebf3ef',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: palette.ink,
    fontWeight: '700',
  },
});
