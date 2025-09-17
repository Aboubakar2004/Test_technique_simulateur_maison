-- Script d'initialisation de la base de données MySQL pour Simulio
-- Ce script sera exécuté automatiquement lors du premier démarrage du conteneur MySQL

-- Créer la base de données si elle n'existe pas déjà
CREATE DATABASE IF NOT EXISTS simulio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Utiliser la base de données
USE simulio_db;

-- Créer l'utilisateur si il n'existe pas déjà
CREATE USER IF NOT EXISTS 'simulio_user'@'%' IDENTIFIED BY 'simulio_password';

-- Accorder tous les privilèges sur la base de données à l'utilisateur
GRANT ALL PRIVILEGES ON simulio_db.* TO 'simulio_user'@'%';

-- Appliquer les changements
FLUSH PRIVILEGES;
