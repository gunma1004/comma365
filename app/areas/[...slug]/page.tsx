import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { REGION_DATA, type RegionItem } from '../../../data/regions';

interface Props {
  params: Promise<{ slug: string[] }>;
}

interface Shop {
  id: number;
  name: string;
  phone: string;
  tag: string;
  desc?: string;
  isAd?: boolean;
}

// 1. 기본 5개 업체 (서울, 경기, 인천, 천안 등)
const DEFAULT_SHOPS: Shop[] = [
  { id: 1, name: '한국미인테라피', phone: '0507-1280-3303', tag: '스웨디시 · 홈타이', desc: '프리미엄 힐링 케어 및 전원 전문 테라피스트' },
  { id: 2, name: '미인클럽테라피', phone: '0507-1280-3193', tag: '감성 스웨디시 · 아로마', desc: '지친 일상에 활력을 주는 프라이빗 맞춤 코스' },
  { id: 3, name: '오늘밤테라피', phone: '0507-1280-3223', tag: '24시 스웨디시 · 안마', desc: '야간 24시간 언제든 편안하게 이용하는 힐링 스파' },
  { id: 4, name: '한국골든테라피', phone: '0507-1280-3361', tag: 'VIP 스웨디시 · 힐링', desc: '최상의 퀄리티와 안락함을 선사하는 최고급 테라피' },
  { id: 5, name: '퀸즈홈테라피', phone: '0507-1280-3334', tag: '프리미엄 24시 방문케어', desc: '철저한 위생 관리와 품격 있는 고품격 힐링 서비스' },
];

// 2. 아산 전용 업체 (2개)
const ASAN_SHOPS: Shop[] = [
  { id: 1, name: '한국미인테라피', phone: '0507-1280-3303', tag: '스웨디시 · 로미로미', desc: '아산 전 지역 빠른 방문 및 프리미엄 맞춤 케어' },
  { id: 2, name: '미인클럽테라피', phone: '0507-1280-3193', tag: '감성 스웨디시 · 아로마', desc: '온양·배방·탕정 등 아산 전역 힐링 테라피' },
];

// 3. 대전 전용 업체 (1개)
const DAEJEON_SHOPS: Shop[] = [
  { id: 1, name: 'S슬림테라피', phone: '0507-1280-3358', tag: '대전 24시 감성 스웨디시', desc: '대전 서구·유성구 등 전역 30분 내 빠른 방문 힐링 케어' },
];

// 4. 대구, 구미, 포항, 부산, 제주 전용 (제휴문의)
const PARTNER_SHOPS: Shop[] = [
  { id: 1, name: '쉼표 공식 제휴점 모집', phone: '0507-1280-3344', tag: '실시간 입점 및 제휴 문의', desc: '해당 지역 최고의 광고 효과와 빠른 콜 유입을 지원합니다.', isAd: true },
];

// 지역별 업체 목록 가져오기 함수
function getShopsForRegion(rootRegionId: string): Shop[] {
  switch (rootRegionId) {
    case 'asan':
      return [...ASAN_SHOPS].sort(() => Math.random() - 0.5);
    case 'daejeon':
      return DAEJEON_SHOPS;
    case 'daegu':
    case 'gumi':
    case 'pohang':
    case 'busan':
    case 'jeju':
      return PARTNER_SHOPS;
    case 'seoul':
    case 'gyeonggi':
    case 'incheon':
    case 'cheonan':
    default:
      return [...DEFAULT_SHOPS].sort(() => Math.random() - 0.5);
  }
}

