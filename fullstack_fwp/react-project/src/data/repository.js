import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { username, password } });
  const user = response.data;
  
  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if(user !== null)
    setUser(user);

  return user;
}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function getUsers() {
  const response = await axios.get(API_HOST + `/api/users/`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

async function updateUser(user) {
    const response = await axios.post(API_HOST + "/api/users/update", user);
  
    return response.data;
}

async function deleteUser(id) {
    const response = await axios.delete(API_HOST + `/api/users/delete/${id}`);

    console.log(response, "respoonse")
    
    return response.data;
}
  

// --- Post ---------------------------------------------------------------------------------------
async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}


async function singlePostFromUser(id) {
  const response = await axios.get(API_HOST + `/api/posts/${id}`);

  return response.data
}

async function getPostFromUser(id) {
  const response = await axios.get(API_HOST + `/api/posts/multiple/${id}`);

  return response.data
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}

async function deletePost(post) {
  const response = await axios.post(API_HOST + "/api/posts/delete", post);

  return response.data;
}

async function updatePost(post) {
  const response = await axios.post(API_HOST + "/api/posts/update", post);

  return response.data;
}


// --- Replies ---------------------------------------------------------------------------------------
async function allReplies(post) {
  const response = await axios.post(API_HOST + "/api/reply/all", post);

  return response.data;
}

async function createReply(post) {
  const response = await axios.post(API_HOST + "/api/reply/createReply", post);

  return response.data;
}

// --- Comments ---------------------------------------------------------------------------------------
async function getComments(reply) {
  const response = await axios.post(API_HOST + "/api/comment/getComments", reply);

  return response.data;
}


async function createComment(comment) {
  const response = await axios.post(API_HOST + "/api/comment/createComment", comment);

  return response.data;
}



// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser, findUser, createUser, getUsers,
  getPosts, createPost, getPostFromUser,
  getUser, removeUser, setUser,
  updateUser, deleteUser, deletePost, updatePost,
  allReplies, createReply, singlePostFromUser,
  getComments, createComment
}
