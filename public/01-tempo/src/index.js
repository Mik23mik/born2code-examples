// Initialize Firebase
const awaitingEl = document.querySelector('#awaiting')
const readyEl = document.querySelector('#ready')
const timeEl = document.querySelector('#time')
const cleanupEl = document.querySelector('#cleanup')
const referencesEl = document.querySelector('#references')

// invocato quando siamo pronti a visualizzare il primo orario
function ready () {
  awaitingEl.classList.add('invisible')
  readyEl.classList.remove('invisible')
}

function drawTime (time) {
  if (timeEl.textContent.length === 0) ready()
  timeEl.textContent = time
}

function showCleanup () {
  cleanupEl.classList.remove('invisible')
  aspetta(3).then(() => cleanupEl.classList.add('invisible'))
}

function updateReferenceCounter (howMany) {
  if (howMany === 0) {
    referencesEl.classList.add('invisible')
    return
  }

  referencesEl.classList.remove('invisible')
  const placeholder = referencesEl.querySelector('.placeholder')
  placeholder.textContent = howMany
}

document.addEventListener('DOMContentLoaded', init)

function init () {
  const db = firebase.firestore()
  const orologio = db.collection('orologio')

  // array di DocumentReference da rimuovere - altrimenti il database si riempirà inevitabilmente
  const docRefToBeRemoved = []

  // attende 1 secondo per dare tempo all'utente di rendersi conto
  // che al caricamento della pagina non abbiamo l'informazione orario
  aspetta(1)
    .then(() => orologio.orderBy('time', 'desc').limit(1).get())
    .then(results => {
      if (results.size === 0) return
      const orario = results.docs[0].get('orario')
      return orario
    })
    .then(drawTime)
    .then(() => setupListener(docRefToBeRemoved))
}

function setupListener (docRefToBeRemoved) {
  const db = firebase.firestore()
  const orologio = db.collection('orologio')

  orologio.orderBy('time', 'desc').onSnapshot(results => {
    if (results.size === 0) return
    const newOrario = results.docs[0]
    const orario = newOrario.get('orario')

    docRefToBeRemoved.push(newOrario.ref)

    // operazioni di disegno
    drawTime(orario)
    updateReferenceCounter(docRefToBeRemoved.length)

    // se ho collezionato 5 documenti, dall'apertura della pagina, li rimuovo
    // altrimenti il database si riempirà inesorabilmente
    if (docRefToBeRemoved.length > 5) cleanupReferences(docRefToBeRemoved)
  })
}

function aspetta (secondi) {
  return new Promise(resolve => setTimeout(resolve, secondi * 1000))
}

function cleanupReferences (docRefList) {
  const db = firebase.firestore()
  const deleteBatch = db.batch()
  docRefList.forEach(docRef => deleteBatch.delete(docRef))
  docRefList.splice(0) // svuoto la lista che si riferisce ai documenti 'orologio'

  return deleteBatch.commit()
    .then(showCleanup)
}
