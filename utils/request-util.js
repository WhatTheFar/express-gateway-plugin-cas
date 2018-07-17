
const setReqAuthUser = (req, user) => {
    if (user) {
        req.headers['Auth-User'] = user.username
    }
    return req
}

module.exports = {
    setReqAuthUser
}