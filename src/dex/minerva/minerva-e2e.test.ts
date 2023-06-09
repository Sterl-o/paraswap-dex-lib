/* eslint-disable no-console */
import dotenv from 'dotenv';
dotenv.config();

import { testE2E } from '../../../tests/utils-e2e';
import {
  Tokens,
  Holders,
  NativeTokenSymbols,
} from '../../../tests/constants-e2e';
import { Network, ContractMethod, SwapSide } from '../../constants';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { generateConfig } from '../../config';

describe('Minerva', () => {
  const dexKey = 'Minerva';

  const network = Network.OPTIMISM;
  const tokens = Tokens[network];
  const holders = Holders[network];
  const provider = new StaticJsonRpcProvider(
    generateConfig(network).privateHttpProvider,
    network,
  );

  const tokenASymbol: string = 'USDC';
  const tokenBSymbol: string = 'WETH';
  const nativeTokenSymbol = NativeTokenSymbols[network];

  const tokenAAmount: string = '2000000000';
  const tokenBAmount: string = '1000000000000000000';
  const nativeTokenAmount = '1000000000000000000';

  const sideToContractMethods = new Map([
    [
      SwapSide.SELL,
      [
        ContractMethod.simpleSwap,
        ContractMethod.multiSwap,
        ContractMethod.megaSwap,
      ],
    ],
  ]);

  sideToContractMethods.forEach((contractMethods, side) =>
    contractMethods.forEach((contractMethod: ContractMethod) => {
      describe(`${contractMethod}`, () => {
        it(nativeTokenSymbol + ' -> TOKEN', async () => {
          await testE2E(
            tokens[nativeTokenSymbol],
            tokens[tokenASymbol],
            holders[nativeTokenSymbol],
            side === SwapSide.SELL ? nativeTokenAmount : tokenAAmount,
            side,
            dexKey,
            contractMethod,
            network,
            provider,
          );
        });
        it('TOKEN -> ' + nativeTokenSymbol, async () => {
          await testE2E(
            tokens[tokenASymbol],
            tokens[nativeTokenSymbol],
            holders[tokenASymbol],
            side === SwapSide.SELL ? tokenAAmount : nativeTokenAmount,
            side,
            dexKey,
            contractMethod,
            network,
            provider,
          );
        });
        it('TOKEN -> TOKEN', async () => {
          await testE2E(
            tokens[tokenASymbol],
            tokens[tokenBSymbol],
            holders[tokenASymbol],
            side === SwapSide.SELL ? tokenAAmount : tokenBAmount,
            side,
            dexKey,
            contractMethod,
            network,
            provider,
          );
        });
      });
    }),
  );

  sideToContractMethods.forEach((contractMethods, side) =>
    contractMethods.forEach((contractMethod: ContractMethod) => {
      describe(`${contractMethod}`, () => {
        it(nativeTokenSymbol + ' -> TOKEN', async () => {
          await testE2E(
            tokens[nativeTokenSymbol],
            tokens[tokenASymbol],
            holders[nativeTokenSymbol],
            side === SwapSide.SELL ? nativeTokenAmount : tokenAAmount,
            side,
            dexKey,
            contractMethod,
            network,
            provider,
          );
        });
        it('TOKEN -> ' + nativeTokenSymbol, async () => {
          await testE2E(
            tokens[tokenASymbol],
            tokens[nativeTokenSymbol],
            holders[tokenASymbol],
            side === SwapSide.SELL ? tokenAAmount : nativeTokenAmount,
            side,
            dexKey,
            contractMethod,
            network,
            provider,
          );
        });
        it('TOKEN -> TOKEN', async () => {
          await testE2E(
            tokens[tokenASymbol],
            tokens[tokenBSymbol],
            holders[tokenASymbol],
            side === SwapSide.SELL ? tokenAAmount : tokenBAmount,
            side,
            dexKey,
            contractMethod,
            network,
            provider,
          );
        });
      });
    }),
  );
});