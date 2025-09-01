import React, { useState } from 'react';
import { FLAG_LIST, PRESET_PERSONAS } from '../constants';
import { 
  Bars3Icon, 
  ChevronDownIcon, 
  Cog6ToothIcon, 
  ClockIcon, 
  ArrowPathIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function Header({ 
  selectedFlags, 
  onToggleFlag, 
  onOpenSettings, 
  onResetApp, 
  onOpenHistory,
  onToggleSidebar,
  isAiResponseEnabled,
  onToggleAiResponse,
  vibe,
  onPersonaChange,
  presetPersonas = PRESET_PERSONAS
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        {/* 페르소나 선택 드롭다운 */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-1 px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition duration-200"
          >
            <span>{vibe?.persona || '시니어 백엔드'}</span>
            <ChevronDownIcon className="h-3 w-3" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              {presetPersonas.map((persona) => (
                <button
                  key={persona}
                  onClick={() => {
                    onPersonaChange(persona);
                    setIsDropdownOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    vibe?.persona === persona
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {persona}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="h-5 w-px bg-gray-200 mx-2 dark:bg-gray-700"></div>
        
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
        {/* 아이콘 버튼들 */}
        <button
          onClick={onOpenSettings}
          className="btn-icon p-2 rounded-lg hover:bg-gray-200 transition duration-200 dark:hover:bg-gray-700"
          title="설정"
        >
          <Cog6ToothIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={onOpenHistory}
          className="btn-icon p-2 rounded-lg hover:bg-gray-200 transition duration-200 dark:hover:bg-gray-700"
          title="히스토리"
        >
          <ClockIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={onResetApp}
          className="btn-icon p-2 rounded-lg hover:bg-gray-200 transition duration-200 dark:hover:bg-gray-700"
          title="초기화"
        >
          <ArrowPathIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </header>
  );
}