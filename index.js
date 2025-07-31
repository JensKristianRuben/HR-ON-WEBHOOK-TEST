const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

const WEBHOOK_TOKEN = process.env.HRON_WEBHOOK_TOKEN;
console.log(process.env.HRON_WEBHOOK_TOKEN);
console.log(WEBHOOK_TOKEN);



app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.json());


app.use('/webhook', (req, res, next) => {
    const token = req.header('X-HR-ON-Token');
    if (!token || token !== WEBHOOK_TOKEN) {
        console.log('Ugyldig eller manglende token');
        return res.status(401).send('Unauthorized');
    }
    next();
});

app.post('/webhook', (req, res) => {
    const contentType = req.headers['content-type'] || '';

    if (contentType.includes('text/plain')) {
        // Verifikation: returner nøjagtig body som respons
        console.log('Verifikation kaldt med body:', req.body);
        res.type('text/plain').send(req.body);
    } else {
        // Normalt event
        console.log('Webhook event modtaget:', req.body);

        // TODO: Her kan du indsætte din business logik

        res.status(200).send('Webhook modtaget');
    }
});

app.listen(port, () => {
    console.log(`Server kører på http://localhost:${port}`);
});
