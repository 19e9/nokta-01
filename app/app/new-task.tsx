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
  const [showErrors, setShowErrors] = useState(false);

  const titleError = !title.trim() ? 'Baslik gerekli.' : '';
  const descriptionError = !description.trim() ? 'Aciklama gerekli.' : '';
  const dueLabelError = !dueLabel.trim() ? 'Zaman etiketi gerekli.' : '';
  const hasErrors = Boolean(titleError || descriptionError || dueLabelError);

  const handleSubmit = async () => {
    if (hasErrors) {
      setShowErrors(true);
      Alert.alert('Eksik Bilgi', 'Gerekli alanlari tamamlayip tekrar dene.');
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
            {showErrors && titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}
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
            {showErrors && descriptionError ? (
              <Text style={styles.errorText}>{descriptionError}</Text>
            ) : null}
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
            {showErrors && dueLabelError ? (
              <Text style={styles.errorText}>{dueLabelError}</Text>
            ) : null}
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

          <Text style={styles.helperText}>
            Tum zorunlu alanlar dolunca buton aktif kalir ve gorev paneliyle detay ekranina akar.
          </Text>

          <Pressable
            disabled={hasErrors}
            onPress={() => void handleSubmit()}
            style={[styles.submitButton, hasErrors && styles.submitButtonDisabled]}
          >
            <Text style={[styles.submitButtonText, hasErrors && styles.submitButtonTextDisabled]}>
              Kaydet ve panele don
            </Text>
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
  errorText: {
    color: palette.redText,
    fontSize: 13,
    fontWeight: '700',
  },
  textArea: {
    minHeight: 120,
  },
  helperText: {
    color: palette.copy,
    lineHeight: 21,
  },
  submitButton: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: palette.amber,
  },
  submitButtonDisabled: {
    backgroundColor: palette.amberSoft,
  },
  submitButtonText: {
    color: '#2c1d06',
    fontWeight: '800',
  },
  submitButtonTextDisabled: {
    color: '#8b6a2f',
  },
});
