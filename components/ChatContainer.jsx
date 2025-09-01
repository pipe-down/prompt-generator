import React from 'react';
import MessageBubble from './MessageBubble';

export default function ChatContainer({ messages, active, onCopy }) {
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, active]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-white dark:bg-gray-900"
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`fade-in ${index === messages.length - 1 ? 'last-message' : ''}`}
        >
          <MessageBubble
            message={message}
            isUser={message.role === 'user'}
            onCopy={onCopy}
          />
        </div>
      ))}
    </div>
  );
}