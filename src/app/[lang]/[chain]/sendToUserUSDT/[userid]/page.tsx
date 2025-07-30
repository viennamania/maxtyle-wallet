// send USDT
'use client';


import React, { use, useEffect, useState } from 'react';

import Link from "next/link";


import { toast } from 'react-hot-toast';
import { client } from '../../../../client';

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

import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 


import {
  createWallet,
  inAppWallet,
} from "thirdweb/wallets";

import Image from 'next/image';

import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../../dictionaries";

import { useQRCode } from 'next-qrcode';

import {
  Scanner,
  useDevices,
  outline,
  boundingBox,
  centerText,
} from "@yudiel/react-qr-scanner";

const styles = {
  container: {
    width: 400,
    margin: "auto",
  },
  controls: {
    marginBottom: 8,
  },
};






const wallets = [
  inAppWallet({
    auth: {
      options: ["phone"],
    },
  }),
];




const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon
const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum
const contractAddressEthereum = "0xdac17f958d2ee523a2206206994597c13d831ec7"; // USDT on Ethereum
const contractAddressBsc = "0x55d398326f99059fF775485246999027B3197955"; // USDT on BSC

const contractAddressMKRW = "0xEb0a5ea0001Aa9f419BbaF8ceDad265A60f0B10f"; // MKRW on BSC




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

import { Select } from '@mui/material';
import { Sen } from 'next/font/google';
import { Router } from 'next/router';
import path from 'path';

import { TronWeb, utils as TronWebUtils, Trx, TransactionBuilder, Contract, Event, Plugin } from 'tronweb';







/*
const transactions = await Engine.searchTransactions({
  client,
  filters: [
    {
      filters: [
        {
          field: "from",
          values: ["0x1234567890123456789012345678901234567890"],
        },
        {
          field: "chainId",
          values: ["8453"],
        },
      ],
      operation: "AND",
    },
  ],
  pageSize: 100,
  page: 0,
});
console.log(transactions);
*/






