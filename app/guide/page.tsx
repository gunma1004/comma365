import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '이용 안내 | 쉼표 4단계 간편 예약 & 힐링 가이드',
  description: '주소 확인부터 실시간 상담, 도착 후 100% 현장 결제까지 쉼표 마사지 & 테라피 이용 방법을 상세히 안내합니다.',
  keywords: ['쉼표 이용안내', '출장마사지 이용방법', '홈타이 예약방법', '스웨디시 이용방법', '현장결제'],
  alternates: {
    canonical: 'https://comma.netlify.app/guide/',
  },
};

const STEP_DETAILS = [
  {
    step: 'STEP 01',
    title: '이용 주소 및 위치 확인',
    subtitle: '계신 곳의 상세 주소 파악',
    desc: '자택, 호텔, 모텔, 오피스텔 등 관리를 희망하시는 장소의 정확한 도로명 주소 또는 건물명을 확인합니다.',
    badge: '정확한 주소 확인',
  },
  {
    step: 'STEP 02',
    title: '코스 선택 및 실시간 상담',
    subtitle: '맞춤형 테라피 조율',
    desc: '타이, 아로마, 스웨디시, 로미로미 중 원하시는 코스와 이용 시간(60분/90분/120분) 및 방문 희망 시각을 조율합니다.',
    badge: '24시간 1:1 맞춤 상담',
  },
  {
    step: 'STEP 03',
    title: '전문 관리사 배차 및 방문',
    subtitle: '신속한 30분 내 도착',
    desc: '예약 확정 즉시 가장 가까운 전문 힐링 테라피스트가 배정되어 계신 곳으로 20~30분 내에 신속히 출발합니다.',
    badge: '안심 도착 시스템',
  },
  {
    step: 'STEP 04',
    title: '100% 현장 후불 결제',
    subtitle: '선입금 일체 없는 안전한 결제',
    desc: '관리사 도착 후 직접 확인하신 뒤 결제를 진행합니다. 현금 및 무선 카드 단말기를 통한 카드 결제가 모두 가능합니다.',
    badge: '100% 현장 후불제',
  },
];

const FAQ_LIST = [
  {
    q: '선입금이나 예약금이 정말 없나요?',
    a: '네, 쉼표의 모든 제휴점은 어떠한 명목으로도 예약금, 보증금, 유류비 등의 선입금을 요구하지 않습니다. 100% 현장 도착 후 결제 방식입니다.',
  },
  {
    q: '주문 후 도착까지 얼마나 걸리나요?',
    a: '접수 완료 즉시 인근 관리사가 출발하며, 통상적으로 서울·경기·수도권 및 주요 광역시는 20~30분 내에 도착합니다.',
  },
  {
    q: '카드 결제도 가능한가요?',
    a: '네, 전 관리사가 휴대용 무선 카드 단말기를 지참하여 현장에서 간편하게 카드 결제를 진행하실 수 있습니다.',
  },
  {
    q: '자택이 아닌 호텔이나 오피스텔도 가능한가요?',
    a: '네, 원하시는 자택은 물론 호텔, 모텔, 오피스텔, 원룸 등 관리가 가능한 실내 공간이라면 어디든 방문 가능합니다.',
  },
];

export default function GuidePage() {
  return (
    <main className="t4-fixed-page">
      {/* 1. 상단 히어로 배너 */}
      <header className="t4-directory-hero">
        <div className="page-width t4-directory-hero-inner">
          <p>REST & GUIDE · COMMA</p>
          <h1>쉼표 테라피 간편 이용 안내</h1>
          <span>누구나 안심하고 이용할 수 있는 4단계 이용 절차와 자주 묻는 질문을 확인하세요.</span>

          <div className="t4-directory-stats">
            <div><span>방문 시간</span><strong>평균 30분 내</strong></div>
            <div><span>결제 방식</span><strong>100% 현장 후불</strong></div>
            <div><span>이용 장소</span><strong>자택·호텔·원룸</strong></div>
          </div>
        </div>
      </header>

      <div className="page-width" style={{ padding: '40px 20px 60px' }}>
        {/* 2. 4단계 이용 절차 */}
        <section className="guide-section">
          <header className="section-head">
            <div>
              <span className="section-kicker">STEP BY STEP</span>
              <h2>4단계 간편 이용 절차</h2>
              <p style={{ color: '#666', fontSize: '14px', marginTop: '4px' }}>
                복잡한 절차 없이 주소 확인부터 케어까지 편안하게 진행됩니다.
              </p>
            </div>
          </header>

          <div className="guide-step-grid">
            {STEP_DETAILS.map((item) => (
              <div key={item.step} className="guide-step-card">
                <div className="guide-step-header">
                  <span className="guide-step-num">{item.step}</span>
                  <span className="guide-step-badge">{item.badge}</span>
                </div>
                <h3>{item.title}</h3>
                <p className="guide-step-sub">{item.subtitle}</p>
                <p className="guide-step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 자주 묻는 질문 (FAQ) */}
        <section className="faq-section" style={{ marginTop: '50px' }}>
          <header className="section-head">
            <div>
              <span className="section-kicker">FAQ</span>
              <h2>자주 묻는 질문</h2>
            </div>
          </header>

          <div className="faq-grid">
            {FAQ_LIST.map((faq, idx) => (
              <div key={idx} className="faq-card">
                <div className="faq-q">
                  <span className="faq-q-mark">Q</span>
                  <h4>{faq.q}</h4>
                </div>
                <div className="faq-a">
                  <span className="faq-a-mark">A</span>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 하단 빠른 지역 이동 CTA 배너 */}
        <section className="guide-cta-banner" style={{ marginTop: '50px' }}>
          <div className="guide-cta-inner">
            <span className="banner-badge">FAST BOOKING</span>
            <h2>지금 계신 지역의 테라피스트를 확인하세요</h2>
            <p>서울, 경기, 인천, 대전, 대구, 부산, 제주 등 전국 11개 권역 어디서나 빠른 방문이 가능합니다.</p>
            <div className="banner-actions" style={{ marginTop: '20px' }}>
              <Link href="/#regions" className="btn-primary">
                지역별 제휴점 찾기
              </Link>
              <Link href="/notice" className="btn-secondary">
                공지사항 확인
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}