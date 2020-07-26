import { GraphQLClient } from "graphql-request";

interface RepoName {
  name: string;
}

interface Datas {
  user: {
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

  if (process.argv.length <= 2) {
    console.error("Please argv user name");
    return;
  }

  const user: string = process.argv[2];

  const query = `{
        user( login: "${user}") {
            repositories(last: 100, isFork: false) {
                nodes{
                    name
                }
            }
        }
    }`;

  const data: Datas = await graphQLClient.request(query);
  data.user.repositories.nodes.forEach((repo: RepoName) => {
    console.log(repo.name);
  });
}

main().catch((error) => console.error(error));
