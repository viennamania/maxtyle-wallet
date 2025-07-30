// send USDT
'use client';


import React, { useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';


import {
    //ThirdwebProvider,
    ConnectButton,
  
    useConnect,
  
    useReadContract,
  
    useActiveWallet,

    useActiveAccount,
    useSendBatchTransaction,

    useConnectedWallets,

    useSetActiveWallet,

    AutoConnect,
    
} from "thirdweb/react";

import {
    polygon,
    arbitrum,
    ethereum,
    bsc,
} from "thirdweb/chains";

import {
    getContract,
    //readContract,
    sendTransaction,
    sendAndConfirmTransaction,
} from "thirdweb";


/*
import {
	accountAbstraction,
	client,
    wallet,
	editionDropContract,
	editionDropTokenId,
} from "../../../constants";
 */

import { client } from "../../../../../client";



import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 

 
import {
  getOwnedNFTs,
  transferFrom,
} from "thirdweb/extensions/erc721";



import Image from 'next/image';





const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon
const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum
const contractAddressEthereum = "0xdac17f958d2ee523a2206206994597c13d831ec7"; // USDT on Ethereum
const contractAddressBsc = "0x55d398326f99059fF775485246999027B3197955"; // USDT on BSC


const contractAddressTron = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"; // USDT on Tron




/*
const smartWallet = new smartWallet(config);
const smartAccount = await smartWallet.connect({
  client,
  personalAccount,
});
*/

import {
  useRouter,
  useSearchParams
} from "next//navigation";




export default function AgentPage({ params }: any) {

  const agentContractAddress = params.contract;
  const agentTokenId = params.tokenId;

  //console.log("agentContractAddress", agentContractAddress);
  //console.log("agentTokenId", agentTokenId);

  //console.log("params", params);

  const searchParams = useSearchParams();
 
 

  //console.log("agentContractAddress", agentContractAddress);

  
  const [agent, setAgent] = useState({} as any);
  
 
  const [holderWalletAddress, setHolderWalletAddress] = useState("");


  const [ownerInfo, setOwnerInfo] = useState({} as any);

  const [loadingAgent, setLoadingAgent] = useState(false);

  const [animationUrl, setAnimationUrl] = useState("");
  
  useEffect(() => {
      
      const getAgent = async () => {

        setLoadingAgent(true);
  
        const response = await fetch('/api/affiliation/getAgentNFTByContractAddressAndTokenId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            erc721ContractAddress: agentContractAddress,
            tokenId: agentTokenId,
          }),
        });

        if (!response) {
          setLoadingAgent(false);
          return;
        }
  
        const data = await response.json();

        console.log("getAgentNFTByContractAddressAndTokenId data", data);



        if (data.result.raw?.metadata?.animation_url) {
            setAnimationUrl(
                data.result.raw.metadata.animation_url.replace("ipfs://", "https://ipfs.io/ipfs/")
            );
        }
  
  
        setAgent(data.result);

        setOwnerInfo(data?.ownerInfo);
        setHolderWalletAddress(data?.ownerWalletAddress);


        ////console.log("agent======", data.result);

        setLoadingAgent(false);
  
      };
  
      if (agentContractAddress && agentTokenId) getAgent();
  
  }, [agentContractAddress, agentTokenId]);

   
  ///console.log("agent", agent);

  ///console.log("loadingAgent", loadingAgent);
  
  
  const contract = getContract({
    // the client you have created via `createThirdwebClient()`
    client,
    // the chain the contract is deployed on
    
    
    chain: params.chain === "arbitrum" ? arbitrum : polygon,
  
  
  
    // the contract's address
    ///address: contractAddress,

    address: params.chain === "bsc" ? contractAddressBsc : params.chain === "arbitrum" ? contractAddressArbitrum : params.chain === "polygon" ? contractAddress : params.chain === "ethereum" ? contractAddressEthereum : contractAddress,


    // OPTIONAL: the contract's abi
    //abi: [...],
  });





  const [data, setData] = useState({
    title: "",
    description: "",

    menu : {
      buy: "",
      sell: "",
      trade: "",
      chat: "",
      history: "",
      settings: "",
    },

    Go_Home: "",
    My_Balance: "",
    My_Nickname: "",
    My_Buy_Trades: "",
    My_Sell_Trades: "",
    Buy: "",
    Sell: "",
    Buy_USDT: "",
    Sell_USDT: "",
    Contact_Us: "",
    Buy_Description: "",
    Sell_Description: "",
    Send_USDT: "",
    Pay_USDT: "",
    Coming_Soon: "",
    Please_connect_your_wallet_first: "",

    USDT_sent_successfully: "",
    Failed_to_send_USDT: "",

    Go_Buy_USDT: "",
    Enter_Wallet_Address: "",
    Enter_the_amount_and_recipient_address: "",
    Select_a_user: "",
    User_wallet_address: "",
    This_address_is_not_white_listed: "",
    If_you_are_sure_please_click_the_send_button: "",

    Sending: "",

    Anonymous: "",

    My_Wallet_Address: "",

  } );

  /*
  useEffect(() => {
      async function fetchData() {
          const dictionary = await getDictionary(params.lang);
          setData(dictionary);
      }
      fetchData();
  }, [params.lang]);
    */

  const {
    title,
    description,
    menu,
    Go_Home,
    My_Balance,
    My_Nickname,
    My_Buy_Trades,
    My_Sell_Trades,
    Buy,
    Sell,
    Buy_USDT,
    Sell_USDT,
    Contact_Us,
    Buy_Description,
    Sell_Description,
    Send_USDT,
    Pay_USDT,
    Coming_Soon,
    Please_connect_your_wallet_first,

    USDT_sent_successfully,
    Failed_to_send_USDT,

    Go_Buy_USDT,
    Enter_Wallet_Address,
    Enter_the_amount_and_recipient_address,
    Select_a_user,
    User_wallet_address,
    This_address_is_not_white_listed,
    If_you_are_sure_please_click_the_send_button,

    Sending,

    Anonymous,

    My_Wallet_Address,

  } = data;



  const router = useRouter();



  const activeAccount = useActiveAccount();

  const address = activeAccount?.address;





  const [nickname, setNickname] = useState("");
  const [userCode, setUserCode] = useState("");
  const [avatar, setAvatar] = useState("/profile-default.png");

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch("/api/user/getUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                walletAddress: address,
            }),
        });

        const data = await response.json();

        if (data.result) {
            setNickname(data.result.nickname);
            
            data.result.avatar && setAvatar(data.result.avatar);
            

            setUserCode(data.result.id);


        } else {
            setNickname('');
            setAvatar('/profile-default.png');
            setUserCode('');
        }

    };

    if (address) fetchData();
    
  }, [address]);
 






  // transferFrom

  const [transferToAddress, setTransferToAddress] = useState("");

  const [loadingTransfer, setLoadingTransfer] = useState(false);

  const nftTransfer = async (to: string) => {

    if (!address) {
      toast.error("Please connect your wallet first");
      return
    }
    if (!to) {
      toast.error("Please enter the recipient's wallet address");
      return
    }

    setLoadingTransfer(true);

    const contract = getContract({
      client,
      chain: bsc,
      address: agentContractAddress,
    });

    const transaction = transferFrom({
      contract,
      from: address,
      to: to,
      tokenId: agentTokenId,
    });

    const { transactionHash } = await sendTransaction({
      account: activeAccount as any,
      transaction,
    });

    
    if (transactionHash) {

      setTransferToAddress("");

      // getAgent
      const response = await fetch('/api/affiliation/getAgentNFTByContractAddressAndTokenId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          erc721ContractAddress: agentContractAddress,
          tokenId: agentTokenId,
        }),
      });
      if (response) {
        const data = await response.json();

        //console.log("getAgentNFTByContractAddressAndTokenId data", data);


        setAgent(data.result);
        setOwnerInfo(data.ownerInfo);
      }

      toast.success("NFT transferred successfully");

    } else {
        
      toast.error("Failed to transfer NFT");

    }

    setLoadingTransfer(false);

  }






  // get referred members
  const [referredMembers, setReferredMembers] = useState([] as any);
  const [loadingReferredMembers, setLoadingReferredMembers] = useState(false);


  useEffect(() => {
    const getReferredMembers = async () => {
      setLoadingReferredMembers(true);
      const response = await fetch('/api/affiliation/getReferredMembers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referralCode: agentContractAddress + '_' + agentTokenId,
        }),
      });

      if (!response) {
        return;
      }

      const data = await response.json();

      console.log("getReferredMembers data", data);


      setReferredMembers(data.result);

      setLoadingReferredMembers(false);

    } 

    if (agentContractAddress
      && agentTokenId
    ) getReferredMembers();

  }
  , [agentContractAddress, agentTokenId]);

  //console.log("referredMembers", referredMembers);
  /*
  [
    {
      "_id": "67f48c71299eea0cdffdd712",
      "id": 841233,
      "nickname": "genie",
      "userType": "",
      "mobile": "",
      "telegramId": "",
      "email": null,
      "center": null,
      "start": "0x0276aE1b0768bBfe47d3Dd34493A225405aDB6AA_143",
      "walletAddress": "0x5FD40E75e88eb09AA2F4cC772E2263a140a34405",
      "createdAt": "2025-04-08T02:39:45.668Z",
      "settlementAmountOfFee": "0",
      "verified": true
    },
  ]
  */







  return (

    <main className="min-h-[100vh] flex flex-col items-center justify-start container max-w-screen-lg mx-auto
    ">


        {/* go back button */}
        <div className="p-4 w-full flex justify-start items-center gap-2">
            <button
                onClick={() => router.back()}
                className="flex items-center justify-center bg-gray-200 rounded-full p-2">
                <Image
                    src="/icon-back.png"
                    alt="Back"
                    width={20}
                    height={20}
                    className="rounded-full"
                />
            </button>
            {/* title */}
            <span className="text-sm text-gray-500 font-semibold">
                추천인 관리
            </span>
        </div>


        <div className="p-4 w-full min-h-[100vh] bg-[#E7EDF1]">




          {/* agent nft info */}
          <div className={`w-full flex flex-col gap-5 p-4 rounded-lg border bg-gray-100
            ${address && holderWalletAddress && address === holderWalletAddress ? 'border-green-500' : 'border-gray-300'}
          `}>


            {address && holderWalletAddress && address === holderWalletAddress && (
              <div className='flex flex-row items-center gap-2'>
                {/* dot */}
                <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                <span className='text-lg text-green-500 font-semibold'>
                    당신은 이 NFT의 소유자입니다.
                </span>
              </div>
            )}




            {agent && (

              <div className='w-full flex flex-col gap-5'>



                <div className='w-full flex flex-row items-center justify-between gap-2
                 border-b border-gray-300 pb-2
                '>
                    {/* opensea */}
                    <button
                        onClick={() => {
                            window.open('https://opensea.io/assets/matic/' + agentContractAddress + '/' + agentTokenId);
                        }}
                        className="p-2 rounded hover:bg-gray-300"
                    >
                        <Image
                            src="/logo-opensea.png"
                            alt="OpenSea"
                            width={50}
                            height={50}
                            className="rounded-lg"
                        />
                    </button>

                  <div className='w-full flex flex-col xl:flex-row items-start justify-start gap-2'>

                      <div className='flex flex-row items-center justify-between gap-2'>
                        <span className='text-sm text-gray-800'>
                            계약번호
                        </span>
                        <span className='text-lg text-gray-800 font-semibold'>
                            #{agentTokenId?.length > 10 ? agentTokenId.slice(0, 10) + '...' : agentTokenId}
                        </span>
                      </div>

                  </div>

                </div>


                <div className='w-full grid grid-cols-1 xl:grid-cols-2 items-start justify-start gap-5'>


                  <div className='w-full flex flex-col items-start justify-start gap-2'>




                    <div className='w-full flex flex-row items-start justify-between gap-2
                      bg-white
                      rounded-lg p-4 shadow-md
                      border border-gray-300
                    '>

                        <div className='w-1/4 flex flex-col items-start justify-start gap-2'>
                            {!animationUrl && agent.image && (
                                <Image
                                    //src={agent?.image?.thumbnailUrl}
                                    src={agent?.image?.originalUrl || '/logo-masterbot.png'}
                                    width={200}
                                    height={200}
                                    alt={agent.name}
                                    className='rounded-lg object-cover w-full'
                                />
                            )}
                            {/* animationUrl */}
                            {/* auto play */}
                            {animationUrl && (
                                <video
                                    src={animationUrl}
                                    controls
                                    autoPlay
                                    loop
                                    className='rounded-lg object-cover w-full'
                                />
                            )}
                        </div>
                        
                        
                        <div className='w-3/4 flex flex-col items-start justify-between gap-2'>

                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                <span className='text-xs text-zinc-800'>
                                    이름
                                </span>
                                <span className='text-lg font-semibold text-zinc-800'>
                                    {agent.name}
                                </span>
                            </div>

                            
                            {/* agent.mint.timestamp */}
                            {/*}
                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                <span className='text-xs text-gray-200'>
                                    발행일
                                </span>
                                <span className='text-xs text-gray-200'>
                                    {agent.mint?.timestamp && new Date(agent.mint.timestamp).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                            */}
                            {/* agent.mint.blockNumber */}
                            {/* 블록번호 */}
                            {/*
                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                <span className='text-xs text-gray-200'>
                                    블록번호
                                </span>
                                <span className='text-xs text-gray-200'>
                                    #{agent.mint?.blockNumber}
                                </span>
                            </div>
                            */}
                    
                            {/*
                            <div className='flex flex-col items-start justify-between gap-2'>
                                <span className='text-xs text-gray-200'>
                                    NFT 설명
                                </span>
                                <span className='text-sm text-gray-200'>
                                    {agent.description}
                                </span>
                            </div>
                            */}
                        </div>



                    </div>


                    {holderWalletAddress && address &&  holderWalletAddress.toLowerCase() !== address.toLowerCase() && (
                    
                        <div className='mt-5 w-full flex flex-col items-start justify-between gap-2
                        border-b border-gray-300 pb-2
                        '>
                        {/* owner info */}
                        <div className='w-full flex flex-col items-start justify-between gap-2'>
                            
                            <span className='text-sm text-yellow-500'>
                                NFT 소유자 정보
                            </span>
                            
                            <div className='w-full flex flex-row items-center justify-start gap-2'>
                                <span className='text-xs text-gray-800'>
                                    소유자 지갑주소: {holderWalletAddress?.slice(0, 5) + '...' + holderWalletAddress?.slice(-5)}
                                </span>
                                {/* copy button */}
                                <button
                                onClick={() => {
                                    navigator.clipboard.writeText(holderWalletAddress);
                                    toast.success("Copied");
                                }}
                                className='bg-gray-500 text-white p-2 rounded-lg
                                    hover:bg-gray-600
                                '
                                >
                                    Copy
                                </button>
                            </div>
                            

                            <div className='w-full flex flex-row items-center justify-start gap-2
                            '>

                            <Image
                                src={ownerInfo?.avatar || '/profile-default.png'}
                                width={60}
                                height={60}
                                alt={ownerInfo?.nickname}
                                className='rounded-lg object-cover w-10 h-10'
                            />
                            <div className='flex flex-col items-start justify-between gap-2'>
                                <span className='text-xs text-gray-800'>
                                    {ownerInfo?.nickname}
                                </span>
                                <span className='text-xs text-gray-800'>
                                    {ownerInfo?.mobile && ownerInfo?.mobile?.slice(0, 3) + '****' + ownerInfo?.mobile?.slice(-4)}
                                </span>
                            </div>
                            </div>

                            {/* button for transfer owner */}
                            {/*
                            {address && ownerInfo?.walletAddress && address === ownerInfo?.walletAddress && (
                            <div className='w-full flex flex-col items-center justify-between gap-2'>
                                
                                <div className='w-full flex flex-col items-start justify-between gap-2'>
                                <span className='text-sm text-yellow-500'>
                                    소유권 이전하기
                                </span>
                                <div className='flex flex-row items-center justify-start gap-2'>
                                    <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                                    <span className='text-xs text-gray-800'>
                                        소유권을 이전하면 소유자 권리를 모두 이전하는 것에 동의하는 것입니다.
                                    </span>
                                </div>
                                </div>

                                <input
                                value={transferToAddress}
                                onChange={(e) => setTransferToAddress(e.target.value)}
                                type='text'
                                placeholder='이전할 지갑주소를 입력하세요.'
                                className={`w-full p-2 rounded border border-gray-300
                                    ${loadingTransfer ? 'bg-gray-100' : 'bg-white'}
                                `}
                                
                                disabled={loadingTransfer}
                                />
                                <button
                                onClick={() => {
                                    //alert('준비중입니다.');
                                    confirm('소유권을 이전하시겠습니까?') &&
                                    nftTransfer(transferToAddress);
                                }}
                                className={`
                                    ${!transferToAddress || loadingTransfer ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'}
                                    text-white p-2 rounded
                                `}
                                disabled={
                                    !transferToAddress ||
                                    loadingTransfer
                                }
                                >
                                {loadingTransfer ? '소유권 이전중...' : '소유권 이전하기'}
                                </button>
                            </div>
                            )}
                            */}

                        </div>

                        </div>

                    )}



                    
                  </div>


                </div>


                {!loadingReferredMembers && referredMembers.length === 0 && (
                  <div className='w-full flex flex-col items-start justify-start gap-2'>
                    <div className='w-full flex flex-row items-center justify-start gap-2'>
                        {/* dot */}
                        <div className='w-2 h-2 bg-gray-500 rounded-full'></div>
                        <span className='text-sm font-semibold text-gray-800'>
                            추천인 목록
                        </span>
                    </div>
                    <span className='text-sm text-gray-800'>
                        추천인이 없습니다.
                    </span>
                  </div>
                )}



                {/* referred members */}
                {
                  loadingReferredMembers && (
                    <div className='w-full flex flex-col items-start justify-start gap-2'>
                      <span className='text-sm text-gray-800'>
                          추천인 목록을 불러오는 중입니다...
                      </span>
                    </div>
                  )
                }
                {!loadingReferredMembers &&
                referredMembers.length > 0 && (
                  <div className='w-full flex flex-col items-start justify-start gap-2'>

                    <div className='w-full flex flex-row items-center justify-start gap-2
                      border-b border-gray-300 pb-2
                    '>
                        {/* dot */}
                        <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                        <span className='text-lg font-semibold text-gray-800'>
                            추천인 목록
                        </span>
                    </div>

                    <div className='w-full flex flex-col items-start justify-start gap-2'>

                        {referredMembers.map((member: any, index: number) => (

                            <div
                              key={index}
                              className='w-full flex flex-row items-center justify-start gap-2
                                border-b border-gray-300 pb-2
                              '
                            >

                              <Image
                                  src={member?.avatar || '/profile-default.png'}
                                  width={40}
                                  height={40}
                                  alt={member?.nickname}
                                  className='rounded-lg object-cover w-6 h-6'
                              />

                              <div className='flex flex-row items-center justify-between gap-2'>
                                  <span className='text-lg text-green-500 font-semibold'>
                                    {member?.nickname}
                                  </span>
                                  <span className='text-xs text-gray-800'>
                                    {member?.walletAddress && member?.walletAddress.slice(0, 5) + '...' + member?.walletAddress.slice(-5)}
                                  </span>
                              </div>

                            </div>
                        ))}

                    </div>

                  </div>
                )}

                  

                  



              </div>

            )}

          </div>


       </div>

    </main>

  );

}
