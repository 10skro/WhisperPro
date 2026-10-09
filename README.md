<div align="center">

# WhisperPro

**Dictée vocale locale, rapide et privée — sur Windows.**

**Français** · [English](README.en.md)

</div>

**WhisperPro** transforme votre voix en texte, dans n'importe quelle application. Un raccourci clavier global, vous parlez, le texte s'écrit là où votre curseur se trouve. Tout se passe **en local, sur votre machine** : aucun audio n'est envoyé dans le cloud, aucune donnée ne quitte votre PC.

## 🖥️ L'interface

![Écran principal de WhisperPro](assets/screenshots/main.png)

## ✨ Fonctionnalités

- **Dictée instantanée** — raccourci global `Ctrl+Espace` (personnalisable), ou mode *push-to-talk* : appuyez pour parler, relâchez pour transcrire
- **100 % local** — Whisper tourne sur votre machine avec accélération GPU quand elle est disponible ; l'app détecte et répare elle-même son accélération
- **Texte injecté directement** dans le champ actif : messagerie, traitement de texte, chat, éditeur de code…
- **Traduction automatique** après transcription, vers plusieurs langues cibles
- **Ponctuation vocale** — dictez « point », « virgule », « nouveau paragraphe »
- **Widget flottant** compact avec retour visuel d'enregistrement et niveau micro
- **Historique** des transcriptions avec copie rapide, ou **Mode Texte Sécurisé** sans aucun stockage local
- **Bibliothèque de modèles intégrée** — de tiny à medium, téléchargement, activation et suppression depuis l'app
- **Thèmes clair et sombre**, interface en français ou en anglais
- **Mises à jour en un clic** depuis le pied de page

## 🎯 Cas d'usage

Rédiger mails et messages plus vite · prendre des notes en réunion · dicter des brouillons · traduire en parlant.

## ⚙️ Installation

> **Prérequis : [Node.js](https://nodejs.org) doit être installé** (version LTS recommandée). C'est indispensable — sans Node.js, WhisperPro ne peut ni s'installer ni se lancer.

WhisperPro se distribue via npm (pas d'installeur, pas de SmartScreen) :

```bash
npm install -g whisperpro
whisperpro
```

Nécessite Node.js. Mises à jour : bouton dans l'app, ou `npm install -g whisperpro@latest`.

## 🔧 Configuration

- **Modèles** : tiny (rapide) → medium (qualité élevée), gérés depuis l'onglet *Modèles et système*

![Bibliothèque de modèles](assets/screenshots/models.png)

- **Options** : langue, microphone, raccourci clavier, commandes de ponctuation, widget

![Panneau d'options](assets/screenshots/settings.png)

## ☕ Support

[Buy Me a Coffee — skroproduction](https://buymeacoffee.com/skroproduction)
