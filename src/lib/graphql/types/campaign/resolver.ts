import { nanoid } from 'nanoid';
import {
  QueryResolvers,
  MutationResolvers,
  MutationCreateCampaignArgs,
} from '@/graphql-types';
import { ResolverContext } from '@/lib/graphql/apollo';
import { gun } from '@/lib/gun';

const campaign = {
  id: String(1),
  name: 'Campaign',
  description: 'Lorem',
  category: 'sports',
  slug: 'slug',
  previewImage: 'image',
};

const Query: QueryResolvers<ResolverContext> = {
  async campaigns(_parent: any, _args: any) {
    return campaign;
  },
};

const Mutation: MutationResolvers<ResolverContext> = {
  async createCampaign(
    _parent: any,
    { name, description, previewImage }: MutationCreateCampaignArgs
  ) {
    // const hash = await campaignDb.put({
    //   _id: nanoid(),
    //   name: 'shamb0t',
    //   followers: 500,
    // });

    campaign.name = 'name';
    return campaign;
  },
};

const resolvers = { Query, Mutation };

export default resolvers;
