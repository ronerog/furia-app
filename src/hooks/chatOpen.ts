import { useEffect, useState } from 'react';

interface ChatToggleDetail {
  isOpen: boolean;
}

export function useChatOpen() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<ChatToggleDetail>;
      setIsOpen(!!customEvent.detail?.isOpen);
    };

    window.addEventListener('chat-toggle', handler as EventListener);

    return () => {
      window.removeEventListener('chat-toggle', handler as EventListener);
    };
  }, []);

  return isOpen;
}
