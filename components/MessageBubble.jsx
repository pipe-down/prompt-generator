import React, { useState } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

export default function MessageBubble({ message, isUser, onCopy }) {
  const isAssistant = !isUser && message.role === 'assistant';
  const [activeTab, setActiveTab] = useState('ko');

  const splitContent = (content) => {
    if (!content) return { korean: '', english: '' };
    const delimiter = '================================================================================';
    const parts = content.split(delimiter);
    if (parts.length >= 2) {
      return {
        korean: parts[0]?.trim(),
        english: parts[1]?.trim(),
      };
    }
    return {
      korean: content,
      english: content,
    };
  };

  const { korean, english } = isAssistant ? splitContent(message.content) : { korean: message.content, english: message.content };

  if (isAssistant && english) {
    return (
      <div className={`flex justify-start fade-in w-full`}>
        <div className="max-w-[85%] rounded-2xl bg-gray-100 text-gray-800 rounded-tl-none dark:bg-gray-700 dark:text-gray-100 w-full">
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600">
            <div className="flex">
              <button
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === 'ko'
                    ? 'border-b-2 border-[var(--primary-color)] text-[var(--primary-color)] dark:text-[var(--primary-color)]'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('ko')}
              >
                한국어
              </button>
              <button
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === 'en'
                    ? 'border-b-2 border-[var(--primary-color)] text-[var(--primary-color)] dark:text-[var(--primary-color)]'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('en')}
              >
                English
              </button>
            </div>
            <button
              onClick={() => onCopy(activeTab === 'ko' ? korean : english)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <ClipboardDocumentIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">
            <div className="whitespace-pre-wrap break-words">
              {activeTab === 'ko' ? korean : english}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} fade-in`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-[var(--primary-color)] text-white rounded-tr-none dark:bg-[var(--primary-color)] dark:text-white'
            : 'bg-gray-100 text-gray-800 rounded-tl-none dark:bg-gray-700 dark:text-gray-100'
        }`}
      >
        <div className="whitespace-pre-wrap break-words">{message.content}</div>
      </div>
    </div>
  );
}
