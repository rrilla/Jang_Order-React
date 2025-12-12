import { useState, useMemo } from 'react';
import { CATEGORIES, MOCK_PRODUCTS } from './constants';
import { CartItem, CategoryId } from './types';
import ProductCard from './components/ProductCard';
import EstimateModal from './components/EstimateModal';

function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>(CategoryId.METHOD);
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [cartOptions, setCartOptions] = useState<Record<string, any>>({});
  const [clientName, setClientName] = useState('');
  const [deceasedName, setDeceasedName] = useState('');
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);

  // Filter products by active category
  const activeProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => p.categoryId === activeCategory);
  }, [activeCategory]);

  // Calculate cart summary
  const cartSummary = useMemo(() => {
    const items: CartItem[] = [];
    let total = 0;
    let count = 0;

    (Object.entries(cartItems) as [string, number][]).forEach(([productId, quantity]) => {
      if (quantity > 0) {
        const product = MOCK_PRODUCTS.find(p => p.id === productId);
        if (product) {
          const options = cartOptions[productId] || {};
          
          // Calculate adjusted price based on options (e.g., duration)
          let adjustedPrice = product.price;
          if (product.categoryId === CategoryId.HELPER && options.duration) {
             const baseHours = 8;
             adjustedPrice = Math.round((product.price / baseHours) * options.duration);
          }

          items.push({ 
            ...product, 
            price: adjustedPrice, // Override price for the cart item
            quantity,
            options 
          });
          
          total += adjustedPrice * quantity;
          count += quantity;
        }
      }
    });

    return { items, total, count };
  }, [cartItems, cartOptions]);

  const handleQuantityChange = (productId: string, delta: number) => {
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    const step = product?.step || 1;
    
    setCartItems(prev => {
      const current = prev[productId] || 0;
      // If delta is larger than 1 (manual input usually), we might handle it differently, 
      // but here delta is usually +/- 1 or step.
      // However, for manual input we need a separate handler, so this is for +/- buttons.
      const realDelta = delta * step;
      const next = Math.max(0, current + realDelta);
      
      // Initialize default options if adding for the first time
      if (current === 0 && next > 0 && product?.categoryId === CategoryId.HELPER) {
        setCartOptions(opts => ({ ...opts, [productId]: { duration: 8 } }));
      }
      
      return { ...prev, [productId]: next };
    });
  };

  const handleDirectQuantityChange = (productId: string, value: number) => {
    setCartItems(prev => ({ ...prev, [productId]: Math.max(0, value) }));
  };

  const handleOptionChange = (productId: string, key: string, value: any) => {
    setCartOptions(prev => ({
      ...prev,
      [productId]: { ...prev[productId], [key]: value }
    }));
  };

  const handleReset = () => {
    // window.confirm removed for better tablet compatibility and immediate action
    setCartItems({});
    setCartOptions({});
    setClientName('');
    setDeceasedName('');
  };

  return (
    <div className="min-h-screen bg-stone-100 pb-32 font-sans text-stone-900 print:bg-white print:pb-0">
      
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/80 backdrop-blur-md print:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-stone-900 text-white font-serif font-bold">J</div>
            <h1 className="text-xl font-serif font-bold tracking-tight text-stone-900">장오더 <span className="text-sm font-sans font-normal text-stone-500">| 장례지도사 전용</span></h1>
          </div>
          <div className="text-right text-sm hidden sm:block">
             {/* Desktop inputs */}
            <input 
              type="text" 
              placeholder="상주 성함" 
              className="mr-2 w-24 rounded border border-stone-300 px-2 py-1 focus:border-stone-800 focus:outline-none"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="고인 성함" 
              className="w-24 rounded border border-stone-300 px-2 py-1 focus:border-stone-800 focus:outline-none"
              value={deceasedName}
              onChange={(e) => setDeceasedName(e.target.value)}
            />
          </div>
        </div>
        
        {/* Mobile inputs (visible only on small screens) */}
        <div className="sm:hidden px-4 pb-3 flex gap-2">
            <input 
              type="text" 
              placeholder="상주 성함" 
              className="flex-1 rounded border border-stone-300 px-2 py-1 text-sm focus:border-stone-800 focus:outline-none"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="고인 성함" 
              className="flex-1 rounded border border-stone-300 px-2 py-1 text-sm focus:border-stone-800 focus:outline-none"
              value={deceasedName}
              onChange={(e) => setDeceasedName(e.target.value)}
            />
        </div>

        {/* Category Tabs */}
        <div className="no-scrollbar overflow-x-auto border-t border-stone-100">
          <div className="mx-auto flex max-w-5xl min-w-max px-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col items-center border-b-2 px-6 py-3 text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'border-stone-800 text-stone-900'
                    : 'border-transparent text-stone-400 hover:text-stone-600'
                }`}
              >
                <span className="mb-1 text-xl">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-6 print:hidden">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-700">
            {CATEGORIES.find(c => c.id === activeCategory)?.label} 선택
          </h2>
          <span className="text-sm text-stone-400">
            총 {activeProducts.length}개의 상품
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cartItems[product.id] || 0}
              options={cartOptions[product.id]}
              onAdd={() => handleQuantityChange(product.id, 1)}
              onRemove={() => handleQuantityChange(product.id, -1)}
              onQuantityChange={(val) => handleDirectQuantityChange(product.id, val)}
              onOptionChange={(key, val) => handleOptionChange(product.id, key, val)}
            />
          ))}
        </div>
      </main>

      {/* Sticky Bottom Summary */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-stone-200 bg-white px-4 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] print:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-stone-500">현재 선택 합계 ({cartSummary.count})</span>
            <span className="text-2xl font-bold text-stone-900">{cartSummary.total.toLocaleString()}원</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleReset}
              className="rounded-xl border border-stone-300 px-4 py-3 font-semibold text-stone-500 hover:bg-stone-50 text-sm sm:text-base whitespace-nowrap"
            >
              초기화
            </button>
            <button 
              onClick={() => setIsEstimateOpen(true)}
              disabled={cartSummary.count === 0}
              className="rounded-xl bg-stone-900 px-8 py-3 font-bold text-white shadow-lg transition hover:bg-stone-800 hover:shadow-xl disabled:bg-stone-300 disabled:shadow-none whitespace-nowrap"
            >
              견적서 확인
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isEstimateOpen && (
        <EstimateModal 
          order={{
            items: cartSummary.items,
            clientName,
            deceasedName,
            date: new Date().toISOString()
          }}
          onClose={() => setIsEstimateOpen(false)}
          onQuantityChange={handleDirectQuantityChange}
        />
      )}
    </div>
  );
}

export default App;