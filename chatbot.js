/* ══════════════════════════════════════════
   NEXO DIGITAL — Chatbot Widget
   ══════════════════════════════════════════ */

const ChatBot = (() => {
    // ── Conversation data ──
    const BOT_NAME = 'Nexo Bot';
    const TYPING_DELAY = 800;
    const SYSTEM_PROMPT_TEXT = `Sos "Nexo Bot", el asistente virtual de la agencia "Nexo Digital" (Argentina). Tu objetivo es ayudar a comercios y profesionales a maximizar sus ventas automatizando sus procesos y ofreciéndoles páginas web, e-commerce, sistemas de turnos y chatbots.

REGLAS DE COMPORTAMIENTO:
1. Hablá siempre en español argentino usando el voseo ("vos", "querés", "tenés", "contanos"). Sé simpático, cercano, profesional y entusiasta.
2. Sé muy conciso. Da respuestas cortas, de no más de 3 o 4 párrafos cortos. Evitá los textos gigantescos.
3. Si el usuario te dice su rubro/negocio, detectalo y explicale un problema común de su rubro y cómo Nexo Digital lo soluciona de forma concreta (ej. gastronomía -> menú con pedidos a WhatsApp sin comisiones; estéticas/turnos -> agenda de turnos online con Mercado Pago para cobrar señas; tiendas -> catálogo y app de puntos/fidelización).
4. Ofrecé SIEMPRE como gancho y primer paso un "Boceto de diseño inicial gratis y sin ningún compromiso de pago". Deciles que completen el formulario que está en la página seleccionando la opción "Boceto de Diseño Gratis" para arrancar.
5. Si preguntan precios, dale los valores de referencia (Landing Page desde $60 USD, Sitio Web desde $150 USD, Tienda Online desde $250 USD, Chatbots desde $100 USD, App de puntos desde $180 USD), pero recomendales empezar primero con el boceto gratuito.
6. Si te agradecen o saludan, sé cortés y mantené el personaje de asistente inteligente de la agencia.`;

    const responses = {
        greeting: {
            text: '¡Hola! 👋 Soy **Nexo Bot**, el asistente con Inteligencia Artificial de **Nexo Digital**.\n\n¿Querés maximizar tus ventas y automatizar tu negocio? Contame a qué rubro te dedicás y te diré algunas recomendaciones clave para mejorar tu facturación.'
        },
        servicios: {
            text: 'Ofrecemos estos servicios profesionales en toda la Argentina:\n\n🖥️ **Sitios Web a Medida** — Diseño único para tu marca\n🚀 **Landing Pages** — Reservas y captación de clientes\n🛒 **Tiendas Online** — E-commerce y carrito de compras\n🔄 **Rediseño Web** — Actualizá tu página obsoleta\n🤖 **Chatbots** — Atención automática 24/7\n🏆 **App de Puntos** — Sistemas de fidelización\n\n¿Sobre cuál querés más info?',
            quickReplies: ['Sitios Web', 'Landing Pages', 'E-Commerce', 'Chatbots', 'App de Puntos', 'Precios']
        },
        precios: {
            text: 'Nuestros precios de referencia:\n\n💰 **Landing Page** — desde $60 USD\n💰 **Sitio Web** — desde $150 USD\n💰 **Tienda Online** — desde $250 USD\n💰 **Rediseño Web** — desde $120 USD\n💰 **Chatbots** — desde $100 USD\n💰 **App de Puntos** — desde $180 USD\n\nRecordá que te armamos un **Boceto de Diseño 100% Gratis** antes de pagar para que veas la propuesta sin compromiso.',
            quickReplies: ['Boceto Gratis 🎁', 'Servicios', 'Portfolio']
        },
        portfolio: {
            text: 'Tenemos más de **50 proyectos entregados** 🎉\n\nAlgunos de nuestros trabajos destacados:\n\n🍽️ **Sabores del Sur** — Restaurante\n💪 **Vita Fitness** — Centro de entrenamiento\n👗 **Luna Store** — Moda online\n🚪 **ANTAR Amoblamientos** — Carpintería a medida\n\nPodés ver más en nuestra sección de Portfolio ⬆️',
            quickReplies: ['Servicios', 'Boceto Gratis 🎁', 'Contactar']
        },
        chatbots: {
            text: '¡Los chatbots son nuestro servicio estrella! 🤖\n\nPodemos crear bots para:\n\n💬 **Tu sitio web** — Como este que estás usando ahora\n📱 **WhatsApp** — Respuestas automáticas 24/7\n📸 **Instagram** — Auto-respuesta en DMs\n\nDe hecho, **este chat es una demo** de lo que podemos hacer por tu negocio.',
            quickReplies: ['¿Beneficios de un chatbot?', '¿Cómo obtengo mi chatbot?', 'Precios de chatbots']
        },
        'app de puntos': {
            text: '🏆 **Sistemas de Fidelización (App de Puntos)**\n\nFidelizá a tus clientes frecuentes con tu propia aplicación de puntos y premios:\n\n✅ Los clientes suman puntos con sus compras y canjean premios desde su celular.\n✅ Base de datos de tus clientes (teléfono, email) para tus campañas de marketing.\n✅ Panel autogestionable simple desde Excel/Google Sheets.\n\n**Tiempo de entrega:** 2 semanas\n**Desde:** $180 USD',
            quickReplies: ['Boceto Gratis 🎁', 'Otros servicios', 'Precios']
        },
        '¿beneficios de un chatbot?': {
            text: '¡Excelente pregunta! Un chatbot le da **superpoderes** a tu negocio 💪\n\n🕐 **Atención 24/7** — Respondé consultas incluso mientras dormís.\n⚡ **Respuesta instantánea** — Tus clientes no esperan.\n💰 **Más ventas** — Resuelve dudas y ayuda a tomar pedidos.\n🔄 **Menos trabajo repetitivo** — Automatiza las preguntas frecuentes (horarios, precios).\n\n**Ejemplo real:** Un restaurante con chatbot aumentó sus reservas un 200% porque el bot atiende de noche cuando la gente planifica salidas.',
            quickReplies: ['¿Cómo obtengo mi chatbot?', 'Precios de chatbots', 'Servicios']
        },
        '¿cómo obtengo mi chatbot?': {
            text: '¡Es muy simple! Con solo **3 pasos** 🚀\n\n**1️⃣ Pedís tu Boceto Gratis**\nNos contás tu idea o nos pasás tu Instagram y te armamos una propuesta visual de tu web o flujo del bot.\n\n**2️⃣ Lo diseñamos para vos**\nCreamos el bot con las respuestas de tu negocio, tus colores y tu estilo.\n\n**3️⃣ Lo instalamos y listo**\nLo integramos en tu web, WhatsApp o Instagram y te explicamos cómo usarlo.',
            quickReplies: ['Boceto Gratis 🎁', 'Abrir WhatsApp', 'Precios de chatbots']
        },
        'precios de chatbots': {
            text: 'Los precios de chatbots dependen de la plataforma:\n\n🤖 **Chat web básico** — desde $100 USD\n📱 **Bot WhatsApp** — desde $250 USD\n📸 **Bot Instagram** — desde $150 USD\n🧠 **Bot con IA** — desde $300 USD',
            quickReplies: ['Boceto Gratis 🎁', 'Contactar', 'Servicios']
        },
        contactar: {
            text: '¡Con gusto! Podés contactarnos por:\n\n📱 **WhatsApp** — +54 9 3795 051607\n📸 **Instagram** — @nexodigital_arg\n📧 **Email** — nexodigital.mmr@gmail.com\n\nO completá el formulario de contacto en nuestra web.\n\n¿Preferís que te contactemos nosotros?',
            quickReplies: ['Abrir WhatsApp', 'Abrir Instagram', 'Ir al formulario', 'Servicios']
        },
        'boceto gratis 🎁': {
            text: '¡Excelente elección! 🎯 El Boceto Gratis es una muestra de diseño inicial de tu futura página web 100% personalizada y sin ningún compromiso de pago.\n\nPara solicitarlo, completá el primer paso del formulario web de contacto acá atrás (que te pide el nombre de tu marca, rubro e Instagram) y elegí **"Boceto de Diseño Gratis"**.\n\n¿Querés que te lleve directo al formulario?',
            quickReplies: ['Ir al formulario', 'Abrir WhatsApp', 'Volver al inicio']
        },
        'elegir por rubro 🏢': {
            text: 'Contanos qué tipo de negocio tenés para ver cómo podemos ayudarte a vender más en piloto automático:',
            quickReplies: ['Gastronomía 🍔', 'Estética y Turnos 💅', 'Tienda y Showroom 🛍️', 'Gimnasio 🏋️‍♂️', 'Profesional/Servicios 💼']
        },
        'gastronomía 🍔': {
            text: '🍔 **Para Gastronómicos (Restaurantes, Cafés, Pizzerías)**:\n\nTe ayudamos a eliminar comisiones y automatizar tu local:\n\n✅ **Menú Digital propio con Pedidos a WhatsApp** — Chau comisiones del 30% en apps de delivery.\n✅ **Chatbots automatizados** — Responden horarios, precios y toman reservas en piloto automático.\n\n🎁 **Te armamos un boceto de menú digital gratis para tu marca.**',
            quickReplies: ['Boceto Gratis 🎁', 'Precios', 'Volver al inicio']
        },
        'estética y turnos 💅': {
            text: '💅 **Para Estética y Belleza (Peluquerías, Barberías, Spas)**:\n\nEvitá perder turnos y tiempo respondiendo mensajes:\n\n✅ **Sistema de Turnos y Reservas Online** — Tus clientes agendan solos 24/7 en 3 clics.\n✅ **Cobro de Señas** — Integrado con Mercado Pago para evitar cancelaciones de último minuto.\n\n🎁 **Te armamos un boceto de tu agenda de turnos gratis sin compromiso.**',
            quickReplies: ['Boceto Gratis 🎁', 'Precios', 'Volver al inicio']
        },
        'tienda y showroom 🛍️': {
            text: '🛍️ **Para Tiendas & Showrooms (Ropa, Accesorios, Locales)**:\n\nLlevá tus ventas físicas al mundo digital:\n\n✅ **Tienda Online (E-commerce)** — Tu catálogo abierto las 24 horas con pasarela de pago.\n✅ **App de Puntos (Fidelización)** — Premiá las compras recurrentes de tus clientes para que te compren de nuevo.\n\n🎁 **Te armamos una demo/boceto inicial de tu tienda gratis.**',
            quickReplies: ['Boceto Gratis 🎁', 'Precios', 'Volver al inicio']
        },
        'gimnasio 🏋️‍♂️': {
            text: '🏋️‍♂️ **Para Centros Deportivos (Gimnasios, CrossFit, Yoga)**:\n\nFidelizá a tus socios y captá nuevos alumnos:\n\n✅ **Landing Page de Captación** — Registrá inscripciones a clases especiales directo a WhatsApp.\n✅ **App de Puntos por Asistencia** — Premiá la constancia de tus socios regulares para retenerlos más tiempo.\n\n🎁 **Te preparamos un boceto gratis de tu landing o app de puntos sin costo.**',
            quickReplies: ['Boceto Gratis 🎁', 'Precios', 'Volver al inicio']
        },
        'profesional/servicios 💼': {
            text: '💼 **Para Profesionales & Servicios (Abogados, Médicos, Consultoras)**:\n\nGenerá autoridad y leads de alto valor:\n\n✅ **Sitio Web de Autoridad** — Posicionamiento en Google (SEO) para que te encuentren en todo el país.\n✅ **Chatbots con IA** — Califican tus consultas y agendan citas automáticas.\n\n🎁 **Te armamos un boceto gratis de tu web profesional.**',
            quickReplies: ['Boceto Gratis 🎁', 'Precios', 'Volver al inicio']
        },
        'sitios web': {
            text: '🖥️ **Sitios Web a Medida**\n\nCreamos sitios web profesionales 100% personalizados:\n\n✅ Diseño único para tu marca\n✅ 100% responsive (móvil, tablet, PC)\n✅ Optimizado para SEO (Google)\n✅ Carga ultrarrápida\n\n**Tiempo de entrega:** 5-7 días hábiles\n**Desde:** $150 USD',
            quickReplies: ['Boceto Gratis 🎁', 'Otros servicios', 'Portfolio']
        },
        'landing pages': {
            text: '🚀 **Landing Pages**\n\nPáginas diseñadas para **convertir visitantes en clientes**:\n\n✅ Diseño persuasivo y moderno\n✅ Formularios de captura y reservas\n✅ Optimizada para anuncios (Meta, Google)\n\n**Tiempo de entrega:** 3-5 días hábiles\n**Desde:** $60 USD',
            quickReplies: ['Boceto Gratis 🎁', 'Otros servicios', 'Precios']
        },
        'e-commerce': {
            text: '🛒 **Tiendas Online**\n\nSoluciones e-commerce completas:\n\n✅ Catálogo de productos y stock\n✅ Carrito de compras y pasarela de pagos (MercadoPago)\n✅ Panel de administración simple\n\n**Tiempo de entrega:** 7-10 días hábiles\n**Desde:** $250 USD',
            quickReplies: ['Boceto Gratis 🎁', 'Otros servicios', 'Precios']
        },
        'otros servicios': {
            text: '¿Sobre qué servicio te gustaría saber más?',
            quickReplies: ['Sitios Web', 'Landing Pages', 'E-Commerce', 'Chatbots', 'App de Puntos', 'Precios']
        },
        'volver al inicio': {
            text: '¡Sin problema! ¿En qué más puedo ayudarte?',
            quickReplies: ['Elegir por Rubro 🏢', 'Boceto Gratis 🎁', 'Servicios', 'Precios', 'Contactar']
        },
        'otros rubros': {
            text: '¡Qué excelente rubro! 🚀 En Nexo Digital diseñamos webs corporativas, portfolios y catálogos a medida para todo tipo de locales, talleres, fábricas o pymes de todo el país.\n\nTe ayudamos a:\n✅ Aparecer en Google para que te encuentren clientes locales y a nivel nacional.\n✅ Mostrar tus servicios, catálogo de productos y horarios de forma profesional.\n\n🎁 **Te armamos un boceto de diseño inicial gratis y sin compromiso para tu marca.**',
            quickReplies: ['Boceto Gratis 🎁', 'Precios', 'Volver al inicio']
        },
        default: {
            text: 'Gracias por tu mensaje 😊 Para darte la mejor respuesta, te recomiendo elegir una de estas opciones o contactarnos directamente:',
            quickReplies: ['Elegir por Rubro 🏢', 'Boceto Gratis 🎁', 'Servicios', 'Precios', 'Contactar']
        }
    };

    // ── State ──
    let isOpen = false;
    let hasGreeted = false;
    const chatHistory = [];

    // ── DOM Elements ──
    let widget, chatWindow, messagesEl, inputEl, toggleBtn, closeBtn, sendBtn, badge;

    function init() {
        widget = document.getElementById('chatbot-widget');
        chatWindow = document.getElementById('chatbot-window');
        messagesEl = document.getElementById('chatbot-messages');
        inputEl = document.getElementById('chatbot-input');
        toggleBtn = document.getElementById('chatbot-toggle');
        closeBtn = document.getElementById('chatbot-close');
        sendBtn = document.getElementById('chatbot-send');
        badge = document.getElementById('chatbot-badge');

        toggleBtn.addEventListener('click', toggle);
        closeBtn.addEventListener('click', close);
        sendBtn.addEventListener('click', handleSend);
        inputEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });

        // AI Instructions modal logic
        const infoBtn = document.getElementById('chatbot-info-btn');
        const modal = document.getElementById('chatbot-info-modal');
        const modalClose = document.getElementById('chatbot-info-modal-close');
        const modalPrompt = document.getElementById('chatbot-info-modal-prompt');

        if (infoBtn && modal && modalClose && modalPrompt) {
            modalPrompt.textContent = SYSTEM_PROMPT_TEXT;
            infoBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                modal.style.display = 'flex';
            });
            modalClose.addEventListener('click', (e) => {
                e.stopPropagation();
                modal.style.display = 'none';
            });
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }

        // Connect hero AI search bar
        const heroInput = document.getElementById('hero-ai-input');
        const heroSubmit = document.getElementById('hero-ai-submit');

        if (heroInput && heroSubmit) {
            const handleHeroSearch = () => {
                const text = heroInput.value.trim();
                if (!text) return;
                
                heroInput.value = '';
                
                // Skip initial greeting since the user is starting the chat with a specific query
                hasGreeted = true;
                
                // Open chatbot window
                if (!isOpen) {
                    open();
                }
                
                // Send query to chatbot
                addMessage(text, 'user');
                processInput(text);
            };

            heroSubmit.addEventListener('click', handleHeroSearch);
            heroInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleHeroSearch();
            });
        }

        // Connect featured chatbot service card to open chat
        const chatbotServiceCard = document.querySelector('.service-card-featured');
        if (chatbotServiceCard) {
            chatbotServiceCard.addEventListener('click', (e) => {
                // Avoid triggering if clicking an internal link
                if (e.target.tagName !== 'A' && !e.target.closest('a')) {
                    if (!isOpen) open();
                }
            });
        }

        // Show badge after 2 seconds
        setTimeout(() => {
            if (!isOpen) badge.classList.add('visible');
        }, 2000);

        // Auto-open after 5 seconds on desktop
        setTimeout(() => {
            if (!isOpen && window.innerWidth > 768) {
                open();
            }
        }, 5000);
    }

    function toggle() {
        isOpen ? close() : open();
    }

    function open() {
        isOpen = true;
        chatWindow.classList.add('open');
        toggleBtn.classList.add('active');
        badge.classList.remove('visible');
        if (!hasGreeted) {
            hasGreeted = true;
            showTypingThenRespond(responses.greeting);
        }
    }

    function close() {
        isOpen = false;
        chatWindow.classList.remove('open');
        toggleBtn.classList.remove('active');
    }

    function handleSend() {
        const text = inputEl.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        inputEl.value = '';
        processInput(text);
    }

    function processInput(text) {
        const key = text.toLowerCase().trim();

        // Special actions (Redirections and Scrolls)
        if (key.includes('abrir whatsapp') || (key.includes('whatsapp') && !key.includes('precios') && !key.includes('beneficio') && !key.includes('obtengo'))) {
            addMessage('¡Te redirijo a WhatsApp! 📱', 'bot');
            setTimeout(() => window.open('https://wa.me/5493795051607', '_blank'), 1000);
            return;
        }
        if (key.includes('abrir instagram') || key.includes('instagram')) {
            addMessage('¡Te redirijo a Instagram! 📸', 'bot');
            setTimeout(() => window.open('https://www.instagram.com/nexodigital_arg/', '_blank'), 1000);
            return;
        }
        if (key.includes('formulario') || key === 'ir al formulario') {
            addMessage('¡Te llevo al formulario! 📝', 'bot');
            setTimeout(() => {
                close();
                document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
            }, 500);
            return;
        }

        // Add user message to history
        chatHistory.push({ sender: 'user', text: text });

        // Show typing indicator
        showTyping();

        // ── Direct Client-Side Gemini API call (For Local testing only) ──
        const localKey = localStorage.getItem('GEMINI_API_KEY');
        if (localKey) {
            const contents = chatHistory.slice(-10).map(item => ({
                role: item.sender === 'user' ? 'user' : 'model',
                parts: [{ text: item.text }]
            }));

            fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${localKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{ text: SYSTEM_PROMPT_TEXT }]
                    },
                    contents: contents,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 800,
                        responseMimeType: "application/json"
                    }
                })
            })
            .then(res => {
                if (!res.ok) throw new Error('Direct Gemini API call failed');
                return res.json();
            })
            .then(data => {
                removeTyping();
                if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
                    const rawText = data.candidates[0].content.parts[0].text.trim();
                    try {
                        const jsonResponse = JSON.parse(rawText);
                        chatHistory.push({ sender: 'bot', text: jsonResponse.reply });
                        addMessage(jsonResponse.reply, 'bot');
                        const replies = jsonResponse.quickReplies && jsonResponse.quickReplies.length > 0 
                            ? jsonResponse.quickReplies 
                            : ['Boceto Gratis 🎁', 'Ver Precios 💰', 'Contactar 📱'];
                        addQuickReplies(replies);
                    } catch (e) {
                        chatHistory.push({ sender: 'bot', text: rawText });
                        addMessage(rawText, 'bot');
                        addQuickReplies(['Boceto Gratis 🎁', 'Ver Precios 💰', 'Contactar 📱']);
                    }
                } else {
                    throw new Error('Invalid response candidate');
                }
            })
            .catch(err => {
                console.warn('Direct Gemini call failed, trying keyword fallback:', err);
                removeTyping();
                runFallbackKeywords(key);
            });
            return;
        }

        // ── Vercel Serverless Function proxy call (Production) ──
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: text,
                history: chatHistory.slice(-10)
            })
        })
        .then(async res => {
            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`Vercel API error (${res.status}): ${errText}`);
            }
            return res.json();
        })
        .then(data => {
            removeTyping();
            if (data.reply) {
                chatHistory.push({ sender: 'bot', text: data.reply });
                addMessage(data.reply, 'bot');
                
                const replies = data.quickReplies && data.quickReplies.length > 0 
                    ? data.quickReplies 
                    : ['Boceto Gratis 🎁', 'Ver Precios 💰', 'Contactar 📱'];
                addQuickReplies(replies);
            } else {
                throw new Error('Reply field not present');
            }
        })
        .catch(err => {
            console.warn('AI chat error, falling back to static keywords:', err);
            removeTyping();
            runFallbackKeywords(key);
        });
    }

    function runFallbackKeywords(key) {
        let response = responses[key];

        if (!response) {
            const keywords = {
                'servicio': 'servicios', 'precio': 'precios', 'costo': 'precios',
                'cuanto': 'precios', 'cuánto': 'precios', 'valor': 'precios',
                'portfolio': 'portfolio', 'proyecto': 'portfolio', 'trabajo': 'portfolio',
                'contacto': 'contactar', 'contactar': 'contactar', 'whatsapp': 'contactar',
                'hola': 'greeting', 'buenas': 'greeting', 'buen dia': 'greeting',
                'chatbot': 'chatbots', 'bot': 'chatbots', 'automatiz': 'chatbots',
                'landing': 'landing pages', 'tienda': 'e-commerce', 'ecommerce': 'e-commerce',
                'sitio': 'sitios web', 'pagina': 'sitios web', 'página': 'sitios web',
                'web': 'sitios web', 'presupuesto': 'boceto gratis 🎁',
                'inicio': 'volver al inicio', 'menu': 'volver al inicio',
                'beneficio': '¿beneficios de un chatbot?', 'ventaja': '¿beneficios de un chatbot?',
                'para que sirve': '¿beneficios de un chatbot?', 'para qué sirve': '¿beneficios de un chatbot?',
                'obtener': '¿cómo obtengo mi chatbot?', 'conseguir': '¿cómo obtengo mi chatbot?',
                'cómo funciona': '¿cómo obtengo mi chatbot?', 'como funciona': '¿cómo obtengo mi chatbot?',
                'quiero un bot': '¿cómo obtengo mi chatbot?', 'necesito un bot': '¿cómo obtengo mi chatbot?',
                'rubro': 'elegir por rubro 🏢', 'negocio': 'elegir por rubro 🏢',
                'empresa': 'elegir por rubro 🏢', 'marca': 'elegir por rubro 🏢',
                'gastronom': 'gastronomía 🍔', 'comida': 'gastronomía 🍔', 'restauran': 'gastronomía 🍔', 'pizza': 'gastronomía 🍔', 'cafe': 'gastronomía 🍔', 'café': 'gastronomía 🍔',
                'estetic': 'estética y turnos 💅', 'turno': 'estética y turnos 💅', 'peluquer': 'estética y turnos 💅', 'barber': 'estética y turnos 💅', 'spa': 'estética y turnos 💅',
                'tienda': 'tienda y showroom 🛍️', 'showroom': 'tienda y showroom 🛍️', 'ropa': 'tienda y showroom 🛍️', 'local': 'tienda y showroom 🛍️', 'compras': 'tienda y showroom 🛍️',
                'gimnasio': 'gimnasio 🏋️‍♂️', 'gym': 'gimnasio 🏋️‍♂️', 'crossfit': 'gimnasio 🏋️‍♂️', 'yoga': 'gimnasio 🏋️‍♂️', 'entrenam': 'gimnasio 🏋️‍♂️',
                'profesional': 'profesional/servicios 💼', 'abogado': 'profesional/servicios 💼', 'contador': 'profesional/servicios 💼', 'medico': 'profesional/servicios 💼', 'médico': 'profesional/servicios 💼', 'consultor': 'profesional/servicios 💼',
                'puntos': 'app de puntos', 'fideliza': 'app de puntos',
                'boceto': 'boceto gratis 🎁', 'muestra': 'boceto gratis 🎁', 'gratis': 'boceto gratis 🎁',
                'vend': 'otros rubros', 'cre': 'otros rubros', 'fabric': 'otros rubros', 'hac': 'otros rubros', 'hag': 'otros rubros', 'teng': 'otros rubros', 'prod': 'otros rubros', 'dedic': 'otros rubros', 'ofrec': 'otros rubros', 'trabaj': 'otros rubros', 'comerc': 'otros rubros', 'negoc': 'otros rubros', 'local': 'otros rubros', 'tienda': 'otros rubros', 'taller': 'otros rubros', 'pyme': 'otros rubros', 'empresa': 'otros rubros', 'marca': 'otros rubros', 'emprend': 'otros rubros', 'pelota': 'otros rubros', 'futbol': 'otros rubros', 'pantufla': 'otros rubros',
                'gracias': null, 'thanks': null
            };

            for (const [keyword, responseKey] of Object.entries(keywords)) {
                if (key.includes(keyword)) {
                    if (responseKey === null) {
                        addMessage('¡De nada! 😄 Estoy acá para lo que necesites.', 'bot');
                        addQuickReplies(['Servicios', 'Precios', 'Contactar']);
                        return;
                    }
                    response = responses[responseKey];
                    break;
                }
            }
        }

        const activeResponse = response || responses.default;
        chatHistory.push({ sender: 'bot', text: activeResponse.text });
        addMessage(activeResponse.text, 'bot');
        if (activeResponse.quickReplies) {
            addQuickReplies(activeResponse.quickReplies);
        }
    }

    function showTypingThenRespond(response) {
        showTyping();
        setTimeout(() => {
            removeTyping();
            addMessage(response.text, 'bot');
            if (response.quickReplies) {
                addQuickReplies(response.quickReplies);
            }
        }, TYPING_DELAY + Math.random() * 400);
    }

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `chatbot-msg chatbot-msg-${sender}`;

        const bubble = document.createElement('div');
        bubble.className = 'chatbot-bubble';
        bubble.innerHTML = formatText(text);

        div.appendChild(bubble);
        messagesEl.appendChild(div);
        scrollToBottom();
    }

    function formatText(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    }

    function addQuickReplies(replies) {
        const div = document.createElement('div');
        div.className = 'chatbot-quick-replies';

        replies.forEach(text => {
            const btn = document.createElement('button');
            btn.className = 'chatbot-quick-btn';
            btn.textContent = text;
            btn.addEventListener('click', () => {
                // Remove quick replies
                div.remove();
                addMessage(text, 'user');
                processInput(text);
            });
            div.appendChild(btn);
        });

        messagesEl.appendChild(div);
        scrollToBottom();
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'chatbot-msg chatbot-msg-bot chatbot-typing';
        div.innerHTML = `
            <div class="chatbot-bubble typing-bubble">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>`;
        messagesEl.appendChild(div);
        scrollToBottom();
    }

    function removeTyping() {
        const typing = messagesEl.querySelector('.chatbot-typing');
        if (typing) typing.remove();
    }

    function scrollToBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    document.addEventListener('DOMContentLoaded', init);

    return { open, close, toggle };
})();
