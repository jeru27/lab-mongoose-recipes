const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    newUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Iteration 2
    Recipe.create({
      title: "Roasted Red Pepper and Hazelnut Dip",
      level: "Easy Peasy",
      ingredients: [
        "1/4 cup skinned hazelnuts",
        "3/4 cup jarred/drained, coarsely chopped roasted red peppers (about 2 large ones)",
        "1 tablespoon extra-virgin olive oil",
        "8 large fresh basil leaves, chopped or torn",
        "1 clove garlic",
        "1/2 teaspoon fine sea salt",
        "Pinch crushed red pepper flakes"
      ],
      cuisine: "French",
      dishType: "snack",
      image: "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/35EIJVDM5II6TO7HDR4Y7OAFGY.jpg&w=916", duration: 40,
      creator: "Marie Asselin"
    })
    .then(data =>{
      console.log(data.title);
    })
    .catch(err => {
      console.error(err);
    })
    // Iteration 3
    Recipe.insertMany(data)
    .then(result =>{
      result.map(doc =>{
        console.log(doc.title);
      })
    })
    // Iteration 4
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese"},
      {$set: {duration:100}},
      {new: true}
    )
    .then(result => {
      console.log(`Rigatoni updated successfully!`, result);
    })
    .catch(err => {
      console.error(err);
    })
    // Iteration 5
    Recipe.deleteOne({title: "Carrot Cake"})
    .then(result =>{
      console.log(`Successfully deleted ${result.deletedCount} documents!`)
    })
    // Iteration 6
    mongoose.connection
    .close()
    .then(result => {
      console.log("Closed DB connection");
    })
    .catch(err => {
      console.error("Connection closing failure", err)
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
