import merge from 'lodash/merge';

import User from './types/user/resolver';
import Campaign from './types/campaign/resolver';

const resolvers = merge(User, Campaign);

export default resolvers;
