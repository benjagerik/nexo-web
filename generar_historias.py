import os
import sys
import subprocess

def install_pillow():
    try:
        import PIL
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])

install_pillow()

from PIL import Image, ImageDraw, ImageFont

# Create directory on Desktop
desktop = os.path.join(os.path.expanduser("~"), "Desktop", "Nexo_Historias")
os.makedirs(desktop, exist_ok=True)

# Image size (Instagram story)
width = 1080
height = 1920

def create_gradient():
    # Simple top-to-bottom gradient
    base = Image.new('RGB', (width, height), '#1e1b4b') # Dark indigo
    top = Image.new('RGB', (width, height), '#4c1d95')  # Vibrant purple
    mask = Image.new('L', (width, height))
    mask_data = []
    for y in range(height):
        # 0 at top, 255 at bottom
        val = int(255 * (y / height))
        mask_data.extend([val] * width)
    mask.putdata(mask_data)
    top.paste(base, (0,0), mask)
    return top

try:
    # Try to load Arial Bold for Windows
    font = ImageFont.truetype("arialbd.ttf", 100)
    sub_font = ImageFont.truetype("arial.ttf", 45)
except:
    font = ImageFont.load_default()
    sub_font = font

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
    
    # Draw title
    bbox = draw.textbbox((0, 0), title, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    draw.text(((width-w)/2, height/2 - 100), title, font=font, fill="white")
    
    # Draw subtitle
    bbox_sub = draw.textbbox((0, 0), sub, font=sub_font)
    w_sub = bbox_sub[2] - bbox_sub[0]
    draw.text(((width-w_sub)/2, height/2 + 50), sub, font=sub_font, fill="#c4b5fd")
    
    img.save(os.path.join(desktop, filename))

print(f"Completado! Las historias estan en el Escritorio, en la carpeta Nexo_Historias")
