import React from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function InputArea({ input, setInput, onGenerate, disabled }) {
  // InputArea는 더 이상 폼 제출을 처리하지 않습니다.
  // 대신 키 다운 이벤트만 처리합니다.
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !disabled) {
        onGenerate();
      }
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-end space-x-3">
        <div className="flex-1">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요..."
            className="input-field w-full resize-none py-3 px-4"
            rows="1"
            disabled={disabled}
          />
        </div>
        <button
          type="button"
          onClick={onGenerate}
          disabled={!input.trim() || disabled}
          className={`btn-icon p-4 h-12 flex items-center justifyㄹ-center rounded-lg ${
            !input.trim() || disabled
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-[var(--primary-color)] hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <PaperAirplaneIcon className="h-6 w-6 mb-1" />
        </button>
      </div>
      <div className="mt-2 text-xs text-gray-500 text-center dark:text-gray-400">
        엔터를 누르면 전송됩니다. Shift+엔터로 줄바꿈합니다.
      </div>
    </div>
  );
}
