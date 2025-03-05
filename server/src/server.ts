import express, { Request, Response } from "express";
import path from "node:path";
import db from "./config/connection.js";
// import routes from './routes/index.js';

// importing apollo server class
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { authenticateToken } from "./services/auth.js";

// import typedef and resolver
import { typeDefs, resolvers } from "./schemas/index.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // app.use(routes);
  app.use(
    "/graphql",
    expressMiddleware(server as any, {
      context: authenticateToken as any,
    })
  );

  if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(process.cwd(), "../client/dist")));
    
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(process.cwd(), "../client/dist/index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`use GraphQL at http://localhost:${PORT}/graphql`);
    
  })
};

startApolloServer();
