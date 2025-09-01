import React from 'react';
import { PlusIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Sidebar({ 
  sessions, 
  activeId, 
  setActiveId, 
  onCreateNewSession, 
  onDeleteSession,
  isCollapsed,
  onToggleCollapse,
  editingSessionId,
  editingTitle,
  onEditSessionTitle,
  onSaveSessionTitle,
  onCancelEdit,
  setEditingTitle
}) {
  return (
    <div className={`flex flex-col h-full bg-gray-50 border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleCollapse}
            className="sidebar-toggle"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          {!isCollapsed && (
            <button
              onClick={onCreateNewSession}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-white bg-[var(--primary-color)] rounded-lg hover:bg-[var(--primary-hover)] transition duration-200"
            >
              <span>새 대화</span>
              <PlusIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto">
          <div className="px-3">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">대화 기록</h3>
            <div className="mt-2 space-y-1">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`flex items-center px-3 py-2 text-sm rounded-lg cursor-pointer transition duration-200 ${
                    session.id === activeId
                      ? 'bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {editingSessionId === session.id ? (
                    <div className="flex-1 min-w-0 flex items-center">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            onSaveSessionTitle(session.id);
                          } else if (e.key === 'Escape') {
                            onCancelEdit();
                          }
                        }}
                        onBlur={() => onSaveSessionTitle(session.id)}
                        className="flex-1 input-field text-sm py-1 px-2 mr-2"
                        autoFocus
                      />
                      <button
                        onClick={() => onSaveSessionTitle(session.id)}
                        className="p-1 text-gray-400 hover:text-green-500 rounded-full hover:bg-green-50 transition duration-200"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={onCancelEdit}
                        className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition duration-200"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div 
                        className="flex-1 min-w-0"
                        onClick={() => setActiveId(session.id)}
                        onDoubleClick={() => onEditSessionTitle(session.id, session.title)}
                      >
                        <p className="font-medium text-gray-900 truncate dark:text-gray-100">{session.title}</p>
                        <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                          {new Date(session.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                  e.stopPropagation();
                  onEditSessionTitle(session.id, session.title);
                }}
                className="p-1 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50 transition duration-200 mr-1"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession(session.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition duration-200"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}