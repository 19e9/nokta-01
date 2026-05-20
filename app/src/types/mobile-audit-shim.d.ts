declare module '@xtatistix/mobile-audit' {
  import type { ComponentType, ReactNode, RefObject } from 'react';

  export interface AuditNoteBounds {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  export interface AuditNote {
    id: string;
    screenName: string;
    screenshot: string;
    screenshotAspect?: number;
    highlightBounds: AuditNoteBounds | null;
    note: string;
    status: 'open' | 'fixed';
    timestamp: string;
    reporterId?: string;
  }

  export interface AuditStorage {
    loadNotes(): Promise<AuditNote[]>;
    saveNotes(notes: AuditNote[]): Promise<void>;
  }

  export interface AuditWidgetDeps {
    captureScreen: () => Promise<string>;
    captureRef: (ref: RefObject<any>) => Promise<string>;
    writeFile: (filename: string, content: string) => Promise<string>;
    writeFileBinary: (filename: string, base64: string) => Promise<string>;
    shareFile: (uri: string) => Promise<void>;
    storage: AuditStorage;
    currentScreen: string;
    reporterId?: string;
    BugIcon: ReactNode;
  }

  export const AuditWidget: ComponentType<{
    deps: AuditWidgetDeps;
    appName?: string;
    initialPosition?: { bottom: number; right: number };
  }>;
}
