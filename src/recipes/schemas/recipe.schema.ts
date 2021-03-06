import * as mongoose from 'mongoose';

export const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  // TODO: consider adding mongoose validation here for enum
  producer: {
    type: String,
  },
  ingredients: [
    {
      _id: false,
      name: String,
      amount: String,
    },
  ],
  preCook: {
    type: [String],
    default: [],
  },
  steps: [
    {
      _id: false,
      name: String,
      body: String,
    },
  ],
  nutritionValues: {
    calories: {
      type: Number,
    },
    fat: {
      type: Number,
    },
    saturatedFat: {
      type: Number,
    },
    carbohydrate: {
      type: Number,
    },
    sugar: {
      type: Number,
    },
    fiber: {
      type: Number,
    },
    protein: {
      type: Number,
    },
    cholesterol: {
      type: Number,
    },
    sodium: {
      type: Number,
    },
  },
  imgDir: {
    type: String,
  },
  favoriters: {
    type: [String],
    default: [],
  },
  raters: {
    type: Map,
    of: String,
    default: {},
  },
});
