import { User } from "../models/index.js";
import { AuthenticationError, signToken } from "../services/auth";

interface Context {
  user?: User;
}
interface User {
  _id: String;
  username: String;
  email: String;
  password: String;
  savedBooks: object[];
  bookCount: Number;
}
interface addUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}
interface saveBookArgs {
  input: {
    authors: String[];
    description: String;
    title: String;
    bookId: String;
    image: String;
    link: String;
  };
}

const resolvers = {
  Query: {
    me: async (
      _parent: unknown,
      _args: any,
      context: Context
    ): Promise<User | null> => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },
  Mutations: {
    login: async (
      _parent: any,
      { email, password }: { email: string; password: string }
    ): Promise<{ token: string; user: User }> => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    addUser: async (
      _parent: any,
      { input }: addUserArgs
    ): Promise<{ token: string; user: User }> => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    saveBook: async (
      _parent: any,
      { input }: saveBookArgs,
      context: Context
    ): Promise<User | null> => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedBooks: [{ ...input }] },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeBook: async (
      _parent: any,
      { bookId }: { bookId: string },
      context: Context
    ): Promise<User | null> => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: { savedBooks: { bookId } },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};
