import { NextResponse, type NextRequest } from "next/server";


/*
		function directLogin(tmnId, payKey) {
		    showLoader(true);
		    clearMessages();

		    fetch(`https://jh.winglobalpay.com/api/auth/login`, {
		        method: 'POST',
		        headers: {
		            'Content-Type': 'application/json',
		            'Authorization': `Bearer ${payKey}`
		        },
		        body: JSON.stringify({ tmnId: tmnId })
		    })
		    .then(response => {
		        if (!response.ok) {
		            throw new Error(`인증 실패: ${response.status}`);
		        }
		        return response.json();
		    })
		    .then(data => {
		        showLoader(false);
		        
		        if (data.token) {
		            jwtToken = data.token;
		            sessionStorage.setItem('jwtToken', jwtToken);
		            
		            // 세션 데이터 생성 (merchant 방식과 동일하게)
		            sessionData = { tmnId: tmnId };
		            
		            updateAuthStatus();
		            showSuccessMessage(`터미널 ${tmnId} 로그인 성공!`);
		        } else {
		            showErrorMessage('토큰을 받지 못했습니다.');
		        }
		    })
		    .catch(error => {
		        showLoader(false);
		        showErrorMessage(`로그인 오류: ${error.message}`);
		    });
		}
*/

// POST

