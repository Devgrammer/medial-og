const puppeteer = require('puppeteer');

exports.handler = async function (event, context) {
    if (event.httpMethod === 'OPTIONS') {
        // Handle CORS preflight request
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
            },
        };
    }

    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allow all origins
                },
                body: JSON.stringify({ error: 'No data provided' }),
            };
        }

        let data;
        try {
            data = JSON.parse(event.body);
        } catch (e) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allow all origins
                },
                body: JSON.stringify({ error: 'Invalid JSON format' }),
            };
        }

        const { title, content, image } = data;

        if (!title || !content) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allow all origins
                },
                body: JSON.stringify({ error: 'Title and content are required' }),
            };
        }

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
                'Access-Control-Allow-Origin': '*', // Allow all origins
            },
            body: imageBuffer.toString('base64'),
            isBase64Encoded: true,
        };
    } catch (error) {
        console.error('Error generating OG image:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow all origins
            },
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
};
