'use client';

//import { Session, Chatbox } from "@talkjs/react";


import '@sendbird/uikit-react/dist/index.css';

import {

  useActiveWallet,
  
} from "thirdweb/react";

import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 

import { useSearchParams } from 'next/navigation'

import Image from 'next/image';

import React, { useEffect, useState, Suspense } from 'react';

import Link from "next/link";

import { toast } from 'react-toastify';


import 'react-quill/dist/quill.snow.css';


import dynamic from 'next/dynamic'
import { getNotices } from '@/lib/api/notice';


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



  const QuillWrapper = dynamic(() => import('react-quill'), {
    ssr: false,
    ///loading: () => <p>Loading ...</p>,
  })


      

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





  // setFieldValue for formik
  const [values, setValues] = useState({
    title: "",
    content: "",
  });
  const setFieldValue = (field: string, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  




  // function to update nitice content
  const [updatingNotice, setUpdatingNotice] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeUpdated, setNoticeUpdated] = useState(false);
  const updateNotice = async (objectId: string) => {
    if (!noticeTitle || !noticeContent) {
      toast.error("제목과 내용을 입력해주세요.");
      return;
    }
    if (!objectId) {
      toast.error("공지사항 ID가 필요합니다.");
      return;
    }
    if (!noticeTitle.trim() || !noticeContent.trim()) {
      toast.error("제목과 내용을 입력해주세요.");
      return;
    }
    setUpdatingNotice(true);
    try {
      const response = await fetch("/api/notice/updateNotice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          objectId: objectId,
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
      toast.success("공지사항이 성공적으로 추가되었습니다!");


      // getNotices();
      const noticesResponse = await fetch("/api/notice/getNotices");
      const noticesData = await noticesResponse.json();
      if (noticesData.success) {
        setNoticeList(noticesData.notices);
      }
      else {
        console.error("Failed to fetch notices:", noticesData.message);
      }



    } else {
      console.error("Failed to create notice:", data.message);
      toast.error("공지사항 추가에 실패했습니다.");
      setNoticeCreated(false);
    }
  } catch (error) {
    console.error("Error creating notice:", error);
    toast.error("공지사항 추가 중 오류가 발생했습니다.");
  } finally {
    setCreatingNotice(false);
  }

  setTimeout(() => {
    setNoticeCreated(false);
  }, 3000); // Reset after 3 seconds

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

  // delete notice
  //const [deletingNotice, setDeletingNotice] = useState(false);
  // array deletingNotice
  // array of boolean values for each notice
  const [deletingNotice, setDeletingNotice] = useState(
    [] as boolean[]
  );

  const [noticeDeleted, setNoticeDeleted] = useState(false);

  const deleteNotice = async (objectId: string) => {


    if (!objectId) {
      toast.error("공지사항 ID가 필요합니다.");
      return;
    }
    
    confirm("정말로 이 공지사항을 삭제하시겠습니까?") || toast.error("공지사항 삭제가 취소되었습니다.");


    setDeletingNotice((prev) => [...prev, true]);
    try {
      const response = await fetch("/api/notice/deleteNotice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          objectId: objectId
        }),
      });
      const data = await response.json();
      if (data.success) {
        setNoticeList((prevNotices) =>
          prevNotices.filter((notice) => notice._id !== objectId) // Use _id for filtering
        );
        setNoticeDeleted(true);
        toast.success("공지사항이 성공적으로 삭제되었습니다!");
      } else {
        console.error("Failed to delete notice:", data.message);
        toast.error("공지사항 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
      toast.error("공지사항 삭제 중 오류가 발생했습니다.");
    } finally {
      
      setDeletingNotice((prev) => [...prev, false]);

      setTimeout(() => {
        setNoticeDeleted(false);
      }, 3000); // Reset after 3 seconds
    }
  };





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


        <div className="w-full items-start justify-start mt-10 flex gap-2 mb-4
            border-b-2 border-gray-200 pb-2">
            <Image
                src="/icon-notice.png"
                alt="Notice Icon"
                width={24}
                height={24}
            />
            <h2 className="text-xl font-bold">
                공지사항 관리
            </h2>
        </div>




        <div className="w-full flex flex-row gap-4 items-start justify-between mb-5">

          <div className="w-full flex flex-col items-center justify-center">

            {/* 공지사항 목록 */}
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md
                border border-gray-200 mb-6">
              <h2 className="text-gray-800 font-bold text-lg mb-4">공지사항 목록</h2>
              {loadingNotices ? (
                <p className="text-gray-600">
                  공지사항을 불러오는 중...
                </p>
              ) : noticeList.length === 0 ? (
                <p className="text-gray-600">No notices available.</p>
              ) : (
                <ul className="space-y-4">
                  {noticeList.map((notice) => (
                    <li key={notice._id} className="border-b border-gray-200 pb-4">

                
                      <h3 className="text-gray-800 font-semibold">{notice.title}</h3>
                      <p className="text-gray-600">
                        { // process returnd characters to <br /> tags
                          notice.content.split('\n').map((line: string, index: number) => (
                            <span key={index}>
                              {line}
                              <br />
                            </span>
                          ))
                        } 
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">
                          {new Date(notice.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => deleteNotice(notice._id)}
                          disabled={
                            deletingNotice[notice._id] || false
                          }
                          className={`text-red-500 hover:text-red-700
                              ${deletingNotice[notice._id] ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {deletingNotice[notice._id] ? "삭제중..." : "삭제하기"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>



          {/* 공지사항 추가하기 */}
          <div className="w-full flex flex-col items-center justify-center
              bg-white p-6 rounded-lg shadow-md
              border border-gray-200
              max-w-2xl">
              <h2 className="text-gray-800 font-bold text-lg mb-4">공지사항 추가하기</h2>
              {/* 제목 입력 */}
              <input
                  type="text"
                  placeholder="공지사항 제목"
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              {/* 본문 입력 */}
              {/*
              <QuillWrapper
                  placeholder="공지사항 본문"
                  className="w-full h-64 mb-4"
                  modules={{
                      toolbar: [
                          [{ header: [1, 2, false] }],
                          ['bold', 'italic', 'underline'],
                          ['link', 'image'],
                          [{ list: 'ordered' }, { list: 'bullet' }],
                          ['clean'],
                      ],
                  }}
                  formats={[
                      'header', 'bold', 'italic', 'underline', 'link', 'image',
                      'list', 'bullet', 'clean'
                  ]}
                  theme="snow"
                  ///value={newNoticeContent}
                  //onChange={setNewNoticeContent}

                  value={values.content}
                  onChange={(event) => setFieldValue('content', event)}


              />
              */}

              
              <textarea
                  placeholder="공지사항 본문"
                  value={newNoticeContent}
                  onChange={(e) => setNewNoticeContent(e.target.value)}
                  className="w-full p-2 mb-4 border border-gray-300 rounded h-32"
              />
              


              {/* 버튼 */}
              <div className="mt-4 w-full flex flex-col items-center justify-center">
                <button
                    onClick={
                      createNotice
                    }
                    disabled={creatingNotice}
                    className={`w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600
                        ${creatingNotice ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {creatingNotice ? "Creating..." : "공지사항 추가하기"}
                </button>
                {noticeCreated && (
                    <p className="text-green-500 mt-2">공지사항이 성공적으로 추가되었습니다!</p>
                )}
              </div>
          </div>


        </div>


      </div>

    </main>


  );
}


  export default function Agent({ params }: any) {
    return (
        <Suspense
          
        
          fallback={
            <div
                className="w-full h-screen flex flex-col items-center justify-center
                bg-zinc-100 text-gray-600 font-semibold text-lg"
            >Loading...</div>
        }
        
        
        >
            <AgentPage
                params={params}
            />
            <div className="w-full h-36 bg-[#E7EDF1]"></div>
        </Suspense>
    );
  }