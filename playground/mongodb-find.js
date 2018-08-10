const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect MongoDB server.');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    db.collection('Users').find({name: 'Vinay Srivastava'}).toArray()
    .then( (docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }) 
    .catch ( (err) => {
        console.log('Unable to fetch record:', err);
    });

    client.close();
});