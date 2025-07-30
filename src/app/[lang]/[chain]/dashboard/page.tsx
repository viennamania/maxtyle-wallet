// nickname settings
'use client';
import React, { use, useEffect, useState } from 'react';



import { toast } from 'react-hot-toast';

import { client } from "../../../client";


import {
    getContract,
    //readContract,
    sendTransaction,
    sendAndConfirmTransaction,
} from "thirdweb";

import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 


import {
    polygon,
    arbitrum,
    ethereum,
    bsc,
} from "thirdweb/chains";

import {
    ConnectButton,
    useActiveAccount,
    useActiveWallet,
    useConnectModal,
} from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";


import { getUserPhoneNumber } from "thirdweb/wallets/in-app";


import Image from 'next/image';

//import GearSetupIcon from "@/components/gearSetupIcon";

//import Uploader from '@/components/uploader';
//import { add } from 'thirdweb/extensions/farcaster/keyGateway';




import {
    useRouter,
    useSearchParams
  }from "next//navigation";

import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";


import { deployERC721Contract } from 'thirdweb/deploys';


import {
    
    getNFT as getNFT721,
    getOwnedNFTs,
    mintTo
} from "thirdweb/extensions/erc721";




import { getContractMetadata } from "thirdweb/extensions/common";


import { Alert, useForkRef } from '@mui/material';


import thirdwebIcon from "@public/thirdweb.svg";
import { verify } from 'crypto';
import { tree } from 'next/dist/build/templates/app-page';
import { add } from 'thirdweb/extensions/farcaster/keyGateway';
import { start } from 'repl';



import * as XLSX from "xlsx";
import { time } from 'console';
import { ok } from 'assert';

const wallets = [
    inAppWallet({
      auth: {
        options: [
            "phone",
             
        ],
      },
    }),
];


const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon
const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum
const contractAddressEthereum = "0xdac17f958d2ee523a2206206994597c13d831ec7"; // USDT on Ethereum
const contractAddressBsc = "0x55d398326f99059fF775485246999027B3197955"; // USDT on BSC



const erc1155ContractAddress = "0xd782447a0762966714a150dBC0E5a16fE488d566"; // Polygon

/*
const contractErc1155 = getContract({
    client,
    chain: bsc,
    address: erc1155ContractAddress,
});


const nftInfoTbot100 = await getNFT({
    contract: contractErc1155,
    tokenId: 0n,
});

console.log("nftInfoTbot100", nftInfoTbot100);

const nftInfoTbot1000 = await getNFT({
    contract: erc1155ContractAddress,
    tokenId: 1n,
});

const nftInfoTbot10000 = await getNFT({
    contract: erc1155ContractAddress,
    tokenId: 2n,
});
*/


const contractErc1155 = getContract({
    client,
    chain: bsc,
    address: erc1155ContractAddress,
});


