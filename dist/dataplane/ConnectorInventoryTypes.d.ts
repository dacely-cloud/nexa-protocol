import type { ConnectorInventoryPage, ConnectorInventoryQuery } from 'nerva-connector-protocol/protocol/ConnectorInventory.js';
/** Nexa forwards an account-bound metadata page through its protected Compute provider. */
export interface ConnectorInventoryMethod {
    readonly params: ConnectorInventoryQuery;
    readonly result: ConnectorInventoryPage<string>;
}
