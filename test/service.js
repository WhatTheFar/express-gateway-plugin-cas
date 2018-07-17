const express = require('express')

const app = express()

app.get('*', (req, res, next) => {
	console.log(req.headers)
	res.json(req.headers)
})

app.listen(8081, () => {
    console.log(`App is listening on PORT 8001`);
})

module.exports = app
