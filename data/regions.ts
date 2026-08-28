// data/regions.ts

export interface RegionItem {
  id: string;
  name: string;
  fullName: string;
  children?: RegionItem[];
}

// 헬퍼: 계층 트리 빌더
function createRegionTree(
  rootId: string,
  rootName: string,
  districtData: Record<string, { id: string; name: string; dongs: { id: string; name: string }[] }>
): RegionItem {
  return {
    id: rootId,
    name: rootName,
    fullName: rootName,
    children: Object.values(districtData).map((dist) => ({
      id: dist.id,
      name: dist.name,
      fullName: `${rootName} ${dist.name}`,
      children: dist.dongs.map((dong) => ({
        id: dong.id,
        name: dong.name,
        fullName: `${rootName} ${dist.name} ${dong.name}`,
      })),
    })),
  };
}

export const REGION_DATA: RegionItem[] = [
  // 1. 서울특별시
  createRegionTree('seoul', '서울특별시', {
    'gangnam': {
      id: 'gangnam', name: '강남구',
      dongs: [
        { id: 'yeoksam', name: '역삼동' }, { id: 'nonhyeon', name: '논현동' }, { id: 'samsung', name: '삼성동' },
        { id: 'cheongdam', name: '청담동' }, { id: 'daechi', name: '대치동' }, { id: 'sinsa', name: '신사동' },
        { id: 'apgujeong', name: '압구정동' }, { id: 'dogok', name: '도곡동' }, { id: 'gaepo', name: '개포동' },
        { id: 'segok', name: '세곡동' }, { id: 'irwon', name: '일원동' }, { id: 'suseo', name: '수서동' }
      ]
    },
    'seocho': {
      id: 'seocho', name: '서초구',
      dongs: [
        { id: 'seocho-dong', name: '서초동' }, { id: 'banpo', name: '반포동' }, { id: 'jamwon', name: '잠원동' },
        { id: 'yangjae', name: '양재동' }, { id: 'bangbae', name: '방배동' }, { id: 'nae-gok', name: '내곡동' }
      ]
    },
    'songpa': {
      id: 'songpa', name: '송파구',
      dongs: [
        { id: 'jamsil', name: '잠실동' }, { id: 'sincheon', name: '신천동' }, { id: 'bangi', name: '방이동' },
        { id: 'songpa-dong', name: '송파동' }, { id: 'seokchon', name: '석촌동' }, { id: 'samjeon', name: '삼전동' },
        { id: 'garak', name: '가락동' }, { id: 'munjeong', name: '문정동' }, { id: 'jangji', name: '장지동' },
        { id: 'ogum', name: '오금동' }, { id: 'geoyeo', name: '거여동' }, { id: 'macheon', name: '마천동' }
      ]
    },
    'gangdong': {
      id: 'gangdong', name: '강동구',
      dongs: [
        { id: 'cheonho', name: '천호동' }, { id: 'gildong', name: '길동' }, { id: 'dunchon', name: '둔촌동' },
        { id: 'myeongil', name: '명일동' }, { id: 'godeok', name: '고덕동' }, { id: 'amasa', name: '암사동' },
        { id: 'seongnae', name: '성내동' }, { id: 'gangil', name: '강일동' }, { id: 'sangil', name: '상일동' }
      ]
    },
    'mapo': {
      id: 'mapo', name: '마포구',
      dongs: [
        { id: 'seogyo', name: '서교동' }, { id: 'hapjeong', name: '합정동' }, { id: 'yeonnam', name: '연남동' },
        { id: 'sangam', name: '상암동' }, { id: 'mangwon', name: '망원동' }, { id: 'gongdeok', name: '공덕동' },
        { id: 'dohwa', name: '도화동' }, { id: 'ahyeon', name: '아현동' }, { id: 'seongsan', name: '성산동' }
      ]
    },
    'yongsan': {
      id: 'yongsan', name: '용산구',
      dongs: [
        { id: 'itaewon', name: '이태원동' }, { id: 'hannam', name: '한남동' }, { id: 'yongsan-dong', name: '용산동' },
        { id: 'ichon', name: '이촌동' }, { id: 'huam', name: '후암동' }, { id: 'cheongpa', name: '청파동' },
        { id: 'wonhyoro', name: '원효로동' }, { id: 'hangangro', name: '한강로동' }
      ]
    },
    'yeongdeungpo': {
      id: 'yeongdeungpo', name: '영등포구',
      dongs: [
        { id: 'yeouido', name: '여의도동' }, { id: 'yeongdeungpo-dong', name: '영등포동' }, { id: 'dangsan', name: '당산동' },
        { id: 'mullae', name: '문래동' }, { id: 'yangpyeong', name: '양평동' }, { id: 'singil', name: '신길동' }, { id: 'daerim', name: '대림동' }
      ]
    },
    'jung-gu-seoul': {
      id: 'jung-gu-seoul', name: '중구',
      dongs: [
        { id: 'myeong-dong', name: '명동' }, { id: 'euljiro', name: '을지로동' }, { id: 'sogong', name: '소공동' },
        { id: 'sindang', name: '신당동' }, { id: 'hwanghak', name: '황학동' }, { id: 'jungnim', name: '중림동' }
      ]
    },
    'jongno': {
      id: 'jongno', name: '종로구',
      dongs: [
        { id: 'jongno-dong', name: '종로동' }, { id: 'hyehwa', name: '혜화동' }, { id: 'pyeongchang', name: '평창동' },
        { id: 'samcheong', name: '삼청동' }, { id: 'gahoe', name: '가회동' }, { id: 'changsin', name: '창신동' }
      ]
    },
    'seongdong': {
      id: 'seongdong', name: '성동구',
      dongs: [
        { id: 'seongsu', name: '성수동' }, { id: 'wangsimni', name: '왕십리동' }, { id: 'oksu', name: '옥수동' },
        { id: 'geumho', name: '금호동' }, { id: 'haengdang', name: '행당동' }, { id: 'majaang', name: '마장동' }
      ]
    },
    'gwangjin': {
      id: 'gwangjin', name: '광진구',
      dongs: [
        { id: 'guui', name: '구의동' }, { id: 'jayang', name: '자양동' }, { id: 'hwwayang', name: '화양동' },
        { id: 'gunja', name: '군자동' }, { id: 'junggok', name: '중곡동' }, { id: 'gwangjang', name: '광장동' }
      ]
    },
    'dongdaemun': {
      id: 'dongdaemun', name: '동대문구',
      dongs: [
        { id: 'dapsimni', name: '답십리동' }, { id: 'jangang', name: '장안동' }, { id: 'jeonnong', name: '전농동' },
        { id: 'hoegi', name: '회기동' }, { id: 'imun', name: '이문동' }, { id: 'yongsin', name: '용신동' }
      ]
    },
    'jungnang': {
      id: 'jungnang', name: '중랑구',
      dongs: [
        { id: 'myeonmok', name: '면목동' }, { id: 'sangbong', name: '상봉동' }, { id: 'junghwa', name: '중화동' },
        { id: 'mukdong', name: '묵동' }, { id: 'sinnae', name: '신내동' }, { id: 'mangwoo', name: '망우동' }
      ]
    },
    'seongbuk': {
      id: 'seongbuk', name: '성북구',
      dongs: [
        { id: 'seongbuk-dong', name: '성북동' }, { id: 'gireum', name: '길음동' }, { id: 'donam', name: '돈암동' },
        { id: 'wolkok', name: '월곡동' }, { id: 'jangwi', name: '장위동' }, { id: 'jeongneung', name: '정릉동' }, { id: 'anam', name: '안암동' }
      ]
    },
    'gangbuk': {
      id: 'gangbuk', name: '강북구',
      dongs: [
        { id: 'mia', name: '미아동' }, { id: 'suyu', name: '수유동' }, { id: 'beon-dong', name: '번동' }, { id: 'ui-dong', name: '우이동' }
      ]
    },
    'dobong': {
      id: 'dobong', name: '도봉구',
      dongs: [
        { id: 'ssangmun', name: '쌍문동' }, { id: 'banghak', name: '방학동' }, { id: 'chang-dong', name: '창동' }, { id: 'dobong-dong', name: '도봉동' }
      ]
    },
    'nowon': {
      id: 'nowon', name: '노원구',
      dongs: [
        { id: 'sanggye', name: '상계동' }, { id: 'junggye', name: '중계동' }, { id: 'hagye', name: '하계동' },
        { id: 'gongneung', name: '공릉동' }, { id: 'wolgye', name: '월계동' }
      ]
    },
    'eunpyeong': {
      id: 'eunpyeong', name: '은평구',
      dongs: [
        { id: 'bulgwang', name: '불광동' }, { id: 'galhyeon', name: '갈현동' }, { id: 'nokbeon', name: '녹번동' },
        { id: 'eungam', name: '응암동' }, { id: 'yeonsinnae', name: '대조동' }, { id: 'yeokchon', name: '역촌동' }, { id: 'susaek', name: '수색동' }
      ]
    },
    'seodaemun': {
      id: 'seodaemun', name: '서대문구',
      dongs: [
        { id: 'sinchon', name: '신촌동' }, { id: 'yeonhui', name: '연희동' }, { id: 'hongje', name: '홍제동' },
        { id: 'hongun', name: '홍은동' }, { id: 'namgajwa', name: '남가좌동' }, { id: 'bukgajwa', name: '북가좌동' }
      ]
    },
    'yangcheon': {
      id: 'yangcheon', name: '양천구',
      dongs: [
        { id: 'mokdong', name: '목동' }, { id: 'sinjeong', name: '신정동' }, { id: 'sinwol', name: '신월동' }
      ]
    },
    'gangseo': {
      id: 'gangseo', name: '강서구',
      dongs: [
        { id: 'hwagok', name: '화곡동' }, { id: 'magok', name: '마곡동' }, { id: 'balsan', name: '발산동' },
        { id: 'deungchon', name: '등촌동' }, { id: 'gayang', name: '가양동' }, { id: 'banghwa', name: '방화동' }, { id: 'gonghang', name: '공항동' }
      ]
    },
    'guro': {
      id: 'guro', name: '구로구',
      dongs: [
        { id: 'guro-dong', name: '구로동' }, { id: 'sindorim', name: '신도림동' }, { id: 'gaebong', name: '개봉동' },
        { id: 'gocheok', name: '고척동' }, { id: 'oryu', name: '오류동' }, { id: 'hangdong', name: '항동' }
      ]
    },
    'geumcheon': {
      id: 'geumcheon', name: '금천구',
      dongs: [
        { id: 'gasan', name: '가산동' }, { id: 'doksan', name: '독산동' }, { id: 'siheung', name: '시흥동' }
      ]
    },
    'dongjak': {
      id: 'dongjak', name: '동작구',
      dongs: [
        { id: 'noryangjin', name: '노량진동' }, { id: 'sangdo', name: '상도동' }, { id: 'sadang', name: '사당동' },
        { id: 'heukseok', name: '흑석동' }, { id: 'daebang', name: '대방동' }, { id: 'sindaebang', name: '신대방동' }
      ]
    },
    'gwanak': {
      id: 'gwanak', name: '관악구',
      dongs: [
        { id: 'sillim', name: '신림동' }, { id: 'bongcheon', name: '봉천동' }, { id: 'nakseongdae', name: '낙성대동' },
        { id: 'sillim-main', name: '서원동' }, { id: 'inheon', name: '인헌동' }, { id: 'daehak', name: '대학동' }
      ]
    }
  }),

  // 2. 인천광역시
  createRegionTree('incheon', '인천광역시', {
    'bupyeong': {
      id: 'bupyeong', name: '부평구',
      dongs: [
        { id: 'bupyeong-dong', name: '부평동' }, { id: 'samsan', name: '삼산동' }, { id: 'sangok', name: '산곡동' },
        { id: 'cheongcheon', name: '청천동' }, { id: 'galsan', name: '갈산동' }, { id: 'bugae', name: '부개동' }, { id: 'sipjeong', name: '십정동' }
      ]
    },
    'namdong': {
      id: 'namdong', name: '남동구',
      dongs: [
        { id: 'guwol', name: '구월동' }, { id: 'ganseok', name: '간석동' }, { id: 'mansu', name: '만수동' },
        { id: 'nonhyeon-incheon', name: '논현동' }, { id: 'seochang', name: '서창동' }, { id: 'nonhyeon-gojan', name: '고잔동' }
      ]
    },
    'yeonsu': {
      id: 'yeonsu', name: '연수구',
      dongs: [
        { id: 'songdo', name: '송도동' }, { id: 'yeonsu-dong', name: '연수동' }, { id: 'dongchun', name: '동춘동' },
        { id: 'cheonghak', name: '청학동' }, { id: 'okryeon', name: '옥련동' }, { id: 'seonhak', name: '선학동' }
      ]
    },
    'seo-gu-incheon': {
      id: 'seo-gu-incheon', name: '서구',
      dongs: [
        { id: 'cheongna', name: '청라동' }, { id: 'geomdan', name: '검단동' }, { id: 'luwon', name: '가정동' },
        { id: 'sim-gok', name: '심곡동' }, { id: 'yeenhui', name: '연희동' }, { id: 'wang-gil', name: '왕길동' }, { id: 'majeon', name: '마전동' }
      ]
    },
    'michuhol': {
      id: 'michuhol', name: '미추홀구',
      dongs: [
        { id: 'juan', name: '주안동' }, { id: 'yonghyeon', name: '용현동' }, { id: 'dohwa-incheon', name: '도화동' },
        { id: 'sungui', name: '숭의동' }, { id: 'hakik', name: '학익동' }, { id: 'gwangyo', name: '관교동' }
      ]
    },
    'gyeyang': {
      id: 'gyeyang', name: '계양구',
      dongs: [
        { id: 'gyesan', name: '계산동' }, { id: 'jakjeon', name: '작전동' }, { id: 'hyoseong', name: '효성동' }, { id: 'imhak', name: '임학동' }
      ]
    },
    'jung-gu-incheon': {
      id: 'jung-gu-incheon', name: '중구',
      dongs: [
        { id: 'yeongjong', name: '영종동' }, { id: 'unseo', name: '운서동' }, { id: 'jungsi', name: '중산동' }, { id: 'sinpo', name: '신포동' }
      ]
    }
  }),

  // 3. 경기도
  createRegionTree('gyeonggi', '경기도', {
    'suwon': {
      id: 'suwon', name: '수원시',
      dongs: [
        { id: 'ingye', name: '인계동' }, { id: 'gwanggyo', name: '광교동' }, { id: 'yeongtong', name: '영통동' },
        { id: 'maetan', name: '매탄동' }, { id: 'mangpo', name: '망포동' }, { id: 'jeongja-suwon', name: '정자동' },
        { id: 'gwonseon', name: '권선동' }, { id: 'godeung', name: '고등동' }, { id: 'hwaso', name: '화서동' }
      ]
    },
    'seongnam': {
      id: 'seongnam', name: '성남시',
      dongs: [
        { id: 'bundang', name: '분당동' }, { id: 'pangyo', name: '판교동' }, { id: 'jeongja', name: '정자동' },
        { id: 'seohyeon', name: '서현동' }, { id: 'yatap', name: '야탑동' }, { id: 'moran', name: '성남동' },
        { id: 'wirye-seongnam', name: '위례동' }, { id: 'sunae', name: '수내동' }, { id: 'gumi-seongnam', name: '구미동' }
      ]
    },
    'yongin': {
      id: 'yongin', name: '용인시',
      dongs: [
        { id: 'suji', name: '풍덕천동' }, { id: 'jukjeon', name: '죽전동' }, { id: 'dongcheon', name: '동천동' },
        { id: 'giheung', name: '기흥동' }, { id: 'gugal', name: '구갈동' }, { id: 'bojeong', name: '보정동' },
        { id: 'cheoin', name: '역북동' }, { id: 'dongbaek', name: '동백동' }, { id: 'sanghyeon', name: '상현동' }
      ]
    },
    'goyang': {
      id: 'goyang', name: '고양시',
      dongs: [
        { id: 'ilsan', name: '일산동' }, { id: 'baekseok-goyang', name: '백석동' }, { id: 'madu', name: '마두동' },
        { id: 'juyeop', name: '주엽동' }, { id: 'daehwa', name: '대화동' }, { id: 'hwajeong', name: '화정동' },
        { id: 'haengsin', name: '행신동' }, { id: 'wondang', name: '성사동' }, { id: 'samsong', name: '삼송동' }
      ]
    },
    'hwaseong': {
      id: 'hwaseong', name: '화성시',
      dongs: [
        { id: 'dongtan-1', name: '동탄1동' }, { id: 'dongtan-2', name: '동탄2동' }, { id: 'byeongjeom', name: '병점동' },
        { id: 'hyangnam', name: '향남읍' }, { id: 'bongdam', name: '봉담읍' }, { id: 'namyang', name: '남양읍' }, { id: 'songsan', name: '새솔동' }
      ]
    },
    'bucheon': {
      id: 'bucheon', name: '부천시',
      dongs: [
        { id: 'jungdong-bucheon', name: '중동' }, { id: 'sangdong-bucheon', name: '상동' }, { id: 'simgok', name: '심곡동' },
        { id: 'sosabon', name: '소사본동' }, { id: 'goean', name: '괴안동' }, { id: 'wonjong', name: '원종동' }, { id: 'ogil', name: '옥길동' }
      ]
    },
    'pyeongtaek': {
      id: 'pyeongtaek', name: '평택시',
      dongs: [
        { id: 'godeok-pt', name: '고덕동' }, { id: 'bijeon', name: '비전동' }, { id: 'sejeong', name: '세교동' },
        { id: 'songtan', name: '서정동' }, { id: 'ansejung', name: '안중읍' }, { id: 'poseung', name: '포승읍' }, { id: 'sosabeol', name: '동삭동' }
      ]
    },
    'ansan': {
      id: 'ansan', name: '안산시',
      dongs: [
        { id: 'gojan-ansan', name: '고잔동' }, { id: 'jungang-ansan', name: '중앙동' }, { id: 'seonbu', name: '선부동' },
        { id: 'sangnoksu', name: '본오동' }, { id: 'sa-dong', name: '사동' }, { id: 'chogi', name: '초지동' }
      ]
    },
    'anyang': {
      id: 'anyang', name: '안양시',
      dongs: [
        { id: 'pyeongchon', name: '평촌동' }, { id: 'beomgye', name: '범계동' }, { id: 'anyang-dong', name: '안양동' },
        { id: 'gwanyang', name: '관양동' }, { id: 'bisan', name: '비산동' }, { id: 'hogeo', name: '호계동' }
      ]
    },
    'siheung': {
      id: 'siheung', name: '시흥시',
      dongs: [
        { id: 'baegot', name: '배곧동' }, { id: 'jeongwang', name: '정왕동' }, { id: 'eungye', name: '은행동' },
        { id: 'mokgam', name: '목감동' }, { id: 'janghyeon', name: '장현동' }, { id: 'daeya', name: '대야동' }
      ]
    },
    'gimpo': {
      id: 'gimpo', name: '김포시',
      dongs: [
        { id: 'gurae', name: '구래동' }, { id: 'masan', name: '마산동' }, { id: 'unyang', name: '운양동' },
        { id: 'janggi', name: '장기동' }, { id: 'sau', name: '사우동' }, { id: 'pungmu', name: '풍무동' }, { id: 'gochon', name: '고촌읍' }
      ]
    },
    'paju': {
      id: 'paju', name: '파주시',
      dongs: [
        { id: 'unjeong', name: '운정동' }, { id: 'yadang', name: '야당동' }, { id: 'geumchon', name: '금촌동' },
        { id: 'munsan', name: '문산읍' }, { id: 'gyoha', name: '교하동' }, { id: 'wollong', name: '월롱면' }
      ]
    },
    'uijeongbu': {
      id: 'uijeongbu', name: '의정부시',
      dongs: [
        { id: 'uijeongbu-dong', name: '의정부동' }, { id: 'howon', name: '호원동' }, { id: 'jangam', name: '장암동' },
        { id: 'sin-gok', name: '신곡동' }, { id: 'minrak', name: '민락동' }, { id: 'gosan', name: '고산동' }
      ]
    },
    'namyangju': {
      id: 'namyangju', name: '남양주시',
      dongs: [
        { id: 'dasan', name: '다산동' }, { id: 'byeollae', name: '별내동' }, { id: 'pyeongnae', name: '평내동' },
        { id: 'hopyeong', name: '호평동' }, { id: 'jinjeop', name: '진접읍' }, { id: 'wabu', name: '와부읍(덕소)' }, { id: 'onam', name: '오남읍' }
      ]
    },
    'hanam': {
      id: 'hanam', name: '하남시',
      dongs: [
        { id: 'misa', name: '미사동' }, { id: 'wirye-hanam', name: '위례동' }, { id: 'gam-il', name: '감일동' },
        { id: 'deokpung', name: '덕풍동' }, { id: 'sinjang', name: '신장동' }, { id: 'pungwon', name: '풍산동' }
      ]
    }
  }),

  // 4. 천안시
  createRegionTree('cheonan', '천안시', {
    'seobuk': {
      id: 'seobuk', name: '서북구',
      dongs: [
        { id: 'dujeong', name: '두정동' }, { id: 'buldang', name: '불당동' }, { id: 'baekseok', name: '백석동' },
        { id: 'seongjeong', name: '성정동' }, { id: 'ssangyong', name: '쌍용동' }, { id: 'jiksan', name: '직산읍' },
        { id: 'seonghwan', name: '성환읍' }, { id: 'ipjang', name: '입장면' }, { id: 'chalandang', name: '차암동' }
      ]
    },
    'dongnam': {
      id: 'dongnam', name: '동남구',
      dongs: [
        { id: 'sinbu', name: '신부동' }, { id: 'cheongsu', name: '청수동' }, { id: 'cheongdang', name: '청당동' },
        { id: 'bongmyeong-ca', name: '봉명동' }, { id: 'wonseong', name: '원성동' }, { id: 'sinbang', name: '신방동' },
        { id: 'samryong', name: '삼룡동' }, { id: 'mokcheon', name: '목천읍' }, { id: 'anseo', name: '안서동' }
      ]
    }
  }),

  // 5. 아산시
  createRegionTree('asan', '아산시', {
    'main': {
      id: 'main', name: '아산전역',
      dongs: [
        { id: 'baebang', name: '배방읍' }, { id: 'tangjeong', name: '탕정면' }, { id: 'oncheon', name: '온천동' },
        { id: 'yonghwa', name: '용화동' }, { id: 'monyeo', name: '모종동' }, { id: 'punggi', name: '풍기동' },
        { id: 'dunpo', name: '둔포면' }, { id: 'sinchang', name: '신창면' }, { id: 'eumbong', name: '음봉면' },
        { id: 'inju', name: '인주면' }, { id: 'dogo', name: '도고면' }, { id: 'yeombchi', name: '염치읍' }
      ]
    }
  }),

  // 6. 대전광역시
  createRegionTree('daejeon', '대전광역시', {
    'seo-gu-daejeon': {
      id: 'seo-gu-daejeon', name: '서구',
      dongs: [
        { id: 'dunsan', name: '둔산동' }, { id: 'galma', name: '갈마동' }, { id: 'wolpyeong', name: '월평동' },
        { id: 'tanbang', name: '탄방동' }, { id: 'goejeong', name: '괴정동' }, { id: 'mannyeon', name: '만년동' },
        { id: 'gwanjeo', name: '관저동' }, { id: 'gasuwon', name: '가수원동' }, { id: 'doan-seo', name: '도안동' }
      ]
    },
    'yuseong': {
      id: 'yuseong', name: '유성구',
      dongs: [
        { id: 'bongmyeong', name: '봉명동' }, { id: 'gwanpyeong', name: '관평동' }, { id: 'jijok', name: '지족동' },
        { id: 'noeun', name: '노은동' }, { id: 'banseok', name: '반석동' }, { id: 'jeonmin', name: '전민동' },
        { id: 'sinsung', name: '신성동' }, { id: 'wonsinheung', name: '원신흥동' }, { id: 'dorong', name: '도룡동' }
      ]
    },
    'jung-gu-daejeon': {
      id: 'jung-gu-daejeon', name: '중구',
      dongs: [
        { id: 'eunhaeng', name: '은행동' }, { id: 'daeheung', name: '대흥동' }, { id: 'seonhwa', name: '선화동' },
        { id: 'oryu', name: '오류동' }, { id: 'munhwa', name: '문화동' }, { id: 'yusa', name: '유천동' }, { id: 'taepyeong', name: '태평동' }
      ]
    },
    'dong-gu-daejeon': {
      id: 'dong-gu-daejeon', name: '동구',
      dongs: [
        { id: 'yongjeon', name: '용전동' }, { id: 'gaya', name: '가양동' }, { id: 'dae-dong', name: '대동' },
        { id: 'jayang-dj', name: '자양동' }, { id: 'panam', name: '판암동' }, { id: 'hongdo', name: '홍도동' }
      ]
    },
    'daedeok': {
      id: 'daedeok', name: '대덕구',
      dongs: [
        { id: 'songchon', name: '송촌동' }, { id: 'birae', name: '비래동' }, { id: 'jungri', name: '중리동' },
        { id: 'oen-dong', name: '오정동' }, { id: 'sintanjin', name: '신탄진동' }
      ]
    }
  }),

  // 7. 대구광역시
  createRegionTree('daegu', '대구광역시', {
    'suseong': {
      id: 'suseong', name: '수성구',
      dongs: [
        { id: 'beomeo', name: '범어동' }, { id: 'hwanggum', name: '황금동' }, { id: 'manchon', name: '만촌동' },
        { id: 'susan', name: '수성동' }, { id: 'jisan', name: '지산동' }, { id: 'beommul', name: '범물동' },
        { id: 'sinmae', name: '신매동' }, { id: 'siji', name: '시지동' }, { id: 'sang-dong', name: '상동' }, { id: 'dusan', name: '두산동' }
      ]
    },
    'jung-gu-daegu': {
      id: 'jung-gu-daegu', name: '중구',
      dongs: [
        { id: 'dongseongro', name: '동성로' }, { id: 'daebong', name: '대봉동' }, { id: 'namsan', name: '남산동' },
        { id: 'samdeok', name: '삼덕동' }, { id: 'bongsan', name: '봉산동' }, { id: 'gwanduk', name: '교동' }
      ]
    },
    'dong-gu-daegu': {
      id: 'dong-gu-daegu', name: '동구',
      dongs: [
        { id: 'sincheon-dg', name: '신천동' }, { id: 'sinam', name: '신암동' }, { id: 'hyomok', name: '효목동' },
        { id: 'yulha', name: '율하동' }, { id: 'bongmu', name: '이시아폴리스(봉무동)' }, { id: 'dongchon', name: '동촌동' }, { id: 'ansim', name: '안심동' }
      ]
    },
    'seo-gu-daegu': {
      id: 'seo-gu-daegu', name: '서구',
      dongs: [
        { id: 'naedang', name: '내당동' }, { id: 'bisan-dg', name: '비산동' }, { id: 'pyeongni', name: '평리동' }, { id: 'jungni', name: '중리동' }
      ]
    },
    'nam-gu-daegu': {
      id: 'nam-gu-daegu', name: '남구',
      dongs: [
        { id: 'daemyeong', name: '대명동' }, { id: 'ibong', name: '이천동' }, { id: 'bongdeok', name: '봉덕동' }
      ]
    },
    'buk-gu-daegu': {
      id: 'buk-gu-daegu', name: '북구',
      dongs: [
        { id: 'chilgok', name: '칠곡(동천동)' }, { id: 'taejeon', name: '태전동' }, { id: 'gumi-dg', name: '구암동' },
        { id: 'sangyeok', name: '산격동' }, { id: 'bokhyeon', name: '복현동' }, { id: 'chimsan', name: '침산동' }, { id: 'geonam', name: '고성동' }
      ]
    },
    'dalseo': {
      id: 'dalseo', name: '달서구',
      dongs: [
        { id: 'sangin', name: '상인동' }, { id: 'wolseong', name: '월성동' }, { id: 'jincheon', name: '진천동' },
        { id: 'bolli', name: '본리동' }, { id: 'gamsam', name: '감삼동' }, { id: 'duyu', name: '두류동' },
        { id: 'yongsan-dg', name: '용산동' }, { id: 'igok', name: '이곡동' }, { id: 'daegok', name: '대곡동' }
      ]
    },
    'dalseong': {
      id: 'dalseong', name: '달성군',
      dongs: [
        { id: 'dasa', name: '다사읍' }, { id: 'hwawon', name: '화원읍' }, { id: 'hyeonpung', name: '현풍읍' },
        { id: 'yuga', name: '유가읍' }, { id: 'okpo', name: '옥포읍' }, { id: 'gubi', name: '구지면' }
      ]
    }
  }),

  // 8. 구미시
  createRegionTree('gumi', '구미시', {
    'main': {
      id: 'main', name: '구미전역',
      dongs: [
        { id: 'indong', name: '인동' }, { id: 'jinpyeong', name: '진평동' }, { id: 'wonpyeong', name: '원평동' },
        { id: 'songjeong-gm', name: '송정동' }, { id: 'hyeonggok', name: '형곡동' }, { id: 'okgye', name: '옥계동' },
        { id: 'sandong', name: '산동읍' }, { id: 'gupo', name: '구포동' }, { id: 'hyeongeung', name: '황상동' },
        { id: 'sangmo', name: '상모동' }, { id: 'sagok', name: '사곡동' }, { id: 'sinpyeong-gm', name: '신평동' },
        { id: 'bisan-gm', name: '비산동' }, { id: 'gwangpyeong', name: '광평동' }, { id: 'bonggok', name: '봉곡동' },
        { id: 'doran', name: '도량동' }, { id: 'seonju', name: '선주원남동' }, { id: 'goa', name: '고아읍' }
      ]
    }
  }),

  // 9. 포항시
  createRegionTree('pohang', '포항시', {
    'buk-gu-pohang': {
      id: 'buk-gu-pohang', name: '북구',
      dongs: [
        { id: 'jukdo', name: '죽도동' }, { id: 'duho', name: '두호동' }, { id: 'jangseong', name: '장성동' },
        { id: 'yangdeok', name: '양덕동' }, { id: 'hwanho', name: '환호동' }, { id: 'changpo', name: '창포동' },
        { id: 'heunghae', name: '흥해읍' }, { id: 'chogok', name: '초곡지구' }, { id: 'yongheung', name: '용흥동' }, { id: 'uhyeon', name: '우현동' }
      ]
    },
    'nam-gu-pohang': {
      id: 'nam-gu-pohang', name: '남구',
      dongs: [
        { id: 'idaedong', name: '이동' }, { id: 'hyoja', name: '효자동' }, { id: 'daeam', name: '대이동' },
        { id: 'sangdo', name: '상도동' }, { id: 'haedo', name: '해도동' }, { id: 'songdo-ph', name: '송도동' },
        { id: 'yeonil', name: '연일읍' }, { id: 'ocheon', name: '오천읍' }, { id: 'donghae', name: '동해면' }, { id: 'jihaeng', name: '지곡동' }
      ]
    }
  }),

  // 10. 부산광역시
  createRegionTree('busan', '부산광역시', {
    'haeundae': {
      id: 'haeundae', name: '해운대구',
      dongs: [
        { id: 'udong', name: '우동(마린시티/센텀)' }, { id: 'jungdong-bs', name: '중동' }, { id: 'jwa-dong', name: '좌동(신시가지)' },
        { id: 'songjeong-bs', name: '송정동' }, { id: 'jaesong', name: '재송동' }, { id: 'banyeo', name: '반여동' }, { id: 'bansong', name: '반송동' }
      ]
    },
    'busanjin': {
      id: 'busanjin', name: '부산진구',
      dongs: [
        { id: 'seomyeon', name: '서면(부전동)' }, { id: 'bujeon', name: '부전동' }, { id: 'jeonpo', name: '전포동' },
        { id: 'yangjeong', name: '양정동' }, { id: 'kaya', name: '가야동' }, { id: 'gaegeum', name: '개금동' },
        { id: 'danggam', name: '당감동' }, { id: 'buam', name: '부암동' }, { id: 'choeup', name: '초읍동' }
      ]
    },
    'suyeong': {
      id: 'suyeong', name: '수영구',
      dongs: [
        { id: 'gwangan', name: '광안동' }, { id: 'millak', name: '민락동' }, { id: 'namcheon', name: '남천동' },
        { id: 'suyeong-dong', name: '수영동' }, { id: 'mangmi', name: '망미동' }
      ]
    },
    'nam-gu-busan': {
      id: 'nam-gu-busan', name: '남구',
      dongs: [
        { id: 'daeyeon', name: '대연동' }, { id: 'yongho', name: '용호동' }, { id: 'munhyeon', name: '문현동' },
        { id: 'gamman', name: '감만동' }, { id: 'woam', name: '우암동' }, { id: 'yongdang', name: '용당동' }
      ]
    },
    'dongnae': {
      id: 'dongnae', name: '동래구',
      dongs: [
        { id: 'myeongnyun', name: '명륜동' }, { id: 'oncheon-bs', name: '온천동' }, { id: 'sajik', name: '사직동' },
        { id: 'allak', name: '안락동' }, { id: 'myeongjang', name: '명장동' }, { id: 'sulan', name: '수안동' }
      ]
    },
    'geumjeong': {
      id: 'geumjeong', name: '금정구',
      dongs: [
        { id: 'jangjeon', name: '장전동(부산대)' }, { id: 'guseo', name: '구서동' }, { id: 'namsan-bs', name: '남산동' },
        { id: 'bugok', name: '부곡동' }, { id: 'cheongryong', name: '청룡동' }, { id: 'seodong', name: '서동' }
      ]
    },
    'yeonje': {
      id: 'yeonje', name: '연제구',
      dongs: [
        { id: 'yeonsan', name: '연산동' }, { id: 'geoje', name: '거제동' }
      ]
    },
    'gangseo-busan': {
      id: 'gangseo-busan', name: '강서구',
      dongs: [
        { id: 'myeongji', name: '명지국제신도시' }, { id: 'sinho', name: '신호동' }, { id: 'jiang', name: '지사동' },
        { id: 'daejeo', name: '대저동' }, { id: 'noksan', name: '녹산동' }, { id: 'gangdong-bs', name: '강동동' }
      ]
    },
    'sasang': {
      id: 'sasang', name: '사상구',
      dongs: [
        { id: 'gwaebeop', name: '괘법동(사상역)' }, { id: 'gamjeon', name: '감전동' }, { id: 'jurye', name: '주례동' },
        { id: 'haksang', name: '학장동' }, { id: 'eomgung', name: '엄궁동' }, { id: 'mora', name: '모라동' }, { id: 'deokpo', name: '덕포동' }
      ]
    },
    'saha': {
      id: 'saha', name: '사하구',
      dongs: [
        { id: 'hadan', name: '하단동' }, { id: 'dangni', name: '당리동' }, { id: 'goejeong-bs', name: '괴정동' },
        { id: 'dadae', name: '다대포(다대동)' }, { id: 'jangrim', name: '장림동' }, { id: 'sinpyeong-bs', name: '신평동' }
      ]
    },
    'jung-gu-busan': {
      id: 'jung-gu-busan', name: '중구',
      dongs: [
        { id: 'nampo', name: '남포동' }, { id: 'gwangbok', name: '광복동' }, { id: 'jungang-bs', name: '중앙동' }, { id: 'bosu', name: '보수동' }
      ]
    },
    'seo-gu-busan': {
      id: 'seo-gu-busan', name: '서구',
      dongs: [
        { id: 'songdo-beach', name: '암남동(송도)' }, { id: 'chobang', name: '충무동' }, { id: 'dongdaesin', name: '동대신동' }, { id: 'seodaesin', name: '서대신동' }
      ]
    },
    'dong-gu-busan': {
      id: 'dong-gu-busan', name: '동구',
      dongs: [
        { id: 'choryang', name: '초량동(부산역)' }, { id: 'sujeong', name: '수정동' }, { id: 'jwacheon', name: '좌천동' }, { id: 'beomil', name: '범일동' }
      ]
    },
    'buk-gu-busan': {
      id: 'buk-gu-busan', name: '북구',
      dongs: [
        { id: 'deokcheon', name: '덕천동' }, { id: 'hwamyeong', name: '화명동' }, { id: 'mandeok', name: '만덕동' }, { id: 'gupo-bs', name: '구포동' }
      ]
    },
    'yeongdo': {
      id: 'yeongdo', name: '영도구',
      dongs: [
        { id: 'bongnae', name: '봉래동' }, { id: 'namhang', name: '남항동' }, { id: 'yeongseon', name: '영선동' }, { id: 'dongsam', name: '동삼동' }
      ]
    },
    'gijang': {
      id: 'gijang', name: '기장군',
      dongs: [
        { id: 'jeonggwan', name: '정관읍' }, { id: 'gijang-eup', name: '기장읍' }, { id: 'ilan', name: '일광읍' }, { id: 'jangan', name: '장안읍' }
      ]
    }
  }),

  // 11. 제주특별자치도
  createRegionTree('jeju', '제주특별자치도', {
    'jeju-si': {
      id: 'jeju-si', name: '제주시',
      dongs: [
        { id: 'yeon-dong', name: '연동(신제주)' }, { id: 'nohyeong', name: '노형동' }, { id: 'ara', name: '아라동' },
        { id: 'ido', name: '이도동' }, { id: 'samdo', name: '삼도동' }, { id: 'ildo', name: '일도동' },
        { id: 'yongdam', name: '용담동' }, { id: 'geonip', name: '건입동' }, { id: 'hwayang-jj', name: '화북동' },
        { id: 'samyang', name: '삼양동' }, { id: 'ora', name: '오라동' }, { id: 'oedobon', name: '외도동' },
        { id: 'aewol', name: '애월읍' }, { id: 'hallim', name: '한림읍' }, { id: 'jocheon', name: '조천읍' },
        { id: 'guwa', name: '구좌읍' }, { id: 'hangyeong', name: '한경면' }
      ]
    },
    'seogwipo-si': {
      id: 'seogwipo-si', name: '서귀포시',
      dongs: [
        { id: 'seogwi', name: '서귀동' }, { id: 'donghong', name: '동홍동' }, { id: 'seohong', name: '서홍동' },
        { id: 'jungmun', name: '중문동' }, { id: 'daeryun', name: '대륜동' }, { id: 'daejeong', name: '대정읍(영어도시)' },
        { id: 'namwon', name: '남원읍' }, { id: 'seongsan', name: '성산읍' }, { id: 'andeok', name: '안덕면' }, { id: 'pyoseon', name: '표선면' }
      ]
    }
  })
];