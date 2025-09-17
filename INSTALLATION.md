# Instructions d'installation - Simulio

## Prérequis

- Docker et Docker Compose installés sur votre machine
- Git

## Installation

1. **Cloner le repository**

   ```bash
   git clone <votre-repo-url>
   cd test_technique
   ```

2. **Lancer l'application**

   ```bash
   docker compose up --build
   ```

3. **Attendre le démarrage complet**
   - MySQL démarre en premier
   - Le backend attend que MySQL soit prêt
   - Les migrations s'exécutent automatiquement
   - L'application est prête quand vous voyez "Laravel est prêt !"

## Accès aux services

- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:8000/api
- **phpMyAdmin** : http://localhost:8080
- **Python API** : http://localhost:5001

## Configuration de la base de données

- **Host** : mysql (dans Docker) / localhost (depuis l'extérieur)
- **Port** : 3306 (dans Docker) / 3308 (depuis l'extérieur)
- **Base de données** : simulio_db
- **Utilisateur** : simulio_user
- **Mot de passe** : simulio_password

## Commandes utiles

```bash
# Arrêter l'application
docker compose down

# Arrêter et supprimer les volumes (base de données)
docker compose down -v

# Voir les logs
docker compose logs backend
docker compose logs frontend
docker compose logs mysql

# Redémarrer un service
docker compose restart backend
```

## Dépannage

### Problème de migration

Si vous rencontrez des erreurs de migration, supprimez les volumes et relancez :

```bash
docker compose down -v
docker compose up --build
```

### Problème de ports

Si les ports sont déjà utilisés, modifiez les ports dans `docker-compose.yml`

### Problème de permissions

Sur Linux/Mac, vous pourriez avoir besoin de :

```bash
sudo chown -R $USER:$USER .
```

## Structure du projet

```
├── back-end/          # API Laravel
├── front-end/         # Application React
├── docker-compose.yml # Configuration Docker
├── docker-mysql.env   # Configuration de base de données
└── README.md
```

## API Endpoints

### Authentification

- `POST /api/register` - Inscription
- `POST /api/login` - Connexion
- `GET /api/me` - Profil utilisateur (authentifié)

### Simulations

- `GET /api/simulation/history` - Historique des simulations (authentifié)
- `POST /api/simulation/save` - Sauvegarder une simulation (authentifié)
- `DELETE /api/simulation/{id}` - Supprimer une simulation (authentifié)

### Test

- `GET /api/test` - Test de l'API
