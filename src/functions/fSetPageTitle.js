import config from '../config'

function fSetPageTitle( urlInfo ) {
  document.title = urlInfo.name + ' | ' + config.app.name
}

export default fSetPageTitle