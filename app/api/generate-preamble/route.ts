import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    // On récupère subject, level et prompt depuis le body
    const { subject, level, prompt } = await req.json();

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json({ text: 'Le prompt est vide.' }, { status: 400 });
    }

    const messages = [
      {
        role: 'system',
        content: `Tu es un assistant pédagogique qui génère des plans de cours en français, adaptés au niveau des élèves.`,
      },
      {
        role: 'user',
        // On intègre la matière, le niveau et le prompt dans le message
        content: `Génère un plan de cours détaillé pour la matière "${subject}", destiné à des élèves de niveau "${level}". 
                  
          Le plan doit :  
          1. Décrire les objectifs pédagogiques généraux et spécifiques.  
          2. Proposer une progression claire (chapitres ou modules) en tenant compte du niveau "${level}".  
          3. Préciser les méthodes d’enseignement (cours magistral, activités pratiques, exercices d’approfondissement, etc.).  
          4. Indiquer les ressources nécessaires (matérielles, numériques, bibliographiques, etc.).  
          5. Inclure des idées d’évaluation (tests, projets, oraux, etc.) pour mesurer les acquis.  
          6. Adapter la difficulté et le vocabulaire employé au niveau choisi.  

          **Format attendu :**  
          - Un plan structuré en plusieurs parties (ou chapitres).  
          - Des objectifs clairs en début de chaque partie.  
          - Un résumé final indiquant les compétences clés acquises en fin de cours.

          Description du cours : ${prompt}`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    const generatedText = completion.choices[0]?.message?.content || '';
    return NextResponse.json({ text: generatedText });
  } catch (error) {
    console.error('Error generating preamble:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la génération.' },
      { status: 500 }
    );
  }
}