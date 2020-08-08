const { authors } = require("../models");

const response = {
  status: "success",
  message: "",
  data: [],
};

class AuthorController {

    static async getAuthors(req, res){
        try {
            const findauthors = await authors.findAll({});
            if (findauthors.length !== 0) {
                response.data = findauthors;
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

    static async saveAuthor(req, res) {
        const {
            body: {username, password, salt, email, profile}
        } = req;

        try {
          const saveAuthor = await authors.create({
            username, password, salt, email, profile
          });
          response.data = saveAuthor;
          res.status(201).json(response);
        } catch (error) {
          response.status = "fail!";
          response.message = error.message;
          res.status(400).json(response);
        }
    }

    static async getAuthor(req, res) {
        const { id } = req.params;
        const authordetail = await authors.findByPk(id
        //   {include: post}
        );
        try {
            if (authordetail) {
                response.data = authordetail;
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
    
    static async updateAuthor(req, res) {
        const { id } = req.params;
        const { username, password, salt, email, profile } = req.body;
        const auth = await authors.update({ username, password, salt, email, profile },
        {
            where: {
                id: id
            }
        });

        try {
            if (auth) {
                response.message = `Data author berhasil diedit`;
                response.data = await authors.findByPk(id);
                res.status(200).json(response);
            }
        } catch (err) {
            response.status = "fail!";
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async deleteAuthor(req, res) {
        const { id } = req.params;
        const delAuthor = await authors.destroy({ where: {
            id: id
        }});

        try {
            if (delAuthor) {
                response.message = `Data author berhasil dihapus`;
                res.status(200).json(response);
            }
        } catch (err) {
            response.status = "fail!";
            response.message = err.message;
            res.status(400).json(response);
        }
    }
}

module.exports = AuthorController;
