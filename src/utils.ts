import { ARTIFACT_BASE_URL } from "./api/gqlApi"

export function createArtifactUrl(taskId: string, artifactCollection: string, artifactName: string): string {
    const parts: string[] = [
        ARTIFACT_BASE_URL,
        taskId,
        artifactCollection,
        artifactName,
    ]

    return parts.join("/")
}
