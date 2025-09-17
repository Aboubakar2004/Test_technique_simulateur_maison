#!/bin/bash

# Attendre que MySQL soit prêt
echo "En attente de MySQL..."
while ! php -r "try { new PDO('mysql:host=mysql;port=3306;dbname=simulio_db', 'simulio_user', 'simulio_password'); echo 'MySQL est prêt!'; } catch (Exception \$e) { exit(1); }" 2>/dev/null; do
    echo "MySQL n'est pas encore prêt..."
    sleep 2
done

echo "MySQL est prêt !"

# Générer la clé d'application si elle n'existe pas
if [ ! -f /var/www/html/.env ]; then
    echo "Création du fichier .env..."
    cp /var/www/html/docker-mysql.env /var/www/html/.env
fi

# Générer la clé d'application Laravel
echo "Génération de la clé d'application..."
php artisan key:generate --force

# Exécuter les migrations
echo "Exécution des migrations..."
php artisan migrate --force

# Nettoyer le cache
echo "Nettoyage du cache..."
php artisan config:clear
php artisan cache:clear

echo "Laravel est prêt !"

# Démarrer Apache
exec apache2-foreground