function getRegionBySlug(slugs: string[]): {
  current: RegionItem;
  breadcrumbs: RegionItem[];
  rootId: string;
} | null {
  let currentLevel: RegionItem[] | undefined = REGION_DATA;
  const breadcrumbs: RegionItem[] = [];
  let found: RegionItem | undefined;

  for (const slug of slugs) {
    found = currentLevel?.find((item) => item.id === slug);
    if (!found) return null;
    breadcrumbs.push(found);
    currentLevel = found.children;
  }

  return found ? { current: found, breadcrumbs, rootId: slugs[0] } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = getRegionBySlug(slug);

  if (!result) return {};

  const { current } = result;
  const targetName = current.fullName;
  const shortName = current.name;
  const pageUrl = `https://comma26.netlify.app/areas/${slug.join('/')}/`;

  // 레이아웃 템플릿(%s | 쉼표)과 자동 결합되므로 여기서는 '쉼표' 접미사를 제외합니다.
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

export async function generateStaticParams() {
  const paths: { slug: string[] }[] = [];

  function collectPaths(items: RegionItem[], accumulated: string[] = []) {
    for (const item of items) {
      const currentPath = [...accumulated, item.id];
      paths.push({ slug: currentPath });

      if (item.children && item.children.length > 0) {
        collectPaths(item.children, currentPath);
      }
    }
  }

  collectPaths(REGION_DATA);
  return paths;
}

export default async function AreaCatchAllPage({ params }: Props) {
  const { slug } = await params;
  const result = getRegionBySlug(slug);

  if (!result) {
    notFound();
  }

  const { current, breadcrumbs, rootId } = result;
  const currentPathString = slug.join('/');
  const hasChildren = current.children && current.children.length > 0;

  // 지역 규칙에 따른 업체 목록 추출
  const regionShops = getShopsForRegion(rootId);
  const isPartnerPage = ['daegu', 'gumi', 'pohang', 'busan', 'jeju'].includes(rootId);

  return (
    <main className="t4-areas-page">
      <header className="t4-directory-hero">
        <div className="page-width t4-directory-hero-inner">
          <nav aria-label="경로 탐색" style={{ marginBottom: '12px', fontSize: '14px', opacity: 0.85 }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>홈</Link>
            <span style={{ margin: '0 8px' }}>&gt;</span>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>지역 안내</Link>
            {breadcrumbs.map((crumb, idx) => {
              const crumbPath = slug.slice(0, idx + 1).join('/');
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <span key={crumb.id}>
                  <span style={{ margin: '0 8px' }}>&gt;</span>
                  {isLast ? (
                    <strong>{crumb.name}</strong>
                  ) : (
                    <Link href={`/areas/${crumbPath}/`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {crumb.name}
                    </Link>
                  )}
                </span>
              );
            })}
          </nav>

          <p>COMMA · {current.name.toUpperCase()} MASSAGE</p>
          <h1>{current.fullName} 출장마사지</h1>
          <span>{current.fullName} 인근 계신 곳 어디든 30분 내 방문하는 프라이빗 힐링 서비스</span>

          <div className="t4-directory-stats">
            <div><span>선택 지역</span><strong>{current.name}</strong></div>
            <div><span>운영 상태</span><strong>24시간 접수</strong></div>
            <div><span>결제 방식</span><strong>100% 현장 후불</strong></div>
          </div>
        </div>
      </header>

      {/* 상단 업체 / 제휴문의 섹션 */}
      <section className="page-width t4-directory-section" style={{ paddingBottom: '10px' }}>
        <header className="section-head">
          <div>
            <span className="section-kicker">{isPartnerPage ? 'PARTNER INQUIRY' : 'VERIFIED SHOPS'}</span>
            <h2>{current.name} {isPartnerPage ? '제휴 및 광고 문의' : '출장마사지 추천 제휴점'}</h2>
          </div>
        </header>

        <div className="shop-grid">
          {regionShops.map((shop, index) => (
            <div key={shop.id} className="shop-card" style={shop.isAd ? { border: '2px dashed #d52656', background: '#fff9fa' } : {}}>
              <div className="shop-badge">
                {shop.isAd ? '입점 모집중' : `추천 ${index + 1}위`}
              </div>
              <div className="shop-info">
                <h3>{shop.isAd ? `${current.name} ${shop.name}` : `${current.name} ${shop.name}`}</h3>
                <span className="shop-tag">{shop.tag}</span>
                {shop.desc && <p>{shop.desc}</p>}
              </div>
              <a href={`tel:${shop.phone.replace(/-/g, '')}`} className="shop-call-btn">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: '6px' }}>
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z"/>
                </svg>
                {shop.phone} {shop.isAd ? '제휴 문의' : '전화예약'}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 하위 지역 목록 또는 최하위 상세 안내 */}
      {hasChildren ? (
        <section className="page-width t4-directory-section">
          <header className="section-head">
            <div>
              <span className="section-kicker">SUB DIRECTORY</span>
              <h2>{current.name} 세부 지역 목록</h2>
            </div>
          </header>

          <div className="t4-directory-grid">
            {current.children!.map((child, index) => (
              <Link
                key={child.id}
                href={`/areas/${currentPathString}/${child.id}/`}
                className="t4-directory-card"
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{child.name}</h2>
                  <p>{child.fullName} 출장마사지</p>
                </div>
                <b>다음 단계 →</b>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="page-width t4-directory-section">
          <header className="section-head">
            <div>
              <span className="section-kicker">SERVICE GUIDE</span>
              <h2>{current.fullName} 출장마사지 이용 안내</h2>
            </div>
          </header>

          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '16px', border: '1px solid #eee', marginTop: '20px', lineHeight: '1.8' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#d52656' }}>
              {current.name} 24시간 프라이빗 방문 케어
            </h3>
            <p style={{ marginBottom: '16px', color: '#444' }}>
              쉼표 <strong>{current.fullName} 출장마사지</strong>는 원하시는 자택, 오피스텔, 호텔 등
              계신 곳 어디서나 편안하게 받으실 수 있도록 엄선된 관리사가 신속히 찾아갑니다.
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: '#555' }}>
              <li><strong>선입금 일체 없음:</strong> 100% 현장 도착 후 결제</li>
              <li>{current.name} 전 지역 접수 후 20~30분 내 도착</li>
              <li>타이, 아로마, 힐링 감성 스웨디시 맞춤 관리</li>
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}