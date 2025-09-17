# Simulio - Simulateur de Prêt Immobilier

Application web de simulation de prêts immobiliers avec interface moderne. Comprend un frontend React, un backend Laravel et une API Python pour les calculs financiers.

## Technologies

- **Frontend** : React 19, Vite, CSS3
- **Backend** : Laravel 12, PHP 8.2, SQLite
- **API Python** : Flask, Pandas, NumPy

## Installation

### 1. Backend Laravel

```bash
cd back-end
composer install
cp .env.example .env
php artisan key:generate
# Windows PowerShell
New-Item database/database.sqlite -ItemType File
# Mac/Linux
touch database/database.sqlite
php artisan migrate
php artisan serve
```

### 2. API Python

```bash
cd back-end/python-api
pip install flask flask-cors pandas numpy numpy-financial
python app.py
```

### 3. Frontend React

```bash
cd front-end
npm install
npm run dev
```

## Accès

- **Frontend** : http://localhost:5173
- **Backend** : http://localhost:8000
- **API Python** : http://localhost:5001

## Fonctionnalités

- Simulation de prêt immobilier
- Authentification utilisateur
- Sauvegarde des simulations
- Historique personnel
