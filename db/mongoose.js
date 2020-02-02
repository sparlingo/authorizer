const mongoose = require('mongoose')

mongodb_connection_string = 'mongodb+srv://tester:futtbucker@cluster0-ggfo2.azure.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongodb_connection_string, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})