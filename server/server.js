const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5555;

const corsOption = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200
}

app.use('/media', express.static('media'));

app.get('/api/gallery', cors(corsOption), (req, res) => {
    const gallery = [
        {id: 1, item_name: 'Ghost', description: 'My faithful direwolve.', images: ['http://localhost:5555/media/ghost.jpg', 'http://localhost:5555/media/ghost.jpg'], have_it: true},
        {id: 2, item_name: 'Jon Snow', description: 'He knows nothing.', images: ['http://localhost:5555/media/jonsnow.jpg'], have_it: true},
        {id: 3, item_name: 'Happy', description: 'Flying cat, loves fish.', images: ['http://localhost:5555/media/happy.jpeg'], have_it: false},
        {id: 4, item_name: 'Cthulu', description: 'That is not dead which can eternal lie and with strange aeons even death may die.', images: ['http://localhost:5555/media/cthulhu.jpg'], have_it: true},
        {id: 5, item_name: 'Vegata', description: 'Prince of the Saiyans', images: ['http://localhost:5555/media/vegeta.jpeg'], have_it: true},
        {id: 6, item_name: 'Ichigo Kurosaki', description: 'Ichigo Kurosaki is a human Substitute Soul Reaper for the Soul Society, who protects his friends and family above all else.', images: ['http://localhost:5555/media/ichigo.jpg'], have_it: false},
        {id: 7, item_name: 'Rocket Raccoon', description: 'An expert marksman with a penchant for large weaponry, Rocket Raccoon is the last of his kind.', images: ['http://localhost:5555/media/rocket.jpg'], have_it: false}
    ];

    res.json(gallery);
});

app.get('/api/have', cors(corsOption), (req, res) => {
    const haveIt = {
        have: 'http://localhost:5555/media/have.png', 
        want: 'http://localhost:5555/media/want.png'
    };

    res.json(haveIt);
});

app.listen(PORT, () => console.log(`Server starting on port ${ PORT }`));
