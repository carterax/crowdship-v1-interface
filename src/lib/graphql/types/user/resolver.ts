import { QueryResolvers, MutationResolvers } from '@/graphql-types';
import { ResolverContext } from '@/lib/graphql/apollo';

const userProfile = {
  id: String(1),
  name: 'John Smith',
  status: 'cached',
};

const Query: QueryResolvers<ResolverContext> = {
  viewer(_parent: any, _args: any, _context: any, _info: any) {
    return userProfile;
  },
};

const Mutation: MutationResolvers<ResolverContext> = {
  updateName(_parent: any, _args: any, _context: any, _info: any) {
    userProfile.name = _args.name;
    return userProfile;
  },
};

const resolvers = { Query, Mutation };

export default resolvers;
