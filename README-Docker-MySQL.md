# Dockerisation MySQL - Simulio

Ce guide explique comment dockeriser la base de données MySQL pour le projet Simulio.

## 🚀 Démarrage rapide

### 1. Démarrer le conteneur MySQL

```bash
# Démarrer le conteneur MySQL
docker-compose up -d mysql

# Vérifier que le conteneur fonctionne
docker-compose ps
```

### 2. Configurer Laravel pour MySQL

```bash
# Copier la configuration MySQL
cp docker-mysql.env back-end/.env

# Générer la clé d'application Laravel
cd back-end
php artisan key:generate

# Installer les dépendances si nécessaire
composer install
```

### 3. Exécuter les migrations

```bash
# Exécuter les migrations Laravel
cd back-end
php artisan migrate

# Optionnel: Exécuter les seeders
php artisan db:seed
```

### 4. Tester la connexion

```bash
# Tester la connexion à la base de données
cd back-end
php artisan tinker
# Dans tinker, exécutez: DB::connection()->getPdo();
```

## 📋 Commandes utiles

### Gestion du conteneur

```bash
# Démarrer MySQL
docker-compose up -d mysql

# Arrêter MySQL
docker-compose down

# Voir les logs
docker-compose logs mysql

# Accéder au conteneur MySQL
docker exec -it simulio_mysql mysql -u simulio_user -p simulio_db
```

### Base de données

```bash
# Réinitialiser la base de données
docker-compose down -v
docker-compose up -d mysql

# Sauvegarder la base de données
docker exec simulio_mysql mysqldump -u simulio_user -p simulio_db > backup.sql

# Restaurer la base de données
docker exec -i simulio_mysql mysql -u simulio_user -p simulio_db < backup.sql
```

## 🔧 Configuration

### Variables d'environnement MySQL

- **Host**: 127.0.0.1 (localhost)
- **Port**: 3306
- **Database**: simulio_db
- **Username**: simulio_user
- **Password**: simulio_password
- **Root Password**: root_password

### Volumes Docker

- **mysql_data**: Persistance des données MySQL
- **./back-end/database/init**: Scripts d'initialisation

## 🐛 Dépannage

### Problèmes courants

1. **Port 3306 déjà utilisé**
   ```bash
   # Changer le port dans docker-compose.yml
   ports:
     - "3307:3306"  # Utiliser le port 3307
   ```

2. **Erreur de connexion Laravel**
   ```bash
   # Vérifier que le conteneur fonctionne
   docker-compose ps
   
   # Vérifier les logs
   docker-compose logs mysql
   ```

3. **Permissions de base de données**
   ```bash
   # Se connecter en tant que root
   docker exec -it simulio_mysql mysql -u root -p
   
   # Vérifier les utilisateurs
   SELECT User, Host FROM mysql.user;
   ```

## 📁 Structure des fichiers

```
├── docker-compose.yml          # Configuration Docker Compose
├── docker-mysql.env           # Configuration Laravel pour MySQL
├── back-end/
│   └── database/
│       └── init/
│           └── 01-init.sql    # Script d'initialisation MySQL
└── README-Docker-MySQL.md     # Ce fichier
```

## ✅ Prochaines étapes

Une fois MySQL dockerisé et testé, nous pourrons procéder à la dockerisation du backend Laravel et de l'API Python.
