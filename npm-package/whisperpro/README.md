# whisperpro

Dictée vocale locale pour Windows, basée sur Whisper (whisper.cpp). Tout reste sur ta machine : aucun cloud, aucune clé API.

## Installation

```bash
npm install -g whisperpro
```

Puis lance l'application :

```bash
whisperpro
```

## Mises à jour

```bash
npm update -g whisperpro
```

L'application affiche aussi une pastille « Mise à jour disponible » quand une nouvelle version sort ; un clic lance la mise à jour automatiquement.

## Fonctionnement

- Raccourci global (par défaut `Ctrl+Shift+Space`) pour dicter dans n'importe quelle application
- Transcription et traduction 100 % locales (GPU NVIDIA accéléré si disponible, sinon CPU)
- Historique local, widget d'état, injection automatique du texte

## Configuration système requise

- Windows 10/11 x64
- Node.js 18+ (pour l'installation via npm uniquement ; l'application elle-même est un binaire natif)

## Licence

MIT
