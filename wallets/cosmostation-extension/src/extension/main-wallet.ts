import { Wallet } from '@cosmos-kit/core';
import { MainWalletBase } from '@cosmos-kit/core';

import { ChainCosmostationExtension } from './chain-wallet';
import { CosmostationClient } from './client';
import { getCosmostationFromExtension } from './utils';

export class CosmostationExtensionWallet extends MainWalletBase {
  constructor(walletInfo: Wallet) {
    super(walletInfo, ChainCosmostationExtension);
  }

  async initClient() {
    try {
      const cosmostation = await getCosmostationFromExtension();
      this.client = cosmostation
        ? new CosmostationClient(cosmostation)
        : undefined;
    } catch (error) {
      this.setClientNotExist();
    }
  }
}
