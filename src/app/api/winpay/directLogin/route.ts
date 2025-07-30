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

// GET

export async function GET(request: NextRequest) {


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

        if (!response.ok) {
            throw new Error(`Login failed: ${data.error || 'Unknown error'}`);
        }
        if (!data.token) {
            throw new Error('Token not received');
        }
        return NextResponse.json({
            message: 'Login successful',
            token: data.token,
            tmnId,
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
        { error: 'Login failed' },
        { status: 500 }
        );
    }



}