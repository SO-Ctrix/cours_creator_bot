'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const [subject, setSubject] = useState('Mathématiques');
  const [level, setLevel] = useState('Collège');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/generate-preamble', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          level,
          prompt,
        }),
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
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* Contenu principal */}
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <div className="w-full max-w-2xl bg-white bg-opacity-90 rounded-lg shadow-sm p-6 backdrop-blur-md">
          {/* Logo */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Assistant de Cours
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Champ pour la matière */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Matière</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ex: Mathématiques"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Menu déroulant pour le niveau */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Niveau</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Collège">Collège</option>
                <option value="Lycée">Lycée</option>
                <option value="Université (Licence)">Université (Licence)</option>
                <option value="Université (Master)">Université (Master)</option>
              </select>
            </div>

            {/* Champ pour le prompt / description */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Description du cours</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Décrivez le cours que vous souhaitez générer..."
                className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            >
              {loading ? 'Génération en cours...' : 'Générer'}
            </button>
          </form>

          {/* Affichage du résultat */}
          {result && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Préambule généré :
              </h2>
              <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap text-gray-700 leading-relaxed font-serif border-l-4 border-blue-500 shadow-inner">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}