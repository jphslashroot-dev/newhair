import { GoogleGenAI, Type } from "@google/genai";

interface Env {
  ASSETS: Fetcher;
  GEMINI_API_KEY?: string;
}

const FALLBACK = {
  isDemo: true,
  diagnostic:
    "[Mode Démo - Clé API indisponible] Vos cheveux ont été analysés. Votre préoccupation principale et votre préférence de style dessinent les contours d'une routine bienveillante.",
  hairstyles: [
    {
      name: "Le Dégradé Effilé Moderne",
      description:
        "Un dégradé léger pour donner du mouvement et de la légèreté tout en encadrant harmonieusement votre visage.",
      whyMatched:
        "S'adapte parfaitement à votre longueur et apporte un volume naturel sans effort quotidien.",
    },
    {
      name: "Le Bob Structuré Texturé",
      description:
        "Une coupe chic au niveau de la mâchoire ou des clavicules, travaillée au rasoir doux pour un effet coiffé-décoiffé ultra tendance.",
      whyMatched:
        "Idéal pour restructurer la matière et redonner de la vitalité à vos cheveux.",
    },
  ],
  routine: [
    {
      title: "1. Lavage Doux & Gainant",
      steps: [
        "Laver avec un shampooing doux sans sulfate adapté à votre type de cheveux.",
        "Essorer délicatement sans frotter la fibre capillaire avec une serviette en microfibre.",
      ],
      recommendedProducts:
        "Shampooing Hydratant Doux à l'argousier ou à l'aloe vera",
    },
    {
      title: "2. Hydratation Ciblée",
      steps: [
        "Appliquer un soin léger ou un après-shampooing sur les longueurs et pointes uniquement (laisser poser 2-3 minutes).",
        "Rincer abondamment à l'eau tiède, puis terminer par un jet d'eau fraîche pour refermer les écailles.",
      ],
      recommendedProducts:
        "Après-shampooing léger à la protéine de soie végétale",
    },
    {
      title: "3. Séchage et Texturisation",
      steps: [
        "Appliquer un voile de spray thermo-protecteur si brushing ou séchage doux.",
        "Froisser les pointes pour activer la texture naturelle.",
      ],
      recommendedProducts:
        "Spray texturisant salin léger ou sérum protecteur de pointes",
    },
  ],
  tips: [
    "Brossez toujours vos cheveux en commençant par les pointes pour remonter vers les racines, afin d'éviter la casse.",
    "Espacez les shampooings d'au moins 2 à 3 jours pour permettre au sébum naturel de protéger naturellement la fibre.",
    "Le séchage à l'air libre ou à température tiède/basse préserve la brillance et l'élasticité de vos cheveux.",
  ],
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

async function handleConsult(request: Request, env: Env): Promise<Response> {
  const apiKey = env.GEMINI_API_KEY;
  const body = await request.json().catch(() => ({}));
  const { hairType, hairLength, hairStatus, mainConcern, stylePreference, answersText } =
    body as Record<string, string>;

  if (!apiKey) {
    return json(FALLBACK);
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: { headers: { "User-Agent": "aistudio-build" } },
  });

  const userContext = `
        - Type de cheveux : ${hairType || "non spécifié"}
        - Longueur : ${hairLength || "non spécifié"}
        - État chimique/coloration : ${hairStatus || "non spécifié"}
        - Problème ou préoccupation principale : ${mainConcern || "non spécifié"}
        - Style recherché : ${stylePreference || "non spécifié"}
        - Autres notes ou détails fournis : ${answersText || "aucune"}
      `;

  const prompt = `Tu es une coiffeuse professionnelle à domicile experte en stylisme et soins capillaires, appelée "Bettyna".
Un utilisateur cherche des conseils personnalisés pour sa coupe, ses soins et sa routine de coiffage.
Voici ses informations de diagnostic capillaire :
${userContext}

Analyse sa situation et génère un rapport de conseils capillaires personnalisé de haute qualité, chaleureux et professionnel.
Tu dois répondre STRICTEMENT au format JSON en français, respectant le schéma standardisé. Ne mets aucun texte en dehors du bloc JSON.`;

  try {
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
                  whyMatched: { type: Type.STRING },
                },
                required: ["name", "description", "whyMatched"],
              },
            },
            routine: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  steps: { type: Type.ARRAY, items: { type: Type.STRING } },
                  recommendedProducts: { type: Type.STRING },
                },
                required: ["title", "steps", "recommendedProducts"],
              },
            },
            tips: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["diagnostic", "hairstyles", "routine", "tips"],
        },
      },
    });

    const responseText = response.text || "";
    return json(JSON.parse(responseText.trim()));
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    return json(
      { error: "Une erreur est survenue lors du diagnostic capillaire IA. Veuillez réessayer." },
      500,
    );
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/ai-consult" && request.method === "POST") {
      return handleConsult(request, env);
    }

    // Serve static SPA assets (Vite build output)
    return env.ASSETS.fetch(request);
  },
};
