import json
import urllib.parse
import os

# Archivos de datos
LEADS_FILE = 'leads.json'
DASHBOARD_FILE = 'crm_dashboard.html'

def cargar_prospectos():
    if not os.path.exists(LEADS_FILE):
        return []
    with open(LEADS_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def obtener_mensaje(prospecto):
    name = prospecto['name']
    angle = prospecto['angle']
    
    templates = {
        "chatbot_whatsapp": (
            f"¡Hola equipo de {name}! Soy de acá de Corrientes. Veo que tienen mucha demanda (¡felicitaciones!). "
            f"Me imagino que los fines de semana el WhatsApp explota preguntando precios y horarios. Armé un boceto gratis de un "
            f"'Nexo Bot' que responde esas preguntas automáticamente al instante. ¿Les gustaría que les mande un "
            f"videíto de 1 minuto mostrando cómo funciona? Capaz les ahorra mucho tiempo."
        ),
        "seo_google": (
            f"¡Hola! Qué tal. Soy especialista en páginas web acá en Corrientes. Vi que tienen muy buenas reseñas en Google, "
            f"pero noté que no tienen una página web propia enlazada. Hoy en día los clientes buscan en Google y van al "
            f"primer lugar que tiene una web clara. Armé un boceto/muestra de diseño inicial 100% gratuito de cómo se vería su "
            f"página web para que vean el cambio. ¿Les gustaría que se las pase sin compromiso?"
        ),
        "landing_turnos": (
            f"¡Hola equipo de {name}! Soy desarrollador web acá en Corrientes. Estuve viendo su perfil y me encantó su trabajo. "
            f"Sé que coordinar turnos por mensaje toma mucho tiempo y a veces se pierden clientes. Armé un boceto de diseño inicial "
            f"gratuito de una landing de reservas online donde sus clientes pueden agendar su turno en 3 clics las 24 hs. "
            f"¿Les paso el link para que lo miren sin compromiso?"
        ),
        "landing_inscripcion": (
            f"¡Hola equipo de {name}! Soy desarrollador web de Corrientes. Estaba viendo su perfil y se ve genial la comunidad "
            f"que tienen. Se me ocurrió que para lanzar sus clases especiales o promociones les serviría mucho tener una "
            f"landing page ultra rápida. Armé un boceto de diseño gratis de cómo se vería para registrar alumnos directo a su "
            f"WhatsApp. ¿Les gustaría que les pase el link de la muestra para que lo miren?"
        ),
        "ecommerce_menu": (
            f"¡Hola equipo de {name}! Soy de Corrientes. Siempre escucho excelentes recomendaciones de sus platos. "
            f"Vi que están en PedidosYa, pero me imagino que las comisiones les comen gran parte de la ganancia. "
            f"Armé un boceto de un menú digital interactivo propio con carrito de compras para que sus clientes les compren directo a su "
            f"WhatsApp sin pagar comisiones. ¿Les paso el link para que vean cómo funciona? Es gratis y sin compromiso."
        )
    }
    
    return templates.get(angle, f"¡Hola equipo de {name}! ¿Cómo están? Quería comentarles sobre Nexo Digital y nuestro boceto gratis...")

def generar_dashboard():
    prospectos = cargar_prospectos()
    if not prospectos:
        print("No se encontraron prospectos en leads.json")
        return

    html_content = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nexo Digital | Panel de Prospección Semi-Automático</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --bg-dark: #06060e;
            --bg-card: #0f0f23;
            --border-subtle: rgba(255, 255, 255, 0.05);
            --border-accent: rgba(99, 102, 241, 0.2);
            --text-primary: #f1f5f9;
            --text-secondary: #94a3b8;
            --accent: #6366f1;
            --accent-green: #10b981;
            --accent-pink: #ec4899;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-primary);
            margin: 0;
            padding: 40px 20px;
            display: flex;
            justify-content: center;
        }

        .container {
            width: 100%;
            max-width: 1100px;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            border-bottom: 1px solid var(--border-subtle);
            padding-bottom: 20px;
        }

        h1 {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 1.8rem;
            font-weight: 800;
            margin: 0;
        }

        h1 span {
            color: var(--accent);
        }

        .badge-count {
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid var(--border-accent);
            padding: 6px 16px;
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--accent);
        }

        .dashboard-desc {
            color: var(--text-secondary);
            font-size: 0.95rem;
            margin-bottom: 24px;
            line-height: 1.5;
        }

        .lead-card {
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .lead-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 12px;
        }

        .lead-info h2 {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 1.25rem;
            margin: 0 0 6px 0;
        }

        .lead-meta {
            display: flex;
            gap: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .meta-tag {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid var(--border-subtle);
            padding: 4px 10px;
            border-radius: 6px;
            color: var(--text-secondary);
        }

        .meta-tag.niche {
            color: var(--accent);
            border-color: var(--border-accent);
            background: rgba(99, 102, 241, 0.05);
        }

        .lead-problem {
            background: rgba(255, 255, 255, 0.02);
            border-left: 3px solid var(--accent);
            padding: 10px 16px;
            border-radius: 0 8px 8px 0;
            font-size: 0.88rem;
            color: var(--text-secondary);
        }

        .lead-message-box {
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--border-subtle);
            border-radius: 10px;
            padding: 16px;
            font-size: 0.9rem;
            line-height: 1.5;
            position: relative;
            color: #d1d5db;
        }

        .copy-hint {
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border-subtle);
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 0.75rem;
            cursor: pointer;
            color: var(--text-secondary);
            transition: all 0.2s;
        }

        .copy-hint:hover {
            background: var(--accent);
            color: white;
            border-color: var(--accent);
        }

        .lead-actions {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-top: 4px;
        }

        .btn-action {
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 0.88rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            border: none;
            transition: all 0.2s;
        }

        .btn-wa {
            background-color: var(--accent-green);
            color: white;
        }

        .btn-wa:hover {
            background-color: #059669;
            transform: translateY(-1px);
        }

        .btn-ig {
            background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
            color: white;
        }

        .btn-ig:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--accent);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            font-size: 0.9rem;
            font-weight: 600;
            display: none;
            z-index: 1000;
        }
    </style>
