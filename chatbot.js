/* ══════════════════════════════════════════
   NEXO DIGITAL — Chatbot Widget
   ══════════════════════════════════════════ */

const ChatBot = (() => {
    // ── Conversation data ──
    const BOT_NAME = 'Nexo Bot';
    const TYPING_DELAY = 800;

    const responses = {
        greeting: {
            text: '¡Hola! 👋 Soy **Nexo Bot**, el asistente virtual de **Nexo Digital**. Estoy acá para responder todas tus dudas. ¿Qué te gustaría saber?',
            quickReplies: ['Servicios', 'Precios', '¿Beneficios de un chatbot?', '¿Cómo obtengo mi chatbot?', 'Contactar']
        },
        servicios: {
            text: 'Ofrecemos estos servicios profesionales:\n\n🖥️ **Sitios Web a Medida** — Diseño y desarrollo único\n🚀 **Landing Pages** — Optimizadas para convertir\n🛒 **Tiendas Online** — E-commerce completo\n🔄 **Rediseño Web** — Modernizá tu sitio actual\n🤖 **Chatbots** — Atención automática 24/7\n\n¿Sobre cuál querés más info?',
            quickReplies: ['Sitios Web', 'Landing Pages', 'E-Commerce', 'Chatbots', 'Precios']
        },
        precios: {
            text: 'Nuestros precios varían según la complejidad del proyecto:\n\n💰 **Landing Page** — desde $60 USD\n💰 **Sitio Web** — desde $150 USD\n💰 **Tienda Online** — desde $250 USD\n💰 **Rediseño Web** — desde $120 USD\n💰 **Chatbot** — desde $100 USD\n\nCada proyecto es único, así que te recomiendo pedirnos un **presupuesto personalizado sin cargo**.',
            quickReplies: ['Pedir presupuesto', 'Servicios', 'Portfolio']
        },
        portfolio: {
            text: 'Tenemos más de **50 proyectos entregados** 🎉\n\nAlgunos de nuestros trabajos recientes:\n\n🍽️ **Sabores del Sur** — Restaurante\n💪 **Vita Fitness** — Centro de entrenamiento\n👗 **Luna Store** — Moda online\n\nPodés ver más en nuestra sección de Portfolio ⬆️',
            quickReplies: ['Servicios', 'Precios', 'Contactar']
        },
        chatbots: {
            text: '¡Los chatbots son nuestro servicio estrella! 🤖\n\nPodemos crear bots para:\n\n💬 **Tu sitio web** — Como este que estás usando ahora\n📱 **WhatsApp** — Respuestas automáticas 24/7\n📸 **Instagram** — Auto-respuesta en DMs\n✈️ **Telegram** — Catálogos y atención\n🧠 **Con IA** — Respuestas inteligentes\n\nDe hecho, **este chat es una demo** de lo que podemos hacer por tu negocio.',
            quickReplies: ['¿Beneficios de un chatbot?', '¿Cómo obtengo mi chatbot?', 'Precios de chatbots']
        },
        '¿beneficios de un chatbot?': {
            text: '¡Excelente pregunta! Un chatbot le da **superpoderes** a tu negocio 💪\n\n🕐 **Atención 24/7** — Respondé consultas incluso mientras dormís. No perdés más clientes fuera de horario.\n\n⚡ **Respuesta instantánea** — Tus clientes no esperan. El bot responde al segundo.\n\n💰 **Más ventas** — Un visitante con dudas no compra. El bot responde esas dudas y lo convierte en cliente.\n\n🔄 **Menos trabajo repetitivo** — ¿Cuántas veces al día te preguntan lo mismo? El bot se encarga.\n\n📊 **Datos valiosos** — Sabé qué preguntan tus clientes, qué les interesa y qué los frena.\n\n👤 **Ahorro de personal** — Un bot reemplaza la atención básica sin sueldos ni horarios.\n\n📱 **Multi-plataforma** — Web, WhatsApp, Instagram... donde estén tus clientes.\n\n**Ejemplo real:** Un restaurante con chatbot aumentó sus reservas un 200% porque el bot atiende de noche cuando la gente planifica salidas.',
            quickReplies: ['¿Cómo obtengo mi chatbot?', 'Precios de chatbots', 'Servicios']
        },
        '¿cómo obtengo mi chatbot?': {
            text: '¡Es muy simple! Obtener tu chatbot personalizado tiene solo **3 pasos** 🚀\n\n**1️⃣ Contanos qué necesitás**\nNos escribís por WhatsApp o completás el formulario. Nos contás sobre tu negocio y qué preguntas te hacen tus clientes.\n\n**2️⃣ Lo diseñamos para vos**\nCreamos un bot personalizado con las respuestas de tu negocio, tus colores y tu estilo. Te mostramos una demo para que lo apruebes.\n\n**3️⃣ Lo instalamos y listo**\nLo integramos en tu web, WhatsApp o Instagram. Te explicamos cómo funciona y te damos soporte.\n\n⏱️ **Tiempo de entrega:** 3 a 7 días\n💰 **Desde:** $100 USD\n🎁 **Incluye:** Configuración + personalización + capacitación\n\n¿Querés arrancar? ¡Escribinos!',
            quickReplies: ['Pedir presupuesto', 'Abrir WhatsApp', 'Precios de chatbots']
        },
        'precios de chatbots': {
            text: 'Los precios de chatbots dependen de la plataforma y funcionalidad:\n\n🤖 **Chat web básico** — desde $100 USD\n📱 **Bot WhatsApp** — desde $250 USD\n📸 **Bot Instagram** — desde $150 USD\n🧠 **Bot con IA** — desde $300 USD\n\nTodos incluyen configuración, personalización y capacitación para que puedas administrarlo.',
            quickReplies: ['Pedir presupuesto', 'Contactar', 'Servicios']
        },
        contactar: {
            text: '¡Con gusto! Podés contactarnos por:\n\n📱 **WhatsApp** — Respuesta inmediata\n📸 **Instagram** — @nexodigital_arg\n📧 **Email** — nexodigital.mmr@gmail.com\n\nO completá el formulario de contacto en nuestra web.\n\n¿Preferís que te contactemos nosotros?',
            quickReplies: ['Abrir WhatsApp', 'Abrir Instagram', 'Ir al formulario', 'Servicios']
        },
        'pedir presupuesto': {
            text: '¡Excelente decisión! 🎯\n\nPara armar tu presupuesto personalizado necesitamos saber:\n\n1️⃣ ¿Qué tipo de servicio necesitás?\n2️⃣ ¿Tenés alguna referencia visual?\n3️⃣ ¿Cuál es tu plazo ideal?\n\nEscribinos por WhatsApp o completá el formulario y te respondemos en menos de **24 horas**.',
            quickReplies: ['Abrir WhatsApp', 'Ir al formulario', 'Volver al inicio']
        },
        'sitios web': {
            text: '🖥️ **Sitios Web a Medida**\n\nCreamos sitios web profesionales 100% personalizados:\n\n✅ Diseño único para tu marca\n✅ 100% responsive (móvil, tablet, PC)\n✅ Optimizado para SEO (Google)\n✅ Carga ultrarrápida\n✅ Panel administrable\n✅ Certificado SSL incluido\n\n**Tiempo de entrega:** 1-3 semanas\n**Desde:** $150 USD',
            quickReplies: ['Pedir presupuesto', 'Otros servicios', 'Portfolio']
        },
        'landing pages': {
            text: '🚀 **Landing Pages**\n\nPáginas diseñadas para **convertir visitantes en clientes**:\n\n✅ Diseño persuasivo y moderno\n✅ Formularios de captura\n✅ Integración con email marketing\n✅ Optimizada para ads (Meta, Google)\n✅ Métricas de conversión\n\n**Tiempo de entrega:** 3-7 días\n**Desde:** $60 USD',
            quickReplies: ['Pedir presupuesto', 'Otros servicios', 'Precios']
        },
        'e-commerce': {
            text: '🛒 **Tiendas Online**\n\nSoluciones e-commerce completas:\n\n✅ Catálogo de productos\n✅ Carrito de compras\n✅ Pasarela de pagos (MercadoPago, etc.)\n✅ Panel de administración\n✅ Gestión de stock\n✅ Notificaciones automáticas\n\n**Tiempo de entrega:** 2-4 semanas\n**Desde:** $250 USD',
            quickReplies: ['Pedir presupuesto', 'Otros servicios', 'Precios']
        },
        'otros servicios': {
            text: '¿Sobre qué servicio te gustaría saber más?',
            quickReplies: ['Sitios Web', 'Landing Pages', 'E-Commerce', 'Chatbots', 'Precios']
        },
        'volver al inicio': {
            text: '¡Sin problema! ¿En qué más puedo ayudarte?',
            quickReplies: ['Servicios', 'Precios', '¿Beneficios de un chatbot?', '¿Cómo obtengo mi chatbot?', 'Contactar']
        },
        default: {
            text: 'Gracias por tu mensaje 😊 Para darte la mejor respuesta, te recomiendo elegir una de estas opciones o contactarnos directamente:',
            quickReplies: ['Servicios', 'Precios', '¿Beneficios de un chatbot?', 'Contactar']
        }
    };

    // ── State ──
    let isOpen = false;
    let hasGreeted = false;

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
        setTimeout(() => inputEl.focus(), 300);
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

        // Special actions
        if (key === 'abrir whatsapp') {
            addMessage('¡Te redirijo a WhatsApp! 📱', 'bot');
            setTimeout(() => window.open('https://wa.me/5493795051607', '_blank'), 1000);
            return;
        }
        if (key === 'abrir instagram') {
            addMessage('¡Te redirijo a Instagram! 📸', 'bot');
            setTimeout(() => window.open('https://www.instagram.com/nexodigital_arg/', '_blank'), 1000);
            return;
        }
        if (key === 'ir al formulario') {
            addMessage('¡Te llevo al formulario! 📝', 'bot');
            setTimeout(() => {
                close();
                document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
            }, 500);
            return;
        }

        // Match response
        let response = responses[key];

        // Fuzzy matching
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
                'web': 'sitios web', 'presupuesto': 'pedir presupuesto',
                'inicio': 'volver al inicio', 'menu': 'volver al inicio',
                'beneficio': '¿beneficios de un chatbot?', 'ventaja': '¿beneficios de un chatbot?',
                'para que sirve': '¿beneficios de un chatbot?', 'para qué sirve': '¿beneficios de un chatbot?',
                'obtener': '¿cómo obtengo mi chatbot?', 'conseguir': '¿cómo obtengo mi chatbot?',
                'cómo funciona': '¿cómo obtengo mi chatbot?', 'como funciona': '¿cómo obtengo mi chatbot?',
                'quiero un bot': '¿cómo obtengo mi chatbot?', 'necesito un bot': '¿cómo obtengo mi chatbot?',
                'gracias': null, 'thanks': null
            };

            for (const [keyword, responseKey] of Object.entries(keywords)) {
                if (key.includes(keyword)) {
                    if (responseKey === null) {
                        showTypingThenRespond({
                            text: '¡De nada! 😄 Estoy acá para lo que necesites.',
                            quickReplies: ['Servicios', 'Precios', 'Contactar']
                        });
                        return;
                    }
                    response = responses[responseKey];
                    break;
                }
            }
        }

        showTypingThenRespond(response || responses.default);
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
