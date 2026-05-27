import os
import textwrap
from PIL import Image, ImageDraw, ImageFont

# Carpeta en el Escritorio
desktop = os.path.join(os.path.expanduser("~"), "Desktop", "Historias_Nexo")
os.makedirs(desktop, exist_ok=True)

width = 1080
height = 1920

# Crear gradiente
base = Image.new('RGB', (width, height), '#1e1b4b')
top = Image.new('RGB', (width, height), '#4c1d95')
mask = Image.new('L', (width, height))
mask_data = []
for y in range(height):
    mask_data.extend([int(255 * (y / height))] * width)
mask.putdata(mask_data)
top.paste(base, (0,0), mask)

try:
    font_title = ImageFont.truetype("arialbd.ttf", 85)
    font_text = ImageFont.truetype("arial.ttf", 55)
except:
    font_title = ImageFont.load_default()
    font_text = font_title

draw = ImageDraw.Draw(top)

title = "¿PARA QUE NECESITO\nUN CHATBOT?"
text = "Para responder dudas, vender y captar clientes 24/7 sin que tengas que estar pegado al celular."

# Título centrado
bbox_t = draw.multiline_textbbox((0,0), title, font=font_title, align="center")
w_t = bbox_t[2] - bbox_t[0]
draw.multiline_text(((width-w_t)/2, 700), title, font=font_title, fill="white", align="center")

# Texto envuelto (wrap) y centrado
wrapped_text = textwrap.fill(text, width=35)
bbox_p = draw.multiline_textbbox((0,0), wrapped_text, font=font_text, align="center")
w_p = bbox_p[2] - bbox_p[0]
draw.multiline_text(((width-w_p)/2, 950), wrapped_text, font=font_text, fill="#c4b5fd", align="center", spacing=20)

filepath = os.path.join(desktop, "7_intro_chatbot.png")
top.save(filepath)
print(f"Creada: 7_intro_chatbot.png en {desktop}")
