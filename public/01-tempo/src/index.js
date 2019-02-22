// Initialize Firebase
const awaitingEl = document.querySelector('#awaiting')
const readyEl = document.querySelector('#ready')
const timeEl = document.querySelector('#time')

// invocato quando siamo pronti a visualizzare il primo orario
function ready () {
  awaitingEl.classList.add('invisible')
  readyEl.classList.remove('invisible')
}

function drawTime (time) {
  if (timeEl.textContent.length === 0) ready()
  timeEl.textContent = time
}

document.addEventListener('DOMContentLoaded', init)

function init () {
  const db = firebase.firestore()

  const orologio = db.collection('orologio')

  // attende 1 secondo per dare tempo all'utente di rendersi conto
  // che al caricamento della pagina non abbiamo l'informazione orario
  aspetta1Sec().then(() =>
    orologio.orderBy('time', 'desc').limit(1).get()
      .then(results => {
        if (results.size === 0) return
        const orario = results.docs[0].get('orario')
        return orario
      })
      .then(drawTime)
      .then(setupListener)
  )
}

function setupListener () {
  const db = firebase.firestore()
  const orologio = db.collection('orologio')

  orologio.orderBy('time', 'desc').onSnapshot(results => {
    if (results.size === 0) return
    const orario = results.docs[0].get('orario')
    drawTime(orario)
  })
}

function aspetta1Sec () {
  return new Promise(resolve => setTimeout(resolve, 1000))
}
