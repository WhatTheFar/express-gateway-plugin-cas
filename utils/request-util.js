
const setReqRemoteUser = (req, user) => {
    if (user) {
        req.headers['REMOTE_USER'] = user.username
        return done(null, user)
    }
    return req
}

module.exports = {
    setReqRemoteUser
}