const { buildSchema } = require("graphql");
const db = require("../../../../fullstack_fwp/express/src/database");

const graphql = { };

// GraphQL.
// Construct a schema, using GraphQL schema language
graphql.schema = buildSchema(`
  # The GraphQL types are declared first.

  # NOTE: The owner and pet are pseudo-joined; whilst they are related, how they are related is an implementation detail
  # that is NOT exposed in the GraphQL schema. This can be seen with the Pet type which has no field linking it to
  # an owner. That said an owner has many pets and this is exposed within the GraphQL schema by association.
  # Behind the scenes the database pet table has an additional field called email which is a FK to owner.
  
  type user {
    user_id: String,
    username: String,
    password_hash: String,
    first_name: String,
    last_name: String,
    date_joined: String,
    followers: String,
    following: String,
    account_status: Boolean,
    posts: [post]
  }

  type post {
    title: String,
    body: String,
    id: Int,
    image: String,
    replies: [reply],
    reactions: [reactions]
  }

  type reply {
    reply_id: Int,
    reply_body: String,
    user: String,
    date: String,
    comments: [comment]
  }

  type comment {
    comment_id: Int,
    comment_body: String,
    user: String
  }

  type reactions {
    reactions_id: Int,
    likeCount: Int
    peopleWhoHaveLiked: String,
    peopleWhoHaveDisliked: String,
  }



  # The input type can be used for incoming data.

  input userInput {
    user_id: String,
    username: String,
    password_hash: String,
    first_name: String,
    last_name: String,
    date_joined: String,
    followers: String,
    following: String,
    account_status: Boolean
  }
  
  input postInput {
    title: String,
    body: String,
    id: String,
    image: String
  }

  input replyInput {
    reply_id: Int,
    reply_body: String,
    user: String,
    date: String
  }

  input commentInput {
    comment_id: Int,
    comment_body: String,
    user: String
  }

  input reactionsInput {
    reactions_id: Int,
    likeCount: Int
    peopleWhoHaveLiked: String,
    peopleWhoHaveDisliked: String,
  }



  # Queries (read-only operations).

  type Query {
    all_users: [user],
    all_posts: [post]
  }


  # Mutations (modify data in the underlying data-source, i.e., the database).

  type Mutation {
    update_user(input: userInput): user,
    delete_post(input: postInput): post
  }
`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // Queries.
  all_users: async () => {
    return await db.user.findAll();
  },
  all_posts: async () => {
    return await db.post.findAll();
  },

  // Mutations.
  update_user: async (args) => {
    const user = await db.user.update({blocked: args.input.account_status},
      {where: {
        user_id: parseInt(args.input.user_id)
      }
    });

    return user;
  },
  delete_post: async (args) => {
    const post = await db.post.destroy(
      { where: {
        id: parseInt(args.input.id)
      }
    });

    return post;
  }


};

module.exports = graphql;

// Below are some sample queries that can be used to test GraphQL in GraphiQL.
// Access the GraphiQL web-interface when the server is running here: http://localhost:4000/graphql
/*

{
  all_owners {
    email,
    first_name,
    last_name,
    pets {
      pet_id,
    	name
    }
  }
}

{
  owner(email: "matthew@rmit.edu.au") {
    email,
    first_name,
    last_name
  }
}

{
  owner_exists(email: "matthew@rmit.edu.au")
}

mutation {
  create_owner(input: {
    email: "newuser@rmit.edu.au",
    first_name: "New",
    last_name: "User"
  }) {
    email,
    first_name,
    last_name
  }
}

mutation {
  update_owner(input: {
    email: "matthew@rmit.edu.au",
    first_name: "Matthew",
    last_name: "Bolger"
  }) {
    email,
    first_name,
    last_name
  }
}

mutation {
  delete_owner(email: "newuser@rmit.edu.au")
}

*/
