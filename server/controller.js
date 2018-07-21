const uuid = require('uuid');
let posts = [];
let previousPosts = [];
let colors = [
    'red', 
    'blue', 
    'indigo',
    'yellow',
    'green',
    'orange'
];
module.exports = {
    createPost(req, res) {
        const { title, post, id } = req.body;
        posts.push({ title, post, id, color: colors[0] });
        console.log('psots-------------', posts);
        res.status(200).json({posts, previousPosts});
    },
    editPost(req, res) {
        const { id } = req.params;
        const { title, post } = req.body;
        let indexOfPostToEdit = posts.findIndex(post => post.id === id);
        previousPosts.push(posts[indexOfPostToEdit]);
        posts[indexOfPostToEdit].title = title;
        posts[indexOfPostToEdit].post = post;
        res.status(200).json({posts, previousPosts});
    },
    deletePost(req, res) {
        const { id } = req.params;
        let indexOfPostToRemove = posts.findIndex(post => post.id === id);
        previousPosts.push(posts[indexOfPostToRemove])
        posts.splice(indexOfPostToRemove, 1);
        res.status(200).json({posts, previousPosts});
    },
    getPost(req, res) {
        res.status(200).json({posts, previousPosts});
    },
    editPrevPost(req, res) {
        const { id } = req.params;
        const { title, post } = req.body;
        let indexOfPostToEdit = previousPosts.findIndex(post => post.id === id);
        previousPosts[indexOfPostToEdit].title = title;
        previousPosts[indexOfPostToEdit].post = post;
        res.status(200).json({previousPosts});
    },
    deletePrevPost(req, res) {
        const { id } = req.params;
        let indexOfPostToRemove = posts.findIndex(post => post.id === id);
        previousPosts.splice(indexOfPostToRemove, 1);
        res.status(200).json({previousPosts});
    },
}