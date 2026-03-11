import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // 1. Forzar emulación de pantalla (screen) en lugar de print para mantener colores vivos
  await page.emulateMediaType('screen');

  const url = 'http://localhost:5173/CV'; 
  console.log(`Navegando a ${url}...`);

  await page.goto(url, {
    waitUntil: 'networkidle0',
  });

  // 2. Esperar un poco extra para que Framer Motion termine las animaciones
  await new Promise(r => setTimeout(r, 1000));

  // 3. Inyectar estilos para forzar visibilidad y colores
  await page.addStyleTag({
    content: `
      /* Eliminar elementos innecesarios */
      nav, footer, .download-btn { display: none !important; }

      /* Forzar que las animaciones de Framer Motion estén al final (opacidad 1) */
      * { 
        transition: none !important; 
        animation: none !important; 
        opacity: 1 !important; 
        transform: none !important; 
      }

      /* Forzar colores vivos y evitar ahorro de tinta */
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        background: white !important;
      }

      .min-h-screen { padding-top: 0 !important; }
    `
  });

  console.log('Generando PDF con colores optimizados...');
  await page.pdf({
    path: 'public/CV-Yucef-Hernandez.pdf',
    format: 'Letter',
    scale: 0.75,
    printBackground: true,
    margin: {
      top: '4mm',
      right: '4mm',
      bottom: '10mm',
      left: '4mm'
    }
  });

  console.log('PDF generado con éxito.');
  await browser.close();
})();

