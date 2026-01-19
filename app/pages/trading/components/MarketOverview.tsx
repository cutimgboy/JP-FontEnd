export function MarketOverview() {
  const marketData = [
    { label: '币种排名', value: 'NO.1' },
    { label: '市值', value: '2.09兆' },
    { label: '完全摊薄市值', value: '2.2兆' },
    { label: '流通数量', value: '1,907.9万 BTC' },
    { label: '最大供应量', value: '2,100.0万 BTC' },
    { label: '总量', value: '1,907.9万 BTC' },
    { label: '发行日期', value: '2009-11-01' },
    { label: '历史最高价', value: '107836.00' },
    { label: '历史最低价', value: '0.04864654' },
  ];

  return (
    <div className="bg-[#1f2633] px-4 py-4 mt-2 border border-gray-700/30 rounded-lg mx-4">
      <h2 className="text-white mb-3">币种概况</h2>
      <div className="space-y-0 text-sm">
        {marketData.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between py-3 ${
              index < marketData.length - 1 ? 'border-b border-gray-700/30' : ''
            }`}
          >
            <span className="text-gray-400">{item.label}</span>
            <span className="text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
