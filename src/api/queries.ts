import { gql } from "@apollo/client"

export const latestBuildArtifacts = gql`
    query LatestBuildArtifacts(
        $username: String!
        $repo: String!
        $branch: String!
    ) {
        ownerRepository(name: $repo, owner: $username, platform: "github") {
            builds(last: 1, branch: $branch) {
                edges {
                    node {
                        tasks {
                            id
                            name
                            artifacts {
                                name
                                files {
                                    path
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export type LatestBuildTask = Readonly<{
    __typename: "Task"
    name: string
    id: string
    artifacts: readonly Readonly<{
        __typename: "Artifacts"
        name: string
        files: readonly Readonly<{
            __typename: "ArtifactFileInfo"
            path: string
        }>[]
    }>[]
}>
