// implement your posts router here
const express = require('express');
const Posts = require('./posts-model')

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const posts = await Posts.find()
        res.status(200).json(posts)

    } catch (err) {
        res.status(500).jsom({
            message: "The posts information could not be retrieved"
        });
    }
})

router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const posts = await Posts.findById(id)

        if (!posts) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(posts)
        }
    } catch (err) {
        res.status(500).jsom({
            message: "The post information could not be retrieved"
        })
    }
})

router.post('/', async(req, res) => {
    try {
        const content = req.body
        const newPost = await Posts.insert(content)
        if (!content.title || !content.contents) {
            console.log(content.title, content.contents)
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        } else {
            res.status(201).json({
                id: newPost.id,
                title: content.title,
                content: content.contents
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "There was an error while saving the post to the database"
        });
    }
})


router.put('/:id', async(req, res) => {
    try {
        const changes = req.body;
        const post = await Posts.update(req.params.id, changes)
        if (!changes.title || !changes.contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        } else {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'The post could not be found' });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "The post information could not be modified",
        });
    }
});

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The Posts has been nuked' });
            } else {
                res.status(404).json({ message: 'The Posts could not be found' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error removing the Posts',
            });
        });
});

router.get('/:id/comments', async(req, res) => {
    try {
        const id = req.params.id
        const posts = await Posts.findCommentById(id)

        if (!posts) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(posts)
        }
    } catch (err) {
        res.status(500).jsom({
            message: "The post information could not be retrieved"
        })
    }
})

module.exports = router