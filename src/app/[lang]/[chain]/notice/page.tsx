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