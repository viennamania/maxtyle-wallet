'use client';

//import { Session, Chatbox } from "@talkjs/react";


import dynamic from "next/dynamic";

import '@sendbird/uikit-react/dist/index.css';

import {

  useActiveWallet,
  
} from "thirdweb/react";

import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 

import { useSearchParams } from 'next/navigation'

import Image from 'next/image';

import React, { useEffect, useState, Suspense } from 'react';

import Link from "next/link";



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
  
  const searchParams = useSearchParams()
 
  const channel = searchParams.get('channel')
 

  console.log("ChatPageContent channel", channel);


  const { lang, chain } = params;




  // get the active wallet
  const activeWallet = useActiveWallet();


  //console.log("activeWallet", activeWallet);

  console.log("activeWallet", activeWallet);


  // get wallet address

  const address = activeWallet?.getAccount()?.address;
  


  console.log('address', address);

  const [balance, setBalance] = useState(0);

  /*
  useEffect(() => {

    if (!address) return;
    // get the balance
    const getBalance = async () => {
      const result = await balanceOf({
        contract,
        address: address,
      });
  
      //console.log(result);
  
      setBalance( Number(result) / 10 ** 18 );

    };

    if (address) getBalance();

    const interval = setInterval(() => {
      if (address) getBalance();
    } , 1000);

    return () => clearInterval(interval);

  } , [address]);
  */


      

  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("/profile-default.png");
  const [userCode, setUserCode] = useState("");


  const [user, setUser] = useState<any>(null);


  const [seller, setSeller] = useState(null) as any;


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

          //console.log("data", data);

          if (data.result) {
              setNickname(data.result.nickname);
              data.result.avatar && setAvatar(data.result.avatar);
              setUserCode(data.result.id);

              setUser(data.result);

              setSeller(data.result.seller);

          }
      };

      fetchData();

  }, [address]);



  // function to update nitice content
  const [updatingNotice, setUpdatingNotice] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeUpdated, setNoticeUpdated] = useState(false);
  const updateNotice = async () => {
    setUpdatingNotice(true);
    try {
      const response = await fetch("/api/notice/updateNotice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: noticeTitle,
          content: noticeContent,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setNoticeUpdated(true);
      } else {
        console.error("Failed to update notice:", data.message);
      }
    } catch (error) {
      console.error("Error updating notice:", error);
    } finally {
      setUpdatingNotice(false);
    }
  };


  // function to create notice
const [creatingNotice, setCreatingNotice] = useState(false);
const [newNoticeTitle, setNewNoticeTitle] = useState("");
const [newNoticeContent, setNewNoticeContent] = useState("");
const [noticeCreated, setNoticeCreated] = useState(false);
const createNotice = async () => {
  setCreatingNotice(true);
  try {
    const response = await fetch("/api/notice/createNotice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
            title: newNoticeTitle,
            content: newNoticeContent,
        }),
    });
    const data = await response.json();
    if (data.success) {
      setNoticeCreated(true);
      // Optionally, you can reset the form fields after successful creation
      setNewNoticeTitle("");
      setNewNoticeContent("");
    } else {
      console.error("Failed to create notice:", data.message);
    }
  } catch (error) {
    console.error("Error creating notice:", error);
  } finally {
    setCreatingNotice(false);
  }
};



  // get notice list
  const [noticeList, setNoticeList] = useState<any[]>([]);
  const [loadingNotices, setLoadingNotices] = useState(true);
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoadingNotices(true);
        const response = await fetch("/api/notice/getNotices");
        const data = await response.json();
        if (data.success) {
          setNoticeList(data.notices);
        } else {
          console.error("Failed to fetch notices:", data.message);
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
          setLoadingNotices(false);
      }
    };
    fetchNotices();
  }, []);





  return (

    <main className="
        p-4 min-h-[100vh] flex-col items-start justify-center container max-w-screen-2xl mx-auto
        bg-[#E7EDF1]
        ">

      <div className="w-full flex flex-col items-center justify-center gap-4">



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

                    <div className="flex flex-row gap-2 items-center
                        border-b-2 border-blue-500 pb-2">
                        <Image
                            src="/token-mkc-icon.png"
                            alt="MKC Icon"
                            width={24}
                            height={24}
                        />
                        <Link
                            href={`/${lang}/${chain}/admin-send-token?token=MKC`}
                            className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                        >
                            MKC 출금
                        </Link>
                    </div>

                    <div className="flex flex-row gap-2 items-center
                        border-b-2 border-blue-500 pb-2">
                        <Image
                            src="/token-mkrw-icon.png"
                            alt="MKRW Icon"
                            width={24}
                            height={24}
                        />
                        <Link
                            href={`/${lang}/${chain}/admin-send-token?token=MKRW`}
                            className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                        >
                            MKRW 출금
                        </Link>
                    </div>

                    <div className="flex flex-row gap-2 items-center
                        border-b-2 border-blue-500 pb-2">
                        <Image
                            src="/token-musd-icon.png"
                            alt="MUSD Icon"
                            width={24}
                            height={24}
                        />
                        <Link
                            href={`/${lang}/${chain}/admin-send-token?token=MUSD`}
                            className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                        >
                            MUSD 출금
                        </Link>

                    </div>


        </div>


          {/* [공지] 지갑서비스를 오픈하였습니다. */}
          {/* 안녕하세요 지갑서스를 오픈하였습니다. */}
          {/* 제목 */}
          {/* 본문 */}
          <div className="flex flex-col items-center justify-center
              bg-white p-6 rounded-lg shadow-md
              border border-gray-200
              max-w-2xl w-full">
              <div className="flex items-center justify-center mb-4">
                  <Image
                      src="/icon-notice.png"
                      alt="Notice"
                      width={40}
                      height={40}
                      className="rounded-full w-8 h-8 mr-2"
                  />
                  <span className="text-gray-800 font-bold">
                    [공지] 지갑서비스를 오픈하였습니다.
                  </span>
              </div>
              <p className="text-gray-600 text-sm text-left">
                  안녕하세요 지갑서비스를 오픈하였습니다. 이제부터 지갑서비스를 이용하실 수 있습니다.
                  <br />
                  지갑서비스를 이용하시려면 아래의 절차를 따라주세요.
              </p>
              <p className="text-gray-600 mt-4 text-sm text-left">
                  
                  1. 지갑 생성
                  <br />
                  2. 지갑 주소 확인
                  <br />
                  3. 지갑 주소로 토큰 전송
                  <br />
                  4. 지갑 주소로 토큰 수신
                  <br />
                  5. 지갑 주소로 토큰 잔액 확인
                  <br />
                  6. 지갑 주소로 토큰 전송 기록 확인
              </p>
          </div>


      </div>

    </main>


  );
}


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