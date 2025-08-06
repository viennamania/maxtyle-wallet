import { transfer } from 'thirdweb/extensions/erc20';
import clientPromise from '../mongodb';

/*
  console.log("transactionHash", transactionHash, "transactionIndex", transactionIndex,
    "fromAddress", fromAddress, "toAddress", toAddress, "value", value,
    "timestamp", timestamp);
  
*/

export interface TransferProps {
    transactionHash: string;
    transactionIndex: string;
    fromAddress: string;
    toAddress: string;
    value: string;
    timestamp: string;
}




export async function insertOne(data: any) {

    if (
        !data.contractAddress ||
        !data.transactionHash || !data.transactionIndex || !data.fromAddress || !data.toAddress || !data.value || !data.timestamp) {
        return null;
    }


    const client = await clientPromise;


    const collectionUserTransfers = client.db('damoa').collection('userTransfers');

  
    await collectionUserTransfers.insertOne({
        user: {
            walletAddress: data.fromAddress,
        },
        sendOrReceive: "send", // or "receive" based on your logic
        fromUser: data.fromUser, // Optional, can be user object
        toUser: data.toUser, // Optional, can be user object
        transferData: {
            contractAddress: data.contractAddress,
            transactionHash: data.transactionHash,
            transactionIndex: data.transactionIndex,
            fromAddress: data.fromAddress,
            toAddress: data.toAddress,
            value: data.value,
            timestamp: data.timestamp,
        },
    });



    await collectionUserTransfers.insertOne({
        user: {
            walletAddress: data.toAddress,
        },
        sendOrReceive: "receive", // or "send" based on your logic
        fromUser: data.fromUser, // Optional, can be user object
        toUser: data.toUser, // Optional, can be user object
        transferData: {
            contractAddress: data.contractAddress,
            transactionHash: data.transactionHash,
            transactionIndex: data.transactionIndex,
            fromAddress: data.fromAddress,
            toAddress: data.toAddress,
            value: data.value,
            timestamp: data.timestamp,
        },
    });



    




    return {
        result: "success",
    };


}



// getTransferByWalletAddress
export async function getTransferByWalletAddress(data: any) {

    if (!data.walletAddress) {
        return null;
    }

    const client = await clientPromise;

    const collectionUsers = client.db('damoa').collection('users');

    
    const user = await collectionUsers.findOne(
        { walletAddress: data.walletAddress },
        { projection: { walletAddress: 1 } }
    );


    if (!user) {
        return null;
    }

    // transferData: { transactionHash: string, transactionIndex: string, fromAddress: string, toAddress: string, value: string, timestamp: string }
    // timestamp desc
    

    const collectionUserTransfers = client.db('damoa').collection('userTransfers');

    const userTransfers = await collectionUserTransfers
    .find({ "user.walletAddress": data.walletAddress })
    .sort({ "transferData.timestamp": -1 })
    .toArray();

    // totalTransfers
    const totalCount = await collectionUserTransfers.countDocuments({ "user.walletAddress": data.walletAddress });


    return {
        transfers: userTransfers,
        totalCount: totalCount,
    }

}

