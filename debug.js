import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  const rects = await page.evaluate(() => {
    const getRect = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return { 
        id: el.id || el.className, 
        y: rect.y, 
        height: rect.height, 
        bottom: rect.bottom,
        width: rect.width
      };
    };

    return {
      experience: getRect('#experience'),
      contact: getRect('#contact'),
      contactForm: getRect('#contact-form'),
      contactSubmitBtn: getRect('#contact-submit-btn'),
      contactText: getRect('#contact h2')
    };
  });

  console.log(JSON.stringify(rects, null, 2));
  await browser.close();
})();
