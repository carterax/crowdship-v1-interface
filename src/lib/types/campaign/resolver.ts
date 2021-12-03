import {
  QueryResolvers,
  MutationResolvers,
} from 'graphql-let/__generated__/__types__';
import { ResolverContext } from '../../apollo';

const campaign = {
  id: String(1),
  name: 'Campaign',
  description: 'Lorem',
  category: 'sports',
  slug: 'slug',
  previewImage: 'image',
};

const Query: QueryResolvers<ResolverContext> = {
  campaigns(_parent: any, _args: any, _context: any, _info: any) {
    return campaign;
  },
};

const Mutation: MutationResolvers<ResolverContext> = {
  createCampaign(_parent: any, _args: any, _context: any, _info: any) {
    campaign.name = _args.name;
    return campaign;
  },
};

const resolvers = { Query, Mutation };

export default resolvers;
