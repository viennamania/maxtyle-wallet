'use client';
import React, { useEffect, useState, Suspense } from "react";

import { toast } from 'react-toastify';



import { client } from "../../../client";

import {
    getContract,
    sendTransaction,
    sendAndConfirmTransaction,
} from "thirdweb";

import { deployERC721Contract } from 'thirdweb/deploys';

import {
    getOwnedNFTs,
    mintTo,
    transferFrom,
} from "thirdweb/extensions/erc721";


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

    useConnectedWallets,
    useSetActiveWallet,


} from "thirdweb/react";


import { shortenAddress } from "thirdweb/utils";
import { Button } from "@headlessui/react";

import Link from "next/link";



import Image from 'next/image';

//import Uploader from '@/components/uploader';

import { balanceOf } from "thirdweb/extensions/erc20";



import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";


import {
    useRouter,
    useSearchParams,
} from "next//navigation";


const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon






const wallets = [
    inAppWallet({
      auth: {
        options: [
          "google",
          "discord",
          "email",
          "x",
          "passkey",
          //"phone",
          "facebook",
          "line",
          "apple",
          "coinbase",
        ],
      },
    }),
    /*
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
    createWallet("io.metamask"),
    //createWallet("com.binance.wallet"),
    createWallet("com.bitget.web3"),
    createWallet("com.trustwallet.app"),
    createWallet("com.okex.wallet"),
    */
];






