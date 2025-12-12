import { CategoryId, CategoryMeta, Product } from './types';

export const CATEGORIES: CategoryMeta[] = [
  { id: CategoryId.METHOD, label: '장묘 방법', icon: '⚱️' },
  { id: CategoryId.SHROUD, label: '수의', icon: '👕' },
  { id: CategoryId.CASKET, label: '관', icon: '⚰️' },
  { id: CategoryId.FLOWER, label: '제단 꽃', icon: '🌸' },
  { id: CategoryId.VEHICLE, label: '차량', icon: '🚌' },
  { id: CategoryId.HELPER, label: '인력/도우미', icon: '👥' },
  { id: CategoryId.MEAL, label: '식사/음식', icon: '🍱' },
];

export const MOCK_PRODUCTS: Product[] = [
  // Method
  {
    id: 'm1',
    categoryId: CategoryId.METHOD,
    name: '일반 화장',
    description: '공설/사설 화장장을 이용한 일반적인 화장 절차입니다.',
    price: 300000,
    imageUrl: 'https://ojsfile.ohmynews.com/PHT_IMG_FILE/2022/0330/IE002963677_PHT.jpg',
    unit: '식',
  },
  {
    id: 'm2',
    categoryId: CategoryId.METHOD,
    name: '매장 (선산)',
    description: '보유하고 계신 선산에 매장하는 방식입니다. 산역 인건비 별도.',
    price: 0,
    imageUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201809/17/841128ee-5d48-46b4-a9cb-6c5facccafe7.jpg',
    unit: '식',
  },
  
  // Shroud (수의)
  {
    id: 's1',
    categoryId: CategoryId.SHROUD,
    name: '비단 보화 수의',
    description: '100% 안동포 대마로 제작된 최고급 수의입니다. 윤달에 미리 준비하시면 좋습니다.',
    price: 2500000,
    imageUrl: 'https://www.yedaham.co.kr/images/product/service/item_04_01_01.jpg',
    isPopular: true,
    unit: '벌',
  },
  {
    id: 's2',
    categoryId: CategoryId.SHROUD,
    name: '비단 진결 수의',
    description: '전통 한지로 제작되어 소각 시 잔여물이 남지 않는 친환경 수의입니다.',
    price: 800000,
    imageUrl: 'https://www.yedaham.co.kr/images/product/service/item_04_02_01.jpg',
    unit: '벌',
  },
  {
    id: 's3',
    categoryId: CategoryId.SHROUD,
    name: '비단 단아 수의',
    description: '합리적인 가격의 대중적인 마 수의입니다.',
    price: 450000,
    imageUrl: 'https://www.yedaham.co.kr/images/product/service/item_04_03_01.jpg',
    unit: '벌',
  },

  // Casket (관)
  {
    id: 'c1',
    categoryId: CategoryId.CASKET,
    name: '향나무 2단관',
    description: '가볍고 방충 효과가 뛰어난 오동나무 1.5치 관입니다.',
    price: 350000,
    imageUrl: 'https://www.yedaham.co.kr/images/product/service/item_03_01.jpg',
    unit: '관',
  },
  {
    id: 'c2',
    categoryId: CategoryId.CASKET,
    name: '솔송나무 2단관',
    description: '매장 시 내구성이 뛰어나고 향이 좋은 솔송나무 관입니다.',
    price: 1200000,
    imageUrl: 'https://www.yedaham.co.kr/images/product/service/item_03_02.jpg',
    isPopular: true,
    unit: '관',
  },
  {
    id: 'c3',
    categoryId: CategoryId.CASKET,
    name: '오동나무 2단관',
    description: '최고급 향나무를 사용하여 품격을 높인 관입니다.',
    price: 2800000,
    imageUrl: 'https://www.yedaham.co.kr/images/product/service/item_03_03.jpg',
    unit: '관',
  },

  // Flower (꽃)
  {
    id: 'f1',
    categoryId: CategoryId.FLOWER,
    name: '기본 제단',
    description: '국화 위주의 단아하고 깔끔한 기본 1단 제단입니다.',
    price: 400000,
    imageUrl: 'https://cdn.lime3651.co.kr/upload/product/851/8e5d6216-01c9-4577-941d-f7659f4465ed.webp?w=243&h=279',
    unit: '개',
  },
  {
    id: 'f2',
    categoryId: CategoryId.FLOWER,
    name: '표준 제단 (2단)',
    description: '풍성한 국화와 포인트 꽃장식이 들어간 2단 제단입니다.',
    price: 800000,
    imageUrl: 'https://cdn.lime3651.co.kr/upload/product/860/8e5d644c-146b-481a-9f57-d71770dd8166.webp?w=230&h=264',
    isPopular: true,
    unit: '개',
  },
  {
    id: 'f3',
    categoryId: CategoryId.FLOWER,
    name: 'VIP 특별 제단',
    description: '대형 호실에 적합한 3단 와이드 특수 제단입니다.',
    price: 1800000,
    imageUrl: 'https://cdn.lime3651.co.kr/upload/product/861/8e5d6535-bfb0-4511-a77d-91d0311faeb1.webp?w=500&h=575',
    unit: '개',
  },

  // Vehicle
  {
    id: 'v1',
    categoryId: CategoryId.VEHICLE,
    name: '리무진',
    description: '고인을 편안하게 모시는 리무진 운구차량입니다. (왕복 100km 기준)',
    price: 500000,
    imageUrl: 'https://www.yedaham.co.kr/images/product/service/item_06_01_01.jpg',
    isPopular: true,
    unit: '대',
  },
  {
    id: 'v2',
    categoryId: CategoryId.VEHICLE,
    name: '대형 버스',
    description: '유가족 및 조문객 이동을 위한 45인승 대형 버스입니다.',
    price: 600000,
    imageUrl: 'https://www.yedaham.co.kr/images/product/service/item_06_02_01.jpg',
    unit: '대',
  },

  // Helper
  {
    id: 'h1',
    categoryId: CategoryId.HELPER,
    name: '장례 도우미',
    description: '조문객 접대 및 빈소 관리를 도와주시는 전문 여사님입니다.',
    price: 120000, // 8시간 기준
    imageUrl: 'https://www.yedaham.co.kr/images/product/service/item_02_01.jpg',
    unit: '명',
  },
  {
    id: 'h2',
    categoryId: CategoryId.HELPER,
    name: '입관 지도사',
    description: '염습 및 입관 절차를 진행하는 전문 지도사 팀입니다.',
    price: 400000,
    imageUrl: 'https://www.yedaham.co.kr/images/product/service/item_01.png',
    unit: '팀',
  },

  // Meal
  {
    id: 'meal1',
    categoryId: CategoryId.MEAL,
    name: '장례 식사 세트 (밥/국/반찬)',
    description: '조문객 대접을 위한 정갈한 식사 세트입니다.',
    price: 18000,
    imageUrl: 'https://m.jubangoutlet.com/web/product/big/202410/fd97dc110330c8211101f7fdc5989650.jpg',
    unit: '인분',
    step: 10,
  },
  {
    id: 'meal2',
    categoryId: CategoryId.MEAL,
    name: '모듬 전/튀김',
    description: '다양한 종류의 전과 튀김으로 구성된 안주류입니다.',
    price: 25000,
    imageUrl: 'https://picsum.photos/id/493/400/300',
    unit: 'kg',
    step: 5,
  },
  {
    id: 'meal3',
    categoryId: CategoryId.MEAL,
    name: '수육 (돼지고기)',
    description: '부드럽게 삶아낸 최고급 돼지고기 수육입니다.',
    price: 35000,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTesrXxLOCoPNp8UipxAvmbXtEeBgiWyWRmxg&s',
    unit: 'kg',
    step: 5,
  },
  {
    id: 'meal4',
    categoryId: CategoryId.MEAL,
    name: '음료/주류 세트',
    description: '소주, 맥주, 음료수 등을 포함한 박스 단위입니다.',
    price: 50000,
    imageUrl: 'https://mblogthumb-phinf.pstatic.net/MjAxODA0MjlfMjU4/MDAxNTI0OTMzNjYyMTgy.BpobcpCe8dYeC-bDRwnxOAqjfMHkff3TY0I8jvZfbL0g.6Y8XWEMlFRGkIR0B9qMaGO-4CW1-Y_eb75w_ph7-oOcg.JPEG.youngsook411/20180323_105952.jpg?type=w800',
    unit: '박스',
    step: 1,
  }
];