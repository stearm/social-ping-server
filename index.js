const Joi = require('joi')
const http = require('http')

const server = http.createServer()

server.listen(8080, function () {
  console.log('Server listen on port 8080')
})

const schema = Joi.object({
  lat: Joi.number().required(),
  long: Joi.number().required(),
  message: Joi.object({
    text: Joi.string().min(1).max(150).required(),
    id: Joi.string().required()
  })
})

const io = require('socket.io')(server)

io.on('connection', function (socket) {

  socket.on('new_msg', function (msg) {

    const error = Joi.validate(msg, schema).error

    if (!error) {
      io.sockets.emit('msg', msg)
    }

  })

})

