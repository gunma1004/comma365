import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '공지사항 | 24시간 접수 및 현장 후불 결제 기준 안내',
  description: '쉼표의 상담 접수 시간, 통화 확인 항목, 예약금/선입금 없는 100% 현장 후불제 및 카드 결제 안내입니다.',
  keywords: ['쉼표 공지사항', '마사지 이용안내', '후불 정산', '현장 카드결제', '스웨디시 안내'],
  alternates: {
    canonical: 'https://comma.netlify.app/notice/',
  },
};

const NOTICE_ITEMS = [
  {
    num: '01',
    title: '전화 및 실시간 상담 시간',
    desc: '365일 24시간 연중무휴로 실시간 코스 및 일정 안내를 진행합니다.',
  },
  {
    num: '02',
    title: '통화 시 확인하는 항목',
    desc: '받으실 도로명 주소(건물명), 희망 시각, 인원수, 원하시는 코스를 확인합니다.',
  },
  {
    num: '03',
    title: '사전 송금(선입금) 없는 100% 후불제',
    desc: '어떠한 경우에도 예약금이나 사전 입금을 요구하지 않으며, 관리사 도착 후 결제합니다.',
  },
  {
    num: '04',
    title: '현장 결제 방식 (현금 / 무선 카드)',
    desc: '현금 결제는 물론 현장용 무선 카드 단말기를 통한 간편 카드 결제를 지원합니다.',
  },
];

const ORDER_STEPS = [
  { step: '01', title: '받을 곳 주소 확인' },
  { step: '02', title: '원하는 코스 및 시간 전달' },
  { step: '03', title: '예약 스케줄 대조' },
  { step: '04', title: '도착 후 현장 결제' },
];

export default function NoticePage() {
  return (
    <main className="t4-fixed-page">
      {/* 1. 상단 공지 히어로 배너 */}
      <header className="t4-directory-hero">
        <div className="page-width t4-directory-hero-inner">
          <p>REST & NOTICE · COMMA</p>
          <h1>전화 접수 및 정산 상시 기준표</h1>
          <span>접수 시간, 확인 사항, 선입금 없는 후불 원칙 및 결제 수단을 투명하게 안내합니다.</span>

          <div className="t4-directory-stats">
            <div><span>상담 창구</span><strong>24시 연중무휴</strong></div>
            <div><span>정산 원칙</span><strong>100% 현장 후불</strong></div>
            <div><span>결제 수단</span><strong>현금 / 카드 지원</strong></div>
          </div>
        </div>
      </header>

      <div className="page-width" style={{ padding: '40px 20px 60px' }}>
        {/* 2. 상시 공지 4개 카드 그리드 */}
        <section className="notice-section">
          <header className="section-head">
            <div>
              <span className="section-kicker">COMMA NOTICE</span>
              <h2>상시 공지 핵심 4개 항목</h2>
              <p style={{ color: '#666', fontSize: '14px', marginTop: '4px' }}>
                쉼표의 모든 제휴점 및 방문 서비스에 공통으로 적용되는 기본 운영 원칙입니다.
              </p>
            </div>
          </header>

          <div className="notice-grid">
            {NOTICE_ITEMS.map((item) => (
              <article key={item.num} className="notice-card">
                <span className="notice-number">{item.num}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 3. 진행 순서 및 안내 패널 */}
        <div className="notice-bottom-grid">
          {/* 진행 순서 (좌측) */}
          <aside className="step-panel">
            <span className="section-kicker">STEP GUIDE</span>
            <h3>이용 진행 순서</h3>
            <ol className="step-list">
              {ORDER_STEPS.map((s) => (
                <li key={s.step}>
                  <b>{s.step}</b>
                  <span>{s.title}</span>
                </li>
              ))}
            </ol>
          </aside>

          {/* 실시간 접수 안내 패널 (우측) */}
          <div className="contact-panel">
            <span className="section-kicker">24H CONSULTATION</span>
            <h3>주소지를 기준으로 일정을 빠르게 확인합니다</h3>
            <p>
              이용하실 위치(자택, 호텔, 오피스텔 등)의 상세 주소와 희망 시각, 인원, 코스를 전달해 주시면 신속하게 배차 일정을 확인해 드립니다.
            </p>
            <div className="contact-btn-row">
              <Link href="/#regions" className="btn-primary">
                지역별 제휴점 찾기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}