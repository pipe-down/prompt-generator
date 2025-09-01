import React from 'react';
import { FLAG_LIST } from '../constants';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function Header({ 
  selectedFlags, 
  onToggleFlag, 
  onOpenSettings, 
  onResetApp, 
  onOpenHistory,
  onToggleSidebar,
  isAiResponseEnabled,
  onToggleAiResponse
}) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          className="sidebar-toggle lg:hidden"
        >
          <Bars3Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">바이브코딩 프롬프트</h1>
          <span className="ml-2 px-2 py-1 text-xs font-medium bg-[var(--primary-color)] text-white rounded-full">
            v1.3.3
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {FLAG_LIST.map((flag) => (
          <button
            key={flag}
            onClick={() => onToggleFlag(flag)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition duration-200 ${
              selectedFlags.includes(flag)
                ? 'bg-[var(--primary-color)] text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {flag}
          </button>
        ))}
        <div className="h-5 w-px bg-gray-200 mx-2 dark:bg-gray-700"></div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">AI 답변</span>
          <button
            onClick={onToggleAiResponse}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out ${
              isAiResponseEnabled ? 'bg-[var(--primary-color)]' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
                isAiResponseEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <div className="h-5 w-px bg-gray-200 mx-2 dark:bg-gray-700"></div>
        <button
          onClick={onOpenSettings}
          className="btn-secondary text-xs px-3 py-1"
        >
          설정
        </button>
        <button
          onClick={onResetApp}
          className="btn-secondary text-xs px-3 py-1"
        >
          초기화
        </button>
        <button
          onClick={onOpenHistory}
          className="btn-secondary text-xs px-3 py-1"
        >
          히스토리
        </button>
      </div>
    </header>
  );
}