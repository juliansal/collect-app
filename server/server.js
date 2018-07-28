const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 5555;

mongoose.connect('mongodb://localhost:27017/testDB');
app.use(bodyParser.json());

const haveIt = {
    have: 'http://localhost:5555/media/have.png', 
    want: 'http://localhost:5555/media/want.png'
};


const Gallery = mongoose.model('Gallery', { 
    id: {
        type: Number,
        index: true,
        unique: true
    },
    item_name: String,
    description: String,
    images: [String],
    have_it: Boolean
});

const Haveiticon = mongoose.model('Haveiticons', {
    have: String,
    want: String
});

const corsOption = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200
};

app.use('/media', express.static('media'));

app.get('/api/gallery', cors(corsOption), (req, res) => {
    Gallery.find().then((data) => {
        res.json(data);
        console.log(data);
    });

});

app.get('/api/have', cors(corsOption), (req, res) => {
    Haveiticon.findOne().then((data) => {
        res.json(data);
        console.log(data);
    });
});

app.post('/api/gallery', cors(corsOption), (req, res) => {
    let body = {
        id: req.body.idField,
        item_name: req.body.nameField,
        description: req.body.descField,
        images: req.body.imageField,
        have_it: req.body.haveItBox
    };

    let items = new Gallery(body);
    try {
        items.save().then(
            (success) => console.log('meow'), 
            (fail) => console.error('no moew '));
    } catch(err) {
        console.error(err.message);
    }
    return res.json({reply: 'success'});
    
});

app.put('/api/gallery/:id', cors(corsOption), (req, res) => {
    let body = {
        id: req.body.idField,
        item_name: req.body.nameField,
        description: req.body.descField,
        images: req.body.imageField,
        have_it: req.body.haveItBox
    };

    Gallery.findOneAndUpdate(
        { id: req.params.id }, 
        body, 
        () => { console.log('this was reached') }
    ).then((data) => {
        return res.json({reply: 'success'});
    });
    
});

app.delete('/api/gallery/:id', cors(corsOption), (req, res) => {
    Gallery.deleteOne(
        { id: req.params.id }, 
        (success) => { console.log('success') }, 
        (err) => { console.log('error occurred') 
    }).then((data) => res.json({reply: 'success'}));
});

app._router.stack.forEach(r => {
    if(r.route && r.route.path)
        console.log(r.route.path + "\t " + Object.keys(r.route.methods).toString().toUpperCase());

});

app.listen(PORT, () => console.log(`Server starting on port ${ PORT }`));
