import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

// 메인 최상위 영역: '출장마사지' 키워드를 배제하고 프리미엄 방문 홈케어/테라피로 순화
const siteTitle = '쉼표 - 전국 24시 프리미엄 1:1 방문 홈케어 & 힐링 테라피';
const siteDescription =
  '선입금 없는 100% 현장 후불제! 서울, 경기, 인천, 대전, 대구, 부산 등 전국 주요 권역 신속 방문 프라이빗 바디케어 & 릴렉싱 힐링 테라피.';

export const metadata: Metadata = {
  metadataBase: new URL('https://comma26.netlify.app'),
  title: {
    // 하위 지역/구/동 페이지에서 넘겨준 제목(예: "서울 강남구 역삼동 출장 1:1 홈케어 마사지 | 쉼표")이 템플릿에 맞게 조합됩니다.
    template: '%s | 쉼표',
    default: siteTitle,
  },
  description: siteDescription,
  verification: {
    other: {
      'naver-site-verification': '4bf40448775a7cfa672b627330c0ff56f2b95f36',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://comma26.netlify.app/',
    siteName: '쉼표',
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="app-shell" id="top">
          {/* 상단 24시 접수 공지 바 */}
          <div className="notice-bar">
            <div className="notice-inner">
              <p>
                <b>24시간 접수</b>
                <span>원하시는 장소와 시간에 맞춰 전문 테라피스트 일정을 확인합니다.</span>
              </p>
            </div>
          </div>

          {/* 메인 상단 헤더 */}
          <header className="site-header">
            <div className="header-inner page-width">
              <Link href="/" className="brand">
                <span className="brand-mark"></span>
                <span className="brand-name">쉼표</span>
              </Link>
              <nav className="desktop-nav">
                <Link href="/#region-directory">지역별 홈케어 안내</Link>
                <Link href="/pricing">코스 & 가격</Link>
                <Link href="/guide">이용 안내</Link>
                <Link href="/notice">공지사항</Link>
              </nav>
            </div>
          </header>

          {/* 본문 콘텐츠 (각 세부 페이지에서 '지역 출장 [완화키워드] 마사지' 렌더링) */}
          {children}

          {/* 공통 푸터 */}
          <footer className="site-footer">
            <div className="footer-top page-width">
              <nav>
                <Link href="/#region-directory">지역별 안내</Link>
                <Link href="/pricing">코스 & 가격</Link>
                <Link href="/guide">이용 안내</Link>
                <Link href="/notice">공지사항</Link>
              </nav>
            </div>
            <div className="footer-main page-width">
              <div className="footer-brand-block">
                <div className="footer-brand">
                  <h2>쉼표</h2>
                </div>
                <p>전국 권역별 프라이빗 1:1 방문 홈케어 테라피 안내</p>
                <p>365일 24시간 문의 접수 · 투명한 현장 결제 시스템</p>
              </div>
              <div className="footer-facts">
                <span>100% 후불제</span>
                <span>전문 테라피스트</span>
                <span>신속 방문 케어</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}