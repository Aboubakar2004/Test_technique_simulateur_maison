# Simulio - Simulateur de Prêt Immobilier

Application web de simulation de prêts immobiliers avec interface moderne. Comprend un frontend React, un backend Laravel et une API Python pour les calculs financiers.

## Démarrage rapide

### Prérequis

- Docker et Docker Compose installés

### Installation

```bash
git clone <url-du-repo>
cd test_technique
docker-compose up -d

# Dans le dossier back-end
cp .env.example .env

docker compose up --build
```

### Accès

- Frontend : http://localhost:5173
- Backend API : http://localhost:8000
- phpMyAdmin : http://localhost:8080
- MySQL (clients externes) : localhost:3308

## Commandes utiles

```bash
# Lancer avec reconstruction
docker-compose up --build -d

# Voir les logs
docker-compose logs

# Arrêter l'application
docker-compose down
```

## Architecture

### Services

- MySQL : Base de données (port 3308)
- Backend Laravel : API REST (port 8000)
- Frontend React : Interface utilisateur (port 5173)
- API Python : Calculs financiers (port 5001)

### Technologies

- Frontend : React 19, Vite
- Backend : Laravel 12, PHP 8.2, MySQL
- API Python : Flask, Pandas, NumPy

## Fonctionnalités

- Authentification utilisateur
- Simulation de prêts immobiliers
- Sauvegarde des simulations
- Interface responsive

## Dépannage

### Port déjà utilisé

```bash
netstat -an | findstr ":5173\|:8000\|:3308\|:5001"
```

### Conteneurs qui ne démarrent pas

```bash
docker-compose logs [service_name]
```

### Base de données non accessible

```bash
docker exec simulio_mysql mysql -u simulio_user -p simulio_db
```

## Installation manuelle (sans Docker)

### Backend Laravel

```bash
cd back-end
composer install
cp docker-mysql.env .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### API Python

```bash
cd back-end/python-api
pip install flask flask-cors pandas numpy numpy-financial
python app.py
```

### Frontend React

```bash
cd front-end
npm install
npm run dev
```
