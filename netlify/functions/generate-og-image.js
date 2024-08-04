const puppeteer = require('puppeteer');

exports.handler = async function (event, context) {
    const { title, content, image } = JSON.parse(event.body);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(`
    <html>
      <body style="width: 1200px; height: 630px; background: #f4f4f4; text-align: center; padding: 50px;">
        <h1 style="font-size: 60px; color: #333;">${title}</h1>
        <p style="font-size: 40px; color: #666;">${content}</p>
        ${image ? `<img src="${image}" alt="Post Image" style="max-width: 100%;"/>` : ''}
      </body>
    </html>
  `);

    const imageBuffer = await page.screenshot({ type: 'png', fullPage: true });
    await browser.close();

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'max-age=3600',
        },
        body: imageBuffer.toString('base64'),
        isBase64Encoded: true,
    };
};
