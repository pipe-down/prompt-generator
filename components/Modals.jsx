import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import LanguageTabs from './LanguageTabs';
import { DEFAULT_GEMINI } from '../constants';

export function ManualCopyModal({ open, text, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-content">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">수동 복사</h3>
        <button
          onClick={onClose}
          className="btn-icon p-1 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 flex flex-col h-[70vh]">
        <LanguageTabs
          koreanContent={text}
          englishContent={text}
        />
      </div>
      <div className="px-4 py-3 bg-gray-50 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-300">
        클립보드 권한이 차단되어 수동 복사가 필요합니다. 전체 선택 후 Ctrl/⌘+C
      </div>
    </div>
  );
}

export function HistoryModal({ open, onClose, history, onCopy }) {
  if (!open) return null;

  return (
    <div className="modal-content max-w-4xl">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">히스토리</h3>
        <button
          onClick={onClose}
          className="btn-icon p-1 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 dark:bg-gray-800">
        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            기록이 없습니다.
          </div>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(item.ts || Date.now()).toLocaleString()}
                </span>
                <button
                  onClick={() => onCopy(item.content)}
                  className="btn-secondary text-xs px-2 py-1 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-100"
                >
                  복사
                </button>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-gray-800 break-words dark:text-gray-200">
                {item.content}
              </pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function SettingsModal({ open, onClose, gemini, setGemini }) {
  const [apiKey, setApiKey] = useState(gemini.apiKey || '');
  const [model, setModel] = useState(gemini.model || 'gemini-2.0-flash');
  const [temperature, setTemperature] = useState(gemini.temperature ?? 0.4);

  useEffect(() => {
    if (open) {
      setApiKey(gemini.apiKey || '');
      setModel(gemini.model || 'gemini-2.0-flash');
      setTemperature(gemini.temperature ?? 0.4);
    }
  }, [open, gemini]);

  if (!open) return null;

  const handleSave = () => {
    setGemini({ apiKey, model, temperature });
    onClose();
  };

  return (
    <div className="modal-content max-w-md">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gemini 설정</h3>
        <button
          onClick={onClose}
          className="btn-icon p-1 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 p-4 space-y-4 dark:bg-gray-800">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
            API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
            모델
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="input-field w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="gemini-2.0-flash">gemini-2.0-flash</option>
            <option value="gemini-1.5-pro">gemini-1.5-pro</option>
            <option value="gemini-1.5-flash">gemini-1.5-flash</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
            온도 (0~1): {temperature.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 flex justify-end space-x-2 dark:bg-gray-700">
        <button onClick={onClose} className="btn-secondary dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-100">
          취소
        </button>
        <button onClick={handleSave} className="btn-primary">
          저장
        </button>
      </div>
    </div>
  );
}
