const { posts } = require("../models");

const response = {
  status: false,
  message: "",
  data: [],
};

class PostController {

    static async getPosts(req, res){
        try {
            const findposts = await posts.findAll({});
            if (findposts.length !== 0) {
                response.data = findposts;
                response.status = true;
                response.message = "Data found!"
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data not found!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
            response.message = err.message;
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
                response.status = true;
                response.data = postdetail;
                response.message = "Data found!";
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data not found!";
                res.status(400).json(response);
            }
        } catch (error) {
            response.data = '';
            response.status = false;
            response.message = error.message;
            res.status(404).json(response);
        }
    }

    static async savePost(req, res) {
        const {
            body: { title, content, tags, status, authorId }
        } = req;

        try {
            const savePost = await posts.create({
                title, content, tags, status, authorId
            });
            response.status = true;
            response.message = "Berhasil tambah data"
            response.data = savePost;
            res.status(201).json(response);
        } catch (error) {
            response.data = '';
            response.status = false;
            response.message = error.message;
            res.status(400).json(response);
        }
    }
    
    static async updatePost(req, res) {
        const { id } = req.params;
        const { title, content, tags, status, authorId } = req.body;
        const auth = await posts.update({ title, content, tags, status, authorId },
        {
            where: {
                id: id
            }
        });

        try {
            if (auth) {
                response.status = true
                response.message = `Data post berhasil diedit`;
                response.data = await posts.findByPk(id);
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data gagal diperbarui!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
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
                response.status = true;
                response.data = `ID : ${id}`
                response.message = `Data post berhasil dihapus`;
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data gagal dihapus!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }
}

module.exports = PostController;