export async function POST(request: NextRequest) {
    const body = await request.json();

    const {
        walletAddress,
        amount,
        toWalletAddress,
    } = body;


    console.log("Request body:", body);



    const tmnId = process.env.WINPAY_TMN_ID;
    const payKey = process.env.WINPAY_PAY_KEY;

    if (!tmnId || !payKey) {
        return NextResponse.json(
        { error: 'Missing tmnId or payKey' },
        { status: 400 }
        );
    }
    
    try {
        
        const response = await fetch(`https://jh.winglobalpay.com/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${payKey}`
            },
            body: JSON.stringify({ tmnId: tmnId })
        });

        const data = await response.json();

        console.log("Login response:", data);

        if (!response.ok) {
            throw new Error(`Login failed: ${data.error || 'Unknown error'}`);
        }
        if (!data.token) {
            throw new Error('Token not received');
        }


        const jwtToken = data.token;
        //sessionStorage.setItem('jwtToken', jwtToken);



        //const requestData = buildKiwoomRequestData();
        /*

        function buildKiwoomRequestData() {
            const timestamp = new Date().getTime();
            const tid = `ORDER_${timestamp}`;
            
            const requestData = {
                tid: tid,
                userId: document.getElementById('userId').value.trim(),
                amt: parseInt(document.getElementById('amt').value, 10),
                tmnId: sessionData.tmnId,
                goodsName: document.getElementById('goodsName').value.trim(),
                productCode: document.getElementById('productCode').value.trim(),
                productType: document.getElementById('productType').value,
                payMethod: document.getElementById('payMethod').value,
                ordNm: document.getElementById('ordNm').value.trim(),
                email: document.getElementById('email').value.trim(),
                returnUrl: `https://discordapp.com/api/webhooks/1390514441380036638/YL10zmKNU9yOjmrjOMsEWiEDeoFmx58ht7UsnzGI7_z1MHnB_8Ux-lqnbsVHwzFfahfA`
            };

            // 결제수단별 추가 파라미터 설정
            const payMethod = requestData.payMethod;
            
            if (payMethod === 'KAKAOPAY') {
                const kakaoPayType = document.getElementById('kakaoPayType').value;
                const kakaoCashReceipt = document.getElementById('kakaoCashReceipt').checked;
                const kakaoFreeAmt = document.getElementById('kakaoFreeAmt').value;

                if (kakaoPayType && kakaoPayType.trim() !== '') {
                    requestData.payType = kakaoPayType;
                }

                requestData.cashReceipt = kakaoCashReceipt ? 1 : 0;

                if (kakaoFreeAmt && parseInt(kakaoFreeAmt) > 0) {
                    requestData.freeAmt = kakaoFreeAmt;
                    requestData.taxFreeCd = '02'; // 복합과세
                } else {
                    requestData.taxFreeCd = '00'; // 과세
                }
            } else if (payMethod === 'NAVERPAY') {
                const naverCashReceiptUse = document.getElementById('naverCashReceiptUse').value;
                const naverCashReceiptInfo = document.getElementById('naverCashReceiptInfo').value.trim();
                const naverFreeAmt = document.getElementById('naverFreeAmt').value;

                requestData.cashReceipt = naverCashReceiptUse === '9' ? 0 : parseInt(naverCashReceiptUse);

                if (naverCashReceiptInfo && (naverCashReceiptUse === '1' || naverCashReceiptUse === '2')) {
                    requestData.cashReceiptInfo = naverCashReceiptInfo;
                }
                
                if (naverFreeAmt && parseInt(naverFreeAmt) > 0) {
                    requestData.freeAmt = naverFreeAmt;
                    requestData.taxFreeCd = '02'; // 복합과세
                } else {
                    requestData.taxFreeCd = '00'; // 과세
                }
            } else if (payMethod === 'MOBILE') {
                const mobileCashReceipt = document.getElementById('mobileCashReceipt').value;
                const mobileCashReceiptInfo = document.getElementById('mobileCashReceiptInfo').value.trim();

                requestData.taxFreeCd = '00'; // 휴대폰 결제는 기본 과세
                requestData.cashReceipt = parseInt(mobileCashReceipt);

                if (mobileCashReceiptInfo && mobileCashReceipt !== '0') {
                    requestData.cashReceiptInfo = mobileCashReceiptInfo;
                }
			} if(payMethod === 'CARD') {
				const taxFreeCd = document.getElementById('taxFreeCd').value;
				const taxFreeAmt = document.getElementById('taxFreeAmt').value;
				
				requestData.taxFreeCd = taxFreeCd;
				    
			    if (taxFreeCd === '02' && taxFreeAmt && parseInt(taxFreeAmt) > 0) {
			        requestData.telNo2 = taxFreeAmt; // 키움페이에서 비과세 금액은 TELNO2 필드 사용
			    }
            } else {
                requestData.taxFreeCd = '00'; // 과세
                requestData.cashReceipt = 0; // 현금영수증 미발행
            }

            return requestData;
        }
        */

        /*
                    const requestData = {
                tid: tid,
                userId: document.getElementById('userId').value.trim(),
                amt: parseInt(document.getElementById('amt').value, 10),
                tmnId: sessionData.tmnId,
                goodsName: document.getElementById('goodsName').value.trim(),
                productCode: document.getElementById('productCode').value.trim(),
                productType: document.getElementById('productType').value,
                payMethod: document.getElementById('payMethod').value,
                ordNm: document.getElementById('ordNm').value.trim(),
                email: document.getElementById('email').value.trim(),
                returnUrl: `https://discordapp.com/api/webhooks/1390514441380036638/YL10zmKNU9yOjmrjOMsEWiEDeoFmx58ht7UsnzGI7_z1MHnB_8Ux-lqnbsVHwzFfahfA`
            };




            fetch(`${CONFIG.SERVER_URL}/api/payment/request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify(requestData)
            })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 403 || response.status === 401) {
                        jwtToken = '';
                        sessionStorage.removeItem('jwtToken');
                        updateAuthStatus();
                        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
                    }
                    return response.text().then(errorText => {
                        throw new Error(`HTTP 오류! 상태: ${response.status}, 메시지: ${errorText}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                showLoader(false);

                if (data.success) {
                    openPaymentWindow(data.paymentUrl, requestData.tid, 'KiwoomPayment');
                } else {
                    showErrorMessage(`결제 요청 실패: ${data.message || '알 수 없는 오류가 발생했습니다.'}`);
                }
            })
            .catch(error => {
                showLoader(false);
                if (error.message.includes('Failed to fetch')) {
                    showErrorMessage('서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
                } else {
                    showErrorMessage(`오류가 발생했습니다: ${error.message}`);
                }
            });



                function buildBankPayRequestData() {
            const timestamp = new Date().getTime();
            const tid = `testMerchant_${timestamp}`;
            
            return {
                payMethod: 'BPAY',
                tid: tid,
                amt: parseInt(document.getElementById('bankpay_amt').value, 10),
                goodsName: document.getElementById('bankpay_goodsName').value.trim(),
                ordNm: document.getElementById('bankpay_ordNm').value.trim(),
                email: document.getElementById('bankpay_email').value.trim(),
                productType: '00',
                cashReceipt: parseInt(document.getElementById('bankpayCashReceipt').value),
                isMandatoryIssuer: document.getElementById('mandatoryIssuer').checked,
                returnUrl: `${CONFIG.SERVER_URL}/payment/bankpay/result.html`
            };
        }


            */

        const requestData = {
            payMethod: 'BPAY',
            tid: `ORDER_${Date.now()}`,
            amt: parseInt(amount, 10),
            goodsName: 'Payment for Damoa Wallet',
            ordNm: 'Damoa Wallet User',
            email: '<user_email@example.com>',
            productType: '00',
            cashReceipt: 0, // No cash receipt
            isMandatoryIssuer: false, // Not mandatory issuer
            returnUrl: `https://discordapp.com/api/webhooks/1390514441380036638/YL10zmKNU9yOjmrjOMsEWiEDeoFmx58ht7UsnzGI7_z1MHnB_8Ux-lqnbsVHwzFfahfA`,
        }


        fetch(`https://jh.winglobalpay.com/api/payment/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify(requestData)
        }).then(response => {
            if (!response.ok) {
                if (response.status === 403 || response.status === 401) {
                    throw new Error('Authentication expired. Please log in again.');
                }
                return response.text().then(errorText => {
                    throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
                });
            }
            return response.json();
        }).then(data => {
            if (data.success) {

                console.log("Payment request successful:", data);


                const paymentUrl = data.paymentUrl;
                console.log("Payment URL:", paymentUrl);
                // Open the payment window
                
                //openPaymentWindow(paymentUrl, requestData.tid, 'KiwoomPayment');

                return NextResponse.json({
                    status: 'success',
                    message: 'Payment request successful',
                    paymentUrl: paymentUrl,
                    tid: requestData.tid,
                });

            } else {
                //
                ///showErrorMessage(`Payment request failed: ${data.message || 'Unknown error occurred.'}`);
                return NextResponse.json({
                    status: 'error',
                    message: `Payment request failed: ${data.message || 'Unknown error occurred.'}`,
                });

            }
        }).catch(error => {
            //showLoader(false);
            if (error.message.includes('Failed to fetch')) {
                //showErrorMessage('Unable to connect to the server. Please check your network connection.');
                return NextResponse.json({
                    status: 'error',
                    message: 'Unable to connect to the server. Please check your network connection.',
                }, { status: 500 });
            } else {
                //showErrorMessage(`An error occurred: ${error.message}`);
                return NextResponse.json({
                    status: 'error',
                    message: `An error occurred: ${error.message}`,
                }, { status: 500 });
            }
        });










        return NextResponse.json({
            status: 'success',
            message: 'Login successful',
            jwtToken: jwtToken,
            tmnId: tmnId,
            walletAddress: walletAddress,
            amount: amount,
            toWalletAddress: toWalletAddress,
        });



    } catch (error) {
        console.error("Login error:", error);
        let errorMessage = 'Unknown error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({
            status: 'error',
            message: `Login error: ${errorMessage}`,
        }, { status: 500 }
        );
    }



}