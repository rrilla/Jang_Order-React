import React, { useState, useRef } from 'react';

const JangBiseo: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('screen-home');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Helper to safely manipulate DOM for the legacy script logic
  const setVal = (id: string, val: string) => {
    const el = document.getElementById(id) as HTMLInputElement;
    if (el) el.value = val;
  };

  const navigateTo = (screenId: string) => {
    setCurrentScreen(screenId);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (currentScreen === 'screen-recording') {
      if (window.confirm('녹음을 취소하시겠습니까?')) {
        if (timerRef.current) clearInterval(timerRef.current);
        navigateTo('screen-home');
      }
    } else if (currentScreen === 'screen-edit') {
      if (window.confirm('작성 중인 내용을 저장하지 않고 홈으로 이동하시겠습니까?')) {
        navigateTo('screen-home');
      }
    } else if (currentScreen.startsWith('screen-preview')) {
      navigateTo('screen-edit');
    } else {
      navigateTo('screen-home');
    }
  };

  const startConsultation = () => {
    navigateTo('screen-recording');
    let sec = 0;
    const timerEl = document.getElementById('timer');
    if (timerEl) timerEl.innerText = "00:00";
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      sec++;
      const min = Math.floor(sec / 60).toString().padStart(2, '0');
      const s = (sec % 60).toString().padStart(2, '0');
      if (document.getElementById('timer')) {
        document.getElementById('timer')!.innerText = `${min}:${s}`;
      }
    }, 1000);
  };

  const stopConsultation = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    navigateTo('screen-loading');
    setTimeout(() => {
      fillDummyData();
      navigateTo('screen-edit');
    }, 2000);
  };

  const loadRecentConsultation = () => {
    fillDummyData();
    navigateTo('screen-edit');
  };

  const fillDummyData = () => {
    const iso = (d: Date, days = 0) => new Date(d.getTime() + (days * 86400000) - (d.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
    const now = new Date();

    setVal('inName', "박순자");
    setVal('inClan', "밀양");
    setVal('inAge', "여 / 82세");
    setVal('inBody', "155cm / 48kg");
    setVal('inCause', "숙환(노환)");
    setVal('inAddr', "서울시 강남구 역삼동 123-45");

    setVal('inMemName', "김장비");
    setVal('inMemPhone', "010-9999-8888");
    setVal('inProduct', "VIP 490 상품");
    setVal('inMemRel', "자녀(사위)");

    setVal('inChief', "이철민");
    setVal('inChiefRel', "자(장남)");
    setVal('inChiefBirth', "1970.05.05");
    setVal('inChiefPhone', "010-1234-5678");

    setVal('inFHall', "서울대병원 장례식장 1호실");
    setVal('inCrematorium', "서울추모공원");
    setVal('inBurial', "용인 평온의 숲");
    setVal('inDateEntry', iso(now, 0));
    setVal('inDateCoffin', iso(now, 1));
    setVal('inDateExit', iso(now, 2));

    setVal('inLeader', "홍길동 팀장");
    setVal('inLeaderPhone', "010-1111-2222");
    setVal('inCasketHelper', "본사 지원 2명");
    setVal('inAltar', "특대형 국화 제단");
    setVal('inHelp1Day', "11"); setVal('inHelp1Count', "2");
    setVal('inHelp2Day', "12"); setVal('inHelp2Count', "3");
    setVal('inCar', "리무진, 대형버스 (왕복)");
    setVal('inShroud', "대마수의 1호");
    setVal('inCoffin', "오동나무관 (화장용 1.5)");
    setVal('inCloth', "남 5벌, 여 6벌");
  };

  const syncData = () => {
    const val = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value || '-';
    const txt = (id: string, v: string) => {
      const el = document.getElementById(id);
      if (el) el.innerText = v;
    };
    const fmt = (iso: string) => iso ? iso.replace('T', ' ').slice(5, 16) : '-';

    txt('rptName', val('inName')); txt('rptClan', val('inClan'));
    txt('rptAge', val('inAge')); txt('rptBody', val('inBody'));
    txt('rptCause', val('inCause')); txt('rptDeathTime', fmt(val('inDateEntry')));
    txt('rptAddr', val('inAddr')); txt('rptAddrChief', val('inAddr'));

    txt('rptMemName', val('inMemName')); txt('rptMemPhone', val('inMemPhone'));
    txt('rptProduct', val('inProduct')); txt('rptMemRel', val('inMemRel'));

    txt('rptChief', val('inChief')); txt('rptChiefRel', val('inChiefRel'));
    txt('rptChiefBirth', val('inChiefBirth')); txt('rptChiefPhone', val('inChiefPhone'));

    txt('rptFHall', val('inFHall')); txt('rptMethod', val('inMethod'));
    txt('rptCrematorium', val('inCrematorium')); txt('rptReligion', val('inReligion'));
    txt('rptBurial', val('inBurial'));
    txt('rptDateEntry', fmt(val('inDateEntry'))); txt('rptDateEntry2', fmt(val('inDateEntry')));
    txt('rptDateCoffin', fmt(val('inDateCoffin'))); txt('rptDateExit', fmt(val('inDateExit')));

    txt('rptLeader', val('inLeader')); txt('rptLeaderPhone', val('inLeaderPhone'));
    txt('rptCasketHelper', val('inCasketHelper')); txt('rptAltar', val('inAltar'));
    txt('rptHelp1D', val('inHelp1Day')); txt('rptHelp1C', val('inHelp1Count'));
    txt('rptHelp2D', val('inHelp2Day')); txt('rptHelp2C', val('inHelp2Count'));
    txt('rptCar', val('inCar')); txt('rptShroud', val('inShroud')); txt('rptCoffin', val('inCoffin')); txt('rptCloth', val('inCloth'));

    txt('rptSignLeader', val('inLeader')); txt('rptSignChief', val('inChief'));

    const now = new Date();
    const dateNowEl = document.getElementById('rptDateNow');
    if (dateNowEl) dateNowEl.innerText = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;

    txt('schName', val('inName')); txt('qtName', val('inName')); txt('qtChief', val('inChief'));
    txt('schDateCoffin', fmt(val('inDateCoffin'))); txt('schDateExit', fmt(val('inDateExit')));
    txt('schBurial', val('inBurial')); txt('qtDate', new Date().toLocaleDateString());
    txt('qtLeader', val('inLeader'));
  };

  const renderQuote = () => {
    const tbody = document.getElementById('quoteTableBody');
    if (!tbody) return;
    
    const formatNum = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const val = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value;

    const items = [
      { cat: '장례용품', name: '수의 (' + (val('inShroud') || '미정') + ')', price: 450000, qty: 1 },
      { cat: '장례용품', name: '관 (' + (val('inCoffin') || '미정') + ')', price: 300000, qty: 1 },
      { cat: '장례용품', name: '입관용품 일체', price: 150000, qty: 1 },
      { cat: '상복', name: '남자 정장 대여', price: 40000, qty: 5 },
      { cat: '상복', name: '여자 개량한복 대여', price: 30000, qty: 6 },
      { cat: '차량', name: '리무진', price: 500000, qty: 1 },
      { cat: '차량', name: '장례버스(왕복)', price: 600000, qty: 1 },
      { cat: '제단', name: val('inAltar') || '기본 제단', price: 900000, qty: 1 },
      { cat: '인력', name: '의전팀장 (3일)', price: 200000, qty: 3 },
      { cat: '인력', name: '입관지도사', price: 300000, qty: 1 },
      { cat: '인력', name: '장례도우미 (합계)', price: 120000, qty: (parseInt(val('inHelp1Count')) || 0) + (parseInt(val('inHelp2Count')) || 0) }
    ];

    let html = '';
    let total = 0;

    items.forEach(item => {
      if (item.qty > 0) {
        const subTotal = item.price * item.qty;
        total += subTotal;
        html += `
          <tr>
              <td class="text-center text-gray-600 border border-stone-300 p-2">${item.cat}</td>
              <td style="text-align: left; padding-left: 10px;" class="border border-stone-300 p-2">${item.name}</td>
              <td style="text-align: right; padding-right: 5px;" class="border border-stone-300 p-2">${formatNum(item.price)}</td>
              <td style="text-align: center;" class="border border-stone-300 p-2">${item.qty}</td>
              <td style="text-align: right; padding-right: 5px; font-weight: 500;" class="border border-stone-300 p-2">${formatNum(subTotal)}</td>
          </tr>
        `;
      }
    });

    if (total === 0) html = '<tr><td colspan="5" class="text-center p-4 text-gray-500">데이터가 없습니다.</td></tr>';

    tbody.innerHTML = html;
    const totalEl = document.getElementById('qtTotal');
    if (totalEl) totalEl.innerText = formatNum(total);
  };

  const goToPreview = (type: string) => {
    syncData();
    if (type === 'report') navigateTo('screen-preview-report');
    else if (type === 'schedule') navigateTo('screen-preview-schedule');
    else if (type === 'quote') { renderQuote(); navigateTo('screen-preview-quote'); }
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-100 min-h-screen">
       <style>{`
        /* [기본 폰트 설정] */
        body { font-family: 'Malgun Gothic', 'Dotum', sans-serif; color: #333; }

        /* [인쇄 설정: 브라우저 인쇄 기능 사용 시 UI 숨김] */
        @media print {
            body * { visibility: hidden; }
            .print-area, .print-area * { visibility: visible; }
            .print-area { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; }
            .no-print { display: none !important; }
            /* 배경색 출력 강제 */
            * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            @page { margin: 10mm; size: A4; }
        }

        /* [공통: 문서 컨테이너 스타일] */
        .report-container {
            width: 100%; max-width: 210mm; margin: 0 auto; background: white; 
            line-height: 1.3; box-sizing: border-box;
        }

        /* [장례상담서 스타일] - 이미지 모사 */
        .report-title {
            text-align: center; font-size: 22pt; font-weight: bold;
            padding-bottom: 15px; margin-bottom: 20px; border-bottom: 3px solid #333;
        }
        /* 섹션 헤더 (짙은 남색 바) */
        .section-header {
            background-color: #3e4a59; color: white;
            padding: 6px 10px; font-weight: bold; font-size: 11pt;
            margin-top: 20px; margin-bottom: 5px;
            display: flex; align-items: center; border: 1px solid #3e4a59;
        }
        .section-header::before { content: '▶'; margin-right: 8px; font-size: 0.8em; }
        
        /* 정보 테이블 (Grid Layout) */
        .info-table {
            width: 100%; border-collapse: collapse; font-size: 10pt; table-layout: fixed;
        }
        .info-table th, .info-table td {
            border: 1px solid #b0b0b0; padding: 7px 5px; vertical-align: middle;
        }
        .info-table th {
            background-color: #f7f7f7; font-weight: bold; text-align: left; 
            padding-left: 10px; color: #444; width: 18%;
        }
        .info-table td {
            background-color: #fff; padding-left: 10px; word-break: keep-all;
        }

        /* 서명란 스타일 */
        .signature-section {
            margin-top: 40px; border-top: 2px solid #333; padding-top: 20px; font-size: 10pt;
        }
        .sign-line { border-bottom: 1px solid #333; display: inline-block; width: 100px; text-align: center; }

        /* [장례일정표 스타일] - 큰 글씨 */
        .schedule-box { 
            border: 5px double black; padding: 20px; font-family: "Gungsuh", serif; text-align: center; 
        }

        /* [장례견적서 스타일] - 모바일 최적화 */
        .quote-table {
            width: 100%; min-width: 500px; /* 최소 너비 지정하여 찌그러짐 방지 */
            border-collapse: collapse; font-size: 10pt;
        }
        .quote-table th, .quote-table td {
            border: 1px solid #b0b0b0; padding: 8px 4px; vertical-align: middle;
        }
        .quote-table th {
            background-color: #f5f5f5; color: #333; font-weight: bold; text-align: center;
        }
        /* 모바일 가로 스크롤 래퍼 */
        .table-responsive {
            width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;
            margin-bottom: 15px; border: 1px solid #ddd;
        }

        /* [UI 요소 스타일] */
        .loader {
            border: 4px solid #f3f3f3; border-top: 4px solid #3498db;
            border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        .input-group-label { font-size: 0.75rem; color: #6b7280; margin-bottom: 0.25rem; display: block; }
        .input-underline { 
            width: 100%; border-bottom: 1px solid #d1d5db; padding: 4px 0; outline: none; 
            font-size: 0.95rem; background: transparent; border-radius: 0;
        }
        .input-underline:focus { border-color: #3b82f6; }
      `}</style>

      {/* Header */}
      <header className="bg-gray-900 text-white p-4 sticky top-0 z-50 shadow-md flex items-center justify-between no-print">
        <div className="flex items-center">
          {/* 뒤로가기 버튼 */}
          <button 
            id="btn-back" 
            onClick={handleBack}
            className={`mr-4 text-xl hover:text-gray-300 p-2 ${currentScreen === 'screen-home' ? 'hidden' : ''}`}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <h1 className="text-xl font-bold"><i className="fas fa-user-tie mr-2"></i>장비서</h1>
        </div>
        <span className="text-xs bg-gray-700 px-2 py-1 rounded">MVP Final</span>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto min-h-screen bg-white shadow-lg relative pb-24">
        
        {/* SCREEN 1: 홈 화면 */}
        <div id="screen-home" className={`screen p-6 flex flex-col items-center justify-center h-[80vh] ${currentScreen !== 'screen-home' ? 'hidden' : ''}`}>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">상담 시작하기</h2>
            <p className="text-gray-500">버튼을 누르고 상담을 진행하세요.<br/>AI가 자동으로 문서를 작성합니다.</p>
          </div>
          <button onClick={startConsultation} className="w-40 h-40 bg-red-500 rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-transform animate-pulse">
            <i className="fas fa-microphone text-white text-5xl"></i>
          </button>
          
          <div className="w-full mt-12 border-t pt-6">
            <h3 className="text-sm font-bold text-gray-400 mb-3">최근 상담 이력</h3>
            <div onClick={loadRecentConsultation} className="bg-white p-4 rounded border border-gray-200 shadow-sm flex justify-between items-center cursor-pointer hover:bg-blue-50 transition">
              <div>
                <div className="font-bold text-lg">故 박순자 님</div>
                <div className="text-xs text-gray-500">2025.12.11 | 상주 이철민</div>
              </div>
              <div className="flex items-center text-blue-600 font-bold text-sm">
                <span>불러오기</span> <i className="fas fa-chevron-right ml-2"></i>
              </div>
            </div>
          </div>
        </div>

        {/* SCREEN 2: 녹음 중 */}
        <div id="screen-recording" className={`screen h-[80vh] flex flex-col items-center justify-center p-6 relative ${currentScreen !== 'screen-recording' ? 'hidden' : ''}`}>
          <span className="absolute top-10 px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold animate-pulse">● Recording...</span>
          <div className="text-center my-10">
            <div className="text-6xl font-mono font-bold text-gray-800 mb-4" id="timer">00:00</div>
            <p className="text-gray-500 mb-6">상담 내용을 듣고 있습니다...</p>
            {/* 파형 애니메이션 */}
            <div className="flex justify-center items-end h-12 space-x-1">
              <div className="w-1.5 bg-gray-400 h-4 animate-bounce"></div>
              <div className="w-1.5 bg-gray-400 h-8 animate-bounce delay-75"></div>
              <div className="w-1.5 bg-gray-400 h-12 animate-bounce delay-100"></div>
              <div className="w-1.5 bg-gray-400 h-6 animate-bounce delay-150"></div>
              <div className="w-1.5 bg-gray-400 h-10 animate-bounce delay-200"></div>
            </div>
          </div>
          <button onClick={stopConsultation} className="w-full bg-gray-900 text-white py-4 rounded-xl text-lg font-bold shadow-lg mt-auto hover:bg-black">
            <i className="fas fa-stop mr-2"></i>상담 종료 및 분석
          </button>
        </div>

        {/* SCREEN 3: 로딩 */}
        <div id="screen-loading" className={`screen h-[80vh] flex flex-col items-center justify-center p-6 ${currentScreen !== 'screen-loading' ? 'hidden' : ''}`}>
          <div className="loader mb-6"></div>
          <h3 className="text-xl font-bold">데이터 분석 중...</h3>
          <p className="text-gray-500 mt-2 text-center text-sm">음성을 텍스트로 변환하고<br/>상담서 양식에 맞춰 정리합니다.</p>
        </div>

        {/* SCREEN 4: 데이터 입력 및 수정 (Edit) */}
        <div id="screen-edit" className={`screen bg-gray-50 min-h-full ${currentScreen !== 'screen-edit' ? 'hidden' : ''}`}>
          <div className="bg-yellow-100 p-3 text-sm text-yellow-800 text-center sticky top-0 z-10 border-b border-yellow-200 shadow-sm">
            <i className="fas fa-check-circle mr-1"></i> 분석 완료. 내용을 확인하고 수정하세요.
          </div>

          <div className="p-4 space-y-5">
            {/* 1. 고인 정보 */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg mb-4 border-b pb-2 text-gray-700">1. 고인 정보</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="input-group-label">성함</label><input type="text" id="inName" className="input-underline" /></div>
                <div><label className="input-group-label">본관</label><input type="text" id="inClan" className="input-underline" placeholder="예: 김해" /></div>
                <div><label className="input-group-label">나이/성별</label><input type="text" id="inAge" className="input-underline" /></div>
                <div><label className="input-group-label">신장/체중</label><input type="text" id="inBody" className="input-underline" placeholder="170cm / 65kg" /></div>
                <div className="col-span-2"><label className="input-group-label">사망원인</label><input type="text" id="inCause" className="input-underline" placeholder="노환" /></div>
                <div className="col-span-2"><label className="input-group-label">주소</label><input type="text" id="inAddr" className="input-underline" /></div>
              </div>
            </div>

            {/* 2. 회원 정보 */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg mb-4 border-b pb-2 text-indigo-700">2. 회원 정보</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="input-group-label">회원명</label><input type="text" id="inMemName" className="input-underline" /></div>
                <div><label className="input-group-label">연락처</label><input type="tel" id="inMemPhone" className="input-underline" /></div>
                <div><label className="input-group-label">상품명</label><input type="text" id="inProduct" className="input-underline" /></div>
                <div><label className="input-group-label">상주 관계</label><input type="text" id="inMemRel" className="input-underline" /></div>
              </div>
            </div>

            {/* 3. 상주 정보 */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg mb-4 border-b pb-2 text-gray-700">3. 상주 정보</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="input-group-label">대표상주</label><input type="text" id="inChief" className="input-underline" /></div>
                <div><label className="input-group-label">고인관계</label><input type="text" id="inChiefRel" className="input-underline" /></div>
                <div><label className="input-group-label">연락처</label><input type="tel" id="inChiefPhone" className="input-underline" /></div>
                <div><label className="input-group-label">생년월일</label><input type="text" id="inChiefBirth" className="input-underline" /></div>
              </div>
            </div>

            {/* 4. 장례 절차 */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg mb-4 border-b pb-2 text-blue-700">4. 장례 절차</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2"><label className="input-group-label">장례식장</label><input type="text" id="inFHall" className="input-underline" /></div>
                <div><label className="input-group-label">방법</label><input type="text" id="inMethod" className="input-underline" defaultValue="화장" /></div>
                <div><label className="input-group-label">종교</label><input type="text" id="inReligion" className="input-underline" defaultValue="기독교" /></div>
                <div className="col-span-2"><label className="input-group-label">화장시설</label><input type="text" id="inCrematorium" className="input-underline" /></div>
                <div className="col-span-2"><label className="input-group-label">장지</label><input type="text" id="inBurial" className="input-underline" /></div>
              </div>
              <div className="space-y-3 border-t pt-3">
                <div><label className="input-group-label">안치일시</label><input type="datetime-local" id="inDateEntry" className="w-full border rounded p-1 text-sm bg-gray-50" /></div>
                <div><label className="input-group-label">입관일시</label><input type="datetime-local" id="inDateCoffin" className="w-full border rounded p-1 text-sm bg-gray-50" /></div>
                <div><label className="input-group-label">발인일시</label><input type="datetime-local" id="inDateExit" className="w-full border rounded p-1 text-sm bg-gray-50" /></div>
              </div>
            </div>

            {/* 5. 행사 및 인력 정보 */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg mb-4 border-b pb-2 text-green-700">5. 행사 및 인력 정보</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div><label className="input-group-label">의전팀장</label><input type="text" id="inLeader" className="input-underline" /></div>
                <div><label className="input-group-label">연락처</label><input type="tel" id="inLeaderPhone" className="input-underline" /></div>
                <div className="col-span-2"><label className="input-group-label">입관보조</label><input type="text" id="inCasketHelper" className="input-underline" /></div>
                <div className="col-span-2"><label className="input-group-label">제단장식</label><input type="text" id="inAltar" className="input-underline" /></div>
              </div>

              <div className="mb-4 bg-gray-50 p-3 rounded">
                <label className="font-bold text-sm block mb-2">관리사 (도우미)</label>
                <div className="flex items-center gap-2 mb-2 text-sm">
                  <span className="w-10 font-bold">1일차</span>
                  <input type="text" id="inHelp1Day" className="w-10 text-center border rounded" placeholder="일" />일
                  <input type="number" id="inHelp1Count" className="w-14 text-center border rounded" placeholder="명" />명
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-10 font-bold">2일차</span>
                  <input type="text" id="inHelp2Day" className="w-10 text-center border rounded" placeholder="일" />일
                  <input type="number" id="inHelp2Count" className="w-14 text-center border rounded" placeholder="명" />명
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-bold text-sm block border-b pb-1">차량 / 용품 / 상복</label>
                <div><label className="input-group-label">장의차량</label><input type="text" id="inCar" className="input-underline" placeholder="예: 리무진, 버스" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="input-group-label">수의</label><input type="text" id="inShroud" className="input-underline" /></div>
                  <div><label className="input-group-label">관</label><input type="text" id="inCoffin" className="input-underline" /></div>
                </div>
                <div><label className="input-group-label">상복 (수량 및 품목)</label><input type="text" id="inCloth" className="input-underline" placeholder="예: 남 5, 여 6" /></div>
              </div>
            </div>

            {/* 하단 액션 버튼 그룹 */}
            <div className="grid grid-cols-3 gap-2 mt-6">
              <button onClick={() => goToPreview('report')} className="bg-gray-800 text-white py-4 rounded-lg text-sm font-bold shadow hover:bg-black flex flex-col items-center">
                <i className="fas fa-file-contract text-xl mb-1"></i>상담서
              </button>
              <button onClick={() => goToPreview('schedule')} className="bg-white border border-gray-300 py-4 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 flex flex-col items-center">
                <i className="fas fa-calendar-alt text-xl mb-1 text-red-600"></i>일정표
              </button>
              <button onClick={() => goToPreview('quote')} className="bg-blue-600 text-white py-4 rounded-lg text-sm font-bold shadow hover:bg-blue-700 flex flex-col items-center">
                <i className="fas fa-calculator text-xl mb-1"></i>견적서
              </button>
            </div>

            {/* 온라인 부고장 버튼 */}
            <button onClick={() => alert('📢 [MVP 알림]\n\n상주님 카카오톡으로\n모바일 부고장 작성 링크가 전송되었습니다.')} className="w-full mt-3 bg-yellow-400 text-yellow-900 py-3 rounded-lg font-bold shadow hover:bg-yellow-500">
              <i className="fas fa-comment-dots mr-2"></i>온라인 부고장 전송
            </button>
          </div>
        </div>

        {/* SCREEN 5: 장례상담서 미리보기 (Report) */}
        <div id="screen-preview-report" className={`screen bg-gray-200 min-h-full p-4 print-area ${currentScreen !== 'screen-preview-report' ? 'hidden' : ''}`}>
          <div className="report-container shadow-lg p-6 md:p-10 min-h-[1100px]">

            {/* 타이틀 */}
            <h1 className="report-title">상 조 장 례 상 담 서</h1>

            {/* 1. 고인 정보 */}
            <div className="section-header">고인 정보</div>
            <table className="info-table">
              <tbody>
                <tr>
                  <th>성 함</th>
                  <td><span id="rptName"></span></td>
                  <th>본 관</th>
                  <td><span id="rptClan"></span></td>
                </tr>
                <tr>
                  <th>성 별</th>
                  <td><span id="rptAge"></span></td>
                  <th>신장 / 체중</th>
                  <td><span id="rptBody"></span></td>
                </tr>
                <tr>
                  <th>사망원인</th>
                  <td><span id="rptCause"></span></td>
                  <th>사망일시</th>
                  <td><span id="rptDeathTime"></span></td>
                </tr>
                <tr>
                  <th>주 소</th>
                  <td colSpan={3}><span id="rptAddr"></span></td>
                </tr>
              </tbody>
            </table>

            {/* 2. 회원 정보 */}
            <div className="section-header">회원 정보</div>
            <table className="info-table">
              <tbody>
                <tr>
                  <th>회 원 명</th>
                  <td><span id="rptMemName"></span></td>
                  <th>연 락 처</th>
                  <td><span id="rptMemPhone"></span></td>
                </tr>
                <tr>
                  <th>상 품 명</th>
                  <td><span id="rptProduct"></span></td>
                  <th>상주 관계</th>
                  <td><span id="rptMemRel"></span></td>
                </tr>
              </tbody>
            </table>

            {/* 3. 상주 정보 */}
            <div className="section-header">상주 정보</div>
            <table className="info-table">
              <tbody>
                <tr>
                  <th>성 함</th>
                  <td><span id="rptChief"></span></td>
                  <th>고인과 관계</th>
                  <td><span id="rptChiefRel"></span></td>
                </tr>
                <tr>
                  <th>생년월일</th>
                  <td><span id="rptChiefBirth"></span></td>
                  <th>연 락 처</th>
                  <td><span id="rptChiefPhone"></span></td>
                </tr>
                <tr>
                  <th>주 소</th>
                  <td colSpan={3}><span id="rptAddrChief"></span></td>
                </tr>
              </tbody>
            </table>

            {/* 4. 장례 절차 */}
            <div className="section-header">장례 절차</div>
            <table className="info-table">
              <tbody>
                <tr>
                  <th>장례식장</th>
                  <td colSpan={3}><span id="rptFHall"></span></td>
                </tr>
                <tr>
                  <th>장례방법</th>
                  <td><span id="rptMethod"></span></td>
                  <th>화장시설</th>
                  <td><span id="rptCrematorium"></span></td>
                </tr>
                <tr>
                  <th>종 교</th>
                  <td><span id="rptReligion"></span></td>
                  <th>이송절차</th>
                  <td>자사 앰뷸런스 이용</td>
                </tr>
                <tr>
                  <th>장지시설</th>
                  <td><span id="rptBurial"></span></td>
                  <th>구비서류</th>
                  <td>사망진단서, 등본</td>
                </tr>
                <tr>
                  <th>안치일시</th>
                  <td><span id="rptDateEntry"></span></td>
                  <th>입관일시</th>
                  <td><span id="rptDateCoffin"></span></td>
                </tr>
                <tr>
                  <th>입실일시</th>
                  <td><span id="rptDateEntry2"></span></td>
                  <th>발인일시</th>
                  <td><span id="rptDateExit"></span></td>
                </tr>
              </tbody>
            </table>

            {/* 5. 행사 정보 */}
            <div className="section-header">행사 정보</div>
            <table className="info-table">
              <tbody>
                <tr>
                  <th>의전팀장</th>
                  <td><span id="rptLeader"></span></td>
                  <th>연 락 처</th>
                  <td><span id="rptLeaderPhone"></span></td>
                </tr>
                <tr>
                  <th>입관보조</th>
                  <td><span id="rptCasketHelper"></span></td>
                  <th>제단장식</th>
                  <td><span id="rptAltar"></span></td>
                </tr>
                <tr>
                  <th>관 리 사</th>
                  <td colSpan={3} style={{ padding: '10px' }}>
                    • 1일차 (<span id="rptHelp1D"></span>일): <span id="rptHelp1C"></span> 명 &nbsp;/&nbsp;
                    • 2일차 (<span id="rptHelp2D"></span>일): <span id="rptHelp2C"></span> 명
                  </td>
                </tr>
                <tr>
                  <th>장의차량</th>
                  <td colSpan={3}><span id="rptCar"></span></td>
                </tr>
                <tr>
                  <th>수 의</th>
                  <td><span id="rptShroud"></span></td>
                  <th>관</th>
                  <td><span id="rptCoffin"></span></td>
                </tr>
                <tr>
                  <th>횡 대</th>
                  <td>-</td>
                  <th>봉 안 함</th>
                  <td>-</td>
                </tr>
                <tr>
                  <th>상 복</th>
                  <td colSpan={3}><span id="rptCloth"></span></td>
                </tr>
              </tbody>
            </table>

            {/* 서명란 */}
            <div className="signature-section">
              <p style={{ marginBottom: '30px' }}>
                담당 장례지도사 <span className="sign-line" id="rptSignLeader"></span> 으로부터 장례절차 및 내용에 대한 설명을 듣고 장례진행에 동의합니다.
              </p>
              <div className="flex justify-between items-end mt-4">
                <div>
                  <span id="rptDateNow"></span>
                </div>
                <div>
                  유족대표 : <span className="sign-line" id="rptSignChief" style={{ textAlign: 'left', paddingLeft: '10px' }}></span> (인/서명)
                </div>
              </div>
            </div>
          </div>

          {/* 하단 고정 버튼 */}
          <div className="fixed bottom-0 left-0 w-full bg-white border-t p-3 flex gap-2 no-print z-50 max-w-md mx-auto right-0">
            <button onClick={() => window.print()} className="flex-1 bg-gray-900 text-white py-3 rounded font-bold shadow-lg hover:bg-black transition">
              <i className="fas fa-print mr-2"></i>출력
            </button>
            <button onClick={() => alert('이미지로 저장되었습니다.')} className="flex-1 bg-blue-600 text-white py-3 rounded font-bold shadow-lg hover:bg-blue-700 transition">
              <i className="fas fa-share-alt mr-2"></i>공유
            </button>
          </div>
          <div className="h-10"></div>
        </div>

        {/* SCREEN 6: 장례일정표 (Schedule) */}
        <div id="screen-preview-schedule" className={`screen bg-gray-200 min-h-full p-4 print-area ${currentScreen !== 'screen-preview-schedule' ? 'hidden' : ''}`}>
          <div className="bg-white shadow-xl min-h-[600px] p-6 rounded-sm schedule-box flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-14 border-b-2 border-black pb-6">장 례 일 정</h1>
            <div className="space-y-8 text-xl md:text-3xl text-left pl-4">
              <p className="flex items-center">
                <strong className="w-32 inline-block text-gray-600">고 인</strong>
                <span id="schName" className="font-bold text-2xl md:text-4xl"></span>
              </p>
              <p className="flex items-center">
                <strong className="w-32 inline-block text-blue-800">입 관</strong>
                <span id="schDateCoffin" className="font-bold"></span>
              </p>
              <p className="flex items-center">
                <strong className="w-32 inline-block text-red-800">발 인</strong>
                <span id="schDateExit" className="font-bold"></span>
              </p>
              <p className="flex items-center">
                <strong className="w-32 inline-block text-gray-600">장 지</strong>
                <span id="schBurial"></span>
              </p>
            </div>
            <div className="mt-16 text-gray-500 text-lg">유족분들의 슬픔을 함께 나눕니다.</div>
          </div>

          <div className="fixed bottom-0 left-0 w-full bg-white border-t p-3 flex gap-2 no-print z-50 max-w-md mx-auto right-0">
            <button onClick={() => window.print()} className="flex-1 bg-gray-900 text-white py-3 rounded font-bold">출력</button>
          </div>
          <div className="h-10"></div>
        </div>

        {/* SCREEN 7: 장례견적서 (Quote - Mobile Responsive) */}
        <div id="screen-preview-quote" className={`screen bg-gray-200 min-h-full p-4 print-area ${currentScreen !== 'screen-preview-quote' ? 'hidden' : ''}`}>
          <div className="report-container shadow-lg p-6 md:p-10 min-h-[900px]">

            <h1 className="report-title">장 례 예 상 견 적 서</h1>
            <div className="text-right text-sm mb-4 text-gray-600">
              발행일: <span id="qtDate" className="font-bold"></span>
            </div>

            {/* 1. 기본 정보 */}
            <div className="section-header">기본 정보</div>
            <table className="info-table mb-6">
              <tbody>
                <tr>
                  <th style={{ width: '25%' }}>고객명(상주)</th>
                  <td style={{ width: '25%', textAlign: 'center' }}><span id="qtChief"></span></td>
                  <th style={{ width: '25%' }}>대상자(고인)</th>
                  <td style={{ width: '25%', textAlign: 'center' }}><span id="qtName"></span></td>
                </tr>
              </tbody>
            </table>

            {/* 2. 견적 상세 */}
            <div className="section-header">
              <span>견적 상세 내역</span>
              <span className="text-xs font-normal ml-auto text-gray-200 block md:hidden">* 좌우로 스크롤하여 확인</span>
            </div>

            {/* 모바일 가로 스크롤 영역 */}
            <div className="table-responsive">
              <table className="quote-table">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th style={{ width: '15%' }}>구분</th>
                    <th style={{ width: '35%' }}>품목 / 상세</th>
                    <th style={{ width: '15%' }}>단가</th>
                    <th style={{ width: '10%' }}>수량</th>
                    <th style={{ width: '20%' }}>합계</th>
                  </tr>
                </thead>
                <tbody id="quoteTableBody">
                  {/* JS Generated */}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100">
                    <td colSpan={4} className="text-right font-bold p-3" style={{ fontSize: '1.1rem' }}>총 예상 금액</td>
                    <td className="text-right font-bold p-3 text-red-600" style={{ fontSize: '1.1rem', backgroundColor: '#fff4f4' }}>
                      <span id="qtTotal">0</span> 원
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-8 p-4 bg-gray-50 border rounded text-xs text-gray-500 leading-relaxed text-center">
              <p className="mb-2 font-bold text-gray-700">※ 안내 사항</p>
              1. 위 견적은 상담 내용을 바탕으로 산출된 <strong>예상 견적</strong>입니다.<br />
              2. 실제 장례 진행 시 품목 변경, 수량 증감, 음식 접대비, 매점 사용료 등에 따라 최종 금액은 달라질 수 있습니다.<br />
              3. 장례식장 시설 사용료(빈소, 안치실 등)는 포함되지 않았습니다.
            </div>

            <div className="signature-section" style={{ marginTop: '40px', border: 'none' }}>
              <div className="text-right font-bold text-sm">
                (주)장비서 의전본부 / 담당자 : <span id="qtLeader"></span> (인)
              </div>
            </div>

          </div>

          <div className="fixed bottom-0 left-0 w-full bg-white border-t p-3 flex gap-2 no-print z-50 max-w-md mx-auto right-0">
            <button onClick={() => window.print()} className="flex-1 bg-gray-900 text-white py-3 rounded font-bold">출력</button>
          </div>
          <div className="h-10"></div>
        </div>

      </main>
    </div>
  );
};

export default JangBiseo;