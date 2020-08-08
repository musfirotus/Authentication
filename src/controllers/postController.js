const { posts } = require("../models");

const response = {
  status: "success",
  message: "",
  data: [],
};

class PostController {

    static async getPosts(req, res){
        try {
            const findposts = await posts.findAll({});
            if (findposts.length !== 0) {
                response.data = findposts;
                response.message = "Data found!"
                res.status(200).json(response);
            } else {
                response.status = "fail!";
                response.message = "Data not found!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.status = "fail";
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async savePost(req, res) {
        const {
            body: {username, password, salt, email, profile}
        } = req;

        try {
          const savePost = await posts.create({
            username, password, salt, email, profile
          });
          response.data = savePost;
          res.status(201).json(response);
        } catch (error) {
          response.status = "fail!";
          response.message = error.message;
          res.status(400).json(response);
        }
    }

    static async getPost(req, res) {
        const { id } = req.params;
        const postdetail = await posts.findByPk(id
        //   {include: post}
        );
        try {
            if (postdetail) {
                response.data = postdetail;
                response.message = "Data found!";
                res.status(200).json(response);
            } else {
                response.status = "fail!";
                response.message = "Data not found!";
                res.status(400).json(response);
            }
        } catch (error) {
          response.message = error.message;
          response.status = "fail";
          res.status(404).json(response);
        }
    }
    
    static async updatePost(req, res) {
        const { id } = req.params;
        const { username, password, salt, email, profile } = req.body;
        const auth = await posts.update({ username, password, salt, email, profile },
        {
            where: {
                id: id
            }
        });

        try {
            if (auth) {
                response.message = `Data post berhasil diedit`;
                response.data = await posts.findByPk(id);
                res.status(200).json(response);
            }
        } catch (err) {
            response.status = "fail!";
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async deletePost(req, res) {
        const { id } = req.params;
        const delPost = await posts.destroy({ where: {
            id: id
        }});

        try {
            if (delPost) {
                response.message = `Data post berhasil dihapus`;
                res.status(200).json(response);
            }
        } catch (err) {
            response.status = "fail!";
            response.message = err.message;
            res.status(400).json(response);
        }
    }
}

module.exports = PostController;
