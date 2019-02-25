
function retrieveXML (url, callback) {
  const oReq = new window.XMLHttpRequest()
  oReq.overrideMimeType('text/xml')
  oReq.addEventListener('load', function () {
    callback(null, this.responseXML)
  })
  oReq.addEventListener('error', callback)
  oReq.open('GET', url)
  oReq.send()
}

retrieveXML('cd_catalog.xml', (err, response) => {
  if (err != null) return console.error(err)
  const cdList = Array.from(response.querySelectorAll('CD')).map(el => el.querySelector('TITLE').textContent)
  console.log('CD Disponibili', cdList)
})
