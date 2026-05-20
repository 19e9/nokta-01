import { Text } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { usePathname } from 'expo-router';
import { captureRef as captureViewRef, captureScreen } from 'react-native-view-shot';
import { AuditWidget } from '@xtatistix/mobile-audit';
import type { AuditWidgetDeps } from '@/src/types/audit';
import { auditStorage } from '@/src/lib/auditStorage';

const REPORTER_ID = '9191118048';

function getDocumentDirectory() {
  if (!FileSystem.documentDirectory) {
    throw new Error('Document directory is not available.');
  }

  return FileSystem.documentDirectory;
}

export function AuditHost() {
  const pathname = usePathname();

  const auditDeps: AuditWidgetDeps = {
    captureScreen: () => captureScreen({ format: 'png', result: 'tmpfile' }),
    captureRef: (ref) => captureViewRef(ref, { format: 'png', result: 'tmpfile' }),
    writeFile: async (filename, content) => {
      const uri = getDocumentDirectory() + filename;
      await FileSystem.writeAsStringAsync(uri, content);
      return uri;
    },
    writeFileBinary: async (filename, base64) => {
      const uri = getDocumentDirectory() + filename;
      await FileSystem.writeAsStringAsync(uri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return uri;
    },
    shareFile: async (uri) => {
      const available = await Sharing.isAvailableAsync();

      if (!available) {
        throw new Error('Sharing is not available on this device.');
      }

      await Sharing.shareAsync(uri);
    },
    storage: auditStorage,
    currentScreen: pathname,
    reporterId: REPORTER_ID,
    BugIcon: <Text style={{ color: '#fff', fontSize: 22, fontWeight: '800' }}>!</Text>,
  };

  return (
    <AuditWidget
      appName="Kampus Takip"
      deps={auditDeps}
      initialPosition={{ bottom: 110, right: 16 }}
    />
  );
}
