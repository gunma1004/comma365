// data/regions.ts

export interface RegionItem {
  id: string;
  name: string;
  fullName: string;
  children?: RegionItem[];
}

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
  // 1. 서울특별시 (25개 자치구 전체)
  createRegionTree('seoul', '서울특별시', {
    'jongno': { id: 'jongno', name: '종로구', dongs: [{ id: 'jongno-dong', name: '종로동' }, { id: 'hyehwa', name: '혜화동' }, { id: 'pyeongchang', name: '평창동' }] },
    'jung-gu-seoul': { id: 'jung-gu-seoul', name: '중구', dongs: [{ id: 'myeong-dong', name: '명동' }, { id: 'euljiro', name: '을지로동' }, { id: 'sogong', name: '소공동' }] },
    'yongsan': { id: 'yongsan', name: '용산구', dongs: [{ id: 'itaewon', name: '이태원동' }, { id: 'hannam', name: '한남동' }, { id: 'ichon', name: '이촌동' }] },
    'seongdong': { id: 'seongdong', name: '성동구', dongs: [{ id: 'seongsu', name: '성수동' }, { id: 'wangsimni', name: '왕십리동' }, { id: 'oksu', name: '옥수동' }] },
    'gwangjin': { id: 'gwangjin', name: '광진구', dongs: [{ id: 'guui', name: '구의동' }, { id: 'jayang', name: '자양동' }, { id: 'hwwayang', name: '화양동' }] },
    'dongdaemun': { id: 'dongdaemun', name: '동대문구', dongs: [{ id: 'dapsimni', name: '답십리동' }, { id: 'jangang', name: '장안동' }, { id: 'hoegi', name: '회기동' }] },
    'jungnang': { id: 'jungnang', name: '중랑구', dongs: [{ id: 'myeonmok', name: '면목동' }, { id: 'sangbong', name: '상봉동' }, { id: 'junghwa', name: '중화동' }] },
    'seongbuk': { id: 'seongbuk', name: '성북구', dongs: [{ id: 'seongbuk-dong', name: '성북동' }, { id: 'gireum', name: '길음동' }, { id: 'donam', name: '돈암동' }] },
    'gangbuk': { id: 'gangbuk', name: '강북구', dongs: [{ id: 'mia', name: '미아동' }, { id: 'suyu', name: '수유동' }, { id: 'beon-dong', name: '번동' }] },
    'dobong': { id: 'dobong', name: '도봉구', dongs: [{ id: 'ssangmun', name: '쌍문동' }, { id: 'banghak', name: '방학동' }, { id: 'chang-dong', name: '창동' }] },
    'nowon': { id: 'nowon', name: '노원구', dongs: [{ id: 'sanggye', name: '상계동' }, { id: 'junggye', name: '중계동' }, { id: 'hagye', name: '하계동' }] },
    'eunpyeong': { id: 'eunpyeong', name: '은평구', dongs: [{ id: 'bulgwang', name: '불광동' }, { id: 'galhyeon', name: '갈현동' }, { id: 'eungam', name: '응암동' }] },
    'seodaemun': { id: 'seodaemun', name: '서대문구', dongs: [{ id: 'sinchon', name: '신촌동' }, { id: 'yeonhui', name: '연희동' }, { id: 'hongje', name: '홍제동' }] },
    'mapo': { id: 'mapo', name: '마포구', dongs: [{ id: 'seogyo', name: '서교동' }, { id: 'hapjeong', name: '합정동' }, { id: 'yeonnam', name: '연남동' }] },
    'yangcheon': { id: 'yangcheon', name: '양천구', dongs: [{ id: 'mokdong', name: '목동' }, { id: 'sinjeong', name: '신정동' }, { id: 'sinwol', name: '신월동' }] },
    'gangseo': { id: 'gangseo', name: '강서구', dongs: [{ id: 'hwagok', name: '화곡동' }, { id: 'magok', name: '마곡동' }, { id: 'balsan', name: '발산동' }] },
    'guro': { id: 'guro', name: '구로구', dongs: [{ id: 'guro-dong', name: '구로동' }, { id: 'sindorim', name: '신도림동' }, { id: 'gaebong', name: '개봉동' }] },
    'geumcheon': { id: 'geumcheon', name: '금천구', dongs: [{ id: 'gasan', name: '가산동' }, { id: 'doksan', name: '독산동' }, { id: 'siheung', name: '시흥동' }] },
    'yeongdeungpo': { id: 'yeongdeungpo', name: '영등포구', dongs: [{ id: 'yeouido', name: '여의도동' }, { id: 'dangsan', name: '당산동' }, { id: 'mullae', name: '문래동' }] },
    'dongjak': { id: 'dongjak', name: '동작구', dongs: [{ id: 'noryangjin', name: '노량진동' }, { id: 'sangdo', name: '상도동' }, { id: 'sadang', name: '사당동' }] },
    'gwanak': { id: 'gwanak', name: '관악구', dongs: [{ id: 'sillim', name: '신림동' }, { id: 'bongcheon', name: '봉천동' }, { id: 'nakseongdae', name: '낙성대동' }] },
    'seocho': { id: 'seocho', name: '서초구', dongs: [{ id: 'seocho-dong', name: '서초동' }, { id: 'banpo', name: '반포동' }, { id: 'jamwon', name: '잠원동' }] },
    'gangnam': { id: 'gangnam', name: '강남구', dongs: [{ id: 'yeoksam', name: '역삼동' }, { id: 'nonhyeon', name: '논현동' }, { id: 'samsung', name: '삼성동' }] },
    'songpa': { id: 'songpa', name: '송파구', dongs: [{ id: 'jamsil', name: '잠실동' }, { id: 'bangi', name: '방이동' }, { id: 'songpa-dong', name: '송파동' }] },
    'gangdong': { id: 'gangdong', name: '강동구', dongs: [{ id: 'cheonho', name: '천호동' }, { id: 'gildong', name: '길동' }, { id: 'myeongil', name: '명일동' }] }
  }),

  // 2. 인천광역시 (제물포구, 영종구, 검단구, 강화, 옹진 등 포함)
  createRegionTree('incheon', '인천광역시', {
    'jemulpo': { id: 'jemulpo', name: '제물포구', dongs: [{ id: 'sinpo', name: '신포동' }, { id: 'sungui', name: '숭의동' }] },
    'yeongjong': { id: 'yeongjong', name: '영종구', dongs: [{ id: 'unseo', name: '운서동' }, { id: 'jungsi', name: '중산동' }] },
    'michuhol': { id: 'michuhol', name: '미추홀구', dongs: [{ id: 'juan', name: '주안동' }, { id: 'yonghyeon', name: '용현동' }] },
    'yeonsu': { id: 'yeonsu', name: '연수구', dongs: [{ id: 'songdo', name: '송도동' }, { id: 'yeonsu-dong', name: '연수동' }] },
    'namdong': { id: 'namdong', name: '남동구', dongs: [{ id: 'guwol', name: '구월동' }, { id: 'ganseok', name: '간석동' }] },
    'bupyeong': { id: 'bupyeong', name: '부평구', dongs: [{ id: 'bupyeong-dong', name: '부평동' }, { id: 'samsan', name: '삼산동' }] },
    'gyeyang': { id: 'gyeyang', name: '계양구', dongs: [{ id: 'gyesan', name: '계산동' }, { id: 'jakjeon', name: '작전동' }] },
    'seo-gu-incheon': { id: 'seo-gu-incheon', name: '서구', dongs: [{ id: 'cheongna', name: '청라동' }] },
    'geomdan': { id: 'geomdan', name: '검단구', dongs: [{ id: 'majeon', name: '마전동' }, { id: 'dangha', name: '당하동' }] },
    'ganghwa': { id: 'ganghwa', name: '강화군', dongs: [{ id: 'ganghwa-eup', name: '강화읍' }] },
    'ongjin': { id: 'ongjin', name: '옹진군', dongs: [{ id: 'yeonpyeong', name: '연평면' }] }
  }),

  // 3. 경기도 (수원, 성남, 고양, 용인, 부천, 안양, 안산 세부 구 포함 전체 시·군)
  createRegionTree('gyeonggi', '경기도', {
    // 수원시 (4개 구)
    'suwon-jangan': { id: 'suwon-jangan', name: '수원시 장안구', dongs: [{ id: 'yeonghwa', name: '영화동' }, { id: 'jowon', name: '조원동' }] },
    'suwon-gwonseon': { id: 'suwon-gwonseon', name: '수원시 권선구', dongs: [{ id: 'gwonseon-dong', name: '권선동' }, { id: 'gokbanjeong', name: '곡반정동' }] },
    'suwon-paldal': { id: 'suwon-paldal', name: '수원시 팔달구', dongs: [{ id: 'haenggung', name: '행궁동' }, { id: 'in-suwon', name: '인계동' }] },
    'suwon-yeongtong': { id: 'suwon-yeongtong', name: '수원시 영통구', dongs: [{ id: 'yeongtong-dong', name: '영통동' }, { id: 'gwanggyo-dong', name: '광교동' }] },

    // 성남시 (3개 구)
    'seongnam-sujeong': { id: 'seongnam-sujeong', name: '성남시 수정구', dongs: [{ id: 'sinheung-sn', name: '신흥동' }, { id: 'taepyeong-sn', name: '태평동' }] },
    'seongnam-jungwon': { id: 'seongnam-jungwon', name: '성남시 중원구', dongs: [{ id: 'seongnam-dong', name: '성남동' }, { id: 'daewon', name: '대원동' }] },
    'seongnam-bundang': { id: 'seongnam-bundang', name: '성남시 분당구', dongs: [{ id: 'seohyeon-dong', name: '서현동' }, { id: 'jeongja-dong', name: '정자동' }, { id: 'pangyo-dong', name: '판교동' }] },

    // 고양시 (3개 구)
    'goyang-deokyang': { id: 'goyang-deokyang', name: '고양시 덕양구', dongs: [{ id: 'hwajeong-dong', name: '화정동' }, { id: 'samsong-dong', name: '삼송동' }] },
    'goyang-ilsandong': { id: 'goyang-ilsandong', name: '고양시 일산동구', dongs: [{ id: 'baekseok-dong', name: '백석동' }, { id: 'madu-dong', name: '마두동' }] },
    'goyang-ilsanseo': { id: 'goyang-ilsanseo', name: '고양시 일산서구', dongs: [{ id: 'juyeop-dong', name: '주엽동' }, { id: 'daehwa-dong', name: '대화동' }] },

    // 용인시 (3개 구)
    'yongin-cheoin': { id: 'yongin-cheoin', name: '용인시 처인구', dongs: [{ id: 'yeokbuk-dong', name: '역북동' }, { id: 'kimnyang', name: '김량장동' }] },
    'yongin-giheung': { id: 'yongin-giheung', name: '용인시 기흥구', dongs: [{ id: 'gugal-dong', name: '구갈동' }, { id: 'bojeong-dong', name: '보정동' }] },
    'yongin-suji': { id: 'yongin-suji', name: '용인시 수지구', dongs: [{ id: 'pungdeokcheon', name: '풍덕천동' }, { id: 'jukjeon-dong', name: '죽전동' }] },

    // 부천시 (3개 구)
    'bucheon-wonmi': { id: 'bucheon-wonmi', name: '부천시 원미구', dongs: [{ id: 'simgok-bc', name: '심곡동' }, { id: 'jung-bc', name: '중동' }] },
    'bucheon-sosa': { id: 'bucheon-sosa', name: '부천시 소사구', dongs: [{ id: 'sosabon-dong', name: '소사본동' }, { id: 'yeokgok-bc', name: '역곡동' }] },
    'bucheon-ojeong': { id: 'bucheon-ojeong', name: '부천시 오정구', dongs: [{ id: 'ogjeong-dong', name: '오정동' }, { id: 'wonjong-dong', name: '원종동' }] },

    // 안양시 (2개 구)
    'anyang-manan': { id: 'anyang-manan', name: '안양시 만안구', dongs: [{ id: 'anyang-dong', name: '안양동' }, { id: 'seoksu-dong', name: '석수동' }] },
    'anyang-dongan': { id: 'anyang-dongan', name: '안양시 동안구', dongs: [{ id: 'pyeongchon-dong', name: '평촌동' }, { id: 'beomgye-dong', name: '범계동' }] },

    // 안산시 (2개 구)
    'ansan-sangnok': { id: 'ansan-sangnok', name: '안산시 상록구', dongs: [{ id: 'bono-dong', name: '본오동' }, { id: 'sadang-as', name: '사동' }] },
    'ansan-danwon': { id: 'ansan-danwon', name: '안산시 단원구', dongs: [{ id: 'gojan-dong', name: '고잔동' }, { id: 'wongok-dong', name: '원곡동' }] },

    // 기타 경기도 시·군
    'uijeongbu': { id: 'uijeongbu', name: '의정부시', dongs: [{ id: 'uijeongbu-dong', name: '의정부동' }, { id: 'howon-dong', name: '호원동' }] },
    'gwangmyeong': { id: 'gwangmyeong', name: '광명시', dongs: [{ id: 'gwangmyeong-dong', name: '광명동' }, { id: 'cheolsan-dong', name: '철산동' }] },
    'pyeongtaek': { id: 'pyeongtaek', name: '평택시', dongs: [{ id: 'bijeon-dong', name: '비전동' }, { id: 'godeok-dong', name: '고덕동' }] },
    'dongducheon': { id: 'dongducheon', name: '동두천시', dongs: [{ id: 'saengyeon', name: '생연동' }] },
    'gwacheon': { id: 'gwacheon', name: '과천시', dongs: [{ id: 'jungang-gc', name: '중앙동' }] },
    'guri': { id: 'guri', name: '구리시', dongs: [{ id: 'inchang', name: '인창동' }] },
    'namyangju': { id: 'namyangju', name: '남양주시', dongs: [{ id: 'dasan', name: '다산동' }, { id: 'byeollae', name: '별내동' }] },
    'osan': { id: 'osan', name: '오산시', dongs: [{ id: 'osan-dong', name: '오산동' }] },
    'siheung': { id: 'siheung', name: '시흥시', dongs: [{ id: 'baegot', name: '배곧동' }, { id: 'jeongwang', name: '정왕동' }] },
    'gunpo': { id: 'gunpo', name: '군포시', dongs: [{ id: 'sanbon', name: '산본동' }] },
    'uiwang': { id: 'uiwang', name: '의왕시', dongs: [{ id: 'oen', name: '오전동' }] },
    'hanam': { id: 'hanam', name: '하남시', dongs: [{ id: 'misa', name: '미사동' }, { id: 'deokpung', name: '덕풍동' }] },
    'paju': { id: 'paju', name: '파주시', dongs: [{ id: 'unjeong', name: '운정동' }, { id: 'geumchon', name: '금촌동' }] },
    'icheon': { id: 'icheon', name: '이천시', dongs: [{ id: 'changjeon', name: '창전동' }] },
    'anseong': { id: 'anseong', name: '안성시', dongs: [{ id: 'gongdo', name: '공도읍' }] },
    'gimpo': { id: 'gimpo', name: '김포시', dongs: [{ id: 'gurae', name: '구래동' }, { id: 'janggi', name: '장기동' }] },
    'hwaseong': { id: 'hwaseong', name: '화성시', dongs: [{ id: 'dongtan-1', name: '동탄1동' }, { id: 'dongtan-2', name: '동탄2동' }] },
    'gwangju-gg': { id: 'gwangju-gg', name: '광주시', dongs: [{ id: 'yeok-dong', name: '역동' }] },
    'yangju': { id: 'yangju', name: '양주시', dongs: [{ id: 'okjeong', name: '옥정동' }] },
    'pocheon': { id: 'pocheon', name: '포천시', dongs: [{ id: 'pocheon-dong', name: '포천동' }] },
    'yeoju': { id: 'yeoju', name: '여주시', dongs: [{ id: 'ohak', name: '오학동' }] },
    'yeoncheon': { id: 'yeoncheon', name: '연천군', dongs: [{ id: 'yeoncheon-eup', name: '연천읍' }] },
    'gapyeong': { id: 'gapyeong', name: '가평군', dongs: [{ id: 'gapyeong-eup', name: '가평읍' }] },
    'yangpyeong-gun': { id: 'yangpyeong-gun', name: '양평군', dongs: [{ id: 'yangpyeong-eup', name: '양평읍' }] }
  }),

  // 4. 천안시
  createRegionTree('cheonan', '천안시', {
    'seobuk': { id: 'seobuk', name: '서북구', dongs: [{ id: 'dujeong', name: '두정동' }, { id: 'buldang', name: '불당동' }, { id: 'ssangyong', name: '쌍용동' }] },
    'dongnam': { id: 'dongnam', name: '동남구', dongs: [{ id: 'sinbu', name: '신부동' }, { id: 'cheongdang', name: '청당동' }] }
  }),

  // 5. 아산시
  createRegionTree('asan', '아산시', {
    'main': { id: 'main', name: '아산전역', dongs: [{ id: 'baebang', name: '배방읍' }, { id: 'tangjeong', name: '탕정면' }, { id: 'oncheon', name: '온천동' }] }
  }),

  // 6. 대전광역시
  createRegionTree('daejeon', '대전광역시', {
    'seo-gu-daejeon': { id: 'seo-gu-daejeon', name: '서구', dongs: [{ id: 'dunsan', name: '둔산동' }, { id: 'galma', name: '갈마동' }] },
    'yuseong': { id: 'yuseong', name: '유성구', dongs: [{ id: 'bongmyeong', name: '봉명동' }, { id: 'gwanpyeong', name: '관평동' }] },
    'jung-gu-daejeon': { id: 'jung-gu-daejeon', name: '중구', dongs: [{ id: 'eunhaeng', name: '은행동' }, { id: 'daeheung', name: '대흥동' }] },
    'dong-gu-daejeon': { id: 'dong-gu-daejeon', name: '동구', dongs: [{ id: 'yongjeon', name: '용전동' }, { id: 'gaya', name: '가양동' }] },
    'daedeok': { id: 'daedeok', name: '대덕구', dongs: [{ id: 'songchon', name: '송촌동' }, { id: 'birae', name: '비래동' }] }
  }),

  // 7. 대구광역시
  createRegionTree('daegu', '대구광역시', {
    'suseong': { id: 'suseong', name: '수성구', dongs: [{ id: 'beomeo', name: '범어동' }, { id: 'hwanggum', name: '황금동' }] },
    'jung-gu-daegu': { id: 'jung-gu-daegu', name: '중구', dongs: [{ id: 'dongseongro', name: '동성로' }, { id: 'daebong', name: '대봉동' }] },
    'dong-gu-daegu': { id: 'dong-gu-daegu', name: '동구', dongs: [{ id: 'sincheon-dg', name: '신천동' }, { id: 'sinam', name: '신암동' }] },
    'seo-gu-daegu': { id: 'seo-gu-daegu', name: '서구', dongs: [{ id: 'naedang', name: '내당동' }] },
    'nam-gu-daegu': { id: 'nam-gu-daegu', name: '남구', dongs: [{ id: 'daemyeong', name: '대명동' }] },
    'buk-gu-daegu': { id: 'buk-gu-daegu', name: '북구', dongs: [{ id: 'chilgok', name: '칠곡동' }] },
    'dalseo': { id: 'dalseo', name: '달서구', dongs: [{ id: 'sangin', name: '상인동' }, { id: 'wolseong', name: '월성동' }] },
    'dalseong': { id: 'dalseong', name: '달성군', dongs: [{ id: 'dasa', name: '다사읍' }] }
  }),

  // 8. 구미시
  createRegionTree('gumi', '구미시', {
    'main': { id: 'main', name: '구미전역', dongs: [{ id: 'indong', name: '인동' }, { id: 'jinpyeong', name: '진평동' }] }
  }),

  // 9. 포항시
  createRegionTree('pohang', '포항시', {
    'buk-gu-pohang': { id: 'buk-gu-pohang', name: '북구', dongs: [{ id: 'jukdo', name: '죽도동' }, { id: 'jangseong', name: '장성동' }] },
    'nam-gu-pohang': { id: 'nam-gu-pohang', name: '남구', dongs: [{ id: 'idaedong', name: '이동' }, { id: 'hyoja', name: '효자동' }] }
  }),

  // 10. 부산광역시
  createRegionTree('busan', '부산광역시', {
    'haeundae': { id: 'haeundae', name: '해운대구', dongs: [{ id: 'udong', name: '우동' }, { id: 'jungdong-bs', name: '중동' }] },
    'busanjin': { id: 'busanjin', name: '부산진구', dongs: [{ id: 'seomyeon', name: '서면' }, { id: 'bujeon', name: '부전동' }] },
    'suyeong': { id: 'suyeong', name: '수영구', dongs: [{ id: 'gwangan', name: '광안동' }, { id: 'millak', name: '민락동' }] },
    'nam-gu-busan': { id: 'nam-gu-busan', name: '남구', dongs: [{ id: 'daeyeon', name: '대연동' }] },
    'dongnae': { id: 'dongnae', name: '동래구', dongs: [{ id: 'sajik', name: '사직동' }] },
    'geumjeong': { id: 'geumjeong', name: '금정구', dongs: [{ id: 'jangjeon', name: '장전동' }] },
    'yeonje': { id: 'yeonje', name: '연제구', dongs: [{ id: 'yeonsan', name: '연산동' }] },
    'gangseo-busan': { id: 'gangseo-busan', name: '강서구', dongs: [{ id: 'myeongji', name: '명지동' }] },
    'sasang': { id: 'sasang', name: '사상구', dongs: [{ id: 'jurye', name: '주례동' }] },
    'saha': { id: 'saha', name: '사하구', dongs: [{ id: 'hadan', name: '하단동' }] },
    'jung-gu-busan': { id: 'jung-gu-busan', name: '중구', dongs: [{ id: 'nampo', name: '남포동' }] },
    'seo-gu-busan': { id: 'seo-gu-busan', name: '서구', dongs: [{ id: 'amnam', name: '암남동' }] },
    'dong-gu-busan': { id: 'dong-gu-busan', name: '동구', dongs: [{ id: 'choryang', name: '초량동' }] },
    'buk-gu-busan': { id: 'buk-gu-busan', name: '북구', dongs: [{ id: 'hwamyeong', name: '화명동' }] },
    'yeongdo': { id: 'yeongdo', name: '영도구', dongs: [{ id: 'dongsam', name: '동삼동' }] },
    'gijang': { id: 'gijang', name: '기장군', dongs: [{ id: 'jeonggwan', name: '정관읍' }] }
  }),

  // 11. 제주특별자치도
  createRegionTree('jeju', '제주특별자치도', {
    'jeju-si': { id: 'jeju-si', name: '제주시', dongs: [{ id: 'yeon-dong', name: '연동' }, { id: 'nohyeong', name: '노형동' }] },
    'seogwipo-si': { id: 'seogwipo-si', name: '서귀포시', dongs: [{ id: 'seogwi', name: '서귀동' }, { id: 'donghong', name: '동홍동' }] }
  })
];