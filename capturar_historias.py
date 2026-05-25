import asyncio
import os
import sys
import subprocess

# Install playwright if needed
try:
    from playwright.async_api import async_playwright
except ImportError:
    print("Instalando playwright...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "playwright"])
    from playwright.async_api import async_playwright

async def main():
    output_dir = os.path.join(os.path.expanduser("~"), "Desktop", "Historias_Nexo_Finales")
    os.makedirs(output_dir, exist_ok=True)
    
    html_path = os.path.abspath("historias.html")
    file_url = f"file:///{html_path.replace(os.sep, '/')}"
    
    names = [
        "01_sitios_web.png",
        "02_landing_pages.png",
        "03_tiendas_online.png",
        "04_chatbots_ia.png",
        "05_rediseno_web.png",
        "06_contacto.png",
        "07_chatbot_intro.png",
        "08_chatbot_demo.png"
    ]
    
    async with async_playwright() as p:
        # Launch browser with device scale factor of 2.4 (450*2.4=1080, 800*2.4=1920)
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={"width": 600, "height": 900},
            device_scale_factor=2.4
        )
        page = await context.new_page()
        
        await page.goto(file_url, wait_until="networkidle")
        # Wait for fonts to load
        await page.wait_for_timeout(3000)
        
        cards = page.locator(".story-card")
        count = await cards.count()
        
        for i in range(count):
            card = cards.nth(i)
            filepath = os.path.join(output_dir, names[i])
            await card.screenshot(path=filepath)
            print(f"Capturada: {names[i]} (1080x1920)")
        
        await browser.close()
    
    print(f"\nListo! Las {count} historias estan en tu Escritorio, carpeta 'Historias_Nexo_Finales'")

asyncio.run(main())

