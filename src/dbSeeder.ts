import * as bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';

import recipes from './data/recipeData';
import users from './data/userData';

// const bcrypt = require('bcrypt');
// const recipes = require('./src/data/recipeData');
// const users = require('./src/data/userData');
// const newRecipes = require('./src/data/newRecipeData');

// TODO: implement seeding for db-users
// mongo refers to mongo docker container name
MongoClient.connect(
  'mongodb://mongo:27017',
  { useNewUrlParser: true, useUnifiedTopology: true },
  async (err, client) => {
    if (err) {
      console.log(`ERR CONNECTING TO DB: ${err}`);
    } else {
      try {
        const db = client.db('recipeApp');

        // seed recipes
        const recipeCollection = db.collection('recipes');
        await recipeCollection.insertMany(recipes);
        console.log('successfully seeded recipes!');

        // seed users
        users[0].password = await bcrypt.hash(users[0].password, 12);
        users[1].password = await bcrypt.hash(users[1].password, 12);
        const userCollection = db.collection('users');
        await userCollection.insertMany(users);
        console.log('successfully seeded users!');

        // close client
        await client.close(false);
      } catch (error) {
        console.log(`err seeding db: ${error}`);
      }
    }
  }
);

// curl -X POST http://localhost:3000/api/auth/signIn -d '{"username": "dev", "password": "dev"}' -H "Content-Type: application/json"
