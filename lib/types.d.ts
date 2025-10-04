// Global type declarations for Personal Portfolio

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: {
        event_category?: string;
        event_label?: string;
        value?: string | number;
        [key: string]: any;
      }
    ) => void;
  }
}

export {};
