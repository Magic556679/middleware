const handleError = require('../service/handleError');
const handleSuccess = require('../service/handleSuccess');
const Posts = require('../models/postsModel');
const User = require('../models/usersModel');

const posts = {
  async getPosts(req, res) {
    const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt"
    const search = req.query.search !== undefined ? {"content": new RegExp(req.query.search)} : {};
    const allPosts = await Posts.find(search).populate({
      path: 'user',
      select: 'name photo'
    }).sort(timeSort);
		handleSuccess(res, allPosts);
  },
  async createdPosts(req, res) {
    try {
      const { content, image, user } = req.body
			if(user && content) {
        let check = await User.findById(user).exec()
        if(check !== null ){
          const newPosts = await Posts.create({
            content: content,
            image: image,
            user: user,
          });
          handleSuccess(res, newPosts);
        } else {
          handleError(res);
        }
			} else {
				handleError(res);
			}
		} catch (err){
			handleError(res, err)
		}
  },
	async deleteAllPosts(req, res){
    await Posts.deleteMany({})
		const allPosts = await Posts.find();
		handleSuccess(res, allPosts);
  },
	async deleteByIdPosts(req, res) {
    try {
			const paramsId = req.params.id;
			await Posts.findByIdAndDelete(paramsId)	
			const posts = await Posts.find();
			handleSuccess(res, posts);
		} catch (err) {
			handleError(res, err);
		}
  },
	async patchPosts(req, res) {
    try {
			const paramsId = req.params.id;
			const findId = await Posts.find({'_id': paramsId});
			const data = req.body
			if(data.content){
				await Posts.findByIdAndUpdate(findId, data);
				const patchId = await Posts.find({'_id': paramsId})
				handleSuccess(res, patchId);
			} else {
				handleError(res);
			}
			} catch (err) {
				handleError(res, err);
		}
  }
}

module.exports = posts;