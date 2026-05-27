# EarthDefender

Jeu de type Space Invaders développé en TypeScript/POO.

## Programme
POO - TypeScript

## Prérequis
- Git (pour cloner le dépôt)
- Docker (pour la version conteneurisée)
- Un navigateur moderne

## Installation & Configuration

### En local
Cloner le projet et ouvrir `index.html` dans votre navigateur.

### Avec Docker
```bash
docker build -t earthdefender-app .
docker run -p 8087:80 --name earthdefender-app earthdefender-app
```
Ouvrir http://localhost:8087

## Port
| Hôte | Conteneur |
|------|-----------|
| 8087 | 80        |