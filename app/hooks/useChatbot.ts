import { createChat } from "@n8n/chat";
import { useEffect } from "react";
import { trackCTAClick } from "../services/analytics";

export const useChatbot = () =>{
    useEffect(() => {
        const webhookUrl = 'https://n8n.techkanna.com/webhook/e7084422-0a0b-4c1d-b04e-967b8752fe2f/chat'
        createChat({
          webhookUrl,
          webhookConfig: {
            method: 'POST',
            headers: {}
          },
          target: '#n8n-chat',
          mode: 'window',
          chatInputKey: 'chatInput',
          chatSessionKey: 'sessionId',
          loadPreviousSession: true,
          metadata: {},
          showWelcomeScreen: false,
          defaultLanguage: 'en',
          initialMessages: [
            `Hi, I'm Senthilkannan's AI assistant, answering on his behalf. I'll speak in first person to keep things natural. I can walk you through his projects, skills, and journey as a full stack web developer. What would you like to check out first?`,
          ],
          i18n: {
            en: {
              title: 'Hi there! 👋',
              subtitle: "Start a chat. We're here to help you 24/7.",
              footer: '',
              getStarted: 'New Conversation',
              inputPlaceholder: 'Type your question..',
              closeButtonTooltip: ''
            },
          },
          enableStreaming: true,
        });
    
        // Track n8n chat button clicks with Umami
        const trackChatButtonClick = () => {
          trackCTAClick({ctaName: 'chat-button', ctaType: 'chat-widget', additionalData: {
            widget_type: 'n8n-chat'
          }});
        };
    
        let eventListenerAttached = false;
        // Wait for n8n chat to be fully loaded and find the chat button
        const setupChatButtonTracking = () => {
    
          const attachEventListener = (button: HTMLElement) => {
            if (!eventListenerAttached) {
              button.addEventListener('click', trackChatButtonClick);
              eventListenerAttached = true;
              console.info('Chat button event listener attached');
            }
          };
    
          const findChatButton = (): HTMLElement | null => {
            // Use the specific class name for n8n chat toggle button
            const button: HTMLElement | null = document.querySelector('.chat-window-toggle');
            if (button) {
              console.info('Found n8n chat button');
              return button;
            }
            return null;
          };
    
          // Try to find the button immediately
          const chatButton = findChatButton();
    
          if (chatButton) {
            attachEventListener(chatButton);
          }
        };
    
        // Setup tracking after a short delay to ensure n8n chat is loaded
        setTimeout(setupChatButtonTracking, 2000);
      }, []);

      return null
}