import os
import sys
import subprocess

# Asegurar que Pillow este instalado para generar las imagenes
try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Instalando Pillow...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
    from PIL import Image, ImageDraw, ImageFont

# Crear carpeta en el Escritorio
desktop = os.path.join(os.path.expanduser("~"), "Desktop", "Historias_Nexo")
os.makedirs(desktop, exist_ok=True)

# Tamaño de historia de Instagram (1080x1920)
width = 1080
height = 1920

def create_gradient():
    # Gradiente de azul oscuro a violeta
    base = Image.new('RGB', (width, height), '#1e1b4b')
    top = Image.new('RGB', (width, height), '#4c1d95')
    mask = Image.new('L', (width, height))
    mask_data = []
    for y in range(height):
        val = int(255 * (y / height))
        mask_data.extend([val] * width)
    mask.putdata(mask_data)
    top.paste(base, (0,0), mask)
    return top

try:
    # Intenta usar una fuente bold de Windows
    font = ImageFont.truetype("arialbd.ttf", 110)
    sub_font = ImageFont.truetype("arial.ttf", 50)
except:
    font = ImageFont.load_default()
    sub_font = font

# Lista de servicios
stories = [
    ("SITIOS WEB", "DISENO A MEDIDA", "1_sitios_web.png"),
    ("LANDING PAGES", "ALTA CONVERSION", "2_landing_pages.png"),
    ("TIENDAS ONLINE", "ABIERTO 24/7", "3_tiendas_online.png"),
    ("REDISENO WEB", "MODERNIZA TU SITIO", "4_rediseno.png"),
    ("CHATBOTS", "ATENCION 24/7 CON IA", "5_chatbots.png"),
    ("PAQUETE NEXO", "WEB + LANDING + CHATBOT", "6_combo.png")
]

for title, sub, filename in stories:
    img = create_gradient()
    draw = ImageDraw.Draw(img)
    
    # Dibujar Titulo
    bbox = draw.textbbox((0, 0), title, font=font)
    w = bbox[2] - bbox[0]
    draw.text(((width-w)/2, height/2 - 150), title, font=font, fill="white")
    
    # Dibujar Subtitulo
    bbox_sub = draw.textbbox((0, 0), sub, font=sub_font)
    w_sub = bbox_sub[2] - bbox_sub[0]
    draw.text(((width-w_sub)/2, height/2 + 50), sub, font=sub_font, fill="#c4b5fd")
    
    # Guardar en el escritorio
    filepath = os.path.join(desktop, filename)
    img.save(filepath)
    print(f"Creada: {filename}")

print(f"\n¡Exito! Las 6 imagenes perfectas se guardaron en tu Escritorio, en la carpeta 'Historias_Nexo'")
