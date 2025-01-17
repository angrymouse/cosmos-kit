/// <reference types="node" />
import { Callbacks, DownloadInfo, SessionOptions, Wallet, WalletClient } from '../types';
import { StateBase } from './state';
import EventEmitter from 'events';
export declare abstract class WalletBase<Data> extends StateBase<Data> {
    client?: WalletClient;
    emitter?: EventEmitter;
    protected _walletInfo: Wallet;
    callbacks?: Callbacks;
    constructor(walletInfo: Wallet);
    get walletInfo(): Wallet;
    get downloadInfo(): DownloadInfo | undefined;
    get walletName(): string;
    get walletPrettyName(): string;
    get rejectMessageSource(): string;
    get rejectMessageTarget(): string;
    get rejectCode(): number;
    rejectMatched(e: Error): boolean;
    updateCallbacks(callbacks: Callbacks): void;
    disconnect: (callbacks?: Callbacks, sync?: boolean) => Promise<void>;
    setClientNotExist(): void;
    setRejected(): void;
    setError(e?: Error | string): void;
    connect: (sessionOptions?: SessionOptions, callbacks?: Callbacks, sync?: boolean) => Promise<void>;
    abstract initClient(options?: any): void | Promise<void>;
    abstract update(sessionOptions?: SessionOptions, callbacks?: Callbacks): void | Promise<void>;
}
