const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose'); 
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });


mongoose.connect('mongodb+srv://patelhanee73:Hanee%402907@cluster0.pxrilk7.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql" });
  app.listen(4000, () => {
    console.log("Server started at port 4000");
  });
});