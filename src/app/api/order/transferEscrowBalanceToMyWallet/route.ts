import { NextResponse, type NextRequest } from "next/server";

import {
  UserProps,
	buyOrderRollbackPayment,
  buyOrderGetOrderById,
} from '@lib/api/order';

import {
  getOneByWalletAddress
} from '@lib/api/user';


// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";




import {
  createThirdwebClient,
  eth_getTransactionByHash,
  getContract,
  sendAndConfirmTransaction,
  
  sendBatchTransaction,


} from "thirdweb";

//import { polygonAmoy } from "thirdweb/chains";
import {
  polygon,
  arbitrum,
  ethereum,
  bsc,
 } from "thirdweb/chains";

import {
  privateKeyToAccount,
  smartWallet,
  getWalletBalance,
  
 } from "thirdweb/wallets";


import {
  mintTo,
  totalSupply,
  transfer,
  
  getBalance,

  balanceOf,

} from "thirdweb/extensions/erc20";



// nextjs-app
export const maxDuration = 60; // This function can run for a maximum of 5 seconds

//nextjs /pages/api
/*
export const config = {
	//runtime: 'edge',
	maxDuration: 120, // This function can run for a maximum of 60 seconds
};
*/





//const chain = polygon;


// USDT Token (USDT)
const tokenContractAddressUSDT = '0xAa18146F88DE0381b9CC1cA6E5357f364c4ea0BB';

const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum
const contractAddressEthereum = "0xdac17f958d2ee523a2206206994597c13d831ec7"; // USDT on Ethereum
const contractAddressBsc = "0xAa18146F88DE0381b9CC1cA6E5357f364c4ea0BB"; // USDT on BSC






export async function POST(request: NextRequest) {

  const body = await request.json();

  const { lang, chain, walletAddress } = body;

  console.log("lang", lang);
  console.log("chain", chain);

  console.log("walletAddress", walletAddress);





  
  try {



    const user = await getOneByWalletAddress(walletAddress);

    ///console.log("user", user);

    if (!user) {
      return NextResponse.json({
        result: null,
      });
    }

    const escrowWalletPrivateKey = user.escrowWalletPrivateKey;

    if (!escrowWalletPrivateKey) {
      return NextResponse.json({
        result: null,
      });
    }



    const toAddressStore = walletAddress


 
 
    const client = createThirdwebClient({
      secretKey: process.env.THIRDWEB_SECRET_KEY || "",
    });





    const personalAccount = privateKeyToAccount({
      client,
      privateKey: escrowWalletPrivateKey,
    });
  
    if (!personalAccount) {
      return NextResponse.json({
        result: null,
      });
    }


    const wallet = smartWallet({

      chain: chain === 'polygon' ? polygon : arbitrum,

      factoryAddress: "0x9Bb60d360932171292Ad2b80839080fb6F5aBD97", // your own deployed account factory address
      sponsorGas: true,
    });

    // Connect the smart wallet
    const account = await wallet.connect({
      client: client,
      personalAccount: personalAccount,
    });

    if (!account) {
      return NextResponse.json({
        result: null,
      });
    }




    // USDT balance of escrow wallet

    const contract = getContract({
      client,
      chain: chain === "arbitrum" ? arbitrum : polygon,
      address: chain === "arbitrum" ? contractAddressArbitrum : tokenContractAddressUSDT, // erc20 contract from thirdweb.com/explore
    });
  

    const result = await balanceOf({
      contract,
      address: account.address,
    });


    const sendAmountToStore = Number(result) / 10 ** 18;

    console.log("sendAmountToStore", sendAmountToStore);

  


    let sendDataStore = null;



            
    const transactionSendToStore = transfer({
      contract: contract,
      to: toAddressStore,
      amount: sendAmountToStore,
    });

    sendDataStore = await sendAndConfirmTransaction({
      transaction: transactionSendToStore,
      account: account,
    });
 


    //console.log("sendDataStore", sendDataStore);



    if (sendDataStore) {

      console.log("Sent successfully!");

      console.log(`Transaction hash: ${sendDataStore.transactionHash}`);
    
     
      return NextResponse.json({
    
        result: {
          transactionHash: sendDataStore.transactionHash,
        },
        
      });



    } else {
        
        console.log("Failed to send!");
  
        return NextResponse.json({
      
          result: null,
          
        });
  
      }





  } catch (error) {
      
    console.log(" error=====>" + error);



  }

  


 
  return NextResponse.json({

    result: null,
    
  });
  
}
