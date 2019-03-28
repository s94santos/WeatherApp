
const express = require('express')
const app = express()
const path = require('path')
const request = require('request')
const fs = require('fs')

const apiKey = 'c28148eafcf6742acc11bf60edca65b0'
const port = 3000


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

function writeLog(array){
	var stream = fs.createWriteStream("log.txt", {flags:'a'});
	array.forEach((city) => {
    	stream.write(JSON.stringify(city) + "\n-------------------------------------------------------\n")
    })
	stream.end()
}


app.get('/', function(req, res){ 
	res.render('form')

})

app.post('/', async function(req, res) {
	
	var cities = [req.body.firstCity,req.body.secondCity,req.body.thirdCity]
	var promiseArray = [];

	for (var i = 0; i < cities.length; i++) {
	    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&units=metric&APPID=${apiKey}`
	    promiseArray.push(new Promise(function (resolve, reject){ 
	        request(apiUrl, function(error, response, body) {
	        if (error) reject(error)
	        resolve(JSON.parse(body))
	        })
	    }))
	}
	let callbackResults = await Promise.all(promiseArray)
	writeLog(callbackResults)
	res.render("graph",{res:callbackResults})
	
	
})

app.listen(port, function() {
	console.log(`App listening on port ${port}!`)
})