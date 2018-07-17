
const setReqRemoteUser = (req, user) => {
    if (user) {
        req.headers['REMOTE_USER'] = user.username
    }
    return req
}

module.exports = {
    setReqRemoteUser
}