export default function SendUsdt({ params }: any) {




  const [recipient, setRecipient] = useState({
    _id: '',
    id: 0,
    email: '',
    nickname: '',
    avatar: '',
    mobile: '',
    walletAddress: '',
    tronWalletAddress: '',
    createdAt: '',
    settlementAmountOfFee: '',
  });

  //console.log("recipient", recipient);



  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const [tracker, setTracker] = useState<string | undefined>("centerText");
  const [pause, setPause] = useState(false);

  const devices = useDevices();

  function getTracker() {
    switch (tracker) {
      case "outline":
        return outline;
      case "boundingBox":
        return boundingBox;
      case "centerText":
        return centerText;
      default:
        return undefined;
    }
  }

  const handleScan = async (data: string) => {
    setPause(true);

    /*
    setRecipient({
      _id: '',
      id: 0,
      email: '',
      nickname: '',
      avatar: '',
      mobile: '',
      walletAddress: data,
      tronWalletAddress: '',
      createdAt: '',
      settlementAmountOfFee: '',
    });
    */
    setRecipient({
      ...recipient,
      walletAddress: data,
    })


    /*
    try {

      const response = await fetch(
        `your-api-url?code=${encodeURIComponent(data)}`
      );
      const result = await response.json();

      if (response.ok && result.success) {
        alert("Success! Welcome to the conference.");
      } else {
        alert(result.message);
      }


    } catch (error: unknown) {
      console.log(error);
    } finally {
      setPause(false);
    }
    */

  };




  const userid = params.userid;




  //console.log("params", params);

  const searchParams = useSearchParams();
 

  const token = "USDT"; 

  //console.log("token", token);

  const tokenImage = "/token-" + String(token).toLowerCase() + "-icon.png";
  

  const contract = getContract({
    // the client you have created via `createThirdwebClient()`
    client,
    // the chain the contract is deployed on
    
    
    chain: params.chain === "bsc" ? bsc : params.chain === "arbitrum" ? arbitrum : params.chain === "polygon" ? polygon : params.chain === "ethereum" ? ethereum : polygon,
  
  
  
    // the contract's address
    ///address: contractAddress,

  

    address: params.chain === "bsc" ? contractAddressBsc : params.chain === "arbitrum" ? contractAddressArbitrum : params.chain === "polygon" ? contractAddress : params.chain === "ethereum" ? contractAddressEthereum : contractAddress,


    // OPTIONAL: the contract's abi
    //abi: [...],
  });




  const contractMKRW = getContract({
    // the client you have created via `createThirdwebClient()`
    client,
    // the chain the contract is deployed on
    chain: bsc,
    // the contract's address
    address: contractAddressMKRW,
  });



  



  const { Canvas } = useQRCode();










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

  useEffect(() => {
      async function fetchData() {
          const dictionary = await getDictionary(params.lang);
          setData(dictionary);
      }
      fetchData();
  }, [params.lang]);

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



  const [amount, setAmount] = useState(0);




  const [nativeBalance, setNativeBalance] = useState(0);

  const [balance, setBalance] = useState(0);
  useEffect(() => {

    // get the balance
    const getBalance = async () => {

      if (!address || !params.chain || !token) return;
  
      try {
        if (String(token).toLowerCase() === "usdt") {

          const result = await balanceOf({
            contract : contract,
            address: address,
          });

          if (result !== undefined && result !== null) {
            if (params.chain === "bsc") {
              setBalance( Number(result) / 10 ** 18 );
            } else {
              setBalance( Number(result) / 10 ** 6 );
            }
          } else {
            setBalance(0);
          }

        } else if (String(token).toLowerCase() === "mkrw") {

          const result = await balanceOf({
            contract : contractMKRW,
            address: address,
          });

          if (result !== undefined && result !== null) {
            setBalance( Number(result) / 10 ** 18 );
          } else {
            setBalance(0);
          }
        }
      } catch (error) {
        console.error("Error getting balance:", error);
        setBalance(0);
      }

    };

    if (address && params.chain && token) getBalance();

    const interval = setInterval(() => {
      if (address) getBalance();
    } , 1000);

    return () => clearInterval(interval);


  } , [address, params.chain, token, contract, contractMKRW]);








  ///console.log("recipient", recipient);

  //console.log("recipient.walletAddress", recipient.walletAddress);
  //console.log("amount", amount);



  const [otp, setOtp] = useState('');

  
  
  /////const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(true); // for testing


  const [isSendedOtp, setIsSendedOtp] = useState(false);



  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const [isVerifingOtp, setIsVerifingOtp] = useState(false);

  


  const [wantToReceiveWalletAddress, setWantToReceiveWalletAddress] = useState(true);


  const [sending, setSending] = useState(false);



  const sendUsdt = async () => {
    if (sending) {
      return;
    }

    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!amount) {
      toast.error('Please enter a valid amount');
      return;
    }

 

    setSending(true);



    try {



   

      let transaction = null;

        // send KCT
        // Call the extension function to prepare the transaction

        if (String(token).toLowerCase() === "usdt") {


          transaction = transfer({
 
              contract: contract,

              to: params.userid,
              amount: amount,
          });

        } else if (String(token).toLowerCase() === "mkrw") {

          transaction = transfer({
              //contract,

              contract: contractMKRW,

              to: params.userid,
              amount: amount,
          });
        } 

        if (!transaction) {
          toast.error("잘못된 토큰입니다.");
          setSending(false);
          return;
        }



        const { transactionHash } = await sendTransaction({
          
          account: activeAccount as any,

          transaction,
        });

        console.log("transactionHash", transactionHash);

        
        if (transactionHash) {

          /*
          await fetch('/api/transaction/setTransfer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              lang: params.lang,
              chain: params.chain,
              walletAddress: address,
              amount: amount,
              toWalletAddress: recipient.walletAddress,
            }),
          });
          */



          //toast.success(USDT_sent_successfully);
          toast.success("전송 완료");

          setAmount(0); // reset amount

          // refresh balance

          // get the balance



          //console.log(result);

          if (String(token).toLowerCase() === "usdt") {
            const result = await balanceOf({
              contract: contract,
              address: address,
            });

            if (params.chain === "bsc") {
              setBalance( Number(result) / 10 ** 18 );
            } else {
              setBalance( Number(result) / 10 ** 6 );
            }

          } else if (String(token).toLowerCase() === "mkrw") {


            const result = await balanceOf({
              contract: contractMKRW,
              address: address,
            });

            setBalance( Number(result) / 10 ** 18 );
          }

        } else {

          toast.error("전송 실패");

        }

    

      


    } catch (error) {
      
      console.error("error", error);

      //toast.error(Failed_to_send_USDT);
      toast.error("전송 실패");
    }

    setSending(false);
  };



  // get user by wallet address
  const getUserByWalletAddress = async (walletAddress: string) => {

    const response = await fetch('/api/user/getUserByWalletAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress: walletAddress,
      }),
    });

    const data = await response.json();

    //console.log("getUserByWalletAddress", data);

    return data.result;

  };

  const [isWhateListedUser, setIsWhateListedUser] = useState(false);



  const [selectDeposit, setSelectDeposit] = useState(false);
  const [selectWithdraw, setSelectWithdraw] = useState(true);
  const [selectSwap, setSelectSwap] = useState(false);





  // usdt balance
  /*
  const [usdtBalance, setUsdtBalance] = useState(0);
  useEffect(() => {
    
      const getUsdtBalance = async () => {



        
        if (address) {
          


          if (contract) {
  
            const balance = await balanceOf({
              contract: contract,
              address: address,
            });

            console.log("balance==========", balance);

            setUsdtBalance(Number(balance) / 10 ** 6);
          }

        }
          



      };

      getUsdtBalance();

  } , [address, params.chain, contract]);

  */

  


    // get sendbird user data
    const [loadingSendbirdUser, setLoadingSendbirdUser] = useState(false);
    const [sendbirdUser, setSendbirdUser] = useState(null) as any;
    useEffect(() => {
        const fetchData = async () => {
            setLoadingSendbirdUser(true);
            const response = await fetch("/api/sendbird/getOneUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: userid
                }),
            });

            const data = await response.json();

            //console.log("sendbird user data", data);

            if (data.error) {
                setSendbirdUser(null);
            } else {
                setSendbirdUser(data.result.user);
            }

            setLoadingSendbirdUser(false);
        };

        userid && fetchData();
    }, [userid]);




  return (

    <main className="min-h-[100vh] flex flex-col items-center justify-start container max-w-screen-lg mx-auto
      bg-[#E7EDF1] text-gray-800 font-sans antialiased relative overflow-x-hidden
      "
    >


      {/* go back button is left side of the screen */}
      {/* and title is absolutely horizontal center position */}

      <div className="p-2 w-full flex flex-row items-center justify-between bg-white border-b border-gray-300
      fixed top-0 left-0 z-50">
        <button
            onClick={() => router.back()}
            className="flex flex-row items-center justify-center bg-gray-200 rounded-lg
            p-2 gap-2 hover:bg-gray-300 transition-colors duration-200"
        >
            <Image
                src="/icon-back.png"
                alt="Back"
                width={20}
                height={20}
                className="rounded-full"
            />
            <div className="text-sm font-semibold text-gray-800">
              <span className="inline">
                뒤로가기
              </span>
            </div>
        </button>

        <h1 className="text-lg font-semibold text-gray-800">
          회원에게 {token} 보내기
        </h1>

      </div>


      <div className="
        mt-20
        flex flex-col items-center justify-start gap-4
        p-4 w-full min-h-[100vh] bg-[#E7EDF1]">



            {!address && (

            <div className="
                mt-16
                w-full flex flex-col justify-center items-center gap-2 p-2">
            
                <ConnectButton
                client={client}
                wallets={wallets}
                accountAbstraction={{
                    chain: bsc,
                    sponsorGas: true
                }}
                
                theme={"light"}

                // button color is dark skyblue convert (49, 103, 180) to hex
                connectButton={{
                    style: {
                    backgroundColor: "#3167b4", // dark skyblue
                    // font color is gray-300
                    color: "#f3f4f6", // gray-300
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontSize: "16px",
                    // w-full
                    width: "100%",
                    },
                    label: "로그인 및 회원가입",
                }}

                connectModal={{
                    size: "wide", 
                    //size: "compact",
                    titleIcon: "https://wallet.cryptopay.beauty/logo.png",                           
                    showThirdwebBranding: false,
                }}

                locale={"ko_KR"}
                //locale={"en_US"}
                />




                <div className="mt-20
                flex flex-row gap-2 justify-center items-center">
                <span className="text-sm md:text-lg text-zinc-500">
                    이용방법이 궁금하신가요?
                </span>
                <Link
                    href="#"
                    className="text-sm md:text-lg text-blue-500 font-semibold hover:underline"
                >
                    이용가이드
                </Link>
                </div>



            </div>

            )}


            <div className="w-full flex flex-col gap-2 items-start">



              <div className="w-full flex flex-row gap-2 items-center justify-between bg-white border border-gray-300 rounded-lg p-4">

                <div className='flex flex-row gap-2 items-center justify-start'>
                  <Image
                    src={tokenImage}
                    alt="token"
                    width={35}
                    height={35}
                    className='rounded-full w-8 h-8 xl:w-10 xl:h-10'
                  />
                  {token?.toLowerCase() === "usdt" ? (
                    <span className="text-lg font-semibold text-gray-800">
                      테더
                    </span>
                  ) : (
                    <span className="text-lg font-semibold text-gray-800">
                      포인트
                    </span>
                  )}

                </div>

                <div className="flex flex-row items-center justify-end  gap-2">
                  <span className="text-2xl font-semibold text-gray-800">
                    {token?.toLowerCase() === "usdt" ? (
                      Number(balance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    ) : (
                      Number(balance).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    )}
                  </span>
                  <span className="text-lg">{token}</span>
                </div>

              </div>



              <div className="w-full flex flex-col xl:flex-row items-start justify-between gap-3">

                <div className="w-full flex flex-col xl:flex-row items-start gap-3">
                  

                  {/* 입금 button / 출금 button / 스왑 button*/}
                  {/* radio buttons */}
                  <div className="w-full flex flex-row gap-2 items-center justify-between">
                    {/*
                    <button
                      onClick={() => {
                        setSelectDeposit(true);
                        setSelectWithdraw(false);
                        //setSelectSwap(false);
                      }}
                      className={`w-full p-2 rounded-lg text-sm font-semibold

                        ${selectDeposit ? 'bg-[#3167b4] text-white' : 'bg-gray-300 text-gray-400'}
                        
                      `}
                    >
                      <div className='flex flex-col gap-2 items-center justify-start'>
                        <span className='text-sm'>
                          입금
                        </span>
                      </div>
                    </button>
                    */}


                    {/*
                    <button
                      onClick={() => {
                        setSelectDeposit(false);
                        setSelectWithdraw(false);
                        setSelectSwap(true);
                      }}
                      className={`w-full p-2 rounded-lg text-sm font-semibold

                        ${selectSwap ? 'bg-[#3167b4] text-white' : 'bg-gray-300 text-gray-400'}
                        
                      `}
                    >
                      스왑
                    </button>
                    */}

                  </div>


                </div>

              </div>



            </div>





            {address
            && selectWithdraw
            && (

              <div className='mt-5 w-full flex flex-col gap-5'>

                <div className='
                  w-full  flex flex-col gap-5 border border-gray-300 rounded-lg p-4 bg-white
                  '>



                  {/* sendbirdUser 에게 보내기 */}
                  {sendbirdUser && (
                    <div className='w-full flex flex-row gap-2 items-center justify-between'>
                      {/* 보낼 회원 정보 */}
                      <span className='text-lg font-semibold text-gray-800'>
                        보낼 회원
                      </span>
                      {/* sendbirdUser 정보 */}
                      <div className='flex flex-col gap-2 items-center justify-start'>
                        <div className='flex flex-row gap-2 items-center justify-start'>
                          <Image
                            src={sendbirdUser.avatar || "/profile-default.png"}
                            alt="user avatar"
                            width={35}
                            height={35}
                            className='rounded-full w-8 h-8 xl:w-10 xl:h-10'
                          />
                          <span className="text-lg font-semibold text-gray-800">
                            {sendbirdUser.nickname || "익명"}
                          </span>
                        </div>
                        {/* userid */}
                        <span className="text-sm text-gray-600">
                          {userid.substring(0, 6)}...{userid.substring(userid.length - 4)}
                        </span>

                      </div>



                    </div>
                  )}



                  <div className='flex flex-row gap-2 items-center justify-start'>
                    {/* dot icon */}
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="text-sm
                      text-gray-800
                    ">
                      보낼 금액을 입력해주세요
                    </div>
                  </div>


                  <div className='w-full mb-5 flex flex-col xl:flex-row gap-5 items-start justify-between'>

                    <div className='w-full flex flex-col gap-5 items-start justify-between'>
                      <input
                        disabled={sending}
                        type="number"
                        //placeholder="Enter amount"
                        className=" w-full p-2 border
                        border-gray-300 rounded text-zinc-800 text-2xl font-semibold"


                        placeholder="Enter amount"
                        
                        value={amount}

                        onChange={(e) => (

                          // check if the value is a number


                          // check if start 0, if so remove it

                          e.target.value = e.target.value.replace(/^0+/, ''),



                          // check balance

                          setAmount(e.target.value as any)

                        )}
                      />
                
            

                      {/* check box for want to receive wallet address */}
                      {/*
                      <div className="flex flex-row items-center gap-2">
                        <input
                          type="checkbox"
                          className="w-6 h-6"
                          checked={wantToReceiveWalletAddress}
                          onChange={(e) => setWantToReceiveWalletAddress(e.target.checked)}
                        />
                        <div className="text-white">{Enter_Wallet_Address}</div>
                      </div>
                      */}

                    </div>




                  </div>

                  {/* otp verification */}
                  {/*
                  {verifiedOtp ? (
                    <div className="w-full flex flex-row gap-2 items-center justify-center">
                      <Image
                        src="/verified.png"
                        alt="check"
                        width={30}
                        height={30}
                      />
                      <div className="text-white">OTP verified</div>
                    </div>
                  ) : (
                
            
                    <div className="w-full flex flex-row gap-2 items-start">

                      <button
                        disabled={!address || !recipient?.walletAddress || !amount || isSendingOtp}
                        onClick={sendOtp}
                        className={`
                          
                          ${isSendedOtp && 'hidden'}

                          w-32 p-2 rounded-lg text-sm font-semibold

                            ${
                            !address || !recipient?.walletAddress || !amount || isSendingOtp
                            ?'bg-gray-300 text-gray-400'
                            : 'bg-green-500 text-white'
                            }
                          
                          `}
                      >
                          Send OTP
                      </button>

                      <div className={`flex flex-row gap-2 items-center justify-center ${!isSendedOtp && 'hidden'}`}>
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          className=" w-40 p-2 border border-gray-300 rounded text-black text-sm font-semibold"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />

                        <button
                          disabled={!otp || isVerifingOtp}
                          onClick={verifyOtp}
                          className={`w-32 p-2 rounded-lg text-sm font-semibold

                              ${
                              !otp || isVerifingOtp
                              ?'bg-gray-300 text-gray-400'
                              : 'bg-green-500 text-white'
                              }
                            
                            `}
                        >
                            Verify OTP
                        </button>
                      </div>

                    </div>

                  )}
                  */}
                  



                  <button
                    
                    disabled={!address || !amount || sending}

                    onClick={sendUsdt}

                    className={`mt-5 w-full p-2 rounded-lg text-xl font-semibold

                        ${
                        !address || !amount || sending 
                        ?'bg-gray-300 text-gray-400'
                        : 'bg-green-500 text-white'
                        }
                      
                      `}
                  >
                      {token} 보내기
                  </button>

                  <div className="w-full flex flex-row gap-2 text-xl font-semibold">

                    {/* sending rotate animation with white color*/}
                    {sending && (
                      <div className="
                        w-6 h-6
                        border-2 border-zinc-800
                        rounded-full
                        animate-spin
                      ">
                        <Image
                          src="/loading.png"
                          alt="loading"
                          width={24}
                          height={24}
                        />
                      </div>
                    )}
                    <div className="text-white">
                      {sending ? Sending : ''}
                    </div>

                  </div>

                </div>




              </div>

            )}



        </div>

    </main>

  );

}





function Header(
  {
      lang,
      chain,
      center,
      agent,
      tokenId,
  } : {
      lang: string
      chain: string
      center: string
      agent: string
      tokenId: string
  }
) {

  const router = useRouter();


  return (
    <header className="flex flex-col items-center mb-5 md:mb-10">

      {/* header menu */}
      <div className="w-full flex flex-row justify-between items-center gap-2
        bg-green-500 p-4 rounded-lg mb-5
      ">
          {/* logo */}
          <button
              onClick={() => {
                  router.push(
                    '/' + lang + '/' + chain + '/?agent=' + agent + '&tokenId=' + tokenId
                  );
              }}
          >            
              <div className="flex flex-row gap-2 items-center">
                  <Image
                  src="/logo.png"
                  alt="Circle Logo"
                  width={35}
                  height={35}
                  className="rounded-full w-10 h-10 xl:w-14 xl:h-14"
                  />
                  <span className="text-lg xl:text-3xl text-gray-800 font-semibold">
                  MKRW
                  </span>
              </div>
          </button>

        {/* menu */}
        {/*
        <div className="flex flex-row gap-2 items-center">

              <button
                onClick={() => {
                    router.push(
                        '/ko/polygon/my-nft?agent=' + agent + '&tokenId=' + tokenId + '&center=' + center
                    );
                }}
                className="text-gray-600 hover:underline text-xs xl:text-lg"
              >
                NFT
              </button>

        </div>
        */}
        
      </div>
      
    </header>
  );
}