'use client';
import { useState } from 'react';
import { BookOpen, School, Lightbulb } from 'lucide-react';

const RobotLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-24 h-24">
    <path d="M40 80 L160 80 L100 60 Z" fill="#1a365d"/>
    <rect x="85" y="80" width="30" height="10" fill="#1a365d"/>
    <circle cx="100" cy="90" r="3" fill="#1a365d"/>
    <circle cx="100" cy="120" r="40" fill="white" stroke="#1a365d" strokeWidth="4"/>
    <circle cx="80" cy="110" r="12" fill="#0bc5ea"/>
    <circle cx="120" cy="110" r="12" fill="#0bc5ea"/>
    <path d="M60 110 Q50 110 50 120" stroke="#1a365d" strokeWidth="4" fill="none"/>
    <path d="M140 110 Q150 110 150 120" stroke="#1a365d" strokeWidth="4" fill="none"/>
    <rect x="85" y="130" width="30" height="4" fill="#1a365d" rx="2"/>
    <path d="M70 160 L130 160 L140 200 L60 200 Z" fill="#1a365d"/>
    <rect x="90" y="150" width="20" height="30" fill="#1a365d"/>
  </svg>
);

const WaveBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-50">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" className="w-full h-full">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor: '#f687b3', stopOpacity: 0.3}} />
          <stop offset="50%" style={{stopColor: '#63b3ed', stopOpacity: 0.3}} />
          <stop offset="100%" style={{stopColor: '#b794f4', stopOpacity: 0.3}} />
        </linearGradient>
      </defs>
      <g opacity="0.6">
        <path d="M0 300 Q250 200 500 300 T1000 300" fill="rgba(236,72,153,0.1)"/>
        <path d="M0 400 Q250 300 500 400 T1000 400" fill="rgba(96,165,250,0.1)"/>
        <path d="M0 500 Q250 400 500 500 T1000 500" fill="rgba(167,139,250,0.1)"/>
      </g>
      <circle cx="200" cy="200" r="100" fill="rgba(236,72,153,0.1)"/>
      <circle cx="600" cy="400" r="150" fill="rgba(96,165,250,0.1)"/>
      <circle cx="800" cy="200" r="80" fill="rgba(167,139,250,0.1)"/>
    </svg>
  </div>
);

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('Mathématiques');
  const [level, setLevel] = useState('Collège');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/generate-preamble', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, level, prompt }),
      });
      const data = await response.json();
      setResult(data.text);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-white overflow-hidden">
      <WaveBackground />
      
      <div className="max-w-4xl mx-auto pt-8 px-4 relative z-10">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <RobotLogo />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Assistant de Cours</h1>
          <p className="text-gray-600">Créez des contenus pédagogiques personnalisés en quelques clics</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Subject Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 transition-all hover:shadow-xl border border-pink-100">
            <div className="text-center mb-4">
              <School className="mx-auto text-pink-500 mb-2" size={24} />
              <h3 className="font-semibold text-gray-800">Matière</h3>
            </div>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ex: Mathématiques"
              className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Level Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 transition-all hover:shadow-xl border border-blue-100">
            <div className="text-center mb-4">
              <BookOpen className="mx-auto text-blue-500 mb-2" size={24} />
              <h3 className="font-semibold text-gray-800">Niveau</h3>
            </div>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            >
              <option value="Collège">Collège</option>
              <option value="Lycée">Lycée</option>
              <option value="Université (Licence)">Université (Licence)</option>
              <option value="Université (Master)">Université (Master)</option>
            </select>
          </div>

          {/* Description Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 transition-all hover:shadow-xl border border-purple-100">
            <div className="text-center mb-4">
              <Lightbulb className="mx-auto text-purple-500 mb-2" size={24} />
              <h3 className="font-semibold text-gray-800">Description</h3>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Décrivez le cours que vous souhaitez générer..."
              className="w-full h-32 p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 font-semibold"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Génération en cours...
              </span>
            ) : (
              'Générer le cours'
            )}
          </button>
        </div>

        {/* Result Section */}
        {result && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <BookOpen className="mr-2 text-blue-500" size={24} />
              Préambule généré
            </h2>
            <div className="p-6 bg-gradient-to-r from-pink-50 via-blue-50 to-purple-50 rounded-lg whitespace-pre-wrap text-gray-700 leading-relaxed font-serif border-l-4 border-blue-500">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;