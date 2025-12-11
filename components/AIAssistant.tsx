import React, { useState } from 'react';
import { explainTerm } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    const result = await explainTerm(query);
    setResponse(result);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-stone-800 text-2xl shadow-lg transition hover:scale-110 hover:bg-stone-700 print:hidden"
        title="AI 용어 사전"
      >
        🤖
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 z-40 w-80 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-stone-200 print:hidden">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-bold text-stone-800">장례 용어 AI 사전</h3>
        <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-stone-600">✕</button>
      </div>
      <p className="mb-4 text-xs text-stone-500">궁금한 용어나 절차를 입력하시면 AI가 쉽게 설명해드립니다.</p>
      
      <form onSubmit={handleAsk} className="mb-4 flex gap-2">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="예: 염습이 무엇인가요?"
          className="flex-1 rounded-lg border border-stone-200 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
        />
        <button 
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-stone-800 px-3 py-2 text-sm font-semibold text-white hover:bg-stone-700 disabled:opacity-50"
        >
          질문
        </button>
      </form>

      {isLoading && (
        <div className="rounded-lg bg-stone-50 p-3 text-center text-sm text-stone-500">
          검색 중입니다...
        </div>
      )}

      {!isLoading && response && (
        <div className="max-h-60 overflow-y-auto rounded-lg bg-stone-50 p-3 text-sm leading-relaxed text-stone-700">
          {response}
        </div>
      )}
      
      <button 
         onClick={() => setIsOpen(false)}
         className="absolute -bottom-16 right-0 flex h-14 w-14 items-center justify-center rounded-full bg-stone-600 text-white shadow-lg transition hover:bg-stone-500"
      >
        ✕
      </button>
    </div>
  );
};

export default AIAssistant;