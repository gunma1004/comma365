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
  // 1. 서울특별시 (25개 자치구 전체 반영)
  createRegionTree('seoul', '서울특별시', {
    'jongno': {
      id: 'jongno', name: '종로구',
      dongs: [
        { id: 'jongno-dong', name: '종로동' }, { id: 'hyehwa', name: '혜화동' }, { id: 'pyeongchang', name: '평창동' },
        { id: 'samcheong', name: '삼청동' }, { id: 'gahoe', name: '가회동' }, { id: 'changsin', name: '창신동' }
      ]
    },
    'jung-gu-seoul': {
      id: 'jung-gu-seoul', name: '중구',
      dongs: [
        { id: 'myeong-dong', name: '명동' }, { id: 'euljiro', name: '을지로동' }, { id: 'sogong', name: '소공동' },
        { id: 'sindang', name: '신당동' }, { id: 'hwanghak', name: '황학동' }, { id: 'jungnim', name: '중림동' }
      ]
    },
    'yongsan': {
      id: 'yongsan', name: '용산구',
      dongs: [
        { id: 'itaewon', name: '이태원동' }, { id: 'hannam', name: '한남동' }, { id: 'yongsan-dong', name: '용산동' },
        { id: 'ichon', name: '이촌동' }, { id: 'huam', name: '후암동' }, { id: 'cheongpa', name: '청파동' }
      ]
    },
    'seongdong': {
      id: 'seongdong', name: '성동구',
      dongs: [
        { id: 'seongsu', name: '성수동' }, { id: 'wangsimni', name: '왕십리동' }, { id: 'oksu', name: '옥수동' },
        { id: 'geumho', name: '금호동' }, { id: 'haengdang', name: '행당동' }, { id: 'majang', name: '마장동' }
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
        { id: 'wolkok', name: '월곡동' }, { id: 'jangwi', name: '장위동' }, { id: 'jeongneung', name: '정릉동' }
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
        { id: 'eungam', name: '응암동' }, { id: 'yeokchon', name: '역촌동' }, { id: 'susaek', name: '수색동' }
      ]
    },
    'seodaemun': {
      id: 'seodaemun', name: '서대문구',
      dongs: [
        { id: 'sinchon', name: '신촌동' }, { id: 'yeonhui', name: '연희동' }, { id: 'hongje', name: '홍제동' },
        { id: 'hongun', name: '홍은동' }, { id: 'namgajwa', name: '남가좌동' }, { id: 'bukgajwa', name: '북가좌동' }
      ]
    },
    'mapo': {
      id: 'mapo', name: '마포구',
      dongs: [
        { id: 'seogyo', name: '서교동' }, { id: 'hapjeong', name: '합정동' }, { id: 'yeonnam', name: '연남동' },
        { id: 'sangam', name: '상암동' }, { id: 'mangwon', name: '망원동' }, { id: 'gongdeok', name: '공덕동' }
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
        { id: 'deungchon', name: '등촌동' }, { id: 'gayang', name: '가양동' }, { id: 'banghwa', name: '방화동' }
      ]
    },
    'guro': {
      id: 'guro', name: '구로구',
      dongs: [
        { id: 'guro-dong', name: '구로동' }, { id: 'sindorim', name: '신도림동' }, { id: 'gaebong', name: '개봉동' },
        { id: 'gocheok', name: '고척동' }, { id: 'oryu', name: '오류동' }
      ]
    },
    'geumcheon': {
      id: 'geumcheon', name: '금천구',
      dongs: [
        { id: 'gasan', name: '가산동' }, { id: 'doksan', name: '독산동' }, { id: 'siheung', name: '시흥동' }
      ]
    },
    'yeongdeungpo': {
      id: 'yeongdeungpo', name: '영등포구',
      dongs: [
        { id: 'yeouido', name: '여의도동' }, { id: 'yeongdeungpo-dong', name: '영등포동' }, { id: 'dangsan', name: '당산동' },
        { id: 'mullae', name: '문래동' }, { id: 'yangpyeong', name: '양평동' }, { id: 'singil', name: '신길동' }
      ]
    },
    'dongjak': {
      id: 'dongjak', name: '동작구',
      dongs: [
        { id: 'noryangjin', name: '노량진동' }, { id: 'sangdo', name: '상도동' }, { id: 'sadang', name: '사당동' },
        { id: 'heukseok', name: '흑석동' }, { id: 'daebang', name: '대방동' }
      ]
    },
    'gwanak': {
      id: 'gwanak', name: '관악구',
      dongs: [
        { id: 'sillim', name: '신림동' }, { id: 'bongcheon', name: '봉천동' }, { id: 'nakseongdae', name: '낙성대동' }
      ]
    },
    'seocho': {
      id: 'seocho', name: '서초구',
      dongs: [
        { id: 'seocho-dong', name: '서초동' }, { id: 'banpo', name: '반포동' }, { id: 'jamwon', name: '잠원동' },
        { id: 'yangjae', name: '양재동' }, { id: 'bangbae', name: '방배동' }
      ]
    },
    'gangnam': {
      id: 'gangnam', name: '강남구',
      dongs: [
        { id: 'yeoksam', name: '역삼동' }, { id: 'nonhyeon', name: '논현동' }, { id: 'samsung', name: '삼성동' },
        { id: 'cheongdam', name: '청담동' }, { id: 'daechi', name: '대치동' }, { id: 'sinsa', name: '신사동' }
      ]
    },
    'songpa': {
      id: 'songpa', name: '송파구',
      dongs: [
        { id: 'jamsil', name: '잠실동' }, { id: 'bangi', name: '방이동' }, { id: 'songpa-dong', name: '송파동' },
        { id: 'seokchon', name: '석촌동' }, { id: 'garak', name: '가락동' }, { id: 'munjeong', name: '문정동' }
      ]
    },
    'gangdong': {
      id: 'gangdong', name: '강동구',
      dongs: [
        { id: 'cheonho', name: '천호동' }, { id: 'gildong', name: '길동' }, { id: 'myeongil', name: '명일동' },
        { id: 'godeok', name: '고덕동' }, { id: 'amasa', name: '암사동' }, { id: 'seongnae', name: '성내동' }
      ]
    }
  }),

  // 2. 인천광역시 (제물포구, 영종구 및 요청하신 군/구 반영)
  createRegionTree('incheon', '인천광역시', {
    'jemulpo': {
      id: 'jemulpo', name: '제물포구',
      dongs: [
        { id: 'sinpo', name: '신포동' }, { id: 'sungui', name: '숭의동' }, { id: 'manseok', name: '만석동' }
      ]
    },
    'yeongjong': {
      id: 'yeongjong', name: '영종구',
      dongs: [
        { id: 'unseo', name: '운서동' }, { id: 'yeongjong-dong', name: '영종동' }, { id: 'jungsi', name: '중산동' }
      ]
    },
    'michuhol': {
      id: 'michuhol', name: '미추홀구',
      dongs: [
        { id: 'juan', name: '주안동' }, { id: 'yonghyeon', name: '용현동' }, { id: 'hakik', name: '학익동' }
      ]
    },
    'yeonsu': {
      id: 'yeonsu', name: '연수구',
      dongs: [
        { id: 'songdo', name: '송도동' }, { id: 'yeonsu-dong', name: '연수동' }, { id: 'dongchun', name: '동춘동' }
      ]
    },
    'namdong': {
      id: 'namdong', name: '남동구',
      dongs: [
        { id: 'guwol', name: '구월동' }, { id: 'ganseok', name: '간석동' }, { id: 'mansu', name: '만수동' }
      ]
    },
    'bupyeong': {
      id: 'bupyeong', name: '부평구',
      dongs: [
        { id: 'bupyeong-dong', name: '부평동' }, { id: 'samsan', name: '삼산동' }, { id: 'sangok', name: '산곡동' }
      ]
    },
    'gyeyang': {
      id: 'gyeyang', name: '계양구',
      dongs: [
        { id: 'gyesan', name: '계산동' }, { id: 'jakjeon', name: '작전동' }, { id: 'hyoseong', name: '효성동' }
      ]
    },
    'seo-gu-incheon': {
      id: 'seo-gu-incheon', name: '서구',
      dongs: [
        { id: 'cheongna', name: '청라동' }, { id: 'geomam', name: '검암동' }
      ]
    },
    'geomdan': {
      id: 'geomdan', name: '검단구',
      dongs: [
        { id: 'majeon', name: '마전동' }, { id: 'bullo', name: '불로동' }, { id: 'dangha', name: '당하동' }
      ]
    },
    'ganghwa': {
      id: 'ganghwa', name: '강화군',
      dongs: [
        { id: 'ganghwa-eup', name: '강화읍' }, { id: 'onam-gh', name: '선원면' }
      ]
    },
    'ongjin': {
      id: 'ongjin', name: '옹진군',
      dongs: [
        { id: 'bukdo', name: '북도면' }, { id: 'yeonpyeong', name: '연평면' }
      ]
    }
  }),

  // 3. 경기도 (수원, 성남, 고양, 용인, 부천, 안양, 안산의 구 단위 분할 및 전체 시·군 반영)
  createRegionTree('gyeonggi', '경기도', {
    // 수원시 (4개 구)
    'suwon-jangan': { id: 'suwon-jangan', name: '수원시 장안구', dongs: [{ id: 'paeng-suwon', name: '영화동' }, { id: 'song-suwon', name: '조원동' }] },
    'suwon-gwonseon': { id: 'suwon-gwonseon', name: '수원시 권선구', dongs: [{ id: 'gwonseon-dong', name: '권선동' }, { id: 'gok-suwon', name: '곡반정동' }] },
    'suwon-paldal': { id: 'suwon-paldal', name: '수원시 팔달구', dongs: [{ id: 'haenggung', name: '행궁동' }, { id: 'in-suwon', name: '인계동' }] },
    'suwon-yeongtong': { id: 'suwon-yeongtong', name: '수원시 영통구', dongs: [{ id: 'yeongtong-dong', name: '영통동' }, { id: 'gwanggyo-dong', name: '광교동' }] },

    // 성남시 (3개 구)
    'seongnam-sujeong': { id: 'seongnam-sujeong', name: '성남시 수정구', dongs: [{ id: 'sinheung-sn', name: '신흥동' }, { id: 'taepyeong-sn', name: '태평동' }] },
    'seongnam-jungwon': { id: 'seongnam-jungwon', name: '성남시 중원구', dongs: [{ id: 'seongnam-dong', name: '성남동' }, { id: 'daewon', name: '대원동' }] },
    'seongnam-bundang': { id: 'seongnam-bundang', name: '성남시 분당구', dongs: [{ id: 'seohyeon-dong', name: '서현동' }, { id: 'jeongja-dong', name: '정자동' }, { id: 'pangyo-dong', name: '판교동' }] },

    // 의정부시
    'uijeongbu': { id: 'uijeongbu', name: '의정부시', dongs: [{ id: 'uijeongbu-dong', name: '의정부동' }, { id: 'howon-dong', name: '호원동' }] },

    // 안양시 (2개 구)
    'anyang-manan': { id: 'anyang-manan', name: '안양시 만안구', dongs: [{ id: 'anyang-dong', name: '안양동' }, { id: 'seoksu-dong', name: '석수동' }] },
    'anyang-dongan': { id: 'anyang-dongan', name: '안양시 동안구', dongs: [{ id: 'pyeongchon-dong', name: '평촌동' }, { id: 'beomgye-dong', name: '범계동' }] },

    // 부천시 (3개 구)
    'bucheon-wonmi': { id: 'bucheon-wonmi', name: '부천시 원미구', dongs: [{ id: 'simgok-bc', name: '심곡동' }, { id: 'jung-bc', name: '중동' }] },
    'bucheon-sosa': { id: 'bucheon-sosa', name: '부천시 소사구', dongs: [{ id: 'sosabon-dong', name: '소사본동' }, { id: 'yeokgok-bc', name: '역곡동' }] },
    'bucheon-ojeong': { id: 'bucheon-ojeong', name: '부천시 오정구', dongs: [{ id: 'ogjeong-dong', name: '오정동' }, { id: 'wonjong-dong', name: '원종동' }] },

    // 광명시
    'gwangmyeong': { id: 'gwangmyeong', name: '광명시', dongs: [{ id: 'gwangmyeong-dong', name: '광명동' }, { id: 'cheolsan-dong', name: '철산동' }] },

    // 평택시
    'pyeongtaek': { id: 'pyeongtaek', name: '평택시', dongs: [{ id: 'bijeon-dong', name: '비전동' }, { id: 'godeok-dong', name: '고덕동' }] },

    // 동두천시
    'dongducheon': { id: 'dongducheon', name: '동두천시', dongs: [{ id: 'haenghwa', name: '생연동' }, { id: 'bosan-dong', name: '보산동' }] },

    // 안산시 (2개 구)
    'ansan-sangnok': { id: 'ansan-sangnok', name: '안산시 상록구', dongs: [{ id: 'bono-dong', name: '본오동' }, { id: '사동-as', name: '사동' }] },
    'ansan-danwon': { id: 'ansan-danwon', name: '안산시 단원구', dongs: [{ id: 'gojan-dong', name: '고잔동' }, { id: 'wongok-dong', name: '원곡동' }] },

    // 고양시 (3개 구)
    'goyang-deokyang': { id: 'goyang-deokyang', name: '고양시 덕양구', dongs: [{ id: 'hwajeong-dong', name: '화정동' }, { id: 'samsong-dong', name: '삼송동' }] },
    'goyang-ilsandong': { id: 'goyang-ilsandong', name: '고양시 일산동구', dongs: [{ id: 'baekseok-dong', name: '백석동' }, { id: 'madu-dong', name: '마두동' }] },
    'goyang-ilsanseo': { id: 'goyang-ilsanseo', name: '고양시 일산서구', dongs: [{ id: 'juyeop-dong', name: '주엽동' }, { id: 'daehwa-dong', name: '대화동' }] },

    // 과천시
    'gwacheon': { id: 'gwacheon', name: '과천시', dongs: [{ id: 'gwacheon-dong', name: '과천동' }, { id: 'jungang-gc', name: '중앙동' }] },

    // 구리시
    'guri': { id: 'guri', name: '구리시', dongs: [{ id: 'insang-dong', name: '인창동' }, { id: 'tosel-dong', name: '토평동' }] },

    // 남양주시
    'namyangju': { id: 'namyangju', name: '남양주시', dongs: [{ id: 'dasan-dong', name: '다산동' }, { id: 'byeollae-dong', name: '별내동' }] },

    // 오산시
    'osan': { id: 'osan', name: '오산시', dongs: [{ id: 'osandong', name: '오산동' }, { id: 'seongho-dong', name: '원동' }] },

    // 시흥시
    'siheung': { id: 'siheung', name: '시흥시', dongs: [{ id: 'baegot-dong', name: '배곧동' }, { id: 'jeongwang-dong', name: '정왕동' }] },

    // 군포시
    'gunpo': { id: 'gunpo', name: '군포시', dongs: [{ id: 'sanhon-dong', name: '산본동' }, { id: 'geumjeong-dong', name: '금정동' }] },

    // 의왕시
    'uiwang': { id: 'uiwang', name: '의왕시', dongs: [{ id: 'oen-dong', name: '오전동' }, { id: 'naeson-dong', name: '내손동' }] },

    // 하남시
    'hanam': { id: 'hanam', name: '하남시', dongs: [{ id: 'misa-dong', name: '미사동' }, { id: 'deokpung-dong', name: '덕풍동' }] },

    // 용인시 (3개 구)
    'yongin-cheoin': { id: 'yongin-cheoin', name: '용인시 처인구', dongs: [{ id: 'yeokbuk-dong', name: '역북동' }, { id: 'kimnyang', name: '김량장동' }] },
    'yongin-giheung': { id: 'yongin-giheung', name: '용인시 기흥구', dongs: [{ id: 'gugal-dong', name: '구갈동' }, { id: 'bojeong-dong', name: '보정동' }] },
    'yongin-suji': { id: 'yongin-suji', name: '용인시 수지구', dongs: [{ id: 'pungdeokcheon', name: '풍덕천동' }, { id: 'jukjeon-dong', name: '죽전동' }] },

    // 파주시
    'paju': { id: 'paju', name: '파주시', dongs: [{ id: 'unjeong-dong', name: '운정동' }, { id: 'geumchon-dong', name: '금촌동' }] },

    // 이천시
    'icheon': { id: 'icheon', name: '이천시', dongs: [{ id: 'changjeon-dong', name: '창전동' }, { id: '증포동', name: '증포동' }] },

    // 안성시
    'anseong': { id: 'anseong', name: '안성시', dongs: [{ id: 'gongdo-eup', name: '공도읍' }, { id: 'anseong-dong', name: '당왕동' }] },

    // 김포시
    'gimpo': { id: 'gimpo', name: '김포시', dongs: [{ id: 'gurae-dong', name: '구래동' }, { id: 'janggi-dong', name: '장기동' }] },

    // 화성시
    'hwaseong': { id: 'hwaseong', name: '화성시', dongs: [{ id: 'dongtan-1', name: '동탄1동' }, { id: 'dongtan-2', name: '동탄2동' }] },

    // 광주시
    'gwangju-gg': { id: 'gwangju-gg', name: '광주시', dongs: [{ id: 'yeok-dong', name: '역동' }, { id: 'taejeon-dong', name: '태전동' }] },

    // 양주시
    'yangju': { id: 'yangju', name: '양주시', dongs: [{ id: 'okjeong-dong', name: '옥정동' }, { id: 'hocheon-dong', name: '회천동' }] },

    // 포천시
    'pocheon': { id: 'pocheon', name: '포천시', dongs: [{ id: 'pocheon-dong', name: '포천동' }, { id: 'sonwoo', name: '소흘읍' }] },

    // 여주시
    'yeoju': { id: 'yeoju', name: '여주시', dongs: [{ id: 'yeoju-dong', name: '하동' }, { id: 'ohak', name: '오학동' }] },

    // 연천군
    'yeoncheon': { id: 'yeoncheon', name: '연천군', dongs: [{ id: 'yeoncheon-eup', name: '연천읍' }, { id: 'jeongok', name: '전곡읍' }] },

    // 가평군
    'gapyeong': { id: 'gapyeong', name: '가평군', dongs: [{ id: 'gapyeong-eup', name: '가평읍' }, { id: 'cheongpyeong', name: '청평면' }] },

    // 양평군
    'yangpyeong-gun': { id: 'yangpyeong-gun', name: '양평군', dongs: [{ id: 'yangpyeong-eup', name: '양평읍' }, { id: 'yongmun', name: '용문면' }] }
  })
];