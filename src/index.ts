import fastify from "fastify"

const app = fastify()

app.get("/", async (request, reply) => {
    reply.send("Online! Hello world!")
})

app.listen(process.env.PORT || 80, process.env.HOST || "127.0.0.1", (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
