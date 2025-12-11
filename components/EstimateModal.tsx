import React, { useState } from 'react';
import { Order } from '../types';
import { generateConsultationSummary } from '../services/geminiService';

interface EstimateModalProps {
  order: Order;
  onClose: () => void;
}

const EstimateModal: React.FC<EstimateModalProps> = ({ order, onClose }) => {
  const [aiMessage, setAiMessage] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  const totalAmount = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  const handleGenerateMessage = async (tone: 'formal' | 'gentle') => {
    setLoadingAi(true);
    const msg = await generateConsultationSummary(order, tone);
    setAiMessage(msg);
    setLoadingAi(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '장례 예상 견적서',
          text: aiMessage || `[장오더] ${order.deceasedName} 님의 장례 예상 견적입니다. 총액: ${totalAmount.toLocaleString()}원`,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      alert("이 브라우저에서는 공유 기능을 지원하지 않습니다. 내용을 복사해서 사용해주세요.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-end sm:justify-center bg-black/60 backdrop-blur-sm print:bg-white print:p-0">
      {/* Modal Content - Full height on mobile, Card on desktop */}
      <div className="flex h-[90vh] w-full max-w-3xl flex-col rounded-t-2xl bg-white shadow-2xl sm:h-auto sm:max-h-[90vh] sm:rounded-xl print:max-w-none print:shadow-none print:h-auto print:rounded-none">
        
        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 print:p-0 print:overflow-visible">
          {/* Printable Header */}
          <div className="mb-8 border-b border-stone-200 pb-6 text-center print:border-black">
            <h2 className="text-3xl font-serif font-bold text-stone-900">장례 예상 견적서</h2>
            <p className="mt-2 text-stone-500 print:text-black">{today}</p>
          </div>

          {/* Client Info */}
          <div className="mb-8 grid grid-cols-2 gap-4 rounded-lg bg-stone-50 p-4 print:bg-transparent print:border print:border-black">
            <div>
              <span className="block text-sm text-stone-500">고인(故)</span>
              <span className="text-lg font-bold">{order.deceasedName || '(미입력)'}</span>
            </div>
            <div>
              <span className="block text-sm text-stone-500">상주</span>
              <span className="text-lg font-bold">{order.clientName || '(미입력)'}</span>
            </div>
          </div>

          {/* Item List */}
          <div className="mb-8">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-200 text-sm text-stone-500 print:border-black">
                  <th className="pb-2 pl-2">품목명</th>
                  <th className="pb-2 text-center">수량</th>
                  <th className="pb-2 text-right pr-2">금액</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 print:divide-stone-300">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 pl-2">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-stone-400 print:text-stone-600 flex gap-2">
                        <span>{item.categoryId}</span>
                        {item.options?.duration && (
                          <span className="text-stone-500 font-medium">| {item.options.duration}시간</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      {item.quantity} {item.unit || '개'}
                    </td>
                    <td className="py-3 text-right pr-2 font-medium">
                      {(item.price * item.quantity).toLocaleString()}원
                    </td>
                  </tr>
                ))}
                {order.items.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-stone-400">선택된 품목이 없습니다.</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-stone-800 print:border-black">
                  <td colSpan={2} className="pt-4 text-lg font-bold">총 합계</td>
                  <td className="pt-4 text-right text-xl font-bold text-stone-900 print:text-black">
                    {totalAmount.toLocaleString()}원
                  </td>
                </tr>
              </tfoot>
            </table>
            <p className="mt-4 text-xs text-stone-400 print:text-black">
              * 본 견적서는 예상 견적이며, 실제 상황에 따라 변동될 수 있습니다.<br/>
              * 부가세 포함 금액입니다.
            </p>
          </div>

          {/* AI Assistant Section (No Print) */}
          <div className="mb-8 rounded-xl border border-stone-200 bg-stone-50 p-4 no-print">
            <div className="flex items-center justify-between mb-3">
               <h3 className="font-bold text-stone-700 flex items-center gap-2">
                 ✨ AI 메시지 도우미
               </h3>
               <div className="flex gap-2">
                  <button 
                    onClick={() => handleGenerateMessage('gentle')}
                    disabled={loadingAi}
                    className="rounded-lg bg-stone-200 px-3 py-1 text-xs font-semibold text-stone-700 hover:bg-stone-300 disabled:opacity-50"
                  >
                    부드럽게
                  </button>
                  <button 
                    onClick={() => handleGenerateMessage('formal')}
                    disabled={loadingAi}
                    className="rounded-lg bg-stone-800 px-3 py-1 text-xs font-semibold text-white hover:bg-stone-700 disabled:opacity-50"
                  >
                    격식있게
                  </button>
               </div>
            </div>
            
            {loadingAi ? (
               <div className="py-8 text-center text-sm text-stone-500 animate-pulse">AI가 견적 내용을 요약하고 있습니다...</div>
            ) : (
              <textarea 
                className="w-full rounded-md border border-stone-300 p-3 text-sm focus:border-stone-500 focus:outline-none"
                rows={5}
                placeholder="상단의 버튼을 눌러 견적 요약 문자 메시지를 생성해보세요."
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
              />
            )}
          </div>
        </div>

        {/* Fixed Footer Actions (No Print) */}
        <div className="border-t border-stone-200 p-4 flex gap-3 no-print bg-white rounded-b-xl print:hidden">
          <button 
            onClick={onClose}
            className="flex-1 rounded-xl border border-stone-300 px-4 py-3 font-bold text-stone-600 transition hover:bg-stone-50"
          >
            닫기
          </button>
          <button 
            onClick={handleShare}
            className="flex-1 rounded-xl bg-stone-600 px-4 py-3 font-bold text-white transition hover:bg-stone-500"
          >
            공유
          </button>
          <button 
            onClick={handlePrint}
            className="flex-1 rounded-xl bg-stone-900 px-4 py-3 font-bold text-white transition hover:bg-stone-800"
          >
            인쇄
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstimateModal;