
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Consultation Sarah Cohen',
                        },
                        unit_amount: 8000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://www.tonsite.com/success.html',
            cancel_url: 'https://www.tonsite.com/cancel.html',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Erreur lors de la création de la session Stripe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('❌ Erreur webhook:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log(`✅ Paiement confirmé pour la session ${session.id}`);
    }

    res.status(200).send('Received');
});

app.listen(port, () => {
    console.log(`✅ Serveur webhook lancé sur le port ${port}`);
});
