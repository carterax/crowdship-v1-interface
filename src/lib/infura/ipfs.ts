import { create } from 'ipfs-http-client';

const projectId = process.env.INFURA_IPFS_ID;
const projectSecret = process.env.INFURA_IPFS_SECRET;
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

export const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});
