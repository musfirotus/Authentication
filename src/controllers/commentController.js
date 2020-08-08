const { comments } = require("../models");

const response = {
  status: "success",
  message: "",
  data: [],
};

class CommentController {

    static async getComments(req, res){
        try {
            const findcomments = await comments.findAll({});
            if (findcomments.length !== 0) {
                response.data = findcomments;
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

    static async saveComment(req, res) {
        const {
            body: {username, password, salt, email, profile}
        } = req;

        try {
          const saveComment = await comments.create({
            username, password, salt, email, profile
          });
          response.data = saveComment;
          res.status(201).json(response);
        } catch (error) {
          response.status = "fail!";
          response.message = error.message;
          res.status(400).json(response);
        }
    }

    static async getComment(req, res) {
        const { id } = req.params;
        const commentdetail = await comments.findByPk(id
        //   {include: post}
        );
        try {
            if (commentdetail) {
                response.data = commentdetail;
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
    
    static async updateComment(req, res) {
        const { id } = req.params;
        const { username, password, salt, email, profile } = req.body;
        const auth = await comments.update({ username, password, salt, email, profile },
        {
            where: {
                id: id
            }
        });

        try {
            if (auth) {
                response.message = `Data comment berhasil diedit`;
                response.data = await comments.findByPk(id);
                res.status(200).json(response);
            }
        } catch (err) {
            response.status = "fail!";
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async deleteComment(req, res) {
        const { id } = req.params;
        const delComment = await comments.destroy({ where: {
            id: id
        }});

        try {
            if (delComment) {
                response.message = `Data comment berhasil dihapus`;
                res.status(200).json(response);
            }
        } catch (err) {
            response.status = "fail!";
            response.message = err.message;
            res.status(400).json(response);
        }
    }
}

module.exports = CommentController;
