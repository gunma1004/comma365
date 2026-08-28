import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { REGION_DATA, type RegionItem } from '../../../data/regions';

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

// 5개 공식 인증 추천 제휴 업체 데이터
const FEATURED_SHOPS = [
  { 
    id: 1, 
    name: '한국미인테라피', 
    phone: '0507-1280-3303', 
    tag: '스웨디시 · 로미로미', 
    desc: '전원 20대 전문 테라피스트 · 피로회복 맞춤 힐링', 
    rating: '4.9', 
    reviews: 142,
    highlight: '인기 1위'
  },
  { 
    id: 2, 
    name: '미인클럽테라피', 
    phone: '0507-1280-3193', 
    tag: '감성 스웨디시 · 아로마', 
    desc: '지친 일상에 활력을 주는 프라이빗 감성 케어', 
    rating: '4.9', 
    reviews: 128,
    highlight: '재방문율 98%'
  },
  { 
    id: 3, 
    name: '오늘밤테라피', 
    phone: '0507-1280-3223', 
    tag: '24시 스웨디시 · 타이', 
    desc: '야간 24시간 언제든 계신 곳 30분 내 방문 도착', 
    rating: '4.8', 
    reviews: 95,
    highlight: '24H 즉시배차'
  },
  { 
    id: 4, 
    name: '한국골든테라피', 
    phone: '0507-1280-3361', 
    tag: 'VIP 스웨디시 · 딥티슈', 
    desc: '최상의 퀄리티와 품격 있는 최고급 프리미엄 테라피', 
    rating: '5.0', 
    reviews: 110,
    highlight: '고객 만족 1위'
  },
  { 
    id: 5, 
    name: '퀸즈홈테라피', 
    phone: '0507-1280-3334', 
    tag: '프리미엄 힐링 홈케어', 
    desc: '철저한 위생 관리와 품격 높은 프라이빗 힐링 코스', 
    rating: '4.9', 
    reviews: 86,
    highlight: '철저한 위생관리'
  },
];

// 1. 슬러그 경로로 지역 데이터를 안전하게 탐색하는 헬퍼 함수
function findRegionBySlug(slugs: string[]) {
  if (!slugs || slugs.length === 0) return null;

  let currentList: RegionItem[] = REGION_DATA;
  let currentTarget: RegionItem | null = null;
  const breadcrumbs: { id: string; name: string }[] = [];

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const found = currentList.find((item) => item.id === slug);

    if (!found) {
      return null;
    }

    currentTarget = found;

    if (i < slugs.length - 1) {
      breadcrumbs.push({ id: found.id, name: found.name });
      currentList = found.children || [];
    }
  }

  if (!currentTarget) return null;

  return {
    current: currentTarget,
    breadcrumbs,
    children: currentTarget.children || [],
  };
}

// 2. 모든 동/구/시 경로 정적 페이지 사전 생성 (SSG)
export async function generateStaticParams() {
  const paths: { slug: string[] }[] = [];

  function traverse(items: RegionItem[], currentPath: string[] = []) {
    for (const item of items) {
      const nextPath = [...currentPath, item.id];
      paths.push({ slug: nextPath });
      if (item.children && item.children.length > 0) {
        traverse(item.children, nextPath);
      }
    }
  }

  traverse(REGION_DATA);
  return paths;
}

// 3. 검색엔진 최적화(SEO) 및 네이버 Open Graph 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = findRegionBySlug(slug);

  if (!result) return {};

  const { current } = result;
  const targetName = current.fullName;
  const shortName = current.name;
  const pageUrl = `https://comma26.netlify.app/areas/${slug.join('/')}/`;

  const metaTitle = `${targetName} 출장마사지 24시 홈타이·스웨디시`;
  const metaDescription = `${targetName} 전 지역 30분 내 빠른 도착! 쉼표 ${shortName} 출장마사지, 홈타이, 힐링 스웨디시 코스 및 100% 현장 후불 결제 안내입니다.`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [
      `${targetName} 출장마사지`,
      `${shortName} 출장마사지`,
      `${shortName} 출장안마`,
      `${shortName} 홈타이`,
      `${shortName} 스웨디시`,
      '쉼표',
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: pageUrl,
      siteName: '쉼표',
      title: `${metaTitle} | 쉼표`,
      description: metaDescription,
    },
  };
}

