import config from "../../config/"

function fGetUserAvatar(user) {
  if (!user) return
  
  return  config.api.urls.user.userProfile + '/' + user.Email + '/' + user.Avatar
}

export default fGetUserAvatar