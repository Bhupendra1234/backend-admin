const fs = require('fs');
const Models = require('../models');
const moment = require('moment')


const getAllPost = async (req, res) => {
    try {
        let posts = await Models.Post.findAll({});
        res.status(200).json({ posts: posts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "" })
    }

};

const createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        const post = {
            title,
            description,
            image: req.file.path,
            createdAt: moment()
        }
        let posts = await Models.Post.create(post)
        res.status(200).json({ posts: posts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "" })
    }

};

const deletePost = async (req, res) => {
    const postId = req.params.pid;
    try {
        let post = await Models.Post.findOne({ where: { id: postId } })
        if (!post) {
            res.status(400).json({ msg: 'Something went wrong, could not delete place.' })
        }
         await  Models.Post.destroy({where:{id:postId}})
        let imagepath = post.image;
        fs.unlink(imagepath, err => {
            console.log(err);
        })
      res.status(200).json({msg:'Post deleted successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "" })
    }

};

const updatePost = async (req, res) => {
    const postId = req.params.pid;
    const {title, description} = req.body;
    try {
        let post = await Models.Post.findOne({ where: { id: postId } })
        console.log(post.image,postId)
        if (!post) {
            res.status(400).json({ msg: 'Something went wrong, could not update place.' })
        }
        let imagepath = post.image;
        fs.unlink(imagepath, err => {
            console.log(err);
        })
        const data = {
            title,
            description,
            image: req.file.path,
            updatedAt: moment()
        }
        post.update(data);
        res.status(200).json({msg:'Post updated successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "" })
    }
};


exports.getAllPost = getAllPost;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
