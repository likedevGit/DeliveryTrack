# DeliveryTrack - Suivi de Livraisons

## Description

DeliveryTrack est une application web moderne de suivi de livraisons conçue pour les petites et moyennes entreprises de logistique. L'application propose une interface utilisateur intuitive avec un thème "Speed & Efficiency" qui met l'accent sur la performance et la rapidité d'exécution.

## Caractéristiques

### Interface Utilisateur
- Design moderne avec thème "Speed & Efficiency"
- Animations fluides et transitions dynamiques
- Interface responsive optimisée pour tous les écrans
- Navigation intuitive par onglets

### Fonctionnalités Principales
- **Tableau de bord** : Métriques en temps réel avec graphiques interactifs
- **Gestion des colis** : Création, suivi et mise à jour des statuts
- **Gestion des chauffeurs** : Suivi des disponibilités et performances
- **Cartographie des zones** : Visualisation interactive des zones de livraison
- **Notifications** : Système de notifications en temps réel

### Composants Techniques
- Graphiques interactifs avec Recharts
- Animations CSS personnalisées
- Système de composants modulaires
- Architecture TypeScript robuste

## Architecture Technique

### Frontend
- **Framework** : Next.js 14 avec React 18
- **Langage** : TypeScript pour la sécurité des types
- **Styling** : Tailwind CSS avec composants personnalisés
- **Graphiques** : Recharts pour les visualisations de données
- **Icônes** : Lucide React pour l'interface utilisateur

### Structure du Projet
```
src/
├── components/
│   ├── Charts/          # Composants de graphiques
│   ├── Dashboard/       # Composants du tableau de bord
│   ├── Drivers/         # Gestion des chauffeurs
│   ├── Notifications/   # Système de notifications
│   ├── Parcels/         # Gestion des colis
│   └── Zones/           # Cartographie des zones
├── data/                # Données de démonstration
├── types/               # Définitions TypeScript
└── utils/               # Fonctions utilitaires
```

## Installation et Déploiement

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Docker (optionnel)

### Installation Locale

```bash
# Cloner le repository
git clone https://github.com/likedevGit/DeliveryTrack.git
cd DeliveryTrack

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build

# Démarrer en production
npm start
```

### Déploiement avec Docker

```bash
# Construire l'image Docker
docker build -t deliverytrack .

# Lancer avec Docker Compose
docker-compose up -d

# Ou lancer manuellement
docker run -p 3000:3000 deliverytrack
```

### Variables d'Environnement

```bash
# Configuration de base
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Utilisation

### Accès à l'Application
- **URL locale** : http://localhost:3000
- **Port par défaut** : 3000

### Navigation
1. **Tableau de bord** : Vue d'ensemble des métriques et performances
2. **Colis** : Gestion complète du cycle de vie des livraisons
3. **Chauffeurs** : Suivi des équipes et de leurs performances

### Fonctionnalités Clés
- Création rapide de nouveaux colis
- Suivi en temps réel des statuts de livraison
- Visualisation des performances par zone
- Notifications automatiques des événements importants

## Développement

### Scripts Disponibles
```bash
npm run dev          # Mode développement
npm run build        # Construction de production
npm run start        # Démarrage en production
npm run lint         # Vérification du code
```

### Structure des Données
L'application utilise des données de démonstration stockées dans `src/data/mockData.ts`. Ces données peuvent être remplacées par une API backend ou une base de données.

### Personnalisation
- **Thèmes** : Modification des couleurs dans `tailwind.config.js`
- **Composants** : Ajout de nouveaux composants dans `src/components/`
- **Données** : Adaptation des types dans `src/types/index.ts`

## Performance

### Optimisations
- Build standalone pour Docker
- Images non optimisées pour la rapidité
- Composants React optimisés avec hooks
- Animations CSS performantes

### Métriques
- Temps de chargement initial : < 2s
- Taille du bundle : < 500KB
- Support des navigateurs modernes

## Sécurité

### Bonnes Pratiques
- Utilisateur non-root dans Docker
- Variables d'environnement sécurisées
- Validation TypeScript stricte
- Headers de sécurité Next.js

## Support et Maintenance

### Dépendances
- **Next.js** : 14.0.0+
- **React** : 18.0.0+
- **TypeScript** : 5.0.0+
- **Tailwind CSS** : 3.3.0+

### Compatibilité
- **Navigateurs** : Chrome 90+, Firefox 88+, Safari 14+
- **Systèmes** : Windows 10+, macOS 10.15+, Linux

## Roadmap

### Phase 1 - Fonctionnalités de Base
- [x] Interface utilisateur moderne
- [x] Gestion des colis et chauffeurs
- [x] Tableau de bord avec métriques
- [x] Système de notifications

### Phase 2 - Améliorations
- [ ] Authentification et gestion des utilisateurs
- [ ] API backend avec base de données
- [ ] Système de rôles et permissions
- [ ] Intégration GPS et cartographie

### Phase 3 - Fonctionnalités Avancées
- [ ] Optimisation d'itinéraires
- [ ] Intelligence artificielle pour la prédiction
- [ ] Intégrations tierces (SMS, email)
- [ ] Application mobile

## Contribution

### Développement
1. Fork du repository
2. Création d'une branche feature
3. Développement et tests
4. Pull request avec description détaillée

### Standards de Code
- TypeScript strict
- Composants React fonctionnels
- Hooks personnalisés pour la logique
- Tests unitaires pour les composants critiques

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Contact

- **Repository** : https://github.com/likedevGit/DeliveryTrack
- **Documentation** : Incluse dans le code source
- **Issues** : Via GitHub Issues

---

**DeliveryTrack** - Performance et efficacité au service de vos livraisons.
