const sentEl = document.querySelector('#sent')
const timeEl = document.querySelector('#time')

document.addEventListener('DOMContentLoaded', init)

function init () {
  newTime().then(generateAnotherTimeIn10)
}

function sendTime (time, dateTime) {
  const db = firebase.firestore()

  const orologio = db.collection('orologio')
  return orologio.add({
    orario: time,
    time: dateTime
  }).then(() => sentNotification(time))
}

function newTime () {
  const date = new Date()
  const minutes = date.getMinutes().toString().length < 2 ? '0' + date.getMinutes() : date.getMinutes()
  const hours = date.getHours().toString().length < 2 ? '0' + date.getHours() : date.getHours()
  const seconds = date.getSeconds().toString().length < 2 ? '0' + date.getSeconds() : date.getSeconds()

  const newTime = `${hours}:${minutes}:${seconds}`

  return sendTime(newTime, date)
}

/**
 *
 * @returns {Promise<>} when notification has been removed
 */
function sentNotification (time) {
  sentEl.classList.remove('invisible')
  timeEl.textContent = time

  return new Promise(resolve => {
    setTimeout(() => {
      sentEl.classList.add('invisible')
      resolve()
    }, 1500)
  })
}

function generateAnotherTimeIn10 () {
  setTimeout(() => {
    newTime().then(generateAnotherTimeIn10)
  }, 10000)
}
