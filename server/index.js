const express = require('express');
const bodyParser = require("body-parser");
const ctrl = require('./controller');
const app = express();

app.use(bodyParser.json());

app.post('/api/posts', ctrl.createPost);
app.get('/api/posts', ctrl.getPost);
app.put('/api/post/:id', ctrl.editPost);
app.delete('/api/post/:id', ctrl.deletePost);
app.put('/api/previous_post/:id', ctrl.editPrevPost);
app.delete('/api/previous_post/:id', ctrl.deletePrevPost);


app.listen(4000, () => console.log('Listening on Port: 4000'));
