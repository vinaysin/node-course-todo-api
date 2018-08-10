const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect MongoDB server.');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat Lunch'})
    // .then( (result) => {
    //     console.log(result);
    // }) 
    // .catch ( (err) => {
    //     console.log('Unable to fetch record:', err);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({completed: false})
    // .then( (result) => {
    //     console.log(result);
    // }) 
    // .catch ( (err) => {
    //     console.log('Unable to fetch record:', err);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: true})
    // .then( (result) => {
    //     console.log(result);
    // }) 
    // .catch ( (err) => {
    //     console.log('Unable to fetch record:', err);
    // });

    //findOneAndDelete
    db.collection('Users').findOneAndDelete({_id: new ObjectID('5b6d5f5abd592f16f4134612')})
    .then( (result) => {
        console.log(result);
    }) 
    .catch ( (err) => {
        console.log('Unable to fetch record:', err);
    });


    client.close();
});