import * as bodyParser from 'body-parser';
import * as express from 'express';

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', (req, res, next) => {
	const log = {
		header: req.headers,
		body: req.body
	};
	res.json(log);
});

export default app;
