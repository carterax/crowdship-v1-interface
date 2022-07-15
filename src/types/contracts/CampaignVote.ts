/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface CampaignVoteInterface extends utils.Interface {
  functions: {
    "campaignFactoryInterface()": FunctionFragment;
    "campaignInterface()": FunctionFragment;
    "paused()": FunctionFragment;
    "voteCount()": FunctionFragment;
    "votes(address,uint256)": FunctionFragment;
    "__CampaignVote_init(address,address)": FunctionFragment;
    "voteOnRequest(uint256,uint8,string)": FunctionFragment;
    "cancelVote(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "campaignFactoryInterface"
      | "campaignInterface"
      | "paused"
      | "voteCount"
      | "votes"
      | "__CampaignVote_init"
      | "voteOnRequest"
      | "cancelVote"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "campaignFactoryInterface",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "campaignInterface",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(functionFragment: "voteCount", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "votes",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "__CampaignVote_init",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "voteOnRequest",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelVote",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "campaignFactoryInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "campaignInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "voteCount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "votes", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "__CampaignVote_init",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "voteOnRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "cancelVote", data: BytesLike): Result;

  events: {
    "Paused(address)": EventFragment;
    "Unpaused(address)": EventFragment;
    "VoteCancelled(uint256,uint256,uint8)": EventFragment;
    "Voted(uint256,uint256,uint8,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VoteCancelled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Voted"): EventFragment;
}

export interface PausedEventObject {
  account: string;
}
export type PausedEvent = TypedEvent<[string], PausedEventObject>;

export type PausedEventFilter = TypedEventFilter<PausedEvent>;

export interface UnpausedEventObject {
  account: string;
}
export type UnpausedEvent = TypedEvent<[string], UnpausedEventObject>;

export type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;

export interface VoteCancelledEventObject {
  voteId: BigNumber;
  requestId: BigNumber;
  support: number;
}
export type VoteCancelledEvent = TypedEvent<
  [BigNumber, BigNumber, number],
  VoteCancelledEventObject
>;

export type VoteCancelledEventFilter = TypedEventFilter<VoteCancelledEvent>;

export interface VotedEventObject {
  voteId: BigNumber;
  requestId: BigNumber;
  support: number;
  hashedVote: string;
}
export type VotedEvent = TypedEvent<
  [BigNumber, BigNumber, number, string],
  VotedEventObject
>;

export type VotedEventFilter = TypedEventFilter<VotedEvent>;

export interface CampaignVote extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CampaignVoteInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    campaignFactoryInterface(overrides?: CallOverrides): Promise<[string]>;

    campaignInterface(overrides?: CallOverrides): Promise<[string]>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    voteCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    votes(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number, BigNumber, string, boolean, string] & {
        id: BigNumber;
        support: number;
        requestId: BigNumber;
        hashedVote: string;
        voted: boolean;
        approver: string;
      }
    >;

    __CampaignVote_init(
      _campaignFactory: PromiseOrValue<string>,
      _campaign: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    voteOnRequest(
      _requestId: PromiseOrValue<BigNumberish>,
      _support: PromiseOrValue<BigNumberish>,
      _hashedVote: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    cancelVote(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  campaignFactoryInterface(overrides?: CallOverrides): Promise<string>;

  campaignInterface(overrides?: CallOverrides): Promise<string>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  voteCount(overrides?: CallOverrides): Promise<BigNumber>;

  votes(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, number, BigNumber, string, boolean, string] & {
      id: BigNumber;
      support: number;
      requestId: BigNumber;
      hashedVote: string;
      voted: boolean;
      approver: string;
    }
  >;

  __CampaignVote_init(
    _campaignFactory: PromiseOrValue<string>,
    _campaign: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  voteOnRequest(
    _requestId: PromiseOrValue<BigNumberish>,
    _support: PromiseOrValue<BigNumberish>,
    _hashedVote: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  cancelVote(
    _requestId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    campaignFactoryInterface(overrides?: CallOverrides): Promise<string>;

    campaignInterface(overrides?: CallOverrides): Promise<string>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    voteCount(overrides?: CallOverrides): Promise<BigNumber>;

    votes(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number, BigNumber, string, boolean, string] & {
        id: BigNumber;
        support: number;
        requestId: BigNumber;
        hashedVote: string;
        voted: boolean;
        approver: string;
      }
    >;

    __CampaignVote_init(
      _campaignFactory: PromiseOrValue<string>,
      _campaign: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    voteOnRequest(
      _requestId: PromiseOrValue<BigNumberish>,
      _support: PromiseOrValue<BigNumberish>,
      _hashedVote: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    cancelVote(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Paused(address)"(account?: null): PausedEventFilter;
    Paused(account?: null): PausedEventFilter;

    "Unpaused(address)"(account?: null): UnpausedEventFilter;
    Unpaused(account?: null): UnpausedEventFilter;

    "VoteCancelled(uint256,uint256,uint8)"(
      voteId?: PromiseOrValue<BigNumberish> | null,
      requestId?: PromiseOrValue<BigNumberish> | null,
      support?: null
    ): VoteCancelledEventFilter;
    VoteCancelled(
      voteId?: PromiseOrValue<BigNumberish> | null,
      requestId?: PromiseOrValue<BigNumberish> | null,
      support?: null
    ): VoteCancelledEventFilter;

    "Voted(uint256,uint256,uint8,string)"(
      voteId?: PromiseOrValue<BigNumberish> | null,
      requestId?: PromiseOrValue<BigNumberish> | null,
      support?: null,
      hashedVote?: null
    ): VotedEventFilter;
    Voted(
      voteId?: PromiseOrValue<BigNumberish> | null,
      requestId?: PromiseOrValue<BigNumberish> | null,
      support?: null,
      hashedVote?: null
    ): VotedEventFilter;
  };

  estimateGas: {
    campaignFactoryInterface(overrides?: CallOverrides): Promise<BigNumber>;

    campaignInterface(overrides?: CallOverrides): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    voteCount(overrides?: CallOverrides): Promise<BigNumber>;

    votes(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    __CampaignVote_init(
      _campaignFactory: PromiseOrValue<string>,
      _campaign: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    voteOnRequest(
      _requestId: PromiseOrValue<BigNumberish>,
      _support: PromiseOrValue<BigNumberish>,
      _hashedVote: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    cancelVote(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    campaignFactoryInterface(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    campaignInterface(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    voteCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    votes(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    __CampaignVote_init(
      _campaignFactory: PromiseOrValue<string>,
      _campaign: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    voteOnRequest(
      _requestId: PromiseOrValue<BigNumberish>,
      _support: PromiseOrValue<BigNumberish>,
      _hashedVote: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    cancelVote(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
