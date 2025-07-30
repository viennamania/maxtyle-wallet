// send USDT
'use client';


import React, { use, useEffect, useState } from 'react';

import Link from "next/link";

import { toast } from 'react-hot-toast';
import { client } from '../../../client';

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
import { getDictionary } from "../../../dictionaries";

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





  //console.log("params", params);

  const searchParams = useSearchParams();
 

  //const token = searchParams.get('token');
  const token = "MKRW"; // hardcoded for now, can be dynamic later


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




  /*
  // swap token balance
  const [swapTokenBalance, setSwapTokenBalance] = useState(0);
  useEffect(() => {

    // get the balance
    const getSwapTokenBalance = async () => {

      try {
        ///console.log('getBalance address', address);

        if (token === "USDT") {
          
          const contract = getContract({
            client,
            chain: params.chain === "bsc" ? bsc : params.chain === "arbitrum" ? arbitrum : params.chain === "polygon" ? polygon : params.chain === "ethereum" ? ethereum : polygon,
            address: contractAddressKCT,
          });
          
          const result = await balanceOf({
            contract : contract as any,
            address: address || "",
          });
          
          if (result !== undefined && result !== null) {
            setSwapTokenBalance( Number(result) / 10 ** 18 );
          } else {
            setSwapTokenBalance(0);
          }
          
        } else if (token === "KCT") {
          const contract = getContract({
            client,
            chain: params.chain === "bsc" ? bsc : params.chain === "arbitrum" ? arbitrum : params.chain === "polygon" ? polygon : params.chain === "ethereum" ? ethereum : polygon,
            address: contractAddress,
          });
          
          const result = await balanceOf({
            contract : contract as any,
            address: address || "",
          });
          
          if (result !== undefined && result !== null) {
            setSwapTokenBalance( Number(result) / 10 ** 6 );
          } else {
            setSwapTokenBalance(0);
          }
        }
      } catch (error) {
        console.error("Error getting swap token balance:", error);
        setSwapTokenBalance(0);
      }

    };

    if (address) getSwapTokenBalance();

    const interval = setInterval(() => {
      if (address) getSwapTokenBalance();
    } , 1000);

    return () => clearInterval(interval);

  } , [address, contract, params.chain, token]);
  */










  const [user, setUser] = useState(
    {
      _id: '',
      id: 0,
      email: '',
      nickname: '',
      avatar: '',
      mobile: '',
      walletAddress: '',
      createdAt: '',
      settlementAmountOfFee: '',
      tronWalletAddress: '',
      tronWalletPrivateKey: '',
    }
  );

  useEffect(() => {

    if (!address) return;

    const getUser = async () => {

      const response = await fetch('/api/user/getUserByWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
        }),
      });

      if (!response) return;

      const data = await response.json();


      setUser(data.result);

    };

    getUser();

  }, [address]);








  // get list of user wallets from api
  const [users, setUsers] = useState([
    {
      _id: '',
      id: 0,
      email: '',
      avatar: '',
      nickname: '',
      mobile: '',
      walletAddress: '',
      createdAt: '',
      settlementAmountOfFee: '',
    }
  ]);

  const [totalCountOfUsers, setTotalCountOfUsers] = useState(0);

  useEffect(() => {

    if (!address) return;

    const getUsers = async () => {

      const response = await fetch('/api/user/getAllUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
      });

      if (!response) return;

      const data = await response.json();

      console.log("getUsers", data);


      ///setUsers(data.result.users);
      // set users except the current user

      setUsers(data.result.users.filter((user: any) => user.walletAddress !== address));



      setTotalCountOfUsers(data.result.totalCount);

    };

    ///getUsers();


  }, [address]);










  ///console.log("recipient", recipient);

  //console.log("recipient.walletAddress", recipient.walletAddress);
  //console.log("amount", amount);



  const [otp, setOtp] = useState('');

  
  
  /////const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(true); // for testing


  const [isSendedOtp, setIsSendedOtp] = useState(false);



  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const [isVerifingOtp, setIsVerifingOtp] = useState(false);

  

  const sendOtp = async () => {

    setIsSendingOtp(true);
      
    const response = await fetch('/api/transaction/setOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lang: params.lang,
        chain: params.chain,
        walletAddress: address,
        mobile: user.mobile,
      }),
    });

    const data = await response.json();

    //console.log("data", data);

    if (data.result) {
      setIsSendedOtp(true);
      toast.success('OTP sent successfully');
    } else {
      toast.error('Failed to send OTP');
    }

    setIsSendingOtp(false);

  };

  const verifyOtp = async () => {

    setIsVerifingOtp(true);
      
    const response = await fetch('/api/transaction/verifyOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lang: params.lang,
        chain: params.chain,
        walletAddress: address,
        otp: otp,
      }),
    });

    const data = await response.json();

    //console.log("data", data);

    if (data.status === 'success') {
      setVerifiedOtp(true);
      toast.success('OTP verified successfully');
    } else {
      toast.error('Failed to verify OTP');
    }

    setIsVerifingOtp(false);
  
  }


  const [wantToReceiveWalletAddress, setWantToReceiveWalletAddress] = useState(true);


  const [sending, setSending] = useState(false);


  const [settlementWalletAddress, setSettlementWalletAddress] = useState('0xe38A3D8786924E2c1C427a4CA5269e6C9D37BC9C'); // MKRW swap pool address

  const sendMkrw = async () => {
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

        // send MKRW

        const transaction = transfer({
            contract: contractMKRW,
            to: settlementWalletAddress,
            amount: amount,
        });



        const { transactionHash } = await sendTransaction({
          account: activeAccount as any,
          transaction,
        });

        console.log("transactionHash", transactionHash);

        
        if (transactionHash) {

          
          await fetch('/api/settlement/claim', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              walletAddress: address,
              amount: amount,
              bankInfo: bankInfo,
              settlementWalletAddress: settlementWalletAddress,
              transactionHash: transactionHash,
            }),
          });
              

          //toast.success(USDT_sent_successfully);
          toast.success("전송 완료");

          setAmount(0); // reset amount

          const result = await balanceOf({
            contract: contractMKRW,
            address: address,
          });

          setBalance( Number(result) / 10 ** 18 );

        } else {
          //toast.error(Failed_to_send_USDT);
          toast.error("전송 실패");
        }


    } catch (error) {
      
      console.error("error", error);

      //toast.error(Failed_to_send_USDT);
      toast.error("전송 실패");
    }

    setSending(false);
  };



  // get settlement list by wallet address
  const [settlementList, setSettlementList] = useState([]);
  const [loadingSettlementList, setLoadingSettlementList] = useState(false);
  useEffect(() => {
    const getSettlementList = async () => {
      setLoadingSettlementList(true);
      const response = await fetch(`/api/settlement/claimList?walletAddress=${encodeURIComponent(address ?? '')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        toast.error("정산 내역을 불러오는 데 실패했습니다.");
        setLoadingSettlementList(false);
        return;
      }
      const data = await response.json();
      setSettlementList(data);
      setLoadingSettlementList(false);
    };

    if (address) {
      getSettlementList();
    }

    // setInterval to refresh settlement list every 5 seconds
    const interval = setInterval(() => {
      if (address) {
        getSettlementList();
      }
    }
    , 5000);
    return () => {
      clearInterval(interval);
    };

  }, [address]);




  const [selectDeposit, setSelectDeposit] = useState(true);
  const [selectWithdraw, setSelectWithdraw] = useState(false);
  const [selectSwap, setSelectSwap] = useState(false);





  


  // 입금받을 은행정보
  const [bankInfo, setBankInfo] = useState({
    bankName: '',
    accountNumber: '',
    accountHolder: '',
  });




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
          포인트 지갑
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
                        {/*}
                        <Image
                          src="/icon-deposit.png"
                          alt="deposit"
                          width={20}
                          height={20}
                        />
                        */}
                        <span className='text-sm'>
                          입금
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setSelectDeposit(false);
                        setSelectWithdraw(true);
                        //setSelectSwap(false);
                      }}
                      className={`w-full p-2 rounded-lg text-sm font-semibold

                        ${selectWithdraw ? 'bg-[#3167b4] text-white' : 'bg-gray-300 text-gray-400'}
                        
                      `}
                    >
                      출금
                    </button>

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
            && selectDeposit
            && (

              <div className='mt-5 w-full flex flex-col gap-5'>


                <div className="w-full flex flex-col gap-2 items-center justify-center
                  border border-gray-300 rounded-lg p-4 bg-white
                ">

                  <div className="text-sm text-gray-800">
                    {My_Wallet_Address}
                  </div>

                  <div className="w-full flex flex-row items-center justify-center gap-2">
                    <button
                      className="text-sm text-zinc-400 underline"
                      onClick={() => {
                        navigator.clipboard.writeText(address);
                        toast.success('지갑주소가 복사되었습니다.');
                      } }
                    >
                      {address.substring(0, 6)}...{address.substring(address.length - 4)}
                    </button>

                  </div>

                  <Canvas
                    text={address}
                      options={{
                        //level: 'M',
                        margin: 2,
                        scale: 4,
                        ///width: 200,
                        // width 100%
                        width: 200,
                        color: {
                            dark: '#000000FF',
                            light: '#FFFFFFFF',
                        },
          
                      }}
                  />



                </div>



              </div>

            ) }







            {address
            && selectWithdraw
            && (

              <div className='mt-5 w-full flex flex-col gap-5'>

                
                <div className='
                  w-full  flex flex-col gap-5 border border-gray-300 rounded-lg p-4 bg-white
                  '>





                  <div className='w-full mb-5 flex flex-col xl:flex-row gap-5 items-start justify-between'>

                    <div className='flex flex-row gap-2 items-center justify-start'>
                      {/* dot icon */}
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="text-sm
                        text-gray-800
                      ">
                        출금할 금액을 입력해주세요.
                      </div>
                    </div>


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
                

                    </div>


                    
                

                    {/* 입금받을 은행정보 입력*/}
                    {/* 은행명, 계좌번호, 예금주 */}
                    <div className='flex flex-row gap-2 items-center justify-start'>
                      {/* dot icon */}
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="text-sm
                        text-gray-800
                      ">
                        입금받을 은행정보를 입력해주세요.
                      </div>
                    </div>


                    <div className='w-full flex flex-col gap-5 items-start justify-between'>

                      <select
                        disabled={sending}
                        className="bg-white text-zinc-500 rounded-lg p-2 text-sm
                        w-full
                        border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={bankInfo.bankName}
                        onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
                      >
                        <option value="">은행이름 선택</option>
                        <option value="카카오뱅크">카카오뱅크</option>
                        <option value="케이뱅크">케이뱅크</option>
                        <option value="토스뱅크">토스뱅크</option>
                        <option value="국민은행">국민은행</option>
                        <option value="우리은행">우리은행</option>
                        <option value="신한은행">신한은행</option>
                        <option value="농협">농협</option>
                        <option value="기업은행">기업은행</option>
                        <option value="하나은행">하나은행</option>
                        <option value="외환은행">외환은행</option>
                        <option value="부산은행">부산은행</option>
                        <option value="대구은행">대구은행</option>
                        <option value="전북은행">전북은행</option>
                        <option value="경북은행">경북은행</option>
                        <option value="광주은행">광주은행</option>
                        <option value="수협">수협</option>
                        <option value="씨티은행">씨티은행</option>
                        <option value="대신은행">대신은행</option>
                        <option value="동양종합금융">동양종합금융</option>
                      </select>

                      <input
                        disabled={sending}
                        type="text"
                        className=" w-full p-2 border
                        border-gray-300 rounded text-zinc-800 text-sm"


                        placeholder="계좌번호"
                        value={bankInfo.accountNumber}
                        onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })}
                      />

                      <input
                        disabled={sending}
                        type="text"
                        className=" w-full p-2 border
                        border-gray-300 rounded text-zinc-800 text-sm"


                        placeholder="예금주"
                        value={bankInfo.accountHolder}
                        onChange={(e) => setBankInfo({ ...bankInfo, accountHolder: e.target.value })}
                      />

                    </div>

                  



                  <button
                    
                    disabled={!address || !amount || !bankInfo.bankName || !bankInfo.accountNumber || !bankInfo.accountHolder || sending }

                    onClick={sendMkrw}

                    className={`mt-5 w-full p-2 rounded-lg text-xl font-semibold

                        ${
                        !address || !amount || !bankInfo.bankName || !bankInfo.accountNumber || !bankInfo.accountHolder || sending
                        ?'bg-gray-300 text-gray-400'
                        : 'bg-green-500 text-white'
                        }
                      
                      `}
                  >
                      {token} 출금
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



                {/* settlement list */}
                <div className="w-full mt-5 bg-white rounded-lg p-4">
                  <h2 className="text-xl font-semibold mb-4">출금 내역</h2>
                  


                    <table className="w-full table-auto">
                      <thead>
                        <tr
                          className="bg-gray-200 text-gray-700 text-sm font-semibold">
                          <th className="px-4 py-2">날짜</th>
                          <th className="px-4 py-2">금액</th>
                          <th className="px-4 py-2">상태</th>
                          <th className="px-4 py-2">은행정보</th>
                          <th className="px-4 py-2">지갑주소</th>
                        </tr>
                      </thead>

                      <tbody>
                        {settlementList.map((settlement : any, index: number) => (
                          <tr key={settlement._id}
                            className={`${
                              index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                            }`}
                          >
                            <td className="border px-4 py-2">
                              {new Date(settlement.createdAt).toLocaleDateString()}<br/>
                              {new Date(settlement.createdAt).toLocaleTimeString()}
                            </td>
                            <td className="border px-4 py-2">
                              {Number(settlement.amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {token}
                            </td>
                            <td className="border px-4 py-2">
                              {settlement.status === "pending" ? (
                                <span className="text-yellow-500">대기중</span>
                              ) : settlement.status === "completed" ? (
                                <span className="text-green-500">완료</span>
                              ) : (
                                <span className="text-red-500">실패</span>
                              )}
                            </td>
                            <td className="border px-4 py-2">
                              {settlement.bankInfo.bankName}<br/>
                              {settlement.bankInfo.accountNumber}<br/>
                              {settlement.bankInfo.accountHolder}
                            </td>
                            <td className="border px-4 py-2">
                              {settlement.walletAddress.slice(0, 6)}...{settlement.walletAddress.slice(-4)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                 

                </div>






              </div>


              <div className="w-full flex flex-col gap-5 items-start justify-between">

              </div>

              </div>

            ) }

        </div>

    </main>

)}


 