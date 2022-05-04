import config from '../config'

function fSetDocumentTitle( urlInfo ) {
  document.title = urlInfo.name + ' | ' + config.app.name
}

export default fSetDocumentTitle