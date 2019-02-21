born2code-01
============

Struttura del progetto

```
born2code-01
├── firebase.json           # creato da firebase init
├── firestore.indexes.json  # indici di firebase definiti via file
├── firestore.rules         # permessi di accesso al firestore
├── functions               # directory relativa alle Firebase Functions
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   └── index.ts
│   ├── tsconfig.json
│   └── tslint.json
├── jsconfig.json           # gestisce l'Intellisense di VS Code
├── package-lock.json       #
├── package.json            # dipendenze npm per usare eslint
├── public                  # file che verranno inviati su Firebase Hosting
│   ├── 404.html
│   ├── index.html
│   ├── src
│   │   └── index.js
│   └── style
│       └── main.css
└── README.md               # questo file
```

# Cosa manca
Per rendere questo progetto funzionante manca creare un file chiamato `.firebaserc` che contiene:
```json
{
  "projects": {
    "default": "<nome-progetto>"
  }
}
```

Inoltre bisogna eseguire il comando `npm install` sulla directory principale **E** sulla directory [functions](./functions)

