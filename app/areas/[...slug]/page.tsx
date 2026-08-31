import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { REGION_DATA, type RegionItem } from '../../../data/regions';

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

// 기본 추천 제휴 업체 데이터 (수도권 등 기본 지역용)
const DEFAULT_SHOPS = [
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

// 대전 전용 업체
const DAEJEON_SHOPS = [
  {
    id: 101,
    name: 'S슬림홈타이',
    phone: '0507-1280-3342',
    tag: '24시 프리미엄 홈타이 · 스웨디시',
    desc: '대전 전 지역 신속 방문 · 1:1 맞춤 프라이빗 바디 힐링 케어',
    rating: '5.0',
    reviews: 156,
    highlight: '대전 단독 공식 제휴점',
  },
];

// 대구/구미/포항/부산/제주 전용 제휴문의 업체
const AFFILIATE_INQUIRY_SHOPS = [
  {
    id: 201,
    name: '제휴문의',
    phone: '0507-1280-3344',
    tag: '24시 입점 및 제휴 상담',
    desc: '해당 지역 최고의 프리미엄 테라피 파트너 제휴 입점 문의를 받습니다.',
    rating: '5.0',
    reviews: 99,
    highlight: '공식 제휴 문의',
  },
];

// 지역 슬러그에 따라 노출할 제휴점 결정 함수
function getShopsForRegion(slugs: string[]) {
  const rootSlug = slugs[0];

  // 1. 대전 권역
  if (rootSlug === 'daejeon') {
    return DAEJEON_SHOPS;
  }

  // 2. 대구, 구미, 포항, 부산, 제주 권역
  if (['daegu', 'gumi', 'pohang', 'busan', 'jeju'].includes(rootSlug)) {
    return AFFILIATE_INQUIRY_SHOPS;
  }

  // 3. 그 외 기본 수도권 등 지역
  return DEFAULT_SHOPS;
}

// 20가지 우회 템플릿 생성기
function getSeoTemplate(targetName: string, shortName: string, slugSeed: string) {
  const templates = [
    {
      title: `${targetName} 출장 1:1 방문 홈케어 마사지 & 테라피`,
      desc: `${targetName} 전 지역 30분 내 빠른 방문! 쉼표 ${shortName} 출장 맞춤 홈케어 마사지, 힐링 스웨디시 코스 및 100% 현장 후불 결제 안내입니다.`,
      h1Sub: '출장 1:1 방문 홈케어 마사지',
      heroSub: '1:1 방문 홈케어 테라피',
      tagSuffix: '출장 홈케어 마사지',
    },
    {
      title: `${targetName} 출장 100% 안심 건전 힐링 테라피 마사지`,
      desc: `${targetName} 출장 100% 건전 힐링 타이 & 스웨디시 마사지. 쉼표 ${shortName}의 품격 있는 바디 릴렉싱 케어를 안심 후불제로 이용하세요.`,
      h1Sub: '출장 안심 건전 힐링 마사지',
      heroSub: '안심 건전 힐링 테라피',
      tagSuffix: '출장 건전 마사지',
    },
    {
      title: `${targetName} 출장 상체 림프 순환 케어 마사지`,
      desc: `${targetName} 출장 상체 림프 순환 및 바디 릴렉싱 마사지. 쉼표 ${shortName} 전문 관리사가 뭉친 근육을 부드럽게 이완해 드립니다.`,
      h1Sub: '출장 상체 림프 순환 마사지',
      heroSub: '상체 림프 순환 & 바디 케어',
      tagSuffix: '출장 림프 마사지',
    },
    {
      title: `${targetName} 출장 프리미엄 아로마 오일 테라피 마사지`,
      desc: `${targetName} 출장 24시 프리미엄 아로마 오일 마사지. 쉼표 ${shortName}에서 은은한 향기와 함께 하루의 피로를 편안히 풀어보세요.`,
      h1Sub: '출장 프리미엄 아로마 마사지',
      heroSub: '프리미엄 천연 아로마 힐링',
      tagSuffix: '출장 아로마 마사지',
    },
    {
      title: `${targetName} 출장 프라이빗 스웨디시 감성 힐링 마사지`,
      desc: `${targetName} 출장 감성 스웨디시 힐링 마사지 전문. 쉼표 ${shortName}의 섬세하고 부드러운 1:1 터칭으로 깊은 휴식을 선사합니다.`,
      h1Sub: '출장 프라이빗 스웨디시 마사지',
      heroSub: '프라이빗 스웨디시 감성 테라피',
      tagSuffix: '출장 스웨디시 마사지',
    },
    {
      title: `${targetName} 출장 전신 릴렉싱 바디 케어 마사지`,
      desc: `${targetName} 출장 전신 맞춤 릴렉스 케어 마사지. 쉼표 ${shortName} 고객님이 계신 편안한 공간으로 찾아가는 1:1 맞춤 솔루션.`,
      h1Sub: '출장 전신 릴렉싱 마사지',
      heroSub: '전신 릴렉싱 바디 솔루션',
      tagSuffix: '출장 릴렉싱 마사지',
    },
    {
      title: `${targetName} 출장 정통 홈타이 힐링 바디 테라피 마사지`,
      desc: `${targetName} 출장 정통 홈타이 테라피 마사지 안내. 쉼표 ${shortName}의 시원한 스트레칭과 압 조절로 지친 몸의 컨디션을 회복하세요.`,
      h1Sub: '출장 정통 홈타이 마사지',
      heroSub: '정통 홈타이 스트레칭 케어',
      tagSuffix: '출장 홈타이 마사지',
    },
    {
      title: `${targetName} 출장 맞춤 림프 드레나쥐 테라피 마사지`,
      desc: `${targetName} 출장 림프 드레나쥐 및 전신 순환 마사지. 쉼표 ${shortName} 프라이빗 맞춤 케어로 붓기와 찌든 피로를 완화해 드립니다.`,
      h1Sub: '출장 림프 드레나쥐 마사지',
      heroSub: '맞춤 림프 순환 드레나쥐',
      tagSuffix: '출장 드레나쥐 마사지',
    },
    {
      title: `${targetName} 출장 24시 야간 힐링 홈케어 마사지`,
      desc: `${targetName} 출장 24시간 언제든 편하게 부르는 야간 홈케어 마사지. 쉼표 ${shortName}에서 늦은 밤에도 부담 없이 관리받으세요.`,
      h1Sub: '출장 24시 야간 홈케어 마사지',
      heroSub: '24시 야간 신속 방문 힐링',
      tagSuffix: '출장 야간 마사지',
    },
    {
      title: `${targetName} 출장 VIP 프리미엄 1:1 방문 테라피 마사지`,
      desc: `${targetName} 출장 최고급 VIP 프리미엄 방문 마사지 서비스. 쉼표 ${shortName}만의 차별화된 1:1 고품격 테라피를 경험해보세요.`,
      h1Sub: '출장 VIP 방문 마사지',
      heroSub: 'VIP 프리미엄 1:1 방문 테라피',
      tagSuffix: '출장 VIP 마사지',
    },
    {
      title: `${targetName} 출장 피로회복 딥티슈 집중 케어 마사지`,
      desc: `${targetName} 출장 피로회복 딥티슈 테라피 마사지. 쉼표 ${shortName} 테라피스트가 깊은 속근육까지 꼼꼼하게 이완시켜 드립니다.`,
      h1Sub: '출장 피로회복 딥티슈 마사지',
      heroSub: '전신 피로회복 딥티슈 테라피',
      tagSuffix: '출장 딥티슈 마사지',
    },
    {
      title: `${targetName} 출장 프라이빗 에스테틱 홈스파 마사지`,
      desc: `${targetName} 출장 홈스파 & 에스테틱 감성 마사지. 쉼표 ${shortName}과 함께 집이나 호텔에서 편안한 힐링을 누려보세요.`,
      h1Sub: '출장 에스테틱 홈스파 마사지',
      heroSub: '프라이빗 에스테틱 홈스파',
      tagSuffix: '출장 홈스파 마사지',
    },
    {
      title: `${targetName} 출장 상체 집중 릴렉스 테라피 마사지`,
      desc: `${targetName} 출장 목, 어깨, 상체 집중 릴렉스 마사지. 쉼표 ${shortName}의 부드러운 케어로 굳은 상체 근육을 풀어드립니다.`,
      h1Sub: '출장 상체 집중 릴렉스 마사지',
      heroSub: '목·어깨·상체 집중 릴렉스 케어',
      tagSuffix: '출장 상체집중 마사지',
    },
    {
      title: `${targetName} 출장 건전 천연 아로마 힐링 마사지`,
      desc: `${targetName} 출장 건전 지향 아로마 마사지. 쉼표 ${shortName} 최고급 천연 오일로 피부 보습과 심신 안정을 동시에 관리하세요.`,
      h1Sub: '출장 건전 아로마 마사지',
      heroSub: '안심 건전 천연 아로마 케어',
      tagSuffix: '출장 아로마 마사지',
    },
    {
      title: `${targetName} 출장 1:1 맞춤 컨디셔닝 바디 마사지`,
      desc: `${targetName} 출장 체형 맞춤 컨디셔닝 바디 마사지. 쉼표 ${shortName}에서 개개인의 신체 밸런스에 맞춘 테라피를 제공합니다.`,
      h1Sub: '출장 맞춤 컨디셔닝 마사지',
      heroSub: '1:1 맞춤 바디 컨디셔닝 케어',
      tagSuffix: '출장 컨디셔닝 마사지',
    },
    {
      title: `${targetName} 출장 소프트 감성 스웨디시 힐링 마사지`,
      desc: `${targetName} 출장 소프트 스웨디시 테라피 마사지. 쉼표 ${shortName}의 섬세한 터치감으로 하루의 누적된 스트레스를 날려보세요.`,
      h1Sub: '출장 감성 스웨디시 마사지',
      heroSub: '소프트 감성 스웨디시 케어',
      tagSuffix: '출장 감성 마사지',
    },
    {
      title: `${targetName} 출장 바디 밸런스 림프 순환 마사지`,
      desc: `${targetName} 출장 전신 림프 순환 케어 마사지. 쉼표 ${shortName} 정성 가득한 방문 테라피로 흐트러진 바디 밸런스를 바로잡습니다.`,
      h1Sub: '출장 바디 밸런스 마사지',
      heroSub: '바디 밸런스 & 림프 순환 케어',
      tagSuffix: '출장 밸런스 마사지',
    },
    {
      title: `${targetName} 출장 프리미엄 홈타이 릴렉스 마사지`,
      desc: `${targetName} 출장 24시 프리미엄 홈타이 힐링 마사지. 쉼표 ${shortName} 전 지역 깔끔하고 수준 높은 홈케어를 약속합니다.`,
      h1Sub: '출장 프리미엄 홈타이 마사지',
      heroSub: '프리미엄 홈타이 힐링 케어',
      tagSuffix: '출장 타이 마사지',
    },
    {
      title: `${targetName} 출장 웰니스 릴렉싱 바디 테라피 마사지`,
      desc: `${targetName} 출장 웰니스 바디 케어 마사지 안내. 쉼표 ${shortName}에서 바쁜 일상 속 프라이빗한 재충전의 시간을 가져보세요.`,
      h1Sub: '출장 웰니스 바디 마사지',
      heroSub: '웰니스 릴렉싱 바디 케어',
      tagSuffix: '출장 웰니스 마사지',
    },
    {
      title: `${targetName} 출장 1:1 방문 활력 집중 케어 마사지`,
      desc: `${targetName} 출장 활력 충전 1:1 집중 마사지. 쉼표 ${shortName} 테라피스트의 세심한 손길로 무거운 몸을 가볍게 만들어 드립니다.`,
      h1Sub: '출장 1:1 활력 집중 마사지',
      heroSub: '1:1 방문 활력 집중 케어',
      tagSuffix: '출장 활력 마사지',
    },
  ];

  let hash = 0;
  for (let i = 0; i < slugSeed.length; i++) {
    hash = (hash << 5) - hash + slugSeed.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % templates.length;
  return templates[index];
}

// 슬러그 경로로 지역 데이터를 탐색하는 헬퍼 함수
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

// 모든 동/구/시 경로 정적 페이지 사전 생성 (SSG)
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

// SEO 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = findRegionBySlug(slug);

  if (!result) return {};

  const { current } = result;
  const pageUrl = `https://comma26.netlify.app/areas/${slug.join('/')}/`;
  const tpl = getSeoTemplate(current.fullName, current.name, slug.join('/'));

  return {
    title: tpl.title,
    description: tpl.desc,
    keywords: [
      `${current.fullName} 출장 방문 마사지`,
      `${current.fullName} 출장 홈케어 마사지`,
      `${current.name} 출장 1:1 마사지`,
      `${current.name} 출장 힐링 테라피`,
      `${current.name} 스웨디시 홈케어`,
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
      title: `${tpl.title} | 쉼표`,
      description: tpl.desc,
    },
  };
}

// 지역 페이지 본문 렌더링
export default async function RegionPage({ params }: Props) {
  const { slug } = await params;
  const result = findRegionBySlug(slug);

  if (!result) {
    notFound();
  }

  const { current, breadcrumbs, children } = result;
  const isLeaf = !children || children.length === 0;
  const slugSeed = slug.join('/');
  const tpl = getSeoTemplate(current.fullName, current.name, slugSeed);

  // 현재 지역에 맞는 업체 목록 가져오기
  const targetShops = getShopsForRegion(slug);

  return (
    <main className="t4-directory-page">
      {/* 1. 상단 배너 */}
      <section className="custom-banner-section">
        <div className="page-width">
          <div className="custom-banner-link">
            <img
              src="/main-banner.jpg"
              alt={`${current.fullName} ${tpl.h1Sub} 쉼표`}
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
          <h1>{current.fullName} {tpl.h1Sub}</h1>
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
        {/* 3. 추천 제휴 업체 섹션 (지역별 분기된 업체 목록 렌더링) */}
        <section id="featured-shops" className="t4-directory-section" style={{ padding: '0 0 40px' }}>
          <div className="section-head-flex">
            <div>
              <span className="section-kicker">VERIFIED PREMIUM SHOPS</span>
              <h2 className="section-title">{current.name} 추천 제휴 테라피</h2>
              <p className="section-subtitle">{current.fullName} 전 지역 신속 방문 가능한 고객 만족도 4.9점 이상 공식 인증점입니다.</p>
            </div>
            <span className="badge-live-order">실시간 방문 가능</span>
          </div>

          <div className="shop-grid-enhanced">
            {targetShops.map((shop, index) => (
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

        {/* 4. 하위 구/동 선택 그리드 */}
        {!isLeaf && (
          <section className="t4-directory-section" style={{ padding: '0 0 40px' }}>
            <div className="section-head-flex">
              <div>
                <span className="section-kicker">SUB DISTRICTS</span>
                <h2 className="section-title">{current.name} 세부 동·구별 안내</h2>
                <p className="section-subtitle">원하시는 지역을 선택하시면 해당 동 전용 상세 테라피 안내를 확인하실 수 있습니다.</p>
              </div>
            </div>

            <div className="region-grid-v2">
              {children.map((child, idx) => {
                const childSeed = [...slug, child.id].join('/');
                const childTpl = getSeoTemplate(`${current.name} ${child.name}`, child.name, childSeed);

                return (
                  <Link
                    key={child.id}
                    href={`/areas/${childSeed}/`}
                    className="region-card-v2"
                  >
                    <div className="region-card-head">
                      <span className="region-step-num">NO. {idx + 1}</span>
                      <span className="region-count-badge">신속 방문 가능</span>
                    </div>
                    <h3 className="region-card-title">{child.name} {childTpl.tagSuffix}</h3>
                    <p className="region-card-sub">{current.name} {child.name} 전 지역 20~30분 신속 방문 케어</p>
                    <div className="region-card-btn">
                      <span>상세 케어 안내 보기</span>
                      <b>→</b>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* 5. 최하위 동(말단 노드) 방문 서비스 안내 박스 */}
        {isLeaf && (
          <section className="safety-banner" style={{ marginBottom: '40px', background: '#fff', border: '1px solid #f2d5dc' }}>
            <div className="safety-text">
              <h3>📍 {current.fullName} 전 지역 1:1 방문 케어 운영 중</h3>
              <p>{current.fullName} 내 아파트, 오피스텔, 원룸, 호텔 등 어디서든 24시간 안심하고 이용하실 수 있습니다.</p>
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
              쉼표는 일체의 예약금이나 유류비를 사전에 요구하지 않습니다. {current.name} 전 지역 테라피스트 도착 후 직접 확인하신 뒤 안전하게 결제해 주세요.
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
                <span>결제 방식 (현금 또는 계좌이체/카드)</span>
              </li>
            </ol>
          </aside>
        </section>
      </div>
    </main>
  );
}