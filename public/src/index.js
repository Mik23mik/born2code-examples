const testEl = document.querySelector('#test')

/**
 * ATTENZIONE!
 * Prima dell'evento DOMContentLoaded window.firebase non è disponibile!
 * Questo perchè gli script vengono inclusi con la dicitura <script defer>
 * nella pagina index.html
 */
document.addEventListener('DOMContentLoaded', init)

function init () {
  const auth = firebase.auth()
  auth.signInAnonymously().then(drawUserUID)
}

function drawUserUID (userData) {
  testEl.textContent = userData.user.uid
}
