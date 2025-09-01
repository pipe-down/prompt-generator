import React, { useState } from 'react';

export default function LanguageTabs({ koreanContent, englishContent }) {
  const [activeTab, setActiveTab] = useState('korean');

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // 복사 성공 시 사용자에게 피드백 제공 (토스트 메시지 등)
      return true;
    } catch (err) {
      return false;
    }
  };

  const getContent = () => {
    if (activeTab === 'korean') {
      return koreanContent;
    } else {
      return englishContent;
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(getContent());
    // 복사 성공/실패에 따른 피드백 처리
    if (success) {
      // 토스트 메시지 표시 등
      console.log('Copied to clipboard');
    } else {
      // 복사 실패 시 처리
      console.log('Failed to copy');
    }
  };

  // 내용 분할을 위한 함수
  const splitContent = (content) => {
    const delimiter = '================================================================================';
    const parts = content.split(delimiter);
    return {
      korean: parts[0] ? parts[0].trim() : '',
      english: parts[1] ? parts[1].trim() : ''
    };
  };

  const { korean, english } = splitContent(koreanContent || englishContent);

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'korean'
              ? 'border-b-2 border-[var(--primary-color)] text-[var(--primary-color)] dark:text-[var(--primary-color)]'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('korean')}
        >
          한국어
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'english'
              ? 'border-b-2 border-[var(--primary-color)] text-[var(--primary-color)] dark:text-[var(--primary-color)]'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('english')}
        >
          English
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
          {activeTab === 'korean' ? korean : english}
        </pre>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleCopy}
          className="btn-primary w-full"
        >
          {activeTab === 'korean' ? '한국어 버전 복사' : 'Copy English Version'}
        </button>
      </div>
    </div>
  );
}