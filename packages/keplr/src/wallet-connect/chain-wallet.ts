import { ChainRegistry, ChainWalletBase, State } from '@cosmos-kit/core';
import { KeplrWalletConnectV1 } from '@keplr-wallet/wc-client';
import WalletConnect from '@walletconnect/client';

import { ChainWCKeplrData } from './types';
// import { WCKeplrWallet } from './main-wallet';


export class ChainWCKeplr extends ChainWalletBase<
  KeplrWalletConnectV1,
  ChainWCKeplrData,
  any
> {

  constructor(_chainRegistry: ChainRegistry, keplrWallet: any) {
    super(_chainRegistry, keplrWallet);
  }

  get client() {
    return this.mainWallet.client;
  }

  get connector(): WalletConnect {
    return this.client.connector;
  }

  get isInSession() {
    return this.connector.connected;
  }

  get username(): string | undefined {
    return this.data?.username;
  }

  get qrUri() {
    return this.connector.uri;
  }

  private get ee() {
    return this.mainWallet.ee;
  }

  async connect(): Promise<void> {
    if (!this.isInSession) {
      await this.connector.createSession();
      this.ee.on('update', async () => {
        await this.update();
      })
      this.ee.on('disconnect', async () => {
        await this.disconnect();
      })
    } else {
      await this.update();
    }
  }

  async update() {
    this.setState(State.Pending);
    try {
      const key = await this.client.getKey(this.chainName);
      this.setData({
        address: key.bech32Address,
        username: key.name,
      });
      this.setState(State.Done);
    } catch (e) {
      console.error(`Chain ${this.chainName} keplr-qrcode connection failed! \n ${e}`);
      this.setState(State.Error);
      this.setMessage((e as Error).message);
    }
  }

  async disconnect() {
    // await this.connector.killSession();
    this.reset();
  }
}