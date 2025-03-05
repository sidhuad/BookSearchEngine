import { User } from "../models/index.js";
import { UserDocument } from "../models/User.js";
import { AuthenticationError, signToken } from "../services/auth.js";

interface Context {
  user?: UserDocument;
}
// interface User {
//   _id: String;
//   username: String;
//   email: String;
//   password: String;
//   savedBooks: object[];
//   bookCount: Number;
// }
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
    ): Promise<UserDocument | null> => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    login: async (
      _parent: any,
      { email, password }: { email: string; password: string }
    ): Promise<{ token: string; user: UserDocument }> => {
      const user = await User.findOne({ email });
      if (!user) {
        console.log('server side resolver cant find user');
        throw new AuthenticationError('invalid user email');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('invalid password');
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    addUser: async (
      _parent: any,
      { input }: addUserArgs
    ): Promise<{ token: string; user: UserDocument }> => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    saveBook: async (
      _parent: any,
      { input }: saveBookArgs,
      context: Context
    ): Promise<UserDocument | null> => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { saveBooks: [{ ...input }] },
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
    ): Promise<UserDocument | null> => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: { saveBooks: { bookId } },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

export default resolvers;