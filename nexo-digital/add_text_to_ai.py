import os
import textwrap
from PIL import Image, ImageDraw, ImageFont

# Rutas
input_image = r"C:\Users\Benjamin Gerik\.gemini\antigravity\brain\1694d285-c1e1-4007-8e4a-35b4cd2bebd2\st_chatbot_pregunta_base_1779337134584.png"
output_dir = os.path.join(os.path.expanduser("~"), "Desktop", "Historias_Nexo_Ilustradas")
os.makedirs(output_dir, exist_ok=True)
output_path = os.path.join(output_dir, "7_pregunta_chatbot_ilustrada.png")

# Cargar imagen base de IA
try:
    img = Image.open(input_image).convert("RGB")
except Exception as e:
    print(f"Error cargando la imagen: {e}")
    exit(1)

width, height = img.size

# Configurar fuentes
try:
    font_title = ImageFont.truetype("arialbd.ttf", 75)
    font_text = ImageFont.truetype("arial.ttf", 45)
except:
    font_title = ImageFont.load_default()
    font_text = font_title

draw = ImageDraw.Draw(img)

# Textos
title = "¿PARA QUE NECESITO\nUN CHATBOT?"
text = "Para responder dudas, vender y captar clientes 24/7 sin que tengas que estar pegado al celular."

# Posicionar titulo (mitad inferior)
bbox_t = draw.multiline_textbbox((0,0), title, font=font_title, align="center")
w_t = bbox_t[2] - bbox_t[0]
y_title = int(height * 0.6) # 60% hacia abajo
draw.multiline_text(((width-w_t)/2, y_title), title, font=font_title, fill="white", align="center")

# Posicionar texto (debajo del titulo)
wrapped_text = textwrap.fill(text, width=35)
bbox_p = draw.multiline_textbbox((0,0), wrapped_text, font=font_text, align="center")
w_p = bbox_p[2] - bbox_p[0]
y_text = y_title + 200
draw.multiline_text(((width-w_p)/2, y_text), wrapped_text, font=font_text, fill="#c4b5fd", align="center", spacing=15)

# Guardar
img.save(output_path)
print(f"Imagen perfecta creada y guardada en: {output_path}")
