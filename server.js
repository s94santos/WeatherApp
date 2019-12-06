const express = require('express')
const app = express()
const path = require('path')

const weatherRouter = require('./src/routes');

const port = 3000

app.use('/api', weatherRouter.router);

app.use(express.static(path.join(__dirname, 'views')))

app.get('/', function(req, res){ 
	res.sendFile(path.join(__dirname, 'views', 'index.js'))

})

app.listen(port, function() {
	console.log(`App listening on port ${port}!`)
})