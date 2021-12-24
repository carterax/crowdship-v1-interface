import merge from 'lodash/merge';

import User from '@/lib/graphql/types/user/resolver';
import Campaign from '@/lib/graphql/types/campaign/resolver';

const resolvers = merge(User, Campaign);

export default resolvers;
