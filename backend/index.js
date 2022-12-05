const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const { registerUser, loginUser } = require('./controllers/authController');
const { createNewJobPost, getAllJobPost, deleteJobPost } = require('./controllers/postController');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());

//mongoDb atlas
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nort6.mongodb.net/myFirstDB?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const run = async () => {
  try {
    await client.connect();
    const DB = client.db("jobs-portal-task");
    const users = DB.collection('users');
    const allJobPosts = DB.collection('allJobPosts');

    //route
    app.post('/register-user', registerUser(users));
    app.post('/login-user', loginUser(users));
    app.post('/add-new-job', createNewJobPost(users, allJobPosts));
    app.post('/get-all-post', getAllJobPost(users, allJobPosts));
    app.delete('/delete-post/:id', deleteJobPost(allJobPosts));

  } finally {
    // await client.close()
  }
}
run().catch(console.dir);

//start server
app.listen(PORT, () => {
  console.log(`running server on port ${PORT}`);
})