// 4. 지역 페이지 본문 렌더링
export default async function RegionPage({ params }: Props) {
  const { slug } = await params;
  const result = findRegionBySlug(slug);

  if (!result) {
    notFound();
  }

  const { current, breadcrumbs, children } = result;
  const isLeaf = !children || children.length === 0;

  return (
    <main className="t4-directory-page">
      {/* 1. 상단 메인 이미지 배너 */}
      <section className="custom-banner-section">
        <div className="page-width">
          <div className="custom-banner-link">
            <img
              src="/main-banner.jpg"
              alt={`${current.fullName} 출장마사지 쉼표`}
              className="custom-banner-img"
            />
          </div>
        </div>
      </section>

      {/* 2. 지역 정보 히어로 섹션 */}
      <header className="t4-directory-hero">
        <div className="page-width t4-directory-hero-inner">
          <nav className="t4-breadcrumbs" aria-label="경로 안내" style={{ marginBottom: '12px', fontSize: '13px', color: '#666' }}>
            <Link href="/" style={{ color: 'var(--primary)', fontWeight: 700 }}>홈</Link>
            {breadcrumbs.map((b, idx) => (
              <span key={idx} style={{ margin: '0 6px' }}>
                &gt; <Link href={`/areas/${breadcrumbs.slice(0, idx + 1).map(x => x.id).join('/')}/`}>{b.name}</Link>
              </span>
            ))}
            <span style={{ margin: '0 6px', fontWeight: 800, color: '#111' }}>&gt; {current.name}</span>
          </nav>

          <p>REGION THERAPY GUIDE · COMMA</p>
          <h1>{current.fullName} 출장마사지</h1>
          <span>
            {current.fullName} 전 지역 30분 내 신속 방문 테라피 안내 · 100% 현장 후불 결제
          </span>

          <div className="t4-directory-stats">
            <div><span>방문 시간</span><strong>평균 30분 내</strong></div>
            <div><span>정산 방식</span><strong>100% 현장 후불</strong></div>
            <div><span>이용 형태</span><strong>자택·호텔·원룸</strong></div>
          </div>
        </div>
      </header>

      <div className="page-width" style={{ padding: '40px 20px 60px' }}>
        {/* 3. 추천 제휴 업체 5개 섹션 */}
        <section id="featured-shops" className="t4-directory-section" style={{ padding: '0 0 40px' }}>
          <div className="section-head-flex">
            <div>
              <span className="section-kicker">VERIFIED PREMIUM SHOPS</span>
              <h2 className="section-title">{current.name} 추천 제휴점</h2>
              <p className="section-subtitle">{current.fullName} 전 지역 신속 배차 가능한 고객 만족도 4.9점 이상 공식 인증점입니다.</p>
            </div>
            <span className="badge-live-order">실시간 배차 가능</span>
          </div>

          <div className="shop-grid-enhanced">
            {FEATURED_SHOPS.map((shop, index) => (
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

        {/* 4. 하위 구/동 선택 그리드 (하위 지역이 있는 경우) */}
        {!isLeaf && (
          <section className="t4-directory-section" style={{ padding: '0 0 40px' }}>
            <div className="section-head-flex">
              <div>
                <span className="section-kicker">SUB DISTRICTS</span>
                <h2 className="section-title">{current.name} 세부 지역 안내</h2>
                <p className="section-subtitle">원하시는 동·읍·면을 선택하시면 해당 지역 출장마사지 정보를 확인하실 수 있습니다.</p>
              </div>
            </div>

            <div className="region-grid-v2">
              {children.map((child, idx) => (
                <Link
                  key={child.id}
                  href={`/areas/${[...slug, child.id].join('/')}/`}
                  className="region-card-v2"
                >
                  <div className="region-card-head">
                    <span className="region-step-num">NO. {idx + 1}</span>
                    <span className="region-count-badge">즉시 방문 가능</span>
                  </div>
                  <h3 className="region-card-title">{child.name} 출장마사지</h3>
                  <p className="region-card-sub">{current.name} {child.name} 전 지역 20~30분 신속 배차</p>
                  <div className="region-card-btn">
                    <span>상세 안내 보기</span>
                    <b>→</b>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 5. 최하위 동(말단 노드) 방문 서비스 안내 박스 */}
        {isLeaf && (
          <section className="safety-banner" style={{ marginBottom: '40px', background: '#fff', border: '1px solid #f2d5dc' }}>
            <div className="safety-text">
              <h3>📍 {current.fullName} 전 지역 방문 서비스 운영 중</h3>
              <p>{current.fullName} 내 아파트, 오피스텔, 원룸, 호텔, 모텔 등 어디서든 24시간 안심하고 이용하실 수 있습니다.</p>
            </div>
            <Link href="/pricing" className="btn-primary" style={{ padding: '10px 20px', borderRadius: '8px' }}>
              코스별 가격 확인 →
            </Link>
          </section>
        )}

        {/* 6. 안심 이용 수칙 & 통화 전 안내 */}
        <section className="notice-bottom-grid">
          <div className="contact-panel">
            <span className="section-kicker">SAFETY POLICY</span>
            <h3>선입금 없는 100% 현장 정산 안내</h3>
            <p>
              쉼표는 일체의 예약금이나 유류비를 사전에 요구하지 않습니다. {current.name} 전 지역 관리사 도착 후 직접 확인하신 뒤 안전하게 결제해 주세요.
            </p>
            <div className="contact-btn-row">
              <Link href="/pricing" className="btn-primary">
                가격표 보기
              </Link>
              <Link href="/guide" className="btn-secondary">
                이용 안내
              </Link>
            </div>
          </div>

          <aside className="step-panel">
            <span className="section-kicker">BEFORE YOU CALL</span>
            <h3>{current.name} 예약 시 전달 사항</h3>
            <ol className="step-list">
              <li>
                <b>01</b>
                <span>{current.name} 내 정확한 도로명 주소 또는 건물명</span>
              </li>
              <li>
                <b>02</b>
                <span>이용 희망 일자 및 시각</span>
              </li>
              <li>
                <b>03</b>
                <span>선택하신 코스 및 이용 시간</span>
              </li>
              <li>
                <b>04</b>
                <span>결제 방식 (현금 또는 카드)</span>
              </li>
            </ol>
          </aside>
        </section>
      </div>
    </main>
  );
}