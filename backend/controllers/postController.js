module.exports.createNewJobPost = (users, allJobPosts) => async (req, res) => {
  const { user } = req.body;
  // console.log(req.body);
  // console.log(req.headers.authtoken);
  //find user
  const findUser = await users.findOne({ email: user.email });
  if (findUser && findUser.token === req.headers.authtoken) {
    try {
      const result = await allJobPosts.insertOne(req.body);
      result && res.status(200).json({ success: { message: 'Job added Successfully' } });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: { message: 'Internal server error' } });
    }
  } else if (findUser && findUser.token !== req.headers.authtoken) {
    res.status(401).json({ error: { message: 'Unauthorized' } });
  }
}
module.exports.getAllJobPost = (users, allJobPosts) => async (req, res) => {
  const findUser = await users.findOne({ email: req.body.email });
  if (findUser && findUser.token === req.headers.authtoken) {
    try {
      const results = await allJobPosts.find({}).toArray();
      const allCategory = []
      console.log(results);
      if (results) {
        results.forEach(item => {
          const haveCategory = allCategory.find(category => category === item.category);
          if (!haveCategory) {
            allCategory.push(item.category);
          }
        })
      }
      res.status(200).json({ success: { message: 'Sync post successfully' }, data: { allCategory, posts: results } })
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: 'Internal server error' } });
    }
  } else if (findUser && findUser.token !== req.headers.authtoken) {
    res.status(401).json({ error: { message: 'Unauthorized' } });
  }
}