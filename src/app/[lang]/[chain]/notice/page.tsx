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

// /chat?tradeId=
// get parameter from url

/*
export default function ChatPage(
*/

export default function ChatPage() {


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPageContent />
    </Suspense>
  );
}


function ChatPageContent() {
  
  const searchParams = useSearchParams()
 
  const channel = searchParams.get('channel')
 

  console.log("ChatPageContent channel", channel);







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

    <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-start mx-auto">


      <div className="w-full flex flex-col items-center justify-center gap-4">
          {/* go back button */}
          <div className="w-full flex justify-start items-center gap-2">
              <button
                  onClick={() => window.history.back()}
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
                  돌아가기
              </span>
          </div>



          {/* nitice list */}
          <div className="w-full flex flex-col items-start justify-start gap-4">
              <div className="flex items-center justify-center gap-2">
                  <Image
                      src="/icon-notice.png"
                      alt="Notice"
                      width={24}
                      height={24}
                      className="rounded-full"
                  />
                  <h2 className="text-lg font-semibold">공지사항</h2>
              </div>

              <div className="w-full flex flex-col items-start justify-start gap-2">
                  {loadingNotices ? (
                      <div className="w-full flex items-center justify-center">
                          <span className="text-sm text-gray-500">
                              공지사항을 불러오는 중...
                          </span>
                      </div>
                  ) : (
                      noticeList.map((notice) => (
                          <div key={notice.id} className="w-full flex flex-col items-start justify-start gap-2
                              p-4 border rounded-lg shadow-sm bg-white">

                              <h3 className="text-md font-semibold">{notice.title}</h3>
                              <p className="text-sm text-gray-500">
                                { // process returnd characters to <br /> tags
                                  notice.content.split('\n').map((line: string, index: number) => (
                                    <span key={index}>
                                      {line}
                                      <br />
                                    </span>
                                  ))
                                } 
                              </p>
                              <span className="text-xs text-gray-400">
                                  {new Date(notice.createdAt).toLocaleDateString()}
                              </span>
                          </div>
                      ))
                  )}
              </div>
          </div>


      </div>




    </main>


  );
}