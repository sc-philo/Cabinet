
# Sarah Cohen - Webhook Server (Render)

Ce projet est destiné à gérer les paiements Stripe via un webhook sécurisé pour le site Sarah Cohen.

## 📌 Installation locale (développement)

1. Cloner le dépôt
2. Installer les dépendances :
```bash
npm install
```
3. Remplir le fichier `.env` avec vos clés Stripe
4. Lancer le serveur :
```bash
node server.js
```

## 🚀 Déploiement Render

- Lier ce dépôt à Render -> New Web Service
- Ajouter les variables d'environnement via le dashboard (STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET)
- Déployer

## 🔐 Sécurité

Les clés sensibles ne sont jamais exposées. Le webhook est validé via signature Stripe.
