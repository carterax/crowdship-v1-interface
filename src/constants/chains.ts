export enum SupportedChainId {
  BSC = 56,
  RINKEBY = 0xcfeb869f69431e42cdb54a4f4f105c19c080a601,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.BSC,
  SupportedChainId.RINKEBY,
];

export const DEFAULT_CHAIN_ID: number = 1337;
