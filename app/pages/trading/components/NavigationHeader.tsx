import { ArrowLeft, ChevronRight } from 'lucide-react';

interface NavigationHeaderProps {
  onBack: () => void;
}

export function NavigationHeader({ onBack }: NavigationHeaderProps) {
  const tradingPairs = [
    { code: 'BTC', name: '比特币', active: false },
    { code: 'ETH', name: '以太坊', active: false },
    { code: 'XAU', name: '黄金', active: true },
    { code: 'EUR', name: '欧元', active: false },
    { code: 'JPY', name: '日元', active: false },
  ];

  return (
    <div className="bg-[#141820] px-4 py-4 border-b border-gray-700/50">
      <div className="flex items-center gap-3">
        <button 
          onClick={onBack} 
          className="w-9 h-9 flex items-center justify-center bg-gray-700/50 hover:bg-gray-700 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-300" />
        </button>
        
        {/* Logo Tags - Enhanced Style */}
        <div className="flex-1 flex items-center gap-2.5 overflow-x-auto scrollbar-hide">
          {tradingPairs.map((item, i) => (
            <button 
              key={i} 
              className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-all ${
                item.active 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' 
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="font-medium">{item.code}</div>
              <div className={`text-[10px] mt-0.5 ${item.active ? 'text-blue-100' : 'text-gray-500'}`}>
                {item.name}
              </div>
            </button>
          ))}
        </div>
        
        <button className="w-9 h-9 flex items-center justify-center bg-gray-700/50 hover:bg-gray-700 rounded-full transition-colors">
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </button>
      </div>
    </div>
  );
}
