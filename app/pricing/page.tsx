import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '가격 안내 | 6대 테라피 코스 & 정찰제 금액표',
  description: '타이, 전신아로마, VIP 감성힐링, 스페셜, VIP 통합코스, 한국인 스웨디시 투명 공개 가격표와 100% 현장 후불 결제 안내입니다.',
  keywords: ['쉼표 가격표', '출장마사지 가격', '스웨디시 가격', '홈타이 코스 금액', '현장 후불제'],
  alternates: {
    canonical: 'https://comma26.netlify.apppricing/',
  },
};

interface PriceItem {
  time: string;
  price: string;
}

interface Course {
  index: string;
  name: string;
  badge?: string;
  items: PriceItem[];
}

const COURSES: Course[] = [
  {
    index: '01',
    name: '타이코스',
    items: [
      { time: '60분', price: '60,000원' },
      { time: '90분', price: '80,000원' },
      { time: '120분', price: '100,000원' },
    ],
  },
  {
    index: '02',
    name: '전신아로마',
    items: [
      { time: '60분', price: '70,000원' },
      { time: '90분', price: '90,000원' },
      { time: '120분', price: '110,000원' },
    ],
  },
  {
    index: '03',
    name: 'VIP 감성힐링코스',
    items: [
      { time: '60분', price: '90,000원' },
      { time: '90분', price: '110,000원' },
      { time: '120분', price: '130,000원' },
    ],
  },
  {
    index: '04',
    name: '스페셜코스',
    badge: '★ 추천',
    items: [
      { time: '60분', price: '100,000원' },
      { time: '90분', price: '120,000원' },
      { time: '120분', price: '140,000원' },
    ],
  },
  {
    index: '05',
    name: 'VIP코스',
    badge: '타이&아로마&풋',
    items: [
      { time: '150분', price: '160,000원' },
    ],
  },
  {
    index: '06',
    name: '한국인스웨디시',
    badge: '프리미엄 케어',
    items: [
      { time: '60분', price: '140,000원' },
      { time: '90분', price: '180,000원' },
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="t4-fixed-page">
      {/* 1. 상단 히어로 배너 */}
      <header className="t4-directory-hero">
        <div className="page-width t4-directory-hero-inner">
          <p>REST & PRICE · COMMA</p>
          <h1>6개 코스 투명 공개 금액표</h1>
          <span>타이, 아로마, VIP 감성힐링, 스페셜, 한국인 스웨디시 코스 시간표와 결제 기준을 확인하세요.</span>

          <div className="t4-directory-stats">
            <div><span>코스 구분</span><strong>6개 코스</strong></div>
            <div><span>정산 시점</span><strong>100% 현장 후불</strong></div>
            <div><span>결제 수단</span><strong>현금 / 카드 지원</strong></div>
          </div>
        </div>
      </header>

      <div className="page-width" style={{ padding: '40px 20px 60px' }}>
        {/* 2. 코스별 가격 카드 그리드 */}
        <section className="pricing-section">
          <div className="section-head-flex">
            <div>
              <span className="section-kicker">PRICE TABLE</span>
              <h2 className="section-title">코스 및 시간별 기준 금액</h2>
              <p className="section-subtitle">원하시는 코스의 이용 시간과 표시 금액을 한눈에 확인하실 수 있습니다.</p>
            </div>
            <Link href="/guide" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '6px' }}>
              이용 방법 안내 →
            </Link>
          </div>

          <div className="pricing-course-grid">
            {COURSES.map((course) => (
              <article key={course.index} className="pricing-course-card">
                <header className="pricing-course-head">
                  <div className="pricing-head-left">
                    <span className="pricing-course-index">{course.index}</span>
                    <h3>{course.name}</h3>
                  </div>
                  {course.badge && (
                    <span className="pricing-course-badge">{course.badge}</span>
                  )}
                </header>
                <ul className="pricing-course-list">
                  {course.items.map((item, idx) => (
                    <li key={idx}>
                      <span className="pricing-time"><b>{item.time}</b></span>
                      <strong className="pricing-val">{item.price}</strong>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* 유의사항 알림 박스 */}
          <div className="pricing-notice-box">
            <span className="pricing-notice-icon">⚠️</span>
            <p>
              <strong>안내사항:</strong> 표기된 금액은 표준 권장 기준표이며, <strong>각 제휴 업체 및 지역별 관리사 구성(프로필/국적/경력)에 따라 세부 코스 금액 및 구성이 상이할 수 있습니다.</strong> 정확한 세부 코스는 상담 통화 시 한 번 더 확인해 주시기 바랍니다.
            </p>
          </div>
        </section>

        {/* 3. 정산 및 통화 전 확인 안내 */}
        <section className="notice-bottom-grid" style={{ marginTop: '40px' }}>
          <div className="contact-panel">
            <span className="section-kicker">PAYMENT GUIDE</span>
            <h3>선입금 없는 100% 현장 정산</h3>
            <p>
              쉼표는 예약금이나 선입금을 일체 요구하지 않습니다. 비용은 관리가 진행되는 장소에서 관리사 도착 후 결제하며, 현금 또는 무선 단말기를 통한 카드 결제가 가능합니다.
            </p>
            <div className="contact-btn-row">
              <Link href="/#region-directory" className="btn-primary">
                지역별 제휴점 찾기
              </Link>
              <Link href="/notice" className="btn-secondary">
                공지사항 확인
              </Link>
            </div>
          </div>

          <aside className="step-panel">
            <span className="section-kicker">BEFORE YOU CALL</span>
            <h3>통화 시 확인할 항목</h3>
            <ol className="step-list">
              <li>
                <b>01</b>
                <span>받으실 도로명 주소 및 건물명</span>
              </li>
              <li>
                <b>02</b>
                <span>이용 희망 일자 및 시각</span>
              </li>
              <li>
                <b>03</b>
                <span>이용 인원수 (1인 / 2인 등)</span>
              </li>
              <li>
                <b>04</b>
                <span>선택하신 코스 및 이용 시간</span>
              </li>
            </ol>
          </aside>
        </section>
      </div>
    </main>
  );
}