born2code-firebase
============
Esempi realizzati in firebase per gli alunni di [born2code 2019](https://born2code.it/)


## Struttura del progetto

```
born2code-firebase
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


# Esercitazioni presenti

- [Signore del tempo](public/01-tempo) - Link Esterno MISSING
  > Produttore/Consumatore di orari. Una pagina genera degli orari ogni 10secondi e l'altra li consuma