</head>
<body>

    <div class="container">
        <header>
            <div>
                <h1>Nexo<span>CRM</span></h1>
                <p style="color: var(--text-secondary); margin: 6px 0 0 0; font-size: 0.9rem;">Panel de Prospección Local Semi-Automático</p>
            </div>
            <div class="badge-count" id="leadCounter">0 Prospectos</div>
        </header>

        <p class="dashboard-desc">
            <strong>Cómo funciona:</strong> Revisa el problema del cliente y el mensaje personalizado de abajo. 
            Haz clic en <strong>Enviar por WhatsApp</strong> para abrir el chat con el mensaje pre-cargado, o haz clic en <strong>Copiar Texto</strong> y luego en <strong>Ir a Instagram</strong> para enviárselo por Mensaje Directo. ¡Rápido, personalizado y sin riesgo de bloqueos!
        </p>

        <div id="leadsList">
            <!-- Los leads se inyectarán aquí -->
        </div>
    </div>

    <div class="toast" id="toast">¡Texto copiado al portapapeles!</div>

    <script>
        const leads = 
"""

    # Inyectar leads dinámicamente con sus mensajes y URL de WhatsApp codificada
    for lead in prospectos:
        msg = obtener_mensaje(lead)
        lead['message'] = msg
        lead['wa_link'] = f"https://api.whatsapp.com/send?phone={lead['phone']}&text={urllib.parse.quote(msg)}"
        lead['ig_link'] = f"https://instagram.com/{lead['instagram']}"

    # Convertir a JSON seguro para JS
    leads_json = json.dumps(prospectos, ensure_ascii=False, indent=12)
    
    html_content += leads_json + """
        ;

        document.getElementById('leadCounter').innerText = `${leads.length} Prospectos Cargados`;

        const leadsList = document.getElementById('leadsList');
        leads.forEach(lead => {
            const card = document.createElement('div');
            card.className = 'lead-card';
            card.innerHTML = `
                <div class="lead-header">
                    <div class="lead-info">
                        <h2>${lead.name}</h2>
                        <div class="lead-meta">
                            <span class="meta-tag niche">${lead.niche}</span>
                            <span class="meta-tag">Ángulo: ${lead.angle.replace('_', ' ')}</span>
                        </div>
                    </div>
                </div>
                
                <div class="lead-problem">
                    <strong>Problema detectado:</strong> ${lead.problem}
                </div>

                <div class="lead-message-box">
                    <span class="copy-hint" onclick="copyMessage('${lead.id}', this)">
                        <i class="fa-regular fa-copy"></i> Copiar Texto
                    </span>
                    <span id="msg-${lead.id}">${lead.message}</span>
                </div>

                <div class="lead-actions">
                    <a href="${lead.wa_link}" target="_blank" class="btn-action btn-wa">
                        <i class="fa-brands fa-whatsapp"></i> Enviar por WhatsApp
                    </a>
                    <a href="${lead.ig_link}" target="_blank" class="btn-action btn-ig">
                        <i class="fa-brands fa-instagram"></i> Ir a Instagram (@${lead.instagram})
                    </a>
                </div>
            `;
            leadsList.appendChild(card);
        });

        function copyMessage(id, btnElement) {
            const text = document.getElementById(`msg-${id}`).innerText;
            navigator.clipboard.writeText(text).then(() => {
                showToast();
                
                // Efecto visual temporal en el botón
                const originalText = btnElement.innerHTML;
                btnElement.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
                btnElement.style.background = 'var(--accent-green)';
                btnElement.style.color = 'white';
                
                setTimeout(() => {
                    btnElement.innerHTML = originalText;
                    btnElement.style.background = '';
                    btnElement.style.color = '';
                }, 2000);
            });
        }

        function showToast() {
            const toast = document.getElementById('toast');
            toast.style.display = 'block';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 2500);
        }
    </script>
</body>
</html>
"""

    with open(DASHBOARD_FILE, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"CRM Dashboard generado exitosamente en: {DASHBOARD_FILE}")

if __name__ == '__main__':
    generar_dashboard()
