import { NextResponse, type NextRequest } from "next/server";

// const { Network, Alchemy } = require('alchemy-sdk');
import {
  Network,
  Alchemy,
  AssetTransfersCategory,
} from 'alchemy-sdk';

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY || '', // Replace with your Alchemy API key.
  network: Network.BNB_MAINNET, // Replace with the desired network.
  url: `https://bnb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
};

const alchemy = new Alchemy(settings);



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress } = body;

  if (!walletAddress) {
    return NextResponse.json(
      { error: "Wallet address is required" },
      { status: 400 }
    );
  }

  console.log("walletAddress", walletAddress);

  try {

    // Create a new Alchemy instance for each request to avoid potential issues
    const alchemyInstance = new Alchemy({
      apiKey: process.env.ALCHEMY_API_KEY || '',
      network: Network.BNB_MAINNET,
    });

    const transfers = await alchemyInstance.core.getAssetTransfers({
      fromBlock: '0x0',
      toBlock: 'latest',
      excludeZeroValue: true,
      category: [
        AssetTransfersCategory.ERC20,
      ],
      toAddress: walletAddress,
    });

    console.log("transfers", transfers);

    return NextResponse.json({
      result: {
        transfers: transfers.transfers,
      }
    });

  } catch (error) {
    console.error("Error fetching transfers:", error);
    
    // If Alchemy SDK fails, try with direct HTTP request

    try {
      const response = await fetch(`https://bnb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: 'alchemy_getAssetTransfers',
          params: [{
            fromBlock: '0x0',
            toBlock: 'latest',
            excludeZeroValue: true,
            category: ['erc20'],
            toAddress: walletAddress,
          }],
          id: 1,
          jsonrpc: '2.0',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      return NextResponse.json({
        result: {
          transfers: data.result?.transfers || [],
        }
      });

    } catch (fallbackError) {
      console.error("Fallback request also failed:", fallbackError);
      return NextResponse.json(
        { error: "Failed to fetch transfers", details: String(error) },
        { status: 500 }
      );
    }
  } 

  
}
