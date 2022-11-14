import { fastify, FastifyRequest } from "fastify"
import { getLatestBuildArtifacts } from "./api/gqlApi"
import { createArtifactUrl } from "./utils"

const app = fastify()

app.get("/", async (request, reply) => {
    reply.send("Online! Hello world!")
})

app.get(
    "/github/:username/:repo/:branch/:taskName/:artifactName/:artifactFile",
    async (request: FastifyRequest, reply) => {
        const { username, repo, branch, taskName, artifactName, artifactFile } =
            request.params as any

        const matchingTasks = await getLatestBuildArtifacts(username, repo, branch)

        if (!matchingTasks) {
            reply.send("No tasks found!")
            return
        }

        for (const task of matchingTasks) {
            if (task.name !== taskName) {
                continue
            }

            for (const artifactCollection of task.artifacts) {
                if (artifactCollection.name !== artifactName) {
                    continue
                }

                for (const file of artifactCollection.files) {
                    if (file.path === artifactFile) {
                        reply.redirect(
                            createArtifactUrl(task.id, artifactCollection.name, file.path),
                        )
                        return
                    }
                }
            }
        }

        reply.send("No artifacts found!")
    },
)

app.listen({
    port: parseInt(process.env.PORT as string, 10) || 80,
    host: process.env.HOST || "127.0.0.1",
})
    .then((r) => console.log(`Listening on ${r}`))
    .catch((e) => console.error(e))
