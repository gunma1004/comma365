'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Shop {
  id: number;
  name: string;
  phone: string;
  tag: string;
  desc: string;
  rating: string;
  reviews: number;
  highlight: string;
}

const INITIAL_SHOPS: Shop[] = [
  { 
    id: 1, 
    name: '한국미인테라피', 
    phone: '0507-1280-3303', 
    tag: '스웨디시 · 로미로미', 
    desc: '전문 테라피스트의 섬세한 터칭 · 피로회복 1:1 맞춤 힐링', 
    rating: '4.9', 
    reviews: 142,
    highlight: '인기 1위'
  },
  { 
    id: 2, 
    name: '미인클럽테라피', 
    phone: '0507-1280-3193', 
    tag: '감성 스웨디시 · 아로마', 
    desc: '지친 일상에 활력을 주는 프라이빗 방문 감성 케어', 
    rating: '4.9', 
    reviews: 128,
    highlight: '재방문율 98%'
  },
  { 
    id: 3, 
    name: '오늘밤테라피', 
    phone: '0507-1280-3223', 
    tag: '24시 스웨디시 · 릴렉싱', 
    desc: '24시간 언제든 고객님이 계신 편안한 공간으로 신속 방문', 
    rating: '4.8', 
    reviews: 95,
    highlight: '24H 신속매칭'
  },
  { 
    id: 4, 
    name: '한국골든테라피', 
    phone: '0507-1280-3361', 
    tag: 'VIP 스웨디시 · 딥티슈', 
    desc: '최상의 퀄리티와 품격 있는 프라이빗 바디 테라피', 
    rating: '5.0', 
    reviews: 110,
    highlight: '고객 만족 1위'
  },
  { 
    id: 5, 
    name: '퀸즈홈테라피', 
    phone: '0507-1280-3334', 
    tag: '프리미엄 힐링 홈케어', 
    desc: '철저한 위생 관리와 품격 높은 1:1 릴렉싱 코스', 
    rating: '4.9', 
    reviews: 86,
    highlight: '철저한 위생관리'
  },
];

const REGIONS = [
  { id: 'seoul', name: '서울특별시', sub: '강남 · 서초 · 송파 · 마포 등', count: '25개 구 전역', step: '01' },
  { id: 'incheon', name: '인천광역시', sub: '부평 · 구월 · 송도 · 청라 등', count: '전역 30분 매칭', step: '02' },
  { id: 'gyeonggi', name: '경기도', sub: '수원 · 성남(분당) · 일산 · 화성 등', count: '31개 시·군', step: '03' },
  { id: 'cheonan', name: '천안시', sub: '두정동 · 불당동 · 쌍용동 등', count: '서북구 · 동남구', step: '04' },
  { id: 'asan', name: '아산시', sub: '배방 · 탕정 · 온천동 · 용화동 등', count: '아산 전역 방문', step: '05' },
  { id: 'daejeon', name: '대전광역시', sub: '둔산동 · 봉명동 · 유성구 등', count: '5개 구 전역', step: '06' },
  { id: 'daegu', name: '대구광역시', sub: '동성로 · 수성구 · 달서구 등', count: '대구 전역 매칭', step: '07' },
  { id: 'gumi', name: '구미시', sub: '인동 · 진평 · 원평 · 송정 등', count: '구미 전역 방문', step: '08' },
  { id: 'pohang', name: '포항시', sub: '이동 · 양덕 · 영일대 · 효자 등', count: '남구 · 북구', step: '09' },
  { id: 'busan', name: '부산광역시', sub: '해운대 · 서면 · 광안리 · 동래 등', count: '16개 구·군', step: '10' },
  { id: 'jeju', name: '제주특별자치도', sub: '신제주(연동/노형) · 서귀포 전역', count: '제주 전지역', step: '11' },
];

