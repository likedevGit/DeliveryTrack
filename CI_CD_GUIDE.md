# Guide CI/CD GitLab - DeliveryTrack

## Configuration du Pipeline GitLab

### 1. Variables d'environnement à configurer

Dans GitLab, va dans **Settings > CI/CD > Variables** et ajoute :

#### Variables obligatoires :
```
CI_REGISTRY_USER          # Utilisateur du registry GitLab
CI_REGISTRY_PASSWORD      # Mot de passe du registry GitLab
SSH_PRIVATE_KEY          # Clé SSH privée pour déploiement
```

#### Variables pour staging :
```
STAGING_HOST             # IP/hostname du serveur staging
STAGING_USER             # Utilisateur SSH pour staging
```

#### Variables pour production :
```
PRODUCTION_HOST          # IP/hostname du serveur production
PRODUCTION_USER          # Utilisateur SSH pour production
```

### 2. Configuration des serveurs

#### Serveur Staging :
```bash
# Créer le répertoire
mkdir -p /opt/deliverytrack
cd /opt/deliverytrack

# Créer le fichier docker-compose.staging.yml
# (copier le contenu du fichier dans le repo)

# Donner les permissions
chown -R $USER:$USER /opt/deliverytrack
chmod +x /opt/deliverytrack
```

#### Serveur Production (Docker Swarm) :
```bash
# Initialiser Docker Swarm (si pas déjà fait)
docker swarm init

# Créer le répertoire
mkdir -p /opt/deliverytrack
cd /opt/deliverytrack

# Créer le fichier docker-compose.production.yml
# (copier le contenu du fichier dans le repo)

# Donner les permissions
chown -R $USER:$USER /opt/deliverytrack
chmod +x /opt/deliverytrack
```

### 3. Configuration SSH

#### Générer une clé SSH :
```bash
ssh-keygen -t rsa -b 4096 -C "gitlab-ci@deliverytrack.com"
```

#### Ajouter la clé publique sur les serveurs :
```bash
# Sur staging et production
echo "VOTRE_CLE_PUBLIQUE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

#### Ajouter la clé privée dans GitLab :
- Va dans **Settings > CI/CD > Variables**
- Ajoute `SSH_PRIVATE_KEY` avec le contenu de la clé privée
- Coche "Protected" et "Masked"

### 4. Workflow du Pipeline

#### Branches :
- **main** : Production (déploiement manuel)
- **develop** : Staging (déploiement automatique)
- **feature/*** : Tests et validation uniquement

#### Étapes du pipeline :
1. **validate** : Lint et type-check
2. **test** : Tests unitaires et sécurité
3. **build** : Construction de l'image Docker
4. **deploy** : Déploiement (staging auto, production manuel)

### 5. Monitoring et Debugging

#### Voir les logs du pipeline :
- Va dans **CI/CD > Pipelines**
- Clique sur un pipeline
- Clique sur un job pour voir les logs

#### Debug en cas d'erreur :
```bash
# Vérifier la connexion SSH
ssh -i ~/.ssh/id_rsa user@server

# Vérifier Docker sur le serveur
docker ps
docker images

# Vérifier les logs
docker logs container_name
```

### 6. Rollback

#### Rollback automatique :
Le pipeline inclut un rollback automatique en cas d'échec.

#### Rollback manuel :
```bash
# Sur le serveur
cd /opt/deliverytrack
docker-compose down
docker-compose up -d
```

### 7. Sécurité

#### Bonnes pratiques :
- Utilise des clés SSH dédiées
- Limite les permissions des utilisateurs
- Utilise des variables protégées
- Active l'authentification à deux facteurs

#### Audit de sécurité :
Le pipeline inclut un scan de sécurité automatique avec `npm audit`.

### 8. Performance

#### Optimisations :
- Cache des dépendances Node.js
- Images Docker multi-stage
- Builds parallèles quand possible
- Nettoyage automatique des images

#### Monitoring :
- Métriques de build
- Temps d'exécution
- Couverture de code
- Tests de performance

### 9. Troubleshooting

#### Erreurs courantes :

**Erreur SSH :**
```
Permission denied (publickey)
```
→ Vérifier la clé SSH et les permissions

**Erreur Docker :**
```
Cannot connect to the Docker daemon
```
→ Vérifier que l'utilisateur est dans le groupe docker

**Erreur Registry :**
```
unauthorized: authentication required
```
→ Vérifier les credentials du registry GitLab

### 10. Évolutions futures

#### Améliorations possibles :
- Tests d'intégration
- Tests E2E avec Playwright
- Déploiement blue-green
- Monitoring avec Prometheus
- Alertes Slack/Teams
- Backup automatique des données

#### Intégrations :
- SonarQube pour la qualité du code
- Jira pour le suivi des tickets
- Slack pour les notifications
- Grafana pour le monitoring
