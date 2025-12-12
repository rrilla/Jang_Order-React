import React from 'react';
import { Order } from '../types';

interface EstimateModalProps {
  order: Order;
  onClose: () => void;
  onQuantityChange: (productId: string, quantity: number) => void;
}

const EstimateModal: React.FC<EstimateModalProps> = ({ order, onClose, onQuantityChange }) => {
  const totalAmount = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '장례 예상 견적서',
          text: `[장오더] ${order.deceasedName} 님의 장례 예상 견적입니다. 총액: ${totalAmount.toLocaleString()}원`,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      alert("이 브라우저에서는 공유 기능을 지원하지 않습니다. 내용을 복사해서 사용해주세요.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-end sm:justify-center bg-black/60 backdrop-blur-sm print:static print:bg-white print:block">
      {/* Print Specific Style to override all visibility issues */}
      <style>
        {`
          @media print {
            body > * { display: none !important; }
            body > .print-visible-wrapper { display: block !important; position: absolute; top: 0; left: 0; width: 100%; height: auto; }
            .no-print { display: none !important; }
          }
        `}
      </style>
      
      {/* Modal Content - Wrapped with class for print visibility targeting */}
      <div className="print-visible-wrapper w-full max-w-3xl sm:max-w-3xl mx-auto">
        <div className="flex h-[90vh] w-full flex-col rounded-t-2xl bg-white shadow-2xl sm:h-auto sm:max-h-[90vh] sm:rounded-xl print:h-auto print:max-h-none print:w-full print:max-w-full print:rounded-none print:shadow-none print:bg-transparent print:block">
          
          {/* Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 print:p-0 print:overflow-visible print:block">
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
                        {/* Screen View: Editable Controls */}
                        <div className="flex items-center justify-center gap-1 print:hidden">
                          <button 
                            onClick={() => onQuantityChange(item.id, Math.max(0, item.quantity - (item.step || 1)))}
                            className="flex h-6 w-6 items-center justify-center rounded-md bg-stone-100 text-stone-600 transition hover:bg-stone-200"
                          >
                            -
                          </button>
                          <input 
                              type="number" 
                              className="w-10 text-center text-sm font-semibold text-stone-900 focus:outline-none"
                              value={item.quantity}
                              onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value) || 0)}
                          />
                          <button 
                            onClick={() => onQuantityChange(item.id, item.quantity + (item.step || 1))}
                            className="flex h-6 w-6 items-center justify-center rounded-md bg-stone-800 text-white transition hover:bg-stone-700"
                          >
                            +
                          </button>
                        </div>
                        <div className="print:hidden text-[10px] text-stone-400 mt-0.5">{item.unit || '개'}</div>

                        {/* Print View: Static Text */}
                        <span className="hidden print:inline">
                          {item.quantity} {item.unit || '개'}
                        </span>
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
    </div>
  );
};

export default EstimateModal;