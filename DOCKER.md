# Guide Docker - Simulio

Ce guide explique comment utiliser Docker pour développer et déployer l'application Simulio.

## 🐳 Services Docker

### MySQL (Port 3308)

- **Image** : mysql:8.0
- **Base de données** : simulio_db
- **Utilisateur** : simulio_user
- **Mot de passe** : simulio_password

### Backend Laravel (Port 8000)

- **Image** : PHP 8.2 + Apache
- **API REST** : http://localhost:8000/api
- **Page d'accueil** : http://localhost:8000

### Frontend React (Port 5173)

- **Image** : Node.js 20 + Vite
- **Interface** : http://localhost:5173
- **Mode développement** : Hot reload activé

### API Python (Port 5001)

- **Image** : Python + Flask
- **Calculs financiers** : http://localhost:5001/simulate

## 🚀 Commandes essentielles

### Démarrage

```bash
# Lancer tous les services
docker-compose up -d

# Lancer avec reconstruction
docker-compose up --build -d

# Lancer en mode debug (voir les logs)
docker-compose up
```

### Gestion des services

```bash
# Voir le statut des conteneurs
docker-compose ps

# Voir les logs
docker-compose logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql

# Redémarrer un service
docker-compose restart backend
docker-compose restart frontend

# Arrêter tous les services
docker-compose down
```

### Base de données

```bash
# Se connecter à MySQL
docker exec -it simulio_mysql mysql -u simulio_user -p simulio_db

# Sauvegarder la base de données
docker exec simulio_mysql mysqldump -u simulio_user -p simulio_db > backup.sql

# Restaurer la base de données
docker exec -i simulio_mysql mysql -u simulio_user -p simulio_db < backup.sql
```

### Développement

```bash
# Accéder au conteneur backend
docker exec -it simulio_backend bash

# Accéder au conteneur frontend
docker exec -it simulio_frontend sh

# Exécuter des commandes Laravel
docker exec simulio_backend php artisan migrate
docker exec simulio_backend php artisan tinker
```

## 🔧 Configuration

### Variables d'environnement

- **Backend** : Configuré via docker-compose.yml
- **Frontend** : VITE_API_URL=http://localhost:8000
- **MySQL** : Variables dans docker-compose.yml

### Volumes

- **Code source** : Monté en temps réel pour le développement
- **node_modules** : Volume persistant pour les dépendances
- **vendor** : Volume persistant pour Composer
- **mysql_data** : Volume persistant pour la base de données

## 🐛 Dépannage

### Problèmes courants

1. **Port déjà utilisé**

```bash
# Changer les ports dans docker-compose.yml
ports:
  - "3309:3306"  # MySQL sur port 3309
  - "8001:80"    # Laravel sur port 8001
```

2. **Conteneur ne démarre pas**

```bash
# Voir les logs détaillés
docker-compose logs [service_name]

# Reconstruire l'image
docker-compose build --no-cache [service_name]
```

3. **Base de données corrompue**

```bash
# Supprimer le volume et redémarrer
docker-compose down -v
docker-compose up -d
```

4. **Permissions de fichiers**

```bash
# Corriger les permissions Laravel
docker exec simulio_backend chown -R www-data:www-data /var/www/html
docker exec simulio_backend chmod -R 755 /var/www/html/storage
```

## 📊 Monitoring

### Ressources système

```bash
# Voir l'utilisation des ressources
docker stats

# Voir l'espace disque utilisé
docker system df
```

### Logs en temps réel

```bash
# Suivre les logs en temps réel
docker-compose logs -f

# Logs d'un service spécifique
docker-compose logs -f backend
```

## 🔄 Workflow de développement

1. **Modifier le code** : Les changements sont reflétés automatiquement
2. **Tester** : Accéder à http://localhost:5173
3. **Debug** : Utiliser `docker-compose logs` pour voir les erreurs
4. **Commit** : Les volumes persistent les données entre les redémarrages

## 🚀 Production

Pour la production, modifiez :

- Les ports exposés
- Les variables d'environnement
- La configuration de sécurité
- Les volumes (utilisez des volumes nommés)
