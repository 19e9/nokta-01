import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { OptionPillGroup } from '@/src/components/OptionPillGroup';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { useTasks } from '@/src/providers/TaskProvider';
import { palette } from '@/src/theme';
import { TASK_CATEGORIES, TASK_PRIORITIES, type TaskCategory, type TaskPriority } from '@/src/types/task';
import { useState } from 'react';

export default function NewTaskRoute() {
  const router = useRouter();
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueLabel, setDueLabel] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Normal');
  const [category, setCategory] = useState<TaskCategory>('Ders');

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !dueLabel.trim()) {
      Alert.alert('Eksik Bilgi', 'Baslik, aciklama ve zaman alani bos birakilamaz.');
      return;
    }

    await addTask({
      title,
      description,
      dueLabel,
      priority,
      category,
    });

    router.replace('/');
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          eyebrow="Form"
          title="Yeni gorev akisi"
          subtitle="Audit raporlarinda yakalanan gorev girisi ve zaman bilgisini burada netlestir."
          onBackPress={() => router.back()}
        />

        <View style={styles.formCard}>
          <View style={styles.field}>
            <Text style={styles.label}>Baslik</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Orn. Veri yapilari quiz hazirligi"
              placeholderTextColor="#9aa7a4"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Aciklama</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Kisa gorev notu"
              placeholderTextColor="#9aa7a4"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              style={[styles.input, styles.textArea]}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Zaman etiketi</Text>
            <TextInput
              value={dueLabel}
              onChangeText={setDueLabel}
              placeholder="Orn. Yarin 09:00"
              placeholderTextColor="#9aa7a4"
              style={styles.input}
            />
          </View>

          <OptionPillGroup
            label="Oncelik"
            options={TASK_PRIORITIES}
            selectedValue={priority}
            onSelect={setPriority}
          />

          <OptionPillGroup
            label="Kategori"
            options={TASK_CATEGORIES}
            selectedValue={category}
            onSelect={setCategory}
          />

          <Pressable onPress={() => void handleSubmit()} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Kaydet ve panele don</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  formCard: {
    borderRadius: 24,
    padding: 20,
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.line,
    gap: 18,
  },
  field: {
    gap: 8,
  },
  label: {
    color: palette.ink,
    fontWeight: '700',
  },
  input: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.line,
    paddingHorizontal: 14,
    paddingVertical: 13,
    backgroundColor: '#fffcf6',
    color: palette.ink,
  },
  textArea: {
    minHeight: 120,
  },
  submitButton: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: palette.amber,
  },
  submitButtonText: {
    color: '#2c1d06',
    fontWeight: '800',
  },
});
