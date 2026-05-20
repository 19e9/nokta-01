import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuditNote, AuditStorage } from '@/src/types/audit';

const STORAGE_KEY = 'campus-todo/audit-notes';

export const auditStorage: AuditStorage = {
  async loadNotes(): Promise<AuditNote[]> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw) as AuditNote[];
    } catch {
      return [];
    }
  },
  async saveNotes(notes: AuditNote[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  },
};
