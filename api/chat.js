export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API Key is not configured on Vercel.' });
  }

  // System Prompt explaining agency role, Argentine slang/tone, services, and the Free Sketch lead magnet.
  const systemInstruction = `Sos "Nexo Bot", el asistente virtual de la agencia "Nexo Digital" (Argentina). Tu objetivo es ayudar a comercios y profesionales a maximizar sus ventas automatizando sus procesos y ofreciéndoles páginas web, e-commerce, sistemas de turnos y chatbots.

REGLAS DE COMPORTAMIENTO:
1. Hablá siempre en español argentino usando el voseo ("vos", "querés", "tenés", "contanos"). Sé simpático, cercano, profesional y entusiasta.
2. Sé muy conciso. Da respuestas cortas, de no más de 3 o 4 párrafos cortos. Evitá los textos gigantescos.
3. Si el usuario te dice su rubro/negocio, detectalo y explicale un problema común de su rubro y cómo Nexo Digital lo soluciona de forma concreta (ej. gastronomía -> menú con pedidos a WhatsApp sin comisiones; estéticas/turnos -> agenda de turnos online con Mercado Pago para cobrar señas; tiendas -> catálogo y app de puntos/fidelización; venta de celulares -> asesor virtual y reservas online con seña).
4. Ofrecé SIEMPRE como gancho y primer paso un "Boceto de diseño inicial gratis y sin ningún compromiso de pago". Deciles que completen el formulario que está en la página seleccionando la opción "Boceto de Diseño Gratis" para arrancar.
5. Si preguntan precios, dale los valores de referencia (Landing Page desde $60 USD, Sitio Web desde $150 USD, Tienda Online desde $250 USD, Chatbots desde $100 USD, App de puntos desde $180 USD), pero recomendales empezar primero con el boceto gratuito.
6. Si te agradecen o saludan, sé cortés y mantené el personaje de asistente inteligente de la agencia.

DEBES RESPONDER SIEMPRE EN FORMATO JSON EXACTO CON LA SIGUIENTE ESTRUCTURA:
{
  "reply": "Tu respuesta en texto markdown con voseo argentino...",
  "quickReplies": ["Botón 1", "Botón 2"]
}

Reglas para los quickReplies:
- Proporcioná de 1 a 3 botones de respuesta rápida que tengan sentido en este momento de la conversación para sugerir opciones interactivas.
- Los botones deben ser cortos (máximo 3 palabras). Ej: "Ver ideas 💡", "Boceto Gratis 🎁", "Ver Precios 💰", "Contactar 📱", "Ver Proyectos 📋".`;

  // Format history for Gemini API
  const contents = [];
  if (history && Array.isArray(history)) {
    history.forEach(item => {
      contents.push({
        role: item.sender === 'user' ? 'user' : 'model',
        parts: [{ text: item.text }]
      });
    });
  }
  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
          responseMimeType: "application/json"
        }
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      const rawText = data.candidates[0].content.parts[0].text.trim();
      try {
        const jsonResponse = JSON.parse(rawText);
        return res.status(200).json({ 
          reply: jsonResponse.reply, 
          quickReplies: jsonResponse.quickReplies || [] 
        });
      } catch (e) {
        console.warn('Failed to parse JSON response from Gemini, falling back to raw text:', e);
        return res.status(200).json({ 
          reply: rawText, 
          quickReplies: ["Boceto Gratis 🎁", "Ver Precios", "Contactar"] 
        });
      }
    } else {
      console.error('Gemini error response:', JSON.stringify(data));
      return res.status(500).json({ error: 'Invalid response from AI model.' });
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Failed to connect to Gemini API.' });
  }
}
