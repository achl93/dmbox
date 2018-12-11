const client = require('instagram-private-api').V1

exports.checkCookie = (session, username, storage) => {
  return new Promise((resolve) => {
    if (!session) {
      let device = new client.Device(username)
      session = new client.Session(device, storage)
    }

    session.getAccountId()
      .then(() => resolve({ loggedIn: true, session }))
      .catch(client.Exceptions.CookieNotValidError, () => resolve({ loggedIn: false }))
  })
}

exports.getChats = (session) => {
  return new Promise((resolve, reject) => {
    let inbox = new client.Feed.Inbox(session, 10)
    inbox.all()
      .then(resolve)
      .catch(reject)
  })
}