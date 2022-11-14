import * as apollo from "@apollo/client"
import { latestBuildArtifacts, LatestBuildTask } from "./queries"

export const API_BASE_URL = "https://api.cirrus-ci.com/graphql"
export const ARTIFACT_BASE_URL = "https://api.cirrus-ci.com/v1/artifact/task"

const client = new apollo.ApolloClient({
    uri: API_BASE_URL,
    cache: new apollo.InMemoryCache(),
})

export async function getLatestBuildArtifacts(
    username: string,
    repo: string,
    branch: string,
): Promise<LatestBuildTask[] | undefined> {
    const result = await client.query({
        query: latestBuildArtifacts,
        variables: {
            username,
            repo,
            branch,
        },
    })

    return result?.data?.ownerRepository?.builds?.edges?.[0]?.node?.tasks
}
