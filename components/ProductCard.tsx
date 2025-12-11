import React from 'react';
import { Product, CategoryId } from '../types';

interface ProductCardProps {
  product: Product;
  quantity: number;
  options?: { duration?: number };
  onAdd: () => void;
  onRemove: () => void;
  onOptionChange: (key: string, value: any) => void;
  onQuantityChange: (value: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  quantity, 
  options, 
  onAdd, 
  onRemove,
  onOptionChange,
  onQuantityChange
}) => {
  const isSelected = quantity > 0;
  const isHelper = product.categoryId === CategoryId.HELPER && product.id.startsWith('h1'); // Assuming 'h1' is the flexible time helper
  const step = product.step || 1;

  // Calculate display price based on options
  const getDisplayPrice = () => {
    if (isHelper && options?.duration) {
      // Assuming base price is for 8 hours
      const baseHours = 8;
      const price = Math.round((product.price / baseHours) * options.duration);
      return `${price.toLocaleString()}원`;
    }
    return product.price === 0 ? '별도 문의' : `${product.price.toLocaleString()}원`;
  };

  return (
    <div className={`relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300 ${isSelected ? 'border-stone-800 bg-stone-50 shadow-md ring-1 ring-stone-800' : 'border-stone-200 bg-white hover:border-stone-400'}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {product.isPopular && (
          <span className="absolute left-2 top-2 rounded-full bg-stone-800 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
            Best
          </span>
        )}
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1">
           <h3 className="text-lg font-serif font-bold text-stone-900">{product.name}</h3>
           {product.unit && <span className="text-xs text-stone-500">단위: {product.unit}</span>}
        </div>
        <p className="mb-4 flex-1 text-sm text-stone-500 line-clamp-2">{product.description}</p>
        
        {isSelected && isHelper && (
          <div className="mb-4 rounded-lg bg-stone-100 p-2">
            <label className="mb-1 block text-xs font-semibold text-stone-600">근무 시간 선택</label>
            <select
              value={options?.duration || 8}
              onChange={(e) => onOptionChange('duration', parseInt(e.target.value))}
              className="w-full rounded border border-stone-300 bg-white px-2 py-1 text-sm focus:border-stone-800 focus:outline-none"
            >
              <option value={8}>8시간 (기본)</option>
              <option value={10}>10시간 (+25%)</option>
              <option value={12}>12시간 (+50%)</option>
            </select>
            <p className="mt-1 text-xs text-stone-400">
              * 기본 8시간 기준이며 초과 시 비용이 조정됩니다.
            </p>
          </div>
        )}

        <div className="mt-auto flex items-end justify-between">
          <span className="text-base font-semibold text-stone-900">
            {getDisplayPrice()}
          </span>
          
          <div className="flex items-center gap-3">
            {isSelected ? (
              <div className="flex items-center rounded-lg bg-stone-100 p-1">
                <button 
                  onClick={onRemove}
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-stone-600 shadow-sm transition hover:bg-stone-200"
                >
                  -
                </button>
                {step > 1 ? (
                   <input
                     type="number"
                     value={quantity}
                     onChange={(e) => onQuantityChange(parseInt(e.target.value) || 0)}
                     className="w-12 bg-transparent text-center font-semibold text-stone-900 focus:outline-none"
                   />
                ) : (
                   <span className="w-8 text-center font-semibold text-stone-900">{quantity}</span>
                )}
                
                <button 
                  onClick={onAdd}
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-stone-800 text-white shadow-sm transition hover:bg-stone-700"
                >
                  +
                </button>
              </div>
            ) : (
              <button 
                onClick={onAdd}
                className="rounded-lg bg-stone-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-700 active:scale-95"
              >
                선택하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;