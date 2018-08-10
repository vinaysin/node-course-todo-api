const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect MongoDB server.');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b6dd1429fe6266d01799c5c')
    // }, {
    //     $set: { 
    //         completed: true 
    //     }
    // }, {
    //     returnOriginal: false 
    // })
    // .then ( (result) => {
    //     console.log(result);
    // })
    // .catch ( (err) => {
    //     console.log('Unable to update: ', erro);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b6dd8aa9fe6266d01799dae')
    }, {
        $set: {
            name: 'Pragya Srivastava'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    })
    .then( (result) => {
        console.log(result);
    })
    .catch( (err) => {
        console.log('Unable to update:', err);
    })

    client.close();
});