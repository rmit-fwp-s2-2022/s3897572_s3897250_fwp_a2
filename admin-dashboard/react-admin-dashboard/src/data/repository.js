import { request, gql } from "graphql-request";

const GRAPH_QL_URL = "http://localhost:4000/graphql";



async function set_account_status() {

  const query = gql`  - Graph query language

    mutation {
      update_user( input: {
        user_id: "324243511",
        account_status: false,
      }) {
        username,
        first_name,
        last_name,
        account_status
      }
    }
  
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data;
}


export {
  set_account_status
}
