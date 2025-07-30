import { create } from 'domain';
import clientPromise from '../mongodb';





export interface SettlementProps {
    createdAt?: Date;
    updatedAt?: Date;
    status?: string; // Optional, can be used to track settlement status
    walletAddress: string;
    amount: string;
    bankInfo?: {
        accountNumber: string;
        bankName: string;
        accountHolderName: string;
    };
    settlementWalletAddress?: string; // Optional, if not provided, default will be used
    transactionHash?: string; // Optional, to link with a transaction if applicable
}


export async function processSettlement(data: SettlementProps) {
    if (!data.walletAddress || !data.amount || !data.settlementWalletAddress || !data.transactionHash) {
        return { error: "Missing required fields" };
    }

    const settlementData = {
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "pending", // Default status
        walletAddress: data.walletAddress,
        amount: data.amount,
        bankInfo: data.bankInfo || null,
        settlementWalletAddress: data.settlementWalletAddress,
        transactionHash: data.transactionHash || null, // Optional field
    };

    const client = await clientPromise;
    const collection = client.db('damoa').collection('settlements');

    // Insert the settlement data into the database
    const result = await collection.insertOne(settlementData);

    return {
        message: "Settlement processed successfully",
        data: settlementData,
        insertedId: result.insertedId,
    };
}


// getAllSettlements function to retrieve all settlements
export async function getAllSettlementsByWalletAddress(walletAddress: string) {
    if (!walletAddress) {
        return { error: "Missing wallet address" };
    }

    const client = await clientPromise;
    const collection = client.db('damoa').collection('settlements');

    // Find all settlements for the given wallet address
    const settlements = await collection.find({ walletAddress }).toArray();

    return settlements;
}   