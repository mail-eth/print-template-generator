'use client';

import { useState } from 'react';

export default function Home() {
  const [sizePreset, setSizePreset] = useState('4x6');
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(15);
  const [count, setCount] = useState(1);
  const [margin, setMargin] = useState(0.5);
  const [showTemplate, setShowTemplate] = useState(false);

  const presets: Record<string, { w: number; h: number }> = {
    '2x3': { w: 5, h: 7.6 },
    '3x4': { w: 7.6, h: 10.2 },
    '4x6': { w: 10, h: 15 },
    '5x7': { w: 12.7, h: 17.8 },
    '8x10': { w: 20, h: 25 },
    'A4': { w: 21, h: 29.7 },
    '3R': { w: 8.9, h: 12.7 },
    '4R': { w: 10.2, h: 15.2 },
    '5R': { w: 12.7, h: 17.8 },
    '8R': { w: 20.3, h: 25.4 }
  };

  const applyPreset = () => {
    if (presets[sizePreset]) {
      setWidth(presets[sizePreset].w);
      setHeight(presets[sizePreset].h);
    }
  };

  const generateTemplate = () => {
    setShowTemplate(true);
  };

  const printNow = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white p-4 md:p-8">
      {/* Main UI - Hidden when printing */}
      <div className="container mx-auto max-w-md no-print">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">🖼️ Print Template Generator</h1>
        <p className="text-center text-gray-300 mb-8">Masukkan ukuran foto, langsung jadi template siap print!</p>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Pilih Ukuran Foto</label>
            <select 
              value={sizePreset} 
              onChange={(e) => setSizePreset(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg"
            >
              <option value="custom">Custom (Manual)</option>
              <option value="2x3">2 x 3 inch (5 x 7.6 cm)</option>
              <option value="3x4">3 x 4 inch (7.6 x 10.2 cm)</option>
              <option value="4x6">4 x 6 inch (10 x 15 cm)</option>
              <option value="5x7">5 x 7 inch (12.7 x 17.8 cm)</option>
              <option value="8x10">8 x 10 inch (20 x 25 cm)</option>
              <option value="A4">A4 (210 x 297 mm)</option>
              <option value="3R">3R (89 x 127 mm)</option>
              <option value="4R">4R (102 x 152 mm)</option>
              <option value="5R">5R (127 x 178 mm)</option>
              <option value="8R">8R (203 x 254 mm)</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Lebar (cm)</label>
              <input 
                type="number" 
                value={width} 
                onChange={(e) => setWidth(parseFloat(e.target.value))}
                step="0.1" 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tinggi (cm)</label>
              <input 
                type="number" 
                value={height} 
                onChange={(e) => setHeight(parseFloat(e.target.value))}
                step="0.1" 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Jumlah Foto per Sheet</label>
            <input 
              type="number" 
              value={count} 
              onChange={(e) => setCount(parseInt(e.target.value))}
              min="1" 
              max="20" 
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Margin (cm)</label>
            <input 
              type="number" 
              value={margin} 
              onChange={(e) => setMargin(parseFloat(e.target.value))}
              step="0.1" 
              min="0" 
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg"
            />
          </div>
          
          <button 
            onClick={generateTemplate}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold hover:opacity-90"
          >
            Generate Template
          </button>
          
          <button 
            onClick={printNow}
            className="w-full mt-3 py-3 bg-green-600 rounded-lg font-bold hover:opacity-90"
          >
            🖨️ Print Sekarang
          </button>
        </div>
        
        {/* Instructions */}
        <div className="max-w-md mx-auto mt-6 text-sm text-gray-400 no-print">
          <h3 className="font-bold text-white mb-2">Cara Pakai:</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Pilih ukuran foto atau masukkan custom</li>
            <li>Tentukan jumlah foto per sheet</li>
            <li>Klik &quot;Generate Template&quot;</li>
            <li>Klik &quot;Print Sekarang&quot; atau tekan Ctrl+P</li>
            <li>Pilih printer dan kertas yang sesuai</li>
          </ol>
        </div>
      </div>
      
      {/* Print Template - Only visible when printing */}
      {showTemplate && (
        <div className="print-area p-8 hidden md:block" style={{ display: showTemplate ? 'flex' : 'none', flexWrap: 'wrap', gap: `${margin}cm`, justifyContent: 'center' }}>
          {Array.from({ length: count }).map((_, i) => (
            <div 
              key={i}
              className="template-box flex items-center justify-center"
              style={{ 
                width: `${width}cm`, 
                height: `${height}cm`,
                border: '2px dashed #666',
                background: 'white'
              }}
            >
              <div className="text-center text-black">
                <div className="text-4xl font-bold mb-2">📷</div>
                <div className="text-lg">{width} x {height} cm</div>
                <div className="text-sm text-gray-500">{i + 1}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .print-area { display: flex !important; }
          body { background: white !important; }
        }
      `}</style>
    </main>
  );
}