function AgentPage(
    {
        params,
    }: {
        params: {
            lang: string;
            chain: string;
        };
    }
) {
    const { lang, chain } = params;

    const searchParams = useSearchParams();

    const center = searchParams.get('center');


    const start = searchParams.get('start') || "0x0276aE1b0768bBfe47d3Dd34493A225405aDB6AA_134";

    const agent = start?.split('_')[0];
    const agentNumber = start?.split('_')[1];
  



    /*
    const [params, setParams] = useState({ center: '' });

  
    useEffect(() => {
        const center = searchParams.get('center') || '';
        setParams({ center });
    }, [searchParams]);
    */
 

    const account = useActiveAccount();


    const contract = getContract({
        client,
        chain: bsc,
        address: contractAddress,
    });
    

    


    const router = useRouter();



    const address = account?.address;
  
    // test address
    //const address = "0x542197103Ca1398db86026Be0a85bc8DcE83e440";
  









    const [balance, setBalance] = useState(0);
    useEffect(() => {
  
      // get the balance
      const getBalance = async () => {

        if (!address) {
            return;
        }
  
        ///console.log('getBalance address', address);
  
        
        const result = await balanceOf({
          contract,
          address: address,
        });
  
    
        //console.log(result);
  
        if (!result) return;
    
        setBalance( Number(result) / 10 ** 6 );
  
      };
  
      if (address) getBalance();
  
      const interval = setInterval(() => {
        if (address) getBalance();
      } , 1000);
  
      return () => clearInterval(interval);
  
    } , [address, contract]);


    ///console.log("balance", balance);



    
    const [nickname, setNickname] = useState("");
    const [editedNickname, setEditedNickname] = useState("");

    const [avatar, setAvatar] = useState("/icon-default-avatar.png");



    

    const [userCode, setUserCode] = useState("");


    const [nicknameEdit, setNicknameEdit] = useState(false);



    const [avatarEdit, setAvatarEdit] = useState(false);



    const [seller, setSeller] = useState(null) as any;


    const [isAgent, setIsAgent] = useState(false);

    const [referralCode, setReferralCode] = useState("");

    const [erc721ContractAddress, setErc721ContractAddress] = useState("0x0276aE1b0768bBfe47d3Dd34493A225405aDB6AA");

    const [userCenter, setUserCenter] = useState("");

    const [isCenterOwner, setIsCenterOwner] = useState(false);

    const [loadingUserData, setLoadingUserData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingUserData(true);
            const response = await fetch("/api/user/getUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                    //center: center,
                }),
            });

            const data = await response.json();

            //console.log("data", data);


            if (data.result) {
                setNickname(data.result.nickname);
                
                data.result.avatar && setAvatar(data.result.avatar);
                

                setUserCode(data.result.id);

                setSeller(data.result.seller);

                setIsAgent(data.result.agent);

                ///setReferralCode(data.result.erc721ContractAddress);
                ////setErc721ContractAddress(data.result.erc721ContractAddress);

                setUserCenter(data.result.center);

                setIsCenterOwner(
                    data.result.centerOwner === true
                );

            } else {
                setNickname('');
                setAvatar('/icon-default-avatar.png');
                setUserCode('');
                setSeller(null);
                setEditedNickname('');
                
                //setAccountHolder('');

                //setAccountNumber('');
                //setBankName('');

                setIsAgent(false);

                setReferralCode('');

                setErc721ContractAddress('');

                setUserCenter('');
            }
            setLoadingUserData(false);

        };

        address &&
        fetchData();

    }, [address]);
    



    // check user nickname duplicate


    const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);

    const checkNicknameIsDuplicate = async ( nickname: string ) => {

        const response = await fetch("/api/user/checkUserByNickname", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nickname: nickname,
            }),
        });


        const data = await response?.json();


        //console.log("checkNicknameIsDuplicate data", data);

        if (data.result) {
            setIsNicknameDuplicate(true);
        } else {
            setIsNicknameDuplicate(false);
        }

    }




    const [loadingSetUserData, setLoadingSetUserData] = useState(false);

    const setUserData = async () => {


        // check nickname length and alphanumeric
        //if (nickname.length < 5 || nickname.length > 10) {

        if (editedNickname.length < 5 || editedNickname.length > 10) {

            //toast.error("아이디는 5자 이상 10자 이하로 입력해주세요");
            return;
        }
        
        ///if (!/^[a-z0-9]*$/.test(nickname)) {
        if (!/^[a-z0-9]*$/.test(editedNickname)) {
            //toast.error("아이디는 영문 소문자와 숫자만 입력해주세요");
            return;
        }


        setLoadingSetUserData(true);

        if (nicknameEdit) {


            const response = await fetch("/api/user/updateUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                    
                    //nickname: nickname,
                    nickname: editedNickname,

                }),
            });

            const data = await response.json();

            ///console.log("updateUser data", data);

            if (data.result) {

                setUserCode(data.result.id);
                setNickname(data.result.nickname);

                setNicknameEdit(false);
                setEditedNickname('');

                //toast.success('Nickname saved');

            } else {

                //toast.error('You must enter different nickname');
            }


        } else {

            const response = await fetch("/api/user/setUserVerified", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,                    
                    //nickname: nickname,
                    nickname: editedNickname,
                    userType: "",
                    mobile: "",
                    telegramId: "",
                }),
            });

            const data = await response.json();

            //console.log("data", data);

            if (data.result) {

                setUserCode(data.result.id);
                setNickname(data.result.nickname);

                setNicknameEdit(false);
                setEditedNickname('');

                //toast.success('Nickname saved');

            } else {
                //toast.error('Error saving nickname');
            }
        }

        setLoadingSetUserData(false);

        
    }




    // search user by nickname
    const [searchNickname, setSearchNickname] = useState("");






    // get native users
    // api/user/getAllUsers

    const [loadingUsers, setLoadingUsers] = useState(false);
    const [users, setUsers] = useState([] as any[]);
    const getUsers = async () => {
        try {
            if (loadingUsers) {
                return;
            }

            setLoadingUsers(true);

            const response = await fetch("/api/user/getAllUsers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    limit: 10, // limit the number of users to fetch
                    page: 1, // page number for pagination
                    // if searchNickname is empty, then get all users
                    searchNickname: searchNickname, // search by nickname
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get users');
            }

            const data = await response.json();

            setUsers(data.result.users || []);
            setLoadingUsers(false);

        } catch (error) {
            console.error("getUsers error", error);
            setLoadingUsers(false);
        }
    };
    useEffect(() => {
        getUsers();

        // interval to refresh users every 10 seconds
        const interval = setInterval(() => {
            getUsers();
        }, 10000);

        return () => clearInterval(interval);
        
    }, [searchNickname]);

    /*
      users: [
    {
      id: undefined,
      createdAt: '2025-08-06T00:38:58.062Z',
      avatar: undefined,
      walletAddress: '0x19D435d40F4f94398730Abe425b904e685C5973C',
      nickname: 'summerj',
      mobile: undefined,
      email: undefined,
      start: undefined,
      mkcBalance: 0,
      mkrwBalance: 9024,
      musdBalance: 0,
      usdtBalance: 0.123
    },
    */








    // call api /api/sendbird/getAllUsers
    const [loadingSendbirdUsers, setLoadingSendbirdUsers] = useState(false);
    const [sendbirdUsers, setSendbirdUsers] = useState([] as any[]);
    const [pageToken, setPageToken] = useState("");
    const getSendbirdUsers = async () => {
        try {

            if (loadingSendbirdUsers) {
                return;
            }




            setLoadingSendbirdUsers(true);



            const response = await fetch("/api/sendbird/getAllUsers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    limit: 10, // limit the number of users to fetch

                    pageToken: pageToken, // use pageToken for pagination


                }),
            });
            




            if (!response.ok) {
                throw new Error('Failed to get Sendbird users');
            }

            const data = await response.json();

            // if same user_id exists, then doesn't add it to the list

            setSendbirdUsers((prevUsers) => [
                ...prevUsers,
                ...(data.result.users || []).filter(
                    (user: any) => !prevUsers.some((u) => u.user_id === user.user_id)
                ),
            ]);

            // if userid is address, then remove it
            setSendbirdUsers((prevUsers) =>
                prevUsers.filter((user) => user.user_id !== address)
            );



            setPageToken(data.result.next || "");

            setLoadingSendbirdUsers(false);







        } catch (error) {
            console.error("getSendbirdUsers error", error);

            setLoadingSendbirdUsers(false);
        }
    }

    useEffect(() => {
        if (address) {
            getSendbirdUsers();
        }
    }, [address]);


    /*
    {
        "users": [
            {
                "user_id": "Craig",
                "nickname": "Shopperholic",
                "profile_url": "https://sendbird.com/main/img/profiles/profile_06_512px.png",
                "is_active": true,
                "is_online": true,
                "created_at": 1542123432,
                "last_seen_at": 0,
                "has_ever_logged_in": true,
                "metadata": {
                    "font_preference": "times new roman",
                    "font_color": "black"
                }
            },
            {
                "user_id": "Doris",
                "nickname": "Dojung",
                "profile_url": "https://sendbird.com/main/img/profiles/profile_05_512px.png",
                "is_active": true,
                "is_online": false,
                "created_at": 1540285244,
                "last_seen_at": 1540285396142,
                "has_ever_logged_in": true,
                "metadata": {
                    "font_preference": "times new roman",
                    "font_color": "black"
                }
            },
            {
                "user_id": "Young",
                "nickname": "Sportsman",
                "profile_url": "https://sendbird.com/main/img/profiles/profile_07_512px.png",
                "is_active": true,
                "is_online": true,
                "created_at": 1502403479,
                "last_seen_at": 0,
                "has_ever_logged_in": true,
                "metadata": {
                    "font_preference": "times new roman",
                    "font_color": "black"
                }
            }
        ],
        "next": "YXEZR1VVQVErEUBXWFNeF2p3FkFVVA~~"
    }
    */



    // api /eendbird/createGroupChannel
    const createGroupChannel = async (user_id1: string, user_id2: string) => {
        try {

            const response = await fetch("/api/sendbird/createGroupChannel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id1: user_id1,
                    user_id2: user_id2,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create group channel');
            }

            const data = await response.json();

            console.log("createGroupChannel data", data);

            if (data.result) {
                // redirect to chat page
                router.push(
                    `/${lang}/${chain}/chat/${data.result.channel_url}`
                );
            } else {
                alert('Failed to create group channel');
            }

        } catch (error) {
            console.error("createGroupChannel error", error);
            if (error instanceof Error) {
                alert('Failed to create group channel:' + error.message);
            } else {
                alert('Failed to create group channel: ' + String(error));
            }
        }
    }



    return (

        <main className="
        p-4 min-h-[100vh] flex-col items-start justify-center container max-w-screen-2xl mx-auto
        bg-[#E7EDF1]
        ">

            <div className=" py-0 w-full">




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



                {/* 메뉴: 공지사항, 회원목록 */}
                <div className="w-full flex flex-row gap-4 items-start justify-start mb-5">
                    <div className="flex flex-row gap-2 items-center
                        border-b-2 border-blue-500 pb-2">
                        <Image
                            src="/icon-notice.png"
                            alt="Notice Icon"
                            width={24}
                            height={24}
                        />
                        <Link
                            href={`/${lang}/${chain}/admin-notice`}
                            className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                        >
                            공지사항
                        </Link>
                    </div>

                    <div className="flex flex-row gap-2 items-center
                        border-b-2 border-blue-500 pb-2">
                        <Image
                            src="/icon-invite.png"
                            alt="Users Icon"
                            width={24}
                            height={24}
                        />
                        <Link
                            href={`/${lang}/${chain}/admin-users`}
                            className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                        >
                            회원 목록
                        </Link>
                    </div>
                </div>


               {/* list of sendbird users */}
               {/*
                <div className="w-full mb-5">
                    
                    <div className="flex items-center gap-2 mb-4
                        border-b-2 border-gray-200 pb-2">
                        <Image
                            src="/icon-invite.png"
                            alt="Invite Icon"
                            width={24}
                            height={24}
                        />
                        <h2 className="text-xl font-bold">회원 목록</h2>
                    </div>


                    <div className="flex flex-row gap-2 mb-4">
                        <Image
                            src="/icon-search.png"
                            alt="Search Icon"
                            width={24}
                            height={24}
                            className="self-center"
                        />
                        <input
                            type="text"
                            placeholder="회원 검색 (닉네임)"
                            value={searchNickname}
                            onChange={(e) => setSearchNickname(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                        <Button
                            onClick={() => {
                                // 검색 기능 구현
                                // 예시: sendbirdUsers.filter(user => user.nickname.includes(searchNickname));
                                // 현재는 전체 회원 목록을 보여줍니다.
                                getSendbirdUsers();
                            }}
                            className={`
                                ${searchNickname ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}
                                w-32  flex-shrink-0
                                hover:bg-blue-600 hover:text-white
                                px-4 py-2 rounded-lg
                                transition-colors duration-200
                            `}
                        >
                            검색
                        </Button>
                    </div>




                    { loadingSendbirdUsers && (
                        <div className="flex justify-center items-center py-4">
                            <p className="text-gray-500">회원 목록을 불러오는 중...</p>
                        </div>
                    )}


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sendbirdUsers.map((user) => (


                            
                            <div key={user.user_id} className="p-4 bg-white rounded-lg shadow-md">


                                <div className="flex justify-between items-center mb-3">

                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={user.profile_url || "/icon-default-avatar.png"}
                                            alt={user.nickname}
                                            width={50}
                                            height={50}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold">{user.nickname}</h3>
                                            <p className="text-sm text-gray-600">회원 지갑: {user.user_id.length > 10 ? user.user_id.slice(0, 10) + '...' : user.user_id}</p>
                                            <p className="text-sm text-gray-500">온라인: {user.is_online ? "예" : "아니오"}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Button
                                            onClick={() => {
                                                
                                                //createGroupChannel(address as string, user.user_id);
                                                alert('준비중입니다."');

                                            }}
                                            className="text-sm bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            채팅하기
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                router.push(
                                                    "/" + params.lang + "/" + params.chain + "/sendToUserUSDT/" + user.user_id
                                                );
                                            }}
                                            className="text-sm bg-green-500 text-white px-4 py-2 rounded"
                                        >
                                            테더 송금하기
                                        </Button>

                                        <Button
                                            onClick={() => {
                                                router.push(
                                                    "/" + params.lang + "/" + params.chain + "/sendToUserMKRW/" + user.user_id
                                                );
                                            }}
                                            className="text-sm bg-yellow-500 text-white px-4 py-2 rounded"
                                        >
                                            포인트 송금하기
                                        </Button>
                                    </div>


                                </div>

                            </div>

                            
                        ))}
                    </div>
                    {pageToken && (
                        <>

                            {loadingSendbirdUsers && (
                                <div className="flex justify-center items-center py-4">
                                    <p className="text-gray-500">더 많은 회원을 불러오는 중...</p>
                                </div>
                            )}

                            {!loadingSendbirdUsers && (


                                <Button
                                    onClick={getSendbirdUsers}
                                    className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    더 불러오기
                                </Button>

                            )}

                        </>
                    )}
                </div>
                */}

                {/* list of native users */}
                {/* table view */}
                <div className="w-full mb-5">
                    
                    <div className="flex items-center gap-2 mb-4
                        border-b-2 border-gray-200 pb-2">
                        <Image
                            src="/icon-invite.png"
                            alt="Invite Icon"
                            width={24}
                            height={24}
                        />
                        <h2 className="text-xl font-bold">회원 목록</h2>
                    </div>

                    <div className="flex flex-row gap-2 mb-4">
                        <Image
                            src="/icon-search.png"
                            alt="Search Icon"
                            width={24}
                            height={24}
                            className="self-center"
                        />
                        <input
                            type="text"
                            placeholder="회원 검색 (닉네임)"
                            value={searchNickname}
                            onChange={(e) => setSearchNickname(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                        <Button
                            onClick={() => {
                                // 검색 기능 구현
                                getUsers();
                            }}
                            className={`
                                ${searchNickname ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}
                                w-32  flex-shrink-0
                                hover:bg-blue-600 hover:text-white
                                px-4 py-2 rounded-lg
                                transition-colors duration-200
                            `}
                        >
                            검색
                        </Button>
                    </div>


                    <div className="w-full flex justify-between items-center mb-4">
                        <div className="flex justify-between items-center py-4">
                            <p className="text-sm text-gray-500">
                                총 {users.length}명의 회원이 있습니다.
                            </p>
                        </div>
                        {loadingUsers && (
                            <div className="flex justify-center items-center py-4">
                                <p className="text-sm text-gray-500">회원 목록을 불러오는 중...</p>
                            </div>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        닉네임
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        지갑 주소
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        MKC 잔액
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        MKRW 잔액
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        MUSD 잔액
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        행동
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.walletAddress} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">{user.nickname}</td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-row items-center gap-2">
                                                <Image
                                                    src='/icon-shield.png'
                                                    alt="Shield Icon"
                                                    width={20}
                                                    height={20}
                                                    className="inline-block"
                                                />
                                                <span className="text-sm text-gray-600">
                                                    {user.walletAddress.length > 10 ? user.walletAddress.slice(0, 10) + '...' : user.walletAddress}
                                                </span>

                                                {/* button for new window  bsc explorer */}
                                                <Button
                                                    onClick={() => {
                                                        window.open(
                                                            "https://bscscan.com/address/" + user.walletAddress,
                                                            "_blank"
                                                        );
                                                    }}
                                                    className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                                                >
                                                    BscScan
                                                </Button>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-right text-lg text-blue-600"
                                            style={{ fontFamily: 'monospace' }}
                                        >
                                            {
                                            Number(user.mkcBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") // format number with commas
                                            }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-lg text-yellow-600"
                                            style={{ fontFamily: 'monospace' }}
                                        >
                                            {Number(user.mkrwBalance).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-lg text-green-600"
                                            style={{ fontFamily: 'monospace' }}
                                        >
                                            {Number(user.musdBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </td>

                                        <td className="px-6 py-4 flex flex-row gap-2 items-center justify-center">

                                            <Button
                                                onClick={() => {
                                                    router.push(
                                                        "/" + params.lang + "/" + params.chain + "/sendToUserMKC/" + user.walletAddress
                                                    );
                                                }}
                                                className="text-sm bg-yellow-500 text-white px-4 py-2 rounded ml-2"
                                            >
                                                MKC 송금하기
                                            </Button>

                                            <Button
                                                onClick={() => {
                                                    router.push(
                                                        "/" + params.lang + "/" + params.chain + "/sendToUserMKRW/" + user.walletAddress
                                                    );
                                                }}
                                                className="text-sm bg-green-500 text-white px-4 py-2 rounded ml-2"
                                            >
                                                MKRW 송금하기
                                            </Button>

                                            <Button
                                                onClick={() => {
                                                    router.push(
                                                        "/" + params.lang + "/" + params.chain + "/sendToUserMUSD/" + user.walletAddress
                                                    );
                                                }}
                                                className="text-sm bg-blue-500 text-white px-4 py-2 rounded ml-2"
                                            >
                                                MUSD 송금하기
                                            </Button>


                                            {/* 출금 차단 */}
                                            <div className="flex flex-row gap-2
                                                items-center justify-center
                                                border-l border-gray-200 pl-4">
                                                {/* 차단상태 */}
                                                {user?.isBlocked ? (
                                                    <div className="flex flex-row gap-2 items-center">
                                                        {/* 포인트 출금 차단 상태 */}
                                                        <span className="text-sm text-red-500">
                                                            출금 차단됨
                                                        </span>
                                                        {/* 포인트 출금 차단 해제 버튼 */}
                                                        <Button
                                                            onClick={() => {
                                                                // 포인트 출금 차단 해제 기능은 현재 준비중입니다.
                                                                alert('준비중입니다.');
                                                            }}
                                                            className="text-sm bg-red-500 text-white px-4 py-2 rounded"
                                                        >
                                                            출금 차단 해제
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-row gap-2 items-center">
                                                        {/* 포인트 출금 가능 상태 */}
                                                        <span className="text-sm text-green-500">
                                                            출금 가능
                                                        </span>
                                                        {/* 포인트 출금 차단 버튼 */}
                                                        <Button
                                                            onClick={() => {
                                                                // 포인트 출금 차단 기능은 현재 준비중입니다.
                                                                alert('준비중입니다.');
                                                            }}
                                                            className="text-sm bg-gray-500 text-white px-4 py-2 rounded"
                                                        >
                                                            출금 차단
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>





                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/*}
                        <div className="flex justify-between items-center py-4">
                            <div className="text-sm text-gray-500">
                                총 {users.length}명의 회원이 있습니다.
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                        */}

                    </div>

                    {users.length === 0 && !loadingUsers && (
                        <div className="flex justify-center items-center py-4">
                            <p className="text-gray-500">회원이 없습니다.</p>
                        </div>
                    )}



                </div>





            </div>


            {/* 이용방법인 궁금하신가요? 이용가이드 */}
            {/* 계속하면 이용약관에 동의하는것입니다. 이용약관 */}
            {/* 개인정보 처리방침을 확인하세요. 개인정보 처리방침 */}
            {!address && (

                <div className="w-full fixed bottom-0 left-0 right-0 items-center justify-center pb-5">


                <div className="flex flex-col items-center justify-center gap-2">



                    <div className="
                    flex flex-row gap-2 justify-center items-center">
                    <span className="text-sm md:text-lg text-zinc-500">
                        계속하면 이용약관에 동의하는것입니다.
                    </span>
                    <Link
                        href="#"
                        className="text-sm md:text-lg text-blue-500 font-semibold hover:underline"
                    >
                        이용약관
                    </Link>
                    </div>

                    <div className="
                    flex flex-row gap-2 justify-center items-center">
                    <span className="text-sm md:text-lg text-zinc-500">
                        개인정보 처리방침을 확인하세요.
                    </span>
                    <Link
                        href="#"
                        className="text-sm md:text-lg text-blue-500 font-semibold hover:underline"
                    >
                        개인정보 처리방침
                    </Link>
                    </div>



                </div>

                </div>

            )}




        </main>

    );

}

          




  // export default function SettingsPage({ params }: any) {

  export default function Agent({ params }: any) {
    return (
        <Suspense fallback={
            <div
                className="w-full h-screen flex flex-col items-center justify-center
                bg-zinc-100 text-gray-600 font-semibold text-lg"
            >Loading...</div>
        }>
            <AgentPage
                params={params}
            />
            <div className="w-full h-36 bg-[#E7EDF1]"></div>
        </Suspense>
    );
  }