const Kafka = require('node-rdkafka')
const http = require('http')
const sockjs = require('sockjs')

const writeStream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
}, {}, {
    topic: 'messages'
})

writeStream.on('error', (error) => {
    console.error(`Kafka stream error:  ${error}`)
})

const readStream = Kafka.createReadStream({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092'
}, {}, {
    topics: ['messages']
})

const sockJsServer = sockjs.createServer({ prefix: '/messages' })
sockJsServer.on('connection', (connection) => {
    connection.on('data', (message) => {
        writeStream.write(Buffer.from(message))
    })

    readStream.on('data', (message) => {
        connection.write(message)
    })
})

const httpServer = http.createServer()
sockJsServer.attach(httpServer)
httpServer.listen(9999, '0.0.0.0')

export default (req, res) => {
    res.status(200).json(req.body)
  }
  