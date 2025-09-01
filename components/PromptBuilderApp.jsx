import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ChatContainer from './ChatContainer';
import InputArea from './InputArea';
import { ManualCopyModal, HistoryModal, SettingsModal } from './Modals';
import { FLAG_LIST, DEFAULT_GEMINI, DEFAULT_VIBE, PRESET_PERSONAS } from '../constants';
import { saveLS, loadLS, hasLocalStorage, memStore } from '../utils/storage';
import { buildLocalFinalPrompt, generateWithGemini } from '../services/promptService';

const newSession = () => ({
  id: String(Date.now()),
  title: '새 대화',
  createdAt: Date.now(),
  messages: [
    {
      role: 'assistant',
      content: '안녕하세요! 무엇을 도와드릴까요?',
    },
  ],
});

export default function PromptBuilderApp() {
  const [sessions, setSessions] = useState(() =>
    loadLS('pg.sessions', [newSession()])
  );
  const [activeId, setActiveId] = useState(() =>
    loadLS('pg.active', loadLS('pg.sessions', [newSession()])[0].id)
  );
  const active = useMemo(
    () => sessions.find((s) => s.id === activeId) || sessions[0],
    [sessions, activeId]
  );

  const [input, setInput] = useState('');
  const [selectedFlags, setSelectedFlags] = useState([]);
  const [toast, setToast] = useState(null);
  const [manualOpen, setManualOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [gemini, setGemini] = useState(() =>
    loadLS('pg.gemini', DEFAULT_GEMINI)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAiResponseEnabled, setIsAiResponseEnabled] = useState(() => loadLS('pg.isAiResponseEnabled', false));
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [vibe, setVibe] = useState(() => loadLS('pg.vibe', DEFAULT_VIBE));

  // persist
  useEffect(() => {
    saveLS('pg.sessions', sessions);
  }, [sessions]);
  useEffect(() => {
    saveLS('pg.active', activeId);
  }, [activeId]);
  useEffect(() => {
    saveLS('pg.gemini', gemini);
  }, [gemini]);
  useEffect(() => {
    saveLS('pg.vibe', vibe);
  }, [vibe]);

  useEffect(() => {
    saveLS('pg.isAiResponseEnabled', isAiResponseEnabled);
  }, [isAiResponseEnabled]);

  // 초기화
  const resetApp = () => {
    if (
      typeof window !== 'undefined' &&
      !window.confirm('모든 설정과 대화를 초기화할까요?')
    )
      return;
    try {
      memStore.clear();
      if (hasLocalStorage()) localStorage.clear();
    } catch {}
    const s = newSession();
    setSessions([s]);
    setActiveId(s.id);
    setSelectedFlags([]);
    setInput('');
    setGemini({ ...DEFAULT_GEMINI });
    setToast('초기화 완료');
    setTimeout(() => setToast(null), 1600);
  };

  const copyText = async (t) => {
    try {
      await navigator.clipboard.writeText(t);
      setToast('복사되었습니다!');
    } catch (err) {
      setManualOpen(true);
    }
    setTimeout(() => setToast(null), 1200);
  };

  const assistantHistory = useMemo(
    () =>
      (active?.messages || [])
        .filter((m) => m.role === 'assistant' && m.content !== '안녕하세요! 무엇을 도와드릴까요?')
        .map((m) => ({ ...m, ts: m.ts || Date.now() }))
        .reverse(),
    [active]
  );

  // 프롬프트 생성 핸들러
  const handleGenerate = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    
    setIsLoading(true);
    
    const userMsg = { role: 'user', content: text, ts: Date.now() };
    const placeholder = { role: 'assistant', content: '생성 중...', ts: Date.now() };
    
    setSessions((prev) =>
      prev.map((s) =>
        s.id === active.id
          ? { ...s, messages: [...s.messages, userMsg, placeholder] }
          : s
      )
    );

    const merged = text + (selectedFlags.length ? `\nFLAGS: ${selectedFlags.join(' ')}` : '');

    try {
      const content = isAiResponseEnabled && gemini.apiKey
        ? await generateWithGemini(merged, gemini)
        : buildLocalFinalPrompt(merged, vibe);
      
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id !== active.id) return s;
          const msgs = [...s.messages];
          const idx = msgs.findIndex(
            (m) => m.role === 'assistant' && m.content === '생성 중...'
          );
          if (idx !== -1) {
            msgs[idx] = { role: 'assistant', content, ts: Date.now() };
          } else {
            msgs.push({ role: 'assistant', content, ts: Date.now() });
          }
          return { ...s, messages: msgs };
        })
      );
    } catch (error) {
      const fallback = buildLocalFinalPrompt(merged, vibe);
      const errMsg = `⚠ 엔진 오류로 로컬 생성으로 폴백했습니다.\n\n${fallback}`;
      
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id !== active.id) return s;
          const msgs = [...s.messages];
          const idx = msgs.findIndex(
            (m) => m.role === 'assistant' && m.content === '생성 중...'
          );
          if (idx !== -1) {
            msgs[idx] = { role: 'assistant', content: errMsg, ts: Date.now() };
          } else {
            msgs.push({ role: 'assistant', content: errMsg, ts: Date.now() });
          }
          return { ...s, messages: msgs };
        })
      );
      
      setSettingsOpen(!gemini.apiKey);
    } finally {
      setTimeout(() => setInput(''), 10);
      setIsLoading(false);
    }
  };

  const handleCreateNewSession = () => {
    const s = newSession();
    setSessions([s, ...sessions]);
    setActiveId(s.id);
  };

  const handleDeleteSession = (id) => {
    // Prevent deleting the last session
    if (sessions.length <= 1) {
      setToast('최소한 하나의 대화는 유지해야 합니다.');
      setTimeout(() => setToast(null), 1200);
      return;
    }
    
    const newSessions = sessions.filter(session => session.id !== id);
    setSessions(newSessions);
    
    // If we're deleting the active session, switch to the first session
    if (id === activeId) {
      setActiveId(newSessions[0].id);
    }
  };

  const handleToggleFlag = (flag) => {
    setSelectedFlags((prev) =>
      prev.includes(flag)
        ? prev.filter((f) => f !== flag)
        : [...prev, flag]
    );
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleToggleAiResponse = () => {
    setIsAiResponseEnabled((prev) => !prev);
  };

  const handlePersonaChange = (persona) => {
    setVibe(prevVibe => ({ ...prevVibe, persona }));
  };

  const handleEditSessionTitle = (id, currentTitle) => {
    setEditingSessionId(id);
    setEditingTitle(currentTitle);
  };

  const handleSaveSessionTitle = (id) => {
    if (editingTitle.trim()) {
      setSessions(prevSessions => 
        prevSessions.map(session => 
          session.id === id ? { ...session, title: editingTitle.trim() } : session
        )
      );
    }
    setEditingSessionId(null);
    setEditingTitle('');
  };

  const handleCancelEdit = () => {
    setEditingSessionId(null);
    setEditingTitle('');
  };

  // 모달 외부 클릭 시 닫기
  const closeModal = (setter) => {
    return (e) => {
      if (e.target === e.currentTarget) {
        setter(false);
      }
    };
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* 사이드바 */}
      <Sidebar
        sessions={sessions}
        activeId={activeId}
        setActiveId={setActiveId}
        onCreateNewSession={handleCreateNewSession}
        onDeleteSession={handleDeleteSession}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        editingSessionId={editingSessionId}
        editingTitle={editingTitle}
        onEditSessionTitle={handleEditSessionTitle}
        onSaveSessionTitle={handleSaveSessionTitle}
        onCancelEdit={handleCancelEdit}
        setEditingTitle={setEditingTitle}
      />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col">
        <Header
          selectedFlags={selectedFlags}
          onToggleFlag={handleToggleFlag}
          onOpenSettings={() => setSettingsOpen(true)}
          onResetApp={resetApp}
          onOpenHistory={() => setHistoryOpen(true)}
          onToggleSidebar={handleToggleSidebar}
          isAiResponseEnabled={isAiResponseEnabled}
          onToggleAiResponse={handleToggleAiResponse}
          vibe={vibe}
          onPersonaChange={handlePersonaChange}
          presetPersonas={PRESET_PERSONAS}
        />
        <ChatContainer messages={active.messages} active={active} onCopy={copyText} />
        <InputArea
          input={input}
          setInput={setInput}
          onGenerate={handleGenerate}
          disabled={isLoading}
        />
      </div>

      {/* 모달들 */}
      {manualOpen && (
        <div 
          className="modal-overlay"
          onClick={closeModal(setManualOpen)}
        >
          <ManualCopyModal
            open={manualOpen}
            text={active.messages.find((m) => m.role === 'assistant')?.content || ''}
            onClose={() => setManualOpen(false)}
          />
        </div>
      )}
      
      {historyOpen && (
        <div 
          className="modal-overlay"
          onClick={closeModal(setHistoryOpen)}
        >
          <HistoryModal
            open={historyOpen}
            onClose={() => setHistoryOpen(false)}
            history={assistantHistory}
            onCopy={copyText}
          />
        </div>
      )}
      
      {settingsOpen && (
        <div 
          className="modal-overlay"
          onClick={closeModal(setSettingsOpen)}
        >
          <SettingsModal
            open={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            gemini={gemini}
            setGemini={setGemini}
          />
        </div>
      )}

      {/* 토스트 */}
      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

      {/* 로딩 오버레이 */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-4 flex items-center space-x-3 dark:bg-gray-800">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--primary-color)]"></div>
            <span>생성 중...</span>
          </div>
        </div>
      )}
    </div>
  );
}
