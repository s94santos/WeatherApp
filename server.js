const express = require('express')
const app = express()


const router = require('./src/routes');

const port = 3000

app.use('/api', router);

app.use(express.static('public'));

app.listen(port, function() {
	console.log(`App listening on port ${port}!`)
})