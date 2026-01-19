export function TradingHours() {
  const tradingHours = [
    { day: '星期一', time: '00:00 -- 22:00；22:05 -- 00:00' },
    { day: '星期二', time: '00:00 -- 22:00；22:05 -- 00:00' },
    { day: '星期三', time: '00:00 -- 22:00；22:05 -- 00:00' },
    { day: '星期四', time: '00:00 -- 22:00；22:05 -- 00:00' },
    { day: '星期五', time: '00:00 -- 22:00；22:05 -- 00:00' },
    { day: '星期六', time: '00:00 -- 22:00；22:05 -- 00:00' },
    { day: '星期日', time: '00:00 -- 22:00；22:05 -- 00:00' },
  ];

  return (
    <div className="bg-[#1f2633] px-4 py-4 mt-2 mb-2 border border-gray-700/30 rounded-lg mx-4">
      <h2 className="text-white mb-3">交易时间</h2>
      <div className="space-y-0 text-sm">
        {tradingHours.map((item, i) => (
          <div 
            key={i} 
            className={`flex items-start justify-between py-3 ${
              i < tradingHours.length - 1 ? 'border-b border-gray-700/30' : ''
            }`}
          >
            <span className="text-white w-20">{item.day}</span>
            <span className="text-gray-400 flex-1 text-right">{item.time}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-4 leading-relaxed">
        业主交易时间根据平台实际情况酌情调整。
      </p>
    </div>
  );
}
