import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini client on the server
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI Hair Consultant will run in demo/fallback mode.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API: AI Hair Consultant
  app.post("/api/ai-consult", async (req, res) => {
    const { hairType, hairLength, hairStatus, mainConcern, stylePreference, answersText } = req.body;

    if (!ai) {
      // Fallback response for demo when API key is missing
      return res.json({
        isDemo: true,
        diagnostic: `[Mode Démo - Clé API indisponible] Vos cheveux ${hairType || "de texture normale"}, mesurant environ ${hairLength || "mi-longs"}, ont été analysés. Votre préoccupation principale liée à "${mainConcern || "l'éclat"}" et votre préférence de style "${stylePreference || "naturel"}" dessinent les contours d'une routine bienveillante.`,
        hairstyles: [
          {
            name: "Le Dégradé Effilé Moderne",
            description: "Un dégradé léger pour donner du mouvement et de la légèreté tout en encadrant harmonieusement votre visage.",
            whyMatched: "S'adapte parfaitement à votre longueur et apporte un volume naturel sans effort quotidien."
          },
          {
            name: "Le Bob Structuré Texturé",
            description: "Une coupe chic au niveau de la mâchoire ou des clavicules, travaillée au rasoir doux pour un effet coiffé-décoiffé ultra tendance.",
            whyMatched: "Idéal pour restructurer la matière et redonner de la vitalité à vos cheveux."
          }
        ],
        routine: [
          {
            title: "1. Lavage Doux & Gainant",
            steps: [
              "Laver avec un shampooing doux sans sulfate adapté à votre type de cheveux.",
              "Essorer délicatement sans frotter la fibre capillaire avec une serviette en microfibre."
            ],
            recommendedProducts: "Shampooing Hydratant Doux à l'argousier ou à l'aloe vera"
          },
          {
            title: "2. Hydratation Ciblée",
            steps: [
              "Appliquer un soin léger ou un après-shampooing sur les longueurs et pointes uniquement (laisser poser 2-3 minutes).",
              "Rincer abondamment à l'eau tiède, puis terminer par un jet d'eau fraîche pour refermer les écailles."
            ],
            recommendedProducts: "Après-shampooing léger à la protéine de soie végétale"
          },
          {
            title: "3. Séchage et Texturisation",
            steps: [
              "Appliquer un voile de spray thermo-protecteur si brushing ou séchage doux.",
              "Froisser les pointes pour activer la texture naturelle."
            ],
            recommendedProducts: "Spray texturisant salin léger ou sérum protecteur de pointes"
          }
        ],
        tips: [
          "Brossez toujours vos cheveux en commençant par les pointes pour remonter vers les racines, afin d'éviter la casse.",
          "Espacez les shampooings d'au moins 2 à 3 jours pour permettre au sébum naturel de protéger naturellement la fibre.",
          "Le séchage à l'air libre ou à température tiède/basse préserve la brillance et l'élasticité de vos cheveux."
        ]
      });
    }

    try {
      // Prompt construction
      const userContext = `
        - Type de cheveux : ${hairType || 'non spécifié'}
        - Longueur : ${hairLength || 'non spécifié'}
        - État chimique/coloration : ${hairStatus || 'non spécifié'}
        - Problème ou préoccupation principale : ${mainConcern || 'non spécifié'}
        - Style recherché : ${stylePreference || 'non spécifié'}
        - Autres notes ou détails fournis : ${answersText || 'aucune'}
      `;

      const prompt = `Tu es une coiffeuse professionnelle à domicile experte en stylisme et soins capillaires, appelée "Aline".
Un utilisateur cherche des conseils personnalisés pour sa coupe, ses soins et sa routine de coiffage.
Voici ses informations de diagnostic capillaire :
${userContext}

Analyse sa situation et génère un rapport de conseils capillaires personnalisé de haute qualité, chaleureux et professionnel.
Tu dois répondre STRICTEMENT au format JSON en français, respectant le schéma standardisé. Ne mets aucun texte en dehors du bloc JSON.

Schéma JSON de réponse attendu :
{
  "diagnostic": "Chaîne de caractères décrivant brièvement et chaleureusement le diagnostic capillaire général de la cliente (style Aline, coiffeuse à domicile bienveillante).",
  "hairstyles": [
    {
      "name": "Nom de la coupe/coiffure suggérée (ex. Le Carré Plongeant Flou)",
      "description": "Description détaillée de la coiffure en termes de forme, texture et entretien.",
      "whyMatched": "Explication de pourquoi cette coiffure est idéale par rapport au type de cheveu, à la longueur actuelle et aux préoccupations de la cliente."
    }
  ],
  "routine": [
    {
      "title": "Nom de l'étape de la routine (ex: 1. Shampoing & Soin)",
      "steps": [
        "Description de l'action ou du geste technique pour cette étape (ex: Masser doucement le cuir chevelu en mouvements circulaires durant 2 minutes)."
      ],
      "recommendedProducts": "Le type de produit indispensable pour cette étape (conseils de principes actifs, ex: Shampoing à la kératine végétale sans sulfate)."
    }
  ],
  "tips": [
    "Conseil pro 1 (conseils pratiques d'entretien quotidien d'une coiffeuse à domicile)",
    "Conseil pro 2...",
    "Conseil pro 3..."
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              diagnostic: { type: Type.STRING },
              hairstyles: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    whyMatched: { type: Type.STRING }
                  },
                  required: ["name", "description", "whyMatched"]
                }
              },
              routine: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    steps: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    recommendedProducts: { type: Type.STRING }
                  },
                  required: ["title", "steps", "recommendedProducts"]
                }
              },
              tips: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["diagnostic", "hairstyles", "routine", "tips"]
          }
        }
      });

      const responseText = response.text || "";
      const resultObj = JSON.parse(responseText.trim());
      res.json(resultObj);
    } catch (error) {
      console.error("Error communicating with Gemini API:", error);
      res.status(500).json({ error: "Une erreur est survenue lors du diagnostic capillaire IA. Veuillez réessayer." });
    }
  });

  // Serve static assets and frontend App
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