export default function HomePage() {
  // 처음에는 빈 배열로 두어 서버/클라이언트 불일치(Hydration Error) 방지
  const [shops, setShops] = useState<Shop[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const shuffled = [...INITIAL_SHOPS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShops(shuffled);
  }, []);

  // 마운트 되기 전에는 기본 순서를 보여주어 화면 깜빡임이나 에러 방지
  const displayShops = isMounted && shops.length > 0 ? shops : INITIAL_SHOPS;

  return (
    <main className="t4-main-container">
      {/* 1. 상단 직접 제작한 메인 이미지 배너 */}
      <section className="custom-banner-section">
        <div className="page-width">
          <a href="#region-directory" className="custom-banner-link">
            <img
              src="/main-banner.jpg"
              alt="쉼표 전국 24시 프리미엄 1:1 방문 홈케어 & 테라피"
              className="custom-banner-img"
            />
          </a>
        </div>
      </section>

      {/* 2. 상단 추천 제휴 업체 (5개) - 새로고침 시 랜덤 셔플 */}
      <section id="featured-shops" className="page-width t4-directory-section">
        <div className="section-head-flex">
          <div>
            <span className="section-kicker">VERIFIED PREMIUM SHOPS</span>
            <h2 className="section-title">쉼표 공식 인증 베스트 제휴 테라피</h2>
            <p className="section-subtitle">고객 만족도 4.9점 이상, 검증된 전문 관리사만 엄선하여 안내합니다.</p>
          </div>
          <span className="badge-live-order">실시간 추천 순위</span>
        </div>

        <div className="shop-grid-enhanced">
          {displayShops.map((shop, index) => (
            <article key={shop.id} className="shop-card-v2">
              <div className="shop-card-top">
                <span className="shop-rank-badge">BEST {index + 1}</span>
                <span className="shop-highlight-badge">{shop.highlight}</span>
              </div>

              <div className="shop-card-main">
                <h3 className="shop-card-name">{shop.name}</h3>
                <div className="shop-rating-row">
                  <span className="star-rating">★ {shop.rating}</span>
                  <span className="review-count">({shop.reviews}+ 이용후기)</span>
                </div>
                <span className="shop-category-tag">{shop.tag}</span>
                <p className="shop-card-desc">{shop.desc}</p>
              </div>

              <div className="shop-card-footer">
                <div className="shop-price-info">
                  <span className="status-open"><span className="pulse-dot-green"></span> 24시간 즉시 상담</span>
                </div>
                <a href={`tel:${shop.phone.replace(/-/g, '')}`} className="btn-shop-action">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: '6px' }}>
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z"/>
                  </svg>
                  <strong>{shop.phone}</strong> 바로연결
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. 전국 11개 권역 선택 그리드 */}
      <section id="region-directory" className="page-width t4-directory-section" style={{ paddingTop: '10px' }}>
        <div className="section-head-flex">
          <div>
            <span className="section-kicker">REGION DIRECTORY</span>
            <h2 className="section-title">전국 11개 주요 권역 홈케어 안내</h2>
            <p className="section-subtitle">희망하시는 지역을 선택하시면 세부 구·동별 맞춤 케어 정보와 제휴점을 확인하실 수 있습니다.</p>
          </div>
        </div>

        <div className="region-grid-v2">
          {REGIONS.map((region) => (
            <Link key={region.id} href={`/areas/${region.id}/`} className="region-card-v2">
              <div className="region-card-head">
                <span className="region-step-num">{region.step}</span>
                <span className="region-count-badge">{region.count}</span>
              </div>
              <h3 className="region-card-title">{region.name}</h3>
              <p className="region-card-sub">{region.sub}</p>
              <div className="region-card-btn">
                <span>세부 지역별 케어 보기</span>
                <b>→</b>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. 안심 보장 배너 */}
      <section className="page-width" style={{ marginBottom: '60px' }}>
        <div className="safety-banner">
          <div className="safety-text">
            <h3>🔒 쉼표 3대 안심 서비스 보장</h3>
            <p>선입금 요구 시 100% 사기입니다. 쉼표는 현장 도착 전 일체의 예약금을 받지 않습니다.</p>
          </div>
          <Link href="/notice" className="btn-safety-link">
            공지사항 확인하기 →
          </Link>
        </div>
      </section>
    </main>
  );
}