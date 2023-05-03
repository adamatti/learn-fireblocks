import { type AssetResponse, FireblocksSDK } from 'fireblocks-sdk';
import fs from 'fs';
import path from 'path';

const apiSecretFile: string = process.env.FIREBLOCKS_SECRET_FILE ?? '';
const apiSecret: string = fs.readFileSync(path.resolve(apiSecretFile), 'utf8');
const apiKey: string = process.env.FIREBLOCKS_API_KEY ?? '';
const fireblocks = new FireblocksSDK(apiSecret, apiKey);

const main = async (): Promise<void> => {
  try {
    const vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});
    console.log(`Got ${vaultAccounts.accounts.length} vaults`);
    for (const account of vaultAccounts.accounts) {
      console.log(`  id: ${account.id}, name: ${account.name}, assets: ${account.assets?.length ?? 0}`); // log account

      const assets: AssetResponse[] = account.assets ?? [];

      for (const asset of assets) {
        if (asset.total === '0' && asset.balance === '0') {
          continue;
        }
        console.log(`    ${JSON.stringify(asset)}`); // log asset
      }
    }
  } catch (error: any) {
    console.error('Error: ', error);
  }
};

main();
