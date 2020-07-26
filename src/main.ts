import { GraphQLClient } from "graphql-request";

interface RepoName {
  name: string;
}

interface Datas {
  viewer: {
    repositories: {
      nodes: RepoName[];
    };
  };
}

async function main() {
  const endpoint = "https://api.github.com/graphql";

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: "bearer " + process.env.GITHUB_OAUTH_TOKEN,
    },
  });

  const query = `{
        viewer{
            repositories(last: 100, isFork: false) {
                nodes{
                    name
                }
            }
        }
    }`;

  const data: Datas = await graphQLClient.request(query);
  data.viewer.repositories.nodes.forEach((repo: RepoName) => {
    console.log(repo.name);
  });
}

main().catch((error) => console.error(error));