export default function AIPage({ params }: any) {


    
    // get params from the URL

    const searchParams = useSearchParams();

    const wallet = searchParams.get('wallet');

    const agent = searchParams.get('agent');

    const agentNumber = searchParams.get('tokenId');
    
    


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

        Wallet_Settings: "",
        Profile_Settings: "",


        My_Wallet_Address: "",
        My_Phone_Number: "",
    
        Wallet_Address_Description1: "",
        Wallet_Address_Description2: "",
    
        I_understand_that_I_should_never_deposit_any_other_tokens: "",

        Copy: "",

        Disconnect_Wallet: "",


        Prompt_input_placeholder: "",

        Real_prompt: "",

        Generate_prompt: "",
    
        Reset_prompt: "",

        Generating_prompt: "",

        Download_Image: "",

        Downloading_Image: "",

        Alert_download_image_success: "",
    
        Make_OpenSea_Collection: "",

        Alert_OpenSea_Collection_made: "",

        If_you_make_an_OpenSea_collection: "",

        Making_OpenSea_Collection: "",

        OpenSea_Collection_Address: "",

        OpenSea_Collection: "",

        Mint_NFT: "",

        Alert_NFT_minted: "",

        Minting_NFT: "",

        Loading_my_images: "",
    
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

        Wallet_Settings,
        Profile_Settings,

        My_Wallet_Address,
        My_Phone_Number,

        Wallet_Address_Description1,
        Wallet_Address_Description2,

        I_understand_that_I_should_never_deposit_any_other_tokens,

        Copy,

        Disconnect_Wallet,


        Prompt_input_placeholder,

        Real_prompt,

        Generate_prompt,

        Reset_prompt,

        Generating_prompt,

        Download_Image,

        Downloading_Image,

        Alert_download_image_success,

        Make_OpenSea_Collection,

        If_you_make_an_OpenSea_collection,

        Making_OpenSea_Collection,

        Alert_OpenSea_Collection_made,

        OpenSea_Collection_Address,

        OpenSea_Collection,

        Mint_NFT,

        Alert_NFT_minted,

        Minting_NFT,

        Loading_my_images,

    } = data;
    
    
    






    const router = useRouter();

    // get the active wallet
    const activeWallet = useActiveWallet();



    const activeAccount = useActiveAccount();

    const address = activeAccount?.address || "";



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





    const [balance, setBalance] = useState(0);

    useEffect(() => {
  
      if (!address) return;
      // get the balance
  
  
      if (!contract) {
        return;
      }
  
      const getBalance = async () => {
  
        try {
          const result = await balanceOf({
            contract,
            address: address,
          });
      
          //console.log(result);
      
          setBalance( Number(result) / 10 ** 6 );
  
        } catch (error) {
          console.error("Error getting balance", error);
        }
  
      };
  
      if (address) getBalance();
  
      // get the balance in the interval
      /*
      const interval = setInterval(() => {
        getBalance();
      }, 1000);
  
  
      return () => clearInterval(interval);
        */
  
    } , [address, contract]);



    

    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
  
  
      if (activeAccount) {
  
        //const phoneNumber = await getUserPhoneNumber({ client });
        //setPhoneNumber(phoneNumber);
  
  
        getUserPhoneNumber({ client }).then((phoneNumber) => {
          setPhoneNumber(phoneNumber || "");
        });
  
  
  
      }
  
    } , [activeAccount]);


    const { connect, isConnecting } = useConnectModal();

    const handleConnect = async () => {
      await connect({
        chain: params.chain === "arbitrum" ? arbitrum : polygon,
        client,
        wallets,
  
        accountAbstraction: {
            chain: params.chain === "arbitrum" ? arbitrum : polygon,
            factoryAddress: "0x9Bb60d360932171292Ad2b80839080fb6F5aBD97", // polygon, arbitrum
            sponsorGas: true
        },

  
  
        showThirdwebBranding: false,
        theme: 'light',
        
        /*
        appMetadata: {
          name: "GoodTether",
          description: "GoodTether",
          url: "https://gold.goodtether.com",
          //icons: ["https://gold.goodtether.com/logo.png"],
        },
        */
  
        size: 'compact',
  
        /*
        size: 'wide',
  
        welcomeScreen: {
          title: "Custom Title",
          subtitle: "Custom Subtitle",
          img: {
            src: "https://example.com/image.png",
            width: 100,
            height: 100,
          },
        },
        */
      
       locale: 'en_US',
        
      });
    };
  

    
    const [nickname, setNickname] = useState("");


    const [nicknameEdit, setNicknameEdit] = useState(false);

    const [editedNickname, setEditedNickname] = useState("");


    const [userCode, setUserCode] = useState("");


    const [userMasterBotContractAddress, setUserMasterBotContractAddress] = useState("");
    
    

    useEffect(() => {
        const fetchData = async () => {

            if (!address) {
                return;
            }

            const response = await fetch("/api/user/getUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                }),
            });

            if (!response.ok) {
                console.error("Error fetching user");
                return;
            }

            const data = await response.json();

            //console.log("data", data);


            if (data.result) {
                setNickname(data.result.nickname);
                setUserCode(data.result.id);


                setUserMasterBotContractAddress(data.result.masterBotContractAddress);

            }
        };

        fetchData();
    }, [address]);













    /*
          erc721ContractAddress = await deployERC721Contract({
        chain,
        client,
        account,

        //  type ERC721ContractType =
        //  | "DropERC721"
        //  | "TokenERC721"
        //  | "OpenEditionERC721";
        

        //type: "DropERC721",

        type: "TokenERC721",
        
        
        params: {
          name: "My NFT",
          description: "My NFT",
          symbol: "MYNFT",
        },

      });
      */




    ///console.log("address", address);
    //console.log("agent", agent);
    
    // check box for marketing center
    // owin, ppump, exms
    // multiple check box
    const [marketingCenter, setMarketingCenter] = useState([] as any[]);
    useEffect(() => {
        setMarketingCenter([
            { name: "owin", checked: false },
            { name: "ppump", checked: false },
            { name: "exms", checked: false },
        ]);
    } , []);

    const handleMarketingCenter = (name: string) => {
        setMarketingCenter(
            marketingCenter.map((item) => {
                if (item.name === name) {
                    return {
                        name: name,
                        checked: !item.checked,
                    };
                } else {
                    return item;
                }
            })
        );
    };



    // get all applications
    //const [isAdmin, setIsAdmin] = useState(false);

    // if address is 0x0d2846FDbaAc5e9526f9409aE18d3e2c9CdC9466
    // then it is admin
    const isAdmin = address === "0x0d2846FDbaAc5e9526f9409aE18d3e2c9CdC9466";

    // 총 거래계정 잔고가치
   
    const [totalTradingAccountBalance, setTotalTradingAccountBalance] = useState(0);

    // 이번달 총 누적 거래량
    // totalAffiliateInviteeVolMonth
    const [totalAffliliateInviteeVolMonth, setTotalAffliliateInviteeVolMonth] = useState(0);


    const [applications, setApplications] = useState([] as any[]);
    const [loadingApplications, setLoadingApplications] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoadingApplications(true);
            const response = await fetch("/api/agent/getApplications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                }),
            });

            if (!response.ok) {
                console.error("Error fetching agents");
                setLoadingApplications(false);
                return;
            }

            const data = await response.json();

            console.log("data", data);

            const total = data.result.totalCount || 0;

  
            // order by unclaimedTradingVolume desc
            /*
            setApplications(
                data.result.applications.map((item : any) => {
                    return {
                        ...item,
                        unclaimedTradingVolume: item.affiliateInvitee?.data?.volMonth ? Number(item.affiliateInvitee.data.volMonth - item?.claimedTradingVolume || 0).toFixed(0) : 0,
                    };
                })
            )
            */

            setApplications(
                data.result.applications.map((item : any) => {
                    return {
                        ...item,
                        unclaimedTradingVolume:
                            Number(
                                parseFloat(item.lastUnclaimedTradingVolume || 0) +
                                parseFloat(item.affiliateInvitee?.data?.volMonth || 0) - parseFloat(item?.claimedTradingVolume || 0)
                            ).toFixed(0)
                        ,
                    };
                }).sort((a: any, b: any) => b.unclaimedTradingVolume - a.unclaimedTradingVolume)
            )




            
            ///setApplications(data.result.applications);




            setTotalTradingAccountBalance( data.result.totalTradingAccountBalance );


            setTotalAffliliateInviteeVolMonth( data.result.totalAffiliateInviteeVolMonth );

            
            setLoadingApplications(false);

        };

        if (address) {
            fetchData();
        }

    }, [address]);



    // tradingAccountBalanceList
    const [tradingAccountBalanceList, setTradingAccountBalanceList] = useState([] as any[]);
    useEffect(() => {
        setTradingAccountBalanceList(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    tradingAccountBalance: item.tradingAccountBalance,
                }
            })
        );
    } , [applications]);


  







    // claim settlement
    const [claimingSettlementList, setClaimingSettlementList] = useState([] as any[]);

    //const [claimSettlementList, setClaimSettlementList] = useState([] as any[]);

    useEffect(() => {

        /*
        setClaimSettlementList(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    claimSettlement: {},
                }
            })
        );
        */
        
        setClaimingSettlementList(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    loading: false,
                }
            })
        );

    } , [applications]);

    const claimSettlement = async (
        applicationId: number,
    ) => {

        if (address === "") {
            toast.error("먼저 지갑을 연결해주세요");
            return;
        }

        const application = applications.find((item) => item.id === applicationId);

        if (!application) {
            toast.error("Application을 찾을 수 없습니다.");
            return;
        }

        if (!confirm("정산을 요청하시겠습니까?")) {
            return;
        }


        // loading start
        setClaimingSettlementList(
            claimingSettlementList.map((item) => {
                if (item.applicationId === applicationId) {
                    return {
                        applicationId: applicationId,
                        loading: true,
                    };
                } else {
                    return item;
                }
            })
        );


        // update application status to "claimSettlement"
        const response = await fetch("/api/settlement/claim", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                applicationId: applicationId,
            }),
        });

        if (!response.ok) {
            console.error("Error claiming settlement");
            
            alert("Error claiming settlement");

            setClaimingSettlementList(
                claimingSettlementList.map((item) => {
                    if (item.applicationId === applicationId) {
                        return {
                            applicationId: applicationId,
                            loading: false,
                        };
                    } else {
                        return item;
                    }
                })
            );

            return;
        }


        const data = await response.json();

        //console.log("data", data);

        if (data?.result) {
            toast.success("정산이 요청되었습니다.");

            // reload applications
            const response = await fetch("/api/agent/getApplications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                }),
            });
            if (!response.ok) {
                console.error("Error fetching agents");
            }
            const data = await response.json();
            
            //setApplications(data.result.applications);

            setApplications(
                data.result.applications.map((item : any) => {
                    return {
                        ...item,
                        unclaimedTradingVolume:
                            Number(
                                parseFloat(item.lastUnclaimedTradingVolume || 0) +
                                parseFloat(item.affiliateInvitee?.data?.volMonth || 0) - parseFloat(item?.claimedTradingVolume || 0)
                            ).toFixed(0)
                        ,
                    };
                }).sort((a: any, b: any) => b.unclaimedTradingVolume - a.unclaimedTradingVolume)
            )


        } else {
            alert("Error claiming settlement");
        }

        // loading end

        setClaimingSettlementList(
            claimingSettlementList.map((item) => {
                if (item.applicationId === applicationId) {
                    return {
                        applicationId: applicationId,
                        loading: false,
                    };
                } else {
                    return item;
                }
            })
        );

    }










    const [isExporting, setIsExporting] = useState(false);

    const exportToCSV = async (fileName: string) => {
  
        setIsExporting(true);
      
        /*
  
        const res = await fetch('/api/doingdoit/user/getAllForDownload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
          body: JSON.stringify({
            sort: sortConfig.key,
            order: sortConfig.direction,
            q: searchTerm,
            startDate: startDate,
            endDate: endDate,
            regTypeArray: regTypeArray,
  
            }),
        });
        */

        const response = await fetch("/api/agent/getApplications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                walletAddress: address,
            }),
        });
  
        if (!response.ok) {
            setIsExporting(false);
            console.error('Error fetching data');
            return;
        }

        const post = await response.json();
  
        const total = post.result.totalCount;

        //const items = post.result.applications as any[];

        // query startTrading.status exists and true

        const items = post.result.applications.filter((item: any) => item?.startTrading?.status === true);
  
   
        ///console.log('items', items);
  
  
        
  
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  
        const fileExtension = '.xlsx';
  
        /*
        const formattedData = items.map((item) => {
            const { id, ...rest } = item;
            return rest;
        });
        */
  
        const formattedData  = [] as any[];
  
        //items.map((item, index ) => {
        items.map((item: any, index: number) => {
  
            /*
            const { id, ...rest } = item;
    
            
            
            formattedData.push({
            //'No': id,
    
            '회원번호': id,
            '가입일시': new Date(rest.createdAt).toLocaleString(),
            '이메일': rest.email,
            '아이디': rest.nickname,
            '가입유형': rest.regType === 'email' ? '이메일' : rest.regType === 'kakao' ? '카카오' : rest.regType === 'naver' ? '네이버' : rest.regType === 'google' ? '구글' : '기타',
            '생년월일': rest.birthDate,
            '셩별': rest.gender,
            '휴대전화': rest.mobile,
            '식단기록 목적': rest.purpose,
            '키': rest.height,
            '몸무게': rest.weight,
            
    
            });
            */

            /*
            let market = "";

            if (item.center === 'ppump') {
                market = 'PPUMP';
            } else if (item.center === 'owin') {
                market = 'MKRW';
            } else if (item.center === 'exms') {
                market = 'EXMS';
            }
            */

            let marketingCenter = "";

            // if slice(0, 5) = "ppump" => "PPUMP"
            // if slice(0, 4) = "owin" => "MKRW"
            // if slice(0, 4) = "exms" => "EXMS"

            if (item.center?.slice(0, 5) === "ppump") {
                marketingCenter = "PPUMP";
            } else if (item.center?.slice(0, 4) === "owin") {
                marketingCenter = "MKRW";
            } else if (item.center?.slice(0, 4) === "exms") {
                marketingCenter = "EXMS";
            }

            

            formattedData.push({
                
                'Market': marketingCenter,
                '센터봇': item.center,
                '신청번호': item.id,
                'UID': item.okxUid,
                '신청일시': new Date(item.createdAt).toLocaleString(),
                '지갑주소': item.walletAddress,
                '신청자': item.userName,
                '신청자 이메일': item.userEmail,
                /////'신청자 휴대전화': item.userPhoneNumber,
                'API Access Key': item.apiAccessKey,
                'API Secret Key': item.apiSecretKey,
                'API Passphrase': item.apiPassword,
                '거래 계정 잔고': item?.tradingAccountBalance?.balance ? Number(item.tradingAccountBalance.balance).toFixed(2) : 0,
            });



    
        } );
  
  
  
      const ws = XLSX.utils.json_to_sheet(formattedData);
  
      const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
      const data = new Blob([excelBuffer], { type: fileType });
  
      const now = new Date();
  
      const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  
      const time = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
  
      const dateTime = `${date}_${time}`;
  
      const fileNameExtension = `${fileName}_${dateTime}${fileExtension}`;
  
      ///XLSX.writeFile(data  , fileNameExtension);
  
      ///XLSX.writeFile(data, fileNameExtension);
  
      XLSX.writeFile(wb, fileNameExtension);
        
    
      setIsExporting(false);
  
    }
  

    // getStatisticsDaily from api getStatisticsDaily
    /*
    const [statisticsDaily, setStatisticsDaily] = useState([] as any[]);
    const [loadingStatisticsDaily, setLoadingStatisticsDaily] = useState(false);
    useEffect(() => {

        const getStatisticsDaily = async () => {
            
            setLoadingStatisticsDaily(true);

            const response = await fetch("/api/agent/getStatisticsDaily", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                }),
            });

            if (!response.ok) {
                console.error('Error fetching data');
                return;
            }

            const data = await response.json();

            console.log("getStatisticsDaily data", data);

            setStatisticsDaily(data.result.statisticsDaily);

            setLoadingStatisticsDaily(false);

        }

        getStatisticsDaily();

    } , [address]);
    */


    return (

        <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-lg mx-auto">

            <div className="py-0 w-full">
        

                <AppBarComponent />

                <Header
                    agent={agent || ""}
                    tokenId={agentNumber || ""}
                />
                


                <div className="flex flex-col items-start justify-center space-y-4">

                

                    <div className='w-full flex flex-col gap-5 mt-5'>


                        {!address && (

                            <div className="w-full flex flex-col justify-center items-start gap-2">

                            {/*
                                <button
                                onClick={handleConnect}
                                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg hover:bg-zinc-900"
                                >
                                <div className="flex flex-row justify-center items-center gap-2">
                                    <Image
                                    src={thirdwebIcon}
                                    alt="Thirdweb"
                                    width={20}
                                    height={20}
                                    className="rounded-lg w-10 h-10"
                                    />
                                    <span>Sign in</span>
                                </div>
                                </button>
                            */}


                                <ConnectButton
                                client={client}
                                wallets={wallets}
                                accountAbstraction={{
                                    chain: bsc,
                                     
                                    sponsorGas: true
                                }}
                                theme={"light"}
                                connectButton={{
                                    label: "Sign in",
                                }}
                                connectModal={{
                                    size: "wide", 
                                    titleIcon: "https://wallet.cryptopay.beauty/logo.png",                           
                                    showThirdwebBranding: false,

                                }}
                                locale={"ko_KR"}
                                //locale={"en_US"}
                                />



                            </div>

                        )}


                        {address && (
                            <div className='w-full flex flex-col xl:flex-row items-start justify-between gap-2'>
                                <div className="flex items-center justify-start gap-5">
                                    <Image
                                        src="/icon-wallet.png"
                                        alt="Wallet"
                                        width={25}
                                        height={25}
                                        className="rounded"
                                    />
                                    <div className="flex flex-col gap-2">
                                        {/* disconnect button */}
                                        <button
                                        onClick={() => {
                                            confirm("Disconnect wallet?") &&
                                            activeWallet?.disconnect();
                                        }}
                                        className="bg-zinc-800 text-white p-2 rounded-lg"
                                        >
                                        Disconnect
                                        </button>
                                    </div>

                                </div>

                                <div className='flex flex-row items-center gap-2'>
                                    <span className='text-sm text-gray-800'>
                                        {My_Wallet_Address}: {address.slice(0, 10)}...{address.slice(-10)}
                                    </span>
                                    {/* copy button */}
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(address);
                                            toast.success("Copied to clipboard");
                                        }}
                                        className="bg-gray-500 text-white p-2 rounded-lg
                                            hover:bg-gray-600
                                        "
                                    >
                                        {Copy}
                                    </button>
                                </div>

                            </div>
                        )}

                    </div>



 
                    {/* applications table */}
                    {address && (

                        <div className='w-full flex flex-col gap-5'>

                            <div className='flex flex-row items-center gap-2'>
                                <Image
                                    src="/logo-exchange-okx.png"
                                    alt="HTX"
                                    width={50}
                                    height={50}
                                    className='rounded-lg'
                                />
                                <span className='text-lg font-semibold text-gray-800'>
                                    OKX신청목록
                                </span>

                                {/* reload button */}
                                <button
                                    onClick={() => {
                                        const fetchData = async () => {

                                            setLoadingApplications(true);
                                            const response = await fetch("/api/agent/getApplications", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({
                                                    walletAddress: address,
                                                }),
                                            });

                                            if (!response.ok) {
                                                console.error("Error fetching agents");
                                                setLoadingApplications(false);
                                                return;
                                            }

                                            const data = await response.json();

                                            const total = data.result.totalCount;

                                            //setApplications(data.result.applications);

                                            setApplications(
                                                data.result.applications.map((item : any) => {
                                                    return {
                                                        ...item,
                                                        unclaimedTradingVolume:
                                                            Number(
                                                                parseFloat(item.lastUnclaimedTradingVolume || 0) +
                                                                parseFloat(item.affiliateInvitee?.data?.volMonth || 0) - parseFloat(item?.claimedTradingVolume || 0)
                                                            ).toFixed(0)
                                                        ,
                                                    };
                                                }).sort((a: any, b: any) => b.unclaimedTradingVolume - a.unclaimedTradingVolume)
                                            )

                                            setLoadingApplications(false);

                                        };
                                        fetchData();
                                    }}
                                    disabled={loadingApplications}
                                    className={`${loadingApplications ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                        hover:bg-blue-600
                                    `}
                                >
                                    {loadingApplications ? "Loading..." : "Reload"}
                                </button>

                                {/* export button */}
                                
                                <button
                                    onClick={() => {
                                        exportToCSV('OKX_신청목록');
                                    }}
                                    disabled={isExporting}
                                    className={`${isExporting ? "bg-gray-500" : "bg-green-500"} text-white p-2 rounded-lg
                                        hover:bg-green-600
                                    `}
                                >
                                    {isExporting ? "Exporting..." : "엑셀 다운로드"}
                                </button>
                                
                            </div>

                            {loadingApplications && (
                                <div className='w-full flex flex-col items-center justify-center'>
                                    <Image
                                        src="/loading.png"
                                        alt="Loading"
                                        width={50}
                                        height={50}
                                        className='animate-spin'
                                    />
                                </div>
                            )}

                            
                            <div className='w-full flex flex-col xl:flex-row items-start justify-between gap-5'>
                                <span className='text-lg text-gray-800'>
                                    총 {applications.length}개의 신청이 있습니다.
                                </span>
                                <div className='flex flex-row items-center'>
                                    {/* start trading status is true count and false count */}
                                    <span className='text-lg text-green-500'>
                                        {applications.filter((item) => item?.startTrading?.status === true).length}
                                    </span>
                                    <span className='text-sm text-gray-800'>
                                        개의 트레이딩 중
                                    </span>
                                    <div className='w-4 h-4'></div>
                                    <span className='text-lg text-red-500'>
                                        {applications.filter((item) => !item?.startTrading).length}
                                    </span>
                                    <span className='text-sm text-gray-800'>
                                        개의 트레이딩 대기중
                                    </span>

                                </div>
                            </div>

                            {/* goto copy trading account */}
                            {/* https://www.okx.com/copy-trading/account/BA5BC36A6EDAB9E1 */}
                            <div className='w-full flex flex-col gap-2'>
                                <span className='text-lg text-gray-800'>
                                    <a
                                        href="https://www.okx.com/copy-trading/account/BA5BC36A6EDAB9E1"
                                        target="_blank"
                                        className='text-blue-500'
                                    >
                                        Copy Trading Account 바로가기
                                    </a>
                                </span>
                            </div>

                            {/* check box for marketing center */}
                            {/* owin, ppump, exms */}
                            <div className='w-full flex flex-row items-center gap-5'>
                                <div className='flex flex-row items-center gap-2'>
                                    <input
                                        type="checkbox"
                                        id="ppump"
                                        name="ppump"
                                        value="ppump"
                                        checked={
                                            // if marketingCenter has "ppump" and checked is true or false
                                            
                                            marketingCenter.map((item) => item === "ppump").length > 0

                                        }
                                        onChange={(event) => {
                                            handleMarketingCenter("ppump");
                                        }}
                                    />
                                    <label htmlFor="ppump">PPUMP</label>
                                </div>
                                <div className='flex flex-row items-center gap-2'>
                                    <input
                                        type="checkbox"
                                        id="owin"
                                        name="owin"
                                        value="owin"
                                        checked={
                                            marketingCenter.map((item) => item === "owin").length > 0
                                        }
                                        onChange={(event) => {
                                            handleMarketingCenter("owin");
                                        }}
                                    />
                                    <label htmlFor="owin">MKRW</label>
                                </div>
                                <div className='flex flex-row items-center gap-2'>
                                    <input
                                        type="checkbox"
                                        id="exms"
                                        name="exms"
                                        value="exms"
                                        checked={
                                            marketingCenter.map((item) => item === "exms").length > 0
                                        }
                                        onChange={(event) => {
                                            handleMarketingCenter("exms");
                                        }}
                                    />
                                    <label htmlFor="exms">EXMS</label>
                                </div>

                            </div>


                            {/* totalTradingAccountBalance */}
                            {totalTradingAccountBalance > 0 && (
                                <div className='w-full flex flex-col xl:flex-row items-start justify-between gap-5'>
                                    {/* startTrading is exist count */}
                                    <div className='flex flex-row items-center gap-2'>
                                        <span className='text-lg text-gray-800 font-semibold'>
                                            마스트봇:
                                        </span>
                                        <span className='text-4xl text-green-500 font-semibold'>
                                            {
                                                applications.filter((item) => item.accountConfig?.data.roleType === "2").length
                                            }
                                        </span>
                                    </div>



                                    <div className='flex flex-col gap-2'>


                                        <div className='flex flex-row items-center justify-between gap-2
                                            border-b border-gray-300 pb-2
                                        '>
                                            <span className='text-lg text-gray-800 font-semibold'>
                                                총 거래계정 잔고가치($):
                                            </span>
                                            <span className='text-4xl text-green-500 font-semibold'>
                                                {
                                                Number(totalTradingAccountBalance).toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD'
                                                })
                                                }
                                            </span>
                                        </div>


                                        {/* totalAffliliateInviteeVolMonth 이번달 총 누적거래량 */}
                                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                                            <span className='text-lg text-gray-800 font-semibold'>
                                                이번달 OKX 거래량(USDT):
                                            </span>
                                            <span className='text-4xl text-green-500 font-semibold'>
                                                {
                                                    totalAffliliateInviteeVolMonth.toFixed(2)
                                                }
                                            </span>
                                                        
                                        </div>

                                        {/* 이번달 총 OKX 누적수수료 (totalAffliliateInviteeVolMonth * 0.000455) */}
                                        <div className='flex flex-col gap-2'>
                                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                <span className='text-lg text-gray-800 font-semibold'>
                                                    이번달 OKX 수수료(총 거래량 * 0.0455%):
                                                </span>
                                                <span className='text-4xl text-green-500 font-semibold'>
                                                    {
                                                        (totalAffliliateInviteeVolMonth * 0.000455).toFixed(2)
                                                    }
                                                </span>
                                            </div>
                                        </div>


                                        <div className='flex flex-col gap-2
                                            border-t border-gray-300 pt-2
                                        '>
                                            {/* 보상 계산 23% */}
                                            <div className='flex flex-col gap-2'>
                                                <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                    {/*
                                                    <span className='text-lg text-gray-800 font-semibold'>
                                                        이번달 전체 보상(OKX 수수료 * ):
                                                    </span>
                                                    */}
                                                    <span className='text-4xl text-green-500 font-semibold'>
                                                        {
                                                            //(totalAffliliateInviteeVolMonth * 0.000455 * 0.23).toFixed(2)
                                                            (totalAffliliateInviteeVolMonth * 0.000455 * 0.35).toFixed(2)
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='flex flex-col gap-2
                                            border-t border-gray-300 pt-2
                                        '>
                                            <div className='w-full flex flex-row items-center justify-start gap-2'>
                                                {/* dot */}
                                                <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                                                <span className='text-lg text-gray-800 font-semibold'>
                                                    보상 계산 (마스터: 56%, 에이전트: 28%, 센터: 14%)
                                                </span>
                                                {/* 마스트봇 수 */}
                                                <span className='text-lg text-green-500 font-semibold'>
                                                    {applications.filter((item) => item.accountConfig?.data.roleType === "2").length}명
                                                </span>
                                                
                                            </div>

                                            {/* 회원 보상 = 보상 * 56% */}
                                            <div className='flex flex-col gap-2'>
                                                <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                    <span className='text-lg text-gray-800 font-semibold'>
                                                        이번달 마스터 보상(56%):
                                                    </span>
                                                    <span className='text-4xl text-green-500 font-semibold'>
                                                        {
                                                            //(totalAffliliateInviteeVolMonth * 0.000455 * 0.23 * 0.56).toFixed(2)
                                                            (totalAffliliateInviteeVolMonth * 0.000455 * 0.35 * 0.56).toFixed(2)
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                            {/* 에이전트 보상 = 보상 * 28% */}
                                            <div className='flex flex-col gap-2'>
                                                <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                    <span className='text-lg text-gray-800 font-semibold'>
                                                        이번달 에이전트 보상(28%):
                                                    </span>
                                                    <span className='text-4xl text-green-500 font-semibold'>
                                                        {
                                                            //(totalAffliliateInviteeVolMonth * 0.000455 * 0.23 * 0.28).toFixed(2)
                                                            (totalAffliliateInviteeVolMonth * 0.000455 * 0.35 * 0.28).toFixed(2)
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                            {/* 센터 보상 = 보상 * 14% */}
                                            <div className='flex flex-col gap-2'>
                                                <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                    <span className='text-lg text-gray-800 font-semibold'>
                                                        이번달 센터 보상(14%):
                                                    </span>
                                                    <span className='text-4xl text-green-500 font-semibold'>
                                                        {
                                                            //(totalAffliliateInviteeVolMonth * 0.000455 * 0.23 * 0.14).toFixed(2)
                                                            (totalAffliliateInviteeVolMonth * 0.000455 * 0.35 * 0.14).toFixed(2)
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                        </div>





                                    </div>


                                    
                                </div>
                            )}

                           

                            


                            <div className='w-full grid grid-cols-1 xl:grid-cols-4 gap-5'>

                                {!loadingApplications && applications.map((application, index) => (
                                    <div
                                        key={application._id}
                                        className={`w-full flex flex-col gap-5
                                        border border-gray-300 p-4 rounded-lg bg-gray-100

                                        ${application?.accountConfig?.data.roleType === "2" ? "border-2 border-green-500" : ""}

                                        `}
                                    >

                                        <div className='w-full flex flex-col gap-2
                                            border-b border-gray-300 pb-2
                                        '>
                                            {/* 신청번호 */}
                                            <div className='w-full flex flex-row items-center justify-start gap-2'>
                                                {/* dot */}
                                                <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                                                <span className='text-sm font-semibold text-gray-800'>
                                                    신청: #{application.id}
                                                </span>
                                                {/* time ago */}
                                                <div className='flex flex-row items-center justify-between gap-2 text-xs text-gray-800'>
                                                {
                                                    new Date().getTime() - new Date(application.createdAt).getTime() < 1000 * 60 ? (
                                                    ' ' + Math.floor((new Date().getTime() - new Date(application.createdAt).getTime()) / 1000) + ' ' + '초 전'
                                                    ) :
                                                    new Date().getTime() - new Date(application.createdAt).getTime() < 1000 * 60 * 60 ? (
                                                    ' ' + Math.floor((new Date().getTime() - new Date(application.createdAt).getTime()) / 1000 / 60) + ' ' + '분 전'
                                                    ) : (
                                                    ' ' + Math.floor((new Date().getTime() - new Date(application.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + '시간 전'
                                                    )
                                                }
                                                </div>
                                            </div>


                                            {/* userName */}
                                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                {/* avatar */}
                                                <Image
                                                    src={application.avatar || "/profile-default.png"}
                                                    alt="Avatar"
                                                    width={50}
                                                    height={50}
                                                    className='rounded-lg'
                                                />
                                                <span className='text-xs font-semibold text-gray-800'>
                                                    회원아이디
                                                </span>
                                                <span className='text-sm text-gray-800'>
                                                    {application.userName}
                                                </span>
                                            </div>
                                            {/* wallet address */}
                                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                <span className='text-xs font-semibold text-gray-800'>
                                                    지갑주소
                                                </span>
                                                <span className='text-sm text-gray-800'>
                                                    {application.walletAddress.slice(0, 5)}...{application.walletAddress.slice(-5)}
                                                </span>
                                                {/* polygon scan */}
                                                <a
                                                    href={`https://polygonscan.com/address/${application.walletAddress}`}
                                                    target="_blank"
                                                    className='text-xs text-blue-500'
                                                >
                                                    <Image
                                                        src="/logo-polygon.png"
                                                        alt="Polygon"
                                                        width={20}
                                                        height={20}
                                                        className='rounded-lg'
                                                    />
                                                </a>
                                            </div>

                                            {/* center */}
                                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                <span className='text-xs font-semibold text-gray-800'>
                                                    {application.marketingCenter}
                                                </span>
                                                <div className='flex flex-col gap-2 items-center justify-center'>
                                                    <span className='text-sm text-gray-800'>
                                                        {application.center}
                                                    </span>
                                                </div>

                                                
                                            </div>




                                            {/* agentBotNft name */}
                                            <div className='w-full flex flex-row items-center justify-between gap-2
                                                border border-gray-300 p-2 rounded-lg
                                                bg-gray-200

                                            '>
                                                {/* dot */}
                                                <div className='flex flex-col gap-2'>
                                                    <span className='text-lg text-yellow-600 font-semibold'>
                                                        {application?.agentBotNft?.name || "Unknown"}
                                                    </span>
                                                    <span className='text-xs text-gray-800 h-10 overflow-hidden'>
                                                        {application?.agentBotNft?.description || "Unknown"}
                                                    </span>
                                                </div>

                                                <div className='flex flex-col gap-2 items-center justify-center'>

                                                    <div className='flex flex-col gap-2 items-center justify-center'>

                                                        <Image
                                                            src={application?.agentBotNft?.image?.thumbnailUrl || "/logo-masterbot100.png"}
                                                            alt="Agent Bot"
                                                            width={200}
                                                            height={200}
                                                            className={` w-20 h-20 object-cover
                                                                rounded-lg
                                                                ${application?.startTrading?.status ? "animate-pulse" : ""}`}
                                                        />
                                                    </div>

                                                    {/* opensea link */}
                                                    <a
                                                        href={`https://opensea.io/assets/matic/${application.agentBotNft?.contract.address}/${application.agentBotNft?.tokenId}`}
                                                        target="_blank"
                                                        className='text-xs text-blue-500'
                                                    >
                                                        <Image
                                                            src="/logo-opensea.png"
                                                            alt="OpenSea"
                                                            width={20}
                                                            height={20}
                                                            className='rounded-lg'
                                                        />
                                                    </a>

                                                </div>

                                            </div>

                                        </div>







                                        {/* OKXUserId */}
                                        {/* checkHtxApiKey */}

                                        {/*
                                        <div className='w-full flex flex-row items-center justify-start gap-2'>
                                            <button
                                                onClick={() => {
                                                    checkHtxApiKey(
                                                        application.apiAccessKey,
                                                        application.apiSecretKey,
                                                        index,
                                                    );
                                                }}
                                                disabled={
                                                    checkingHtxApiKeyList[index]
                                                }
                                                className={`${checkingHtxApiKeyList[index] ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                                    hover:bg-blue-600
                                                `}
                                            >
                                                {checkingHtxApiKeyList[index] ? "Checking..." : "Check"}
                                            </button>

                                            <span className='text-xl font-semibold text-gray-800'>
                                                OKX UID: {htxUidList[index]}
                                            </span>
                                        </div>
                                        */}


                                        <div className='w-full flex flex-row items-center justify-between gap-2'>

                                          
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-row items-center justify-start gap-2'>
                                                    {(application.okxUid && application.okxUid !== '0') && (
                                                        <Image
                                                            src="/verified.png"
                                                            alt="HTX"
                                                            width={20}
                                                            height={20}
                                                            className='rounded-lg'
                                                        />
                                                    )}
                                                    
                                                    <span className='text-xs text-yellow-800'>
                                                        OKX UID
                                                    </span>

                                                </div>
                                                <div className='flex flex-row items-center justify-start gap-2'>
                                                    {application.okxUid === '0' ? (
                                                        <span className='text-red-500'>
                                                            Not verified
                                                        </span>
                                                    ) : (
                                                        <span className='text-green-500 text-xs'>
                                                            {application.okxUid}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>


                                            {/* checkApiAccessKey */}
                                         

                                            <div className='flex flex-col gap-2'>
                                                
                                                {/*
                                                <button
                                                    onClick={() => {
                                                        checkApiAccessKey(application.id, application.apiAccessKey, application.apiSecretKey);
                                                    }}
                                                    disabled={checkingApiAccessKeyList.find((item) => item.applicationId === application.id)?.checking}
                                                    className={`${checkingApiAccessKeyList.find((item) => item.applicationId === application.id)?.checking ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                                        hover:bg-blue-600
                                                    `}
                                                >
                                                    {checkingApiAccessKeyList.find((item) => item.applicationId === application.id)?.checking ? "Updating..." : "Update"}
                                                </button>
                                                */}
                                                


                                                {/* copy button */}
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(application.okxUid);
                                                        toast.success("Copied to clipboard");
                                                    }}
                                                    className="bg-gray-500 text-white p-2 rounded-lg
                                                        hover:bg-gray-600
                                                    "
                                                >
                                                    복사
                                                </button>
                                            </div>
                                        </div>

                                        {/* affliateInvitee.data.volMonth */}
                                        {/* affliateInvitee.timestamp */}
                                        {/* Trading Volume */}
                                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <span className='text-xs text-yellow-800'>
                                                    이번달 거래량 / 수수료(0.0455%)
                                                </span>
                                                <div className='flex flex-row items-center justify-start gap-2'>
                                                    <span className='text-lg text-red-500'>
                                                        {application?.affiliateInvitee?.data?.volMonth ? Number(application.affiliateInvitee.data.volMonth).toFixed(0) : 0}
                                                    </span>
                                                    {'/'}
                                                    {/* 수수료 application?.affiliateInvitee?.data?.volMonth * 0.000455 */}
                                                    <span className='text-lg text-red-500'>
                                                        {application?.affiliateInvitee?.data?.volMonth ? Number(application.affiliateInvitee.data.volMonth * 0.000455).toFixed(2) : 0}
                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                {/*}
                                                <span className='text-xs text-yellow-800'>
                                                    이번달 수수료 / 보상(23%)
                                                </span>
                                                */}
                                                <div className='flex flex-row items-center justify-start gap-2'>
                                                    <span className='text-lg text-red-500'>
                                                        {application?.affiliateInvitee?.data?.volMonth ? Number(application.affiliateInvitee.data.volMonth * 0.000455).toFixed(2) : 0}
                                                    </span>
                                                    {'/'}
                                                    <span className='text-lg text-red-500'>
                                                        {/*
                                                        {application?.affiliateInvitee?.data?.volMonth ? Number(application.affiliateInvitee.data.volMonth * 0.000455 * 0.23).toFixed(2) : 0}
                                                        */}
                                                        {application?.affiliateInvitee?.data?.volMonth ? Number(application.affiliateInvitee.data.volMonth * 0.000455 * 0.35).toFixed(2) : 0}
                                                        
                                                    </span>

                                                </div>

                                            </div>

                                        </div>


                                        {/* claimSettlement */}
                                        <div className='w-full flex flex-col gap-2
                                            border-t border-gray-300 pt-2
                                        '>
                                            {/* lastUnclaimedTradingVolume 누락된 거래량 */}
                                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                <div className='flex flex-row items-center justify-start gap-2'>
                                                    <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                                                    <span className='text-xs text-gray-800 font-semibold'>
                                                        누락된 거래량
                                                    </span>
                                                </div>
                                                <span className='text-2xl text-green-500 font-semibold'>
                                                    {Number(application?.lastUnclaimedTradingVolume || 0).toFixed(0)}
                                                </span>
                                            </div>

                                            {/* claimedTradingVolume */}
                                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <span className='text-xs text-yellow-800'>
                                                        정산된 거래량
                                                    </span>
                                                    <div className='flex flex-row items-center justify-end gap-2'>
                                                        <span className='text-lg text-red-500'>
                                                            {Number(application?.claimedTradingVolume || 0).toFixed(0)}
                                                        </span>
                                                    </div>

                                                </div>
                                                {/* 정산할 거래량 */}
                                                <div className='flex flex-col gap-2'>
                                                    <span className='text-xs text-yellow-800'>
                                                        정산할 거래량
                                                    </span>
                                                    <div className='flex flex-row items-center justify-end gap-2'>
                                                        <span className='text-2xl text-green-500 font-semibold'>
                                                            {/*application?.affiliateInvitee?.data?.volMonth ? Number(application.affiliateInvitee.data.volMonth
                                                                 - application?.claimedTradingVolume || 0).toFixed(0) : 0*/}
                                                            {application.unclaimedTradingVolume}
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>
                                            

                                            <div className='w-full flex flex-col items-center justify-between gap-2'>

                                                <div className='flex flex-row items-center justify-start gap-2'>
                                                    {/* dot */}
                                                    <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                                                    <span className='flex text-sm text-gray-800'>
                                                        정산할 거래량이 5,000 USDT 이상일 경우 정산할 수 있습니다.
                                                    </span>
                                                </div>
        
                                                {
                                                    (
                                                        application.unclaimedTradingVolume > 0
                                                    ) ? (

                                                            <button
                                                                onClick={() => {
                                                                    claimSettlement(application.id);
                                                                }}
                                                                disabled={
                                                                    claimingSettlementList.find((item) => item.applicationId === application.id)?.loading
                                                                }
                                                                className={`
                                                                    ${claimingSettlementList.find((item) => item.applicationId === application.id)?.loading ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                                                    hover:bg-blue-600
                                                                    w-full flex flex-row items-center justify-center gap-2
                                                                `}
                                                            >
                                                                {claimingSettlementList.find((item) => item.applicationId === application.id)?.loading ? "정산중..." : "정산하기"}
                                                            </button>
                                                    
                                                        ) : (

                                                            <button
                                                                disabled={true}
                                                                className='bg-gray-500 text-white p-2 rounded-lg w-full flex flex-row items-center justify-center gap-2'
                                                            >
                                                                정산할 수 없습니다.
                                                            </button>
                                                        )
                                                }
                                                
                                            </div>

                                        </div>

                                        <div className='w-full flex flex-col gap-2
                                            border border-gray-300 p-4 rounded-lg bg-gray-100
                                        '>
                                            {/* 보상 계산 */}
                                            <div className='w-full flex flex-row items-center justify-start gap-2'>
                                                <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                                                <span className='text-lg text-gray-800 font-semibold'>
                                                    보상 계산
                                                </span>
                                            </div>

                                            {/* 마스터 보상 */}
                                            {/* 마스터 보상 = 보상 * 56% */}
                                            <div className='w-full flex flex-row items-center justify-between gap-2
                                                border-t border-gray-300 pt-2
                                            '>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-row items-center justify-start gap-2'>
                                                        <span className='text-xs text-yellow-800'>
                                                            마스터 보상<br/>(56%)
                                                        </span>
                                                        <span className='text-xs text-green-500'>
                                                            {application?.userName}
                                                        </span>
                                                    </div>
                                                    <div className='flex flex-row items-center justify-start gap-2'>
                                                        <span className='text-lg text-red-500'>
                                                            {/*application?.affiliateInvitee?.data?.volMonth ? Number(application.affiliateInvitee.data.volMonth * 0.000455 * 0.23 * 0.56).toFixed(6) : 0*/}
                                                            {application.unclaimedTradingVolume > 0 ?
                                                            
                                                            //Number(application.unclaimedTradingVolume * 0.000455 * 0.23 * 0.56).toFixed(6)
                                                            Number(application.unclaimedTradingVolume * 0.000455 * 0.35 * 0.56).toFixed(6)

                                                            : 0
                                                            }
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>

                                            {/* 에이전트 보상 */}
                                            {/* 에이전트 보상 = 보상 * 28% */}
                                            <div className='w-full flex flex-row items-center justify-between gap-2
                                                border-t border-gray-300 pt-2
                                            '>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-row items-center justify-start gap-2'>
                                                        <span className='text-xs text-yellow-800'>
                                                            에이전트 보상<br/>(28%)
                                                        </span>
                                                        <span className='text-xs text-green-500'>
                                                            {application?.agentBotNft?.name || "Unknown"}
                                                        </span>
                                                    </div>
                                                    <div className='flex flex-row items-center justify-start gap-2'>
                                                        <span className='text-lg text-red-500'>
                                                            {/*application?.affiliateInvitee?.data?.volMonth ? Number(application.affiliateInvitee.data.volMonth * 0.000455 * 0.23 * 0.28).toFixed(6) : 0*/}
                                                            {application.unclaimedTradingVolume > 0 ? Number(application.unclaimedTradingVolume * 0.000455 * 0.35 * 0.28).toFixed(6) : 0}
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>

                                            {/* 센터 보상 */}
                                            {/* 센터 보상 = 보상 * 14% */}
                                            <div className='w-full flex flex-row items-center justify-between gap-2
                                                border-t border-gray-300 pt-2
                                            '>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-row items-center justify-start gap-2'>
                                                        <span className='text-xs text-yellow-800'>
                                                            센터 보상<br/>(14%)
                                                        </span>
                                                        <span className='text-xs text-green-500'>
                                                            {application.center}
                                                        </span>
                                                    </div>
                                                    <div className='flex flex-row items-center justify-start gap-2'>
                                                        <span className='text-lg text-red-500'>
                                                            {/*application?.affiliateInvitee?.data?.volMonth ? Number(application.affiliateInvitee.data.volMonth * 0.000455 * 0.23 * 0.14).toFixed(6) : 0*/}
                                                            {application.unclaimedTradingVolume > 0 ? Number(application.unclaimedTradingVolume * 0.000455 * 0.35 * 0.14).toFixed(6) : 0}
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>




                                        {/* affliateInvitee.data.depAmt */}
                                        {/* affliateInvitee.timestamp */}
                                        {/* Deposit Amount */}
                                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <span className='text-xs text-yellow-800'>
                                                    누적 입금액(USDT)
                                                </span>
                                                <div className='flex flex-row items-center justify-start gap-2'>
                                                    <span className='text-lg text-red-500'>
                                                        {application?.affiliateInvitee?.data?.depAmt ? Number(application.affiliateInvitee.data.depAmt).toFixed(0) : 0}
                                                    </span>
                                                    <span className='text-xs text-gray-800'>
                                                        {application?.affiliateInvitee?.timestamp
                                                        ?

                                                        new Date().getTime() - new Date(application.affiliateInvitee.timestamp).getTime() < 1000 * 60 ? (
                                                            ' ' + Math.floor((new Date().getTime() - new Date(application.affiliateInvitee.timestamp).getTime()) / 1000) + ' ' + '초 전'
                                                        ) :
                                                        new Date().getTime() - new Date(application.affiliateInvitee.timestamp).getTime() < 1000 * 60 * 60 ? (
                                                            ' ' + Math.floor((new Date().getTime() - new Date(application.affiliateInvitee.timestamp).getTime()) / 1000 / 60) + ' ' + '분 전'
                                                        ) : (
                                                            ' ' + Math.floor((new Date().getTime() - new Date(application.affiliateInvitee.timestamp).getTime()) / 1000 / 60 / 60) + ' ' + '시간 전'
                                                        )
                                                        : ""
                                                        }
                                                    </span>
                                                </div>

                                            </div>
                                        </div>

                                        {/* affliateInvitee.data.totalCommission */}
                                        {/* affliateInvitee.timestamp */}
                                        {/* Total Commission */}
                                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <span className='text-xs text-yellow-800'>
                                                    누적 수수료(USDT)
                                                </span>
                                                <div className='flex flex-row items-center justify-start gap-2'>
                                                    <span className='text-lg text-red-500'>
                                                        {application?.affiliateInvitee?.data?.totalCommission ? Number(application.affiliateInvitee.data.totalCommission).toFixed(2) : 0}
                                                    </span>
                                                    <span className='text-xs text-gray-800'>
                                                        {application?.affiliateInvitee?.timestamp
                                                        ?

                                                        new Date().getTime() - new Date(application.affiliateInvitee.timestamp).getTime() < 1000 * 60 ? (
                                                            ' ' + Math.floor((new Date().getTime() - new Date(application.affiliateInvitee.timestamp).getTime()) / 1000) + ' ' + '초 전'
                                                        ) :
                                                        new Date().getTime() - new Date(application.affiliateInvitee.timestamp).getTime() < 1000 * 60 * 60 ? (
                                                            ' ' + Math.floor((new Date().getTime() - new Date(application.affiliateInvitee.timestamp).getTime()) / 1000 / 60) + ' ' + '분 전'
                                                        ) : (
                                                            ' ' + Math.floor((new Date().getTime() - new Date(application.affiliateInvitee.timestamp).getTime()) / 1000 / 60 / 60) + ' ' + '시간 전'
                                                        )
                                                        : ""
                                                        }
                                                    </span>
                                                </div>

                                            </div>
                                        </div>





                                        {/* tradingAccountBalance */}
                                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <span className='text-xs text-yellow-800'>
                                                    거래계정 잔고가치($)
                                                </span>

                                                {/* if balance is not zero red color */}
                                                <div className='flex flex-row items-center justify-start gap-2'>
                                                    {
                                                        tradingAccountBalanceList.find((item) => item.applicationId === application.id)?.tradingAccountBalance?.balance > 0 ? (
                                                            <span className='text-lg text-red-500'>
                                                                {
                                                                    Number(tradingAccountBalanceList.find((item) => item.applicationId === application.id)?.tradingAccountBalance?.balance)
                                                                    .toLocaleString('en-US', {
                                                                        style: 'currency',
                                                                        currency: 'USD'
                                                                    })
                                                                
                                                                    
                                                                }
                                                            </span>
                                                        ) : (
                                                            <span className='text-lg text-gray-800'>
                                                                {
                                                                    Number(tradingAccountBalanceList.find((item) => item.applicationId === application.id)?.tradingAccountBalance?.balance)
                                                                    .toLocaleString('en-US', {
                                                                        style: 'currency',
                                                                        currency: 'USD'
                                                                    })
                                                                }
                                                            </span>
                                                        )
                                                    }

                                                    {/* time ago */}
                                                    {/* hours minutes ago */}
                                                    <span className='text-xs text-gray-800'>
                                                        {tradingAccountBalanceList.find((item) => item.applicationId === application.id)?.tradingAccountBalance?.timestamp
                                                        ?

                                                        new Date().getTime() - new Date(tradingAccountBalanceList.find((item) => item.applicationId === application.id)?.tradingAccountBalance?.timestamp).getTime() < 1000 * 60 ? (
                                                            ' ' + Math.floor((new Date().getTime() - new Date(tradingAccountBalanceList.find((item) => item.applicationId === application.id)?.tradingAccountBalance?.timestamp).getTime()) / 1000) + ' ' + '초 전'
                                                        ) :
                                                        new Date().getTime() - new Date(tradingAccountBalanceList.find((item) => item.applicationId === application.id)?.tradingAccountBalance?.timestamp).getTime() < 1000 * 60 * 60 ? (
                                                            ' ' + Math.floor((new Date().getTime() - new Date(tradingAccountBalanceList.find((item) => item.applicationId === application.id)?.tradingAccountBalance?.timestamp).getTime()) / 1000 / 60) + ' ' + '분 전'
                                                        ) : (
                                                            ' ' + Math.floor((new Date().getTime() - new Date(tradingAccountBalanceList.find((item) => item.applicationId === application.id)?.tradingAccountBalance?.timestamp).getTime()) / 1000 / 60 / 60) + ' ' + '시간 전'
                                                        )
                                                        : ""
                                                        }
                                                    </span>


                                                </div>

                                            </div>
                                            
                                            {/*
                                            <button
                                                onClick={() => {
                                                    checkTradingAccountBalance(
                                                        application.id,
                                                        application.apiAccessKey,
                                                        application.apiSecretKey,
                                                        application.apiPassword,
                                                    );
                                                }}
                                                disabled={
                                                    checkingTradingAccountBalanceList.find((item) => item.applicationId === application.id)?.checking
                                                }
                                                className={`${checkingTradingAccountBalanceList.find((item) => item.applicationId === application.id)?.checking ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                                    hover:bg-blue-600
                                                `}
                                            >
                                                {checkingTradingAccountBalanceList.find((item) => item.applicationId === application.id)?.checking ? "Checking..." : "Check"}
                                            </button>
                                            */}

                                        </div>


                                        {/*
                                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <span className='text-lg font-semibold text-yellow-500'>
                                                    아이디
                                                </span>
                                                <span className='text-sm text-gray-800'>
                                                    {application.userName}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(application.userPhoneNumber);
                                                    toast.success("Copied to clipboard");
                                                }}
                                                className="bg-gray-500 text-white p-2 rounded-lg
                                                    hover:bg-gray-600
                                                "
                                            >  
                                                {Copy}
                                            </button>
                                        </div>
                                        */}

                                        {/*
                                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <span className='text-lg font-semibold text-yellow-500'>
                                                    이메일
                                                </span>
                                                <span className='text-xs text-gray-800'>
                                                    {application.userEmail.substring(0, 5)}...{application.userEmail.substring(application.userEmail.length - 5)}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(application.userEmail);
                                                    toast.success("Copied to clipboard");
                                                }}
                                                className="bg-gray-500 text-white p-2 rounded-lg
                                                    hover:bg-gray-600
                                                "
                                            >
                                                {Copy}
                                            </button>
                                        </div>
                                        */}



                                        {/*}
                                        <div className='w-full flex-row items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <span className='text-lg font-semibold text-yellow-500'>
                                                    지갑주소
                                                </span>
                                                <span className='text-sm text-gray-800'>
                                                    {application.htxUsdtWalletAddress}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(application.htxUsdtWalletAddress);
                                                    toast.success("Copied to clipboard");
                                                }}
                                                className="bg-gray-500 text-white p-2 rounded-lg
                                                    hover:bg-gray-600
                                                "
                                            >
                                                {Copy}
                                            </button>
                                        </div>
                                        */}


   



                                        <div className='w-full h-full flex flex-row items-end justify-between gap-2'>

                                            <div className='flex flex-col gap-2'>
                                                <span className='text-sm text-gray-800'>

                                                    {application?.startTrading?.status ? (
                                                        //application?.startTrading?.timestamp
                                                        (

                                                            <div className='flex flex-col gap-2'>
                                                                <span className='text-sm text-green-500
                                                                border border-green-500 p-2 rounded-lg
                                                                '>
                                                                
                                                                    승인완료
                                                                </span>
                                                            </div>

                                                        )
                                                    ) : (
                                                        <span className='text-sm text-red-500'>
                                                            승인대기
                                                        </span>
                                                    )}
                                                </span>
                                            </div>


                                        </div>




            
                                    </div>
                                ))}

                            </div>

                        </div>
                    

                    )}
                 




                </div>




            </div>

        </main>

    );

}

          




function Header(
    {
        agent,
        tokenId,
    } : {
        agent: string,
        tokenId: string,
    }
) {

    const router = useRouter();
  
  
    return (
      <header className="flex flex-col items-center mb-5 md:mb-10">
  
        {/* header menu */}
        <div className="w-full flex flex-row justify-between items-center gap-2
          bg-black bg-opacity-10 p-4 rounded-lg  md:p-6
        ">
       
                <div className="flex flex-row gap-2 items-center">
                    <Image
                    src="/logo.png"
                    alt="Circle Logo"
                    width={35}
                    height={35}
                    className="rounded-full w-10 h-10 xl:w-14 xl:h-14"
                    />
                    <span className="text-lg xl:text-3xl text-gray-800 font-semibold">
                        실적관리
                    </span>
                </div>
            


        </div>
        
      </header>
    );
  }