import { Product, StoreSettings, CustomerReview } from '../types';

// Real generated high-res image paths
import heroLifestyleImg from '../assets/images/hero_bmshop_lifestyle_1790993257500.jpg';
import sneakersImg from '../assets/images/product_leather_sneakers_1790993270313.jpg';
import blazerImg from '../assets/images/product_linen_blazer_1790993788218.jpg';
import oxfordShirtImg from '../assets/images/product_oxford_shirt_1790993800678.jpg';
import loafersImg from '../assets/images/product_leather_loafers_1790993813166.jpg';

export { heroLifestyleImg, sneakersImg, blazerImg, oxfordShirtImg, loafersImg };

export const INITIAL_PRODUCTS: Product[] = [
  // --- 10 SHOE PRODUCTS ---
  {
    id: 'shoe-01',
    sku: 'BM-SH-001',
    nameEN: 'Classic Minimal Leather Sneakers',
    nameLA: 'ເກີບຜ້າໃບໜັງແທ້ ຄລາສສິກ',
    descriptionEN: 'Crafted with premium full-grain leather, cushioned memory foam insole, and durable rubber cupsole. Perfect for both office smart-casual and weekend leisure for all ages.',
    descriptionLA: 'ຜະລິດຈາກໜັງແທ້ຄຸນນະພາບສູງ ພື້ນນຸ້ມໃສ່ສະບາຍ ບໍ່ເຈັບຕີນ ເໝາະສຳລັບທັງໃສ່ເຮັດວຽກ ແລະ ທ່ຽວຫຼິ້ນ ທັງໄວໜຸ່ມ ແລະ ຜູ້ໃຫຍ່.',
    price: 850000,
    oldPrice: 1050000,
    discountPercent: 19,
    gender: 'unisex',
    category: 'shoes',
    subcategory: 'sneakers',
    brand: 'BM Classic',
    mainImage: sneakersImg,
    images: {
      side: sneakersImg,
      front: sneakersImg,
      back: sneakersImg,
      sole: sneakersImg,
      detail: sneakersImg,
      model: heroLifestyleImg
    },
    colors: [
      { nameEN: 'White / Cream', nameLA: 'ຂາວ / ຄຣີມ', hex: '#F5F5F0' },
      { nameEN: 'Tan Brown', nameLA: 'ນ້ຳຕານອ່ອນ', hex: '#8C6239' },
      { nameEN: 'Black', nameLA: 'ດຳ', hex: '#1C1917' }
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    variants: [
      { color: 'White / Cream', size: '39', stock: 5 },
      { color: 'White / Cream', size: '40', stock: 8 },
      { color: 'White / Cream', size: '41', stock: 12 },
      { color: 'White / Cream', size: '42', stock: 10 },
      { color: 'White / Cream', size: '43', stock: 6 },
      { color: 'White / Cream', size: '44', stock: 4 },
      { color: 'Tan Brown', size: '40', stock: 4 },
      { color: 'Tan Brown', size: '41', stock: 6 },
      { color: 'Tan Brown', size: '42', stock: 7 },
      { color: 'Tan Brown', size: '43', stock: 5 },
      { color: 'Black', size: '40', stock: 6 },
      { color: 'Black', size: '41', stock: 9 },
      { color: 'Black', size: '42', stock: 8 }
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    isSale: true,
    featured: true,
    active: true,
    targetAge: 'all'
  },
  {
    id: 'shoe-02',
    sku: 'BM-SH-002',
    nameEN: 'Handcrafted Heritage Leather Penny Loafers',
    nameLA: 'ເກີບໜັງໂລບເຟີ ແຮນເມດ ຄຸນນະພາບສູງ',
    descriptionEN: 'Supple Italian leather loafers with hand-stitched apron and reinforced leather sole. A timeless wardrobe staple for meetings, dinners, and elegant everyday wear.',
    descriptionLA: 'ເກີບໜັງແທ້ຕັດຫຍິບຢ່າງປານີດ ພື້ນໜັງທົນທານ ໃຫ້ຄວາມລຽບຫຼູ ແລະ ພູມຖານ ເໝາະສຳລັບອອກງານ, ເຮັດວຽກ ແລະ ງານສັງສັນ.',
    price: 1150000,
    oldPrice: 1350000,
    discountPercent: 15,
    gender: 'men',
    category: 'shoes',
    subcategory: 'formal',
    brand: 'BM Sartorial',
    mainImage: loafersImg,
    images: {
      side: loafersImg,
      front: loafersImg,
      back: loafersImg,
      sole: loafersImg,
      detail: loafersImg,
      model: loafersImg
    },
    colors: [
      { nameEN: 'Espresso Brown', nameLA: 'ນ້ຳຕານເຂັ້ມ', hex: '#3B2314' },
      { nameEN: 'Onyx Black', nameLA: 'ດຳສະໜິດ', hex: '#111827' }
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    variants: [
      { color: 'Espresso Brown', size: '40', stock: 4 },
      { color: 'Espresso Brown', size: '41', stock: 5 },
      { color: 'Espresso Brown', size: '42', stock: 7 },
      { color: 'Espresso Brown', size: '43', stock: 5 },
      { color: 'Espresso Brown', size: '44', stock: 3 },
      { color: 'Onyx Black', size: '40', stock: 3 },
      { color: 'Onyx Black', size: '41', stock: 6 },
      { color: 'Onyx Black', size: '42', stock: 6 },
      { color: 'Onyx Black', size: '43', stock: 4 }
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    isSale: false,
    featured: true,
    active: true,
    targetAge: 'all'
  },
  {
    id: 'shoe-03',
    sku: 'BM-SH-003',
    nameEN: 'Ultralight All-Day Walking & Running Shoes',
    nameLA: 'ເກີບແລ່ນ ແລະ ຍ່າງອອກກຳລັງກາຍ ນ້ຳໜັກເບົາ',
    descriptionEN: 'Breathable engineered knit upper with cloud-cushioned midsole. Ideal for morning walks, daily errands, and light training.',
    descriptionLA: 'ຜ້າຕາໜ່າງລະບາຍອາກາດດີເລີດ ພື້ນຮອງຮັບແຮງກະແທກໄດ້ດີ ຊ່ວຍຖະໜອມຫົວເຂົ່າ ໃສ່ຍ່າງໄດ້ທັງມື້ໂດຍບໍ່ເມື່ອຍ.',
    price: 680000,
    oldPrice: 850000,
    discountPercent: 20,
    gender: 'unisex',
    category: 'shoes',
    subcategory: 'running',
    brand: 'BM Motion',
    mainImage: sneakersImg,
    images: {
      side: sneakersImg,
      front: sneakersImg,
      sole: sneakersImg,
      detail: sneakersImg
    },
    colors: [
      { nameEN: 'Ash Grey', nameLA: 'ເທົາອ່ອນ', hex: '#9CA3AF' },
      { nameEN: 'Midnight Navy', nameLA: 'ກົມມະທ່າ', hex: '#1E293B' },
      { nameEN: 'Soft Beige', nameLA: 'ເບດອ່ອນ', hex: '#E5E0D8' }
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    variants: [
      { color: 'Ash Grey', size: '38', stock: 4 },
      { color: 'Ash Grey', size: '39', stock: 6 },
      { color: 'Ash Grey', size: '40', stock: 8 },
      { color: 'Ash Grey', size: '41', stock: 10 },
      { color: 'Ash Grey', size: '42', stock: 9 },
      { color: 'Ash Grey', size: '43', stock: 5 },
      { color: 'Midnight Navy', size: '40', stock: 5 },
      { color: 'Midnight Navy', size: '41', stock: 7 },
      { color: 'Midnight Navy', size: '42', stock: 8 },
      { color: 'Midnight Navy', size: '43', stock: 6 }
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    isSale: true,
    featured: false,
    active: true,
    targetAge: 'all'
  },
  {
    id: 'shoe-04',
    sku: 'BM-SH-004',
    nameEN: 'Women Comfort Strap Ergonomic Sandals',
    nameLA: 'ເກີບແຕະສາຍຮັດສຸຂະພາບສຳລັບຜູ້ຍິງ',
    descriptionEN: 'Anatomical contoured cork footbed with soft microfibre lining and adjustable buckles. Outstanding arch support for all ages.',
    descriptionLA: 'ເກີບແຕະສຸຂະພາບພື້ນຮອງຮັບອຸ້ງຕີນ ສາຍຮັດປັບໄດ້ ໃສ່ສະບາຍ ປອດໄພ ບໍ່ມື່ນ ເໝາະກັບແມ່ບ້ານ ແລະ ຜູ້ຍິງທຸກໄວ.',
    price: 490000,
    gender: 'women',
    category: 'shoes',
    subcategory: 'sandals',
    brand: 'BM Comfort',
    mainImage: loafersImg,
    images: {
      side: loafersImg,
      front: loafersImg,
      sole: loafersImg,
      detail: loafersImg
    },
    colors: [
      { nameEN: 'Caramel Brown', nameLA: 'ນ້ຳຕານຄາຣາເມວ', hex: '#A26D3F' },
      { nameEN: 'Bone White', nameLA: 'ຂາວຄຣີມ', hex: '#EDE8E1' },
      { nameEN: 'Classic Black', nameLA: 'ດຳ', hex: '#18181B' }
    ],
    sizes: ['36', '37', '38', '39', '40'],
    variants: [
      { color: 'Caramel Brown', size: '36', stock: 4 },
      { color: 'Caramel Brown', size: '37', stock: 7 },
      { color: 'Caramel Brown', size: '38', stock: 9 },
      { color: 'Caramel Brown', size: '39', stock: 6 },
      { color: 'Caramel Brown', size: '40', stock: 3 },
      { color: 'Bone White', size: '37', stock: 5 },
      { color: 'Bone White', size: '38', stock: 8 }
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    isSale: false,
    featured: true,
    active: true,
    targetAge: 'all'
  },
  {
    id: 'shoe-05',
    sku: 'BM-SH-005',
    nameEN: 'Men Executive Oxford Leather Dress Shoes',
    nameLA: 'ເກີບໜັງຜູ້ຊາຍ ຊົງອັອກຟອດ ສຳລັບໃສ່ຊຸດສູດ',
    descriptionEN: 'Polished calfskin leather with closed lacing and Goodyear welt construction. The definitive business shoe for leaders and gentlemen.',
    descriptionLA: 'ເກີບໜັງແທ້ຂັດເງົາ ຊົງສຸພາບຮຽບຮ້ອຍ ເໝາະສຳລັບໃສ່ເຮັດວຽກ ພົບປະທາງການ ຫຼື ງານດອງ.',
    price: 1250000,
    oldPrice: 1450000,
    discountPercent: 14,
    gender: 'men',
    category: 'shoes',
    subcategory: 'formal',
    brand: 'BM Sartorial',
    mainImage: loafersImg,
    images: {
      side: loafersImg,
      front: loafersImg,
      back: loafersImg,
      sole: loafersImg
    },
    colors: [
      { nameEN: 'Black', nameLA: 'ດຳ', hex: '#000000' },
      { nameEN: 'Deep Burgundy', nameLA: 'ເລືອດໝູເຂັ້ມ', hex: '#4A0E17' }
    ],
    sizes: ['40', '41', '42', '43', '44'],
    variants: [
      { color: 'Black', size: '40', stock: 3 },
      { color: 'Black', size: '41', stock: 6 },
      { color: 'Black', size: '42', stock: 8 },
      { color: 'Black', size: '43', stock: 4 },
      { color: 'Black', size: '44', stock: 2 }
    ],
    inStock: true,
    isNew: false,
    isPopular: false,
    isSale: true,
    featured: false,
    active: true,
    targetAge: 'mature'
  },
  {
    id: 'shoe-06',
    sku: 'BM-SH-006',
    nameEN: 'Women Low-Block Heeled Leather Mules',
    nameLA: 'ເກີບສວມຜູ້ຍິງ ສົ້ນຕຶກຕ່ຳ ໃສ່ສະບາຍ',
    descriptionEN: 'Buttery soft sheepskin leather slip-on with 3.5cm block heel. Designed for graceful posture without foot strain.',
    descriptionLA: 'ເກີບສວມໜັງແກະນຸ້ມ ສົ້ນສູງພຽງ 3.5 ຊັງຕີແມັດ ຍ່າງງ່າຍ ບໍ່ເມື່ອຍຕີນ ສຸພາບຮຽບຮ້ອຍ.',
    price: 720000,
    gender: 'women',
    category: 'shoes',
    subcategory: 'casual',
    brand: 'BM Studio',
    mainImage: sneakersImg,
    images: {
      side: sneakersImg,
      front: sneakersImg,
      detail: sneakersImg
    },
    colors: [
      { nameEN: 'Nude Beige', nameLA: 'ຄຣີມນູດ', hex: '#D7C4B7' },
      { nameEN: 'Ebony Black', nameLA: 'ດຳ', hex: '#18181B' }
    ],
    sizes: ['36', '37', '38', '39', '40'],
    variants: [
      { color: 'Nude Beige', size: '36', stock: 4 },
      { color: 'Nude Beige', size: '37', stock: 6 },
      { color: 'Nude Beige', size: '38', stock: 8 },
      { color: 'Nude Beige', size: '39', stock: 5 },
      { color: 'Ebony Black', size: '37', stock: 4 },
      { color: 'Ebony Black', size: '38', stock: 6 }
    ],
    inStock: true,
    isNew: true,
    isPopular: false,
    isSale: false,
    featured: false,
    active: true,
    targetAge: 'all'
  },
  {
    id: 'shoe-07',
    sku: 'BM-SH-007',
    nameEN: 'Classic Canvas Slip-on Deck Shoes',
    nameLA: 'ເກີບຜ້າໃບສວມ ລຽບງ່າຍ ທົນທານ',
    descriptionEN: 'Heavyweight organic cotton canvas with elastic side gores and non-marking siped outsole.',
    descriptionLA: 'ເກີບຜ້າໃບສວມງ່າຍ ບໍ່ຕ້ອງມັດເຊືອກ ຊັກງ່າຍ ທົນທານ ໃສ່ສະບາຍທຸກມື້.',
    price: 520000,
    gender: 'unisex',
    category: 'shoes',
    subcategory: 'casual',
    brand: 'BM Daily',
    mainImage: sneakersImg,
    images: {
      side: sneakersImg,
      front: sneakersImg,
      sole: sneakersImg
    },
    colors: [
      { nameEN: 'Navy Blue', nameLA: 'ສີກົມ', hex: '#1E3A5F' },
      { nameEN: 'Natural Off-White', nameLA: 'ຂາວທຳມະຊາດ', hex: '#F5F5F0' }
    ],
    sizes: ['38', '39', '40', '41', '42', '43'],
    variants: [
      { color: 'Navy Blue', size: '39', stock: 4 },
      { color: 'Navy Blue', size: '40', stock: 6 },
      { color: 'Navy Blue', size: '41', stock: 8 },
      { color: 'Navy Blue', size: '42', stock: 7 },
      { color: 'Natural Off-White', size: '40', stock: 6 },
      { color: 'Natural Off-White', size: '41', stock: 8 }
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    isSale: false,
    featured: false,
    active: true,
    targetAge: 'all'
  },
  {
    id: 'shoe-08',
    sku: 'BM-SH-008',
    nameEN: 'Suede Chukka Ankle Boots',
    nameLA: 'ເກີບໜັງກັບຫຸ້ມຂໍ້ ຊົງຊັກກ້າ',
    descriptionEN: 'Rich water-resistant suede boots with natural crepe rubber sole. Blends rugged durability with refined taste.',
    descriptionLA: 'ເກີບໜັງກັບຄຸນນະພາບສູງ ກັນລະອອງນ້ຳ ພື້ນຢາງທຳມະຊາດ ໃຫ້ຄວາມເທ້ ແລະ ທະມັດທະແມງ.',
    price: 990000,
    oldPrice: 1200000,
    discountPercent: 17,
    gender: 'men',
    category: 'shoes',
    subcategory: 'boots',
    brand: 'BM Heritage',
    mainImage: loafersImg,
    images: {
      side: loafersImg,
      front: loafersImg,
      sole: loafersImg
    },
    colors: [
      { nameEN: 'Sand Taupe', nameLA: 'ສີນ້ຳຕານຊາຍ', hex: '#A39382' },
      { nameEN: 'Dark Chocolate', nameLA: 'ຊັອກໂກແລັດເຂັ້ມ', hex: '#3B2F2F' }
    ],
    sizes: ['40', '41', '42', '43', '44'],
    variants: [
      { color: 'Sand Taupe', size: '41', stock: 5 },
      { color: 'Sand Taupe', size: '42', stock: 6 },
      { color: 'Sand Taupe', size: '43', stock: 4 },
      { color: 'Dark Chocolate', size: '41', stock: 4 },
      { color: 'Dark Chocolate', size: '42', stock: 5 }
    ],
    inStock: true,
    isNew: false,
    isPopular: false,
    isSale: true,
    featured: false,
    active: true,
    targetAge: 'all'
  },
  {
    id: 'shoe-09',
    sku: 'BM-SH-009',
    nameEN: 'Women Elegant Pointed-Toe Ballerina Flats',
    nameLA: 'ເກີບຄັດຊູຫົວແຫຼມ ຜູ້ຍິງ ລຽບຫຼູ',
    descriptionEN: 'Ultra-flexible lambskin flat with padded arch cushion and rubber traction pod.',
    descriptionLA: 'ເກີບຄັດຊູໜັງແກະ ພື້ນຢືດຢຸ່ນ ສຸພາບ ຮຽບຮ້ອຍ ເໝາະກັບການໃສ່ເຮັດວຽກທຸກມື້.',
    price: 580000,
    gender: 'women',
    category: 'shoes',
    subcategory: 'casual',
    brand: 'BM Studio',
    mainImage: sneakersImg,
    images: {
      side: sneakersImg,
      front: sneakersImg,
      detail: sneakersImg
    },
    colors: [
      { nameEN: 'Ivory Cream', nameLA: 'ຄຣີມງາຊ້າງ', hex: '#FAF7EE' },
      { nameEN: 'Taupe Grey', nameLA: 'ເທົາອຸ່ນ', hex: '#8C827A' }
    ],
    sizes: ['36', '37', '38', '39', '40'],
    variants: [
      { color: 'Ivory Cream', size: '36', stock: 4 },
      { color: 'Ivory Cream', size: '37', stock: 7 },
      { color: 'Ivory Cream', size: '38', stock: 9 },
      { color: 'Ivory Cream', size: '39', stock: 6 },
      { color: 'Taupe Grey', size: '37', stock: 5 },
      { color: 'Taupe Grey', size: '38', stock: 6 }
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    isSale: false,
    featured: false,
    active: true,
    targetAge: 'all'
  },
  {
    id: 'shoe-10',
    sku: 'BM-SH-010',
    nameEN: 'Cushioned Leather Slide Slippers',
    nameLA: 'ເກີບແຕະໜັງແທ້ ພື້ນນຸ້ມໃສ່ໃນເຮືອນ ແລະ ນອກເຮືອນ',
    descriptionEN: 'Premium dual-density foam slide wrapped in genuine milled leather.',
    descriptionLA: 'ເກີບແຕະໜັງແທ້ ພື້ນໜານຸ້ມ ຊ່ວຍຜ່ອນຄາຍຝ່າຕີນ ໃສ່ສະບາຍທັງໃນບ້ານ ແລະ ນອກບ້ານ.',
    price: 390000,
    gender: 'unisex',
    category: 'shoes',
    subcategory: 'slippers',
    brand: 'BM Daily',
    mainImage: loafersImg,
    images: {
      side: loafersImg,
      front: loafersImg,
      sole: loafersImg
    },
    colors: [
      { nameEN: 'Malt Brown', nameLA: 'ນ້ຳຕານມອນ', hex: '#7B5E43' },
      { nameEN: 'Carbon Black', nameLA: 'ດຳ', hex: '#262626' }
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    variants: [
      { color: 'Malt Brown', size: '39', stock: 6 },
      { color: 'Malt Brown', size: '40', stock: 8 },
      { color: 'Malt Brown', size: '41', stock: 10 },
      { color: 'Malt Brown', size: '42', stock: 9 },
      { color: 'Carbon Black', size: '40', stock: 7 },
      { color: 'Carbon Black', size: '41', stock: 9 }
    ],
    inStock: true,
    isNew: false,
    isPopular: false,
    isSale: false,
    featured: false,
    active: true,
    targetAge: 'all'
  },

  // --- 10 CLOTHING PRODUCTS ---
  {
    id: 'cloth-01',
    sku: 'BM-CL-001',
    nameEN: 'Tailored Relaxed Linen Blazer',
    nameLA: 'ເສື້ອສູດຜ້າລິນິນ ຊົງທັນສະໄໝ ໃສ່ສະບາຍ',
    descriptionEN: 'Unstructured summer-weight pure linen blazer. Breathable, beautifully draped, and suitable for tropical weather in Laos. Great for both young professionals and mature executives.',
    descriptionLA: 'ເສື້ອສູດຜ້າລິນິນແທ້ 100% ລະບາຍອາກາດໄດ້ດີ ບໍ່ຮ້ອນ ເໝາະກັບສະພາບອາກາດບ້ານເຮົາ ໃສ່ເຮັດວຽກ ຫຼື ອອກງານສັງຄົມ ໃຫ້ຄວາມລຽບຫຼູ ແລະ ເບິ່ງດີ.',
    price: 950000,
    oldPrice: 1200000,
    discountPercent: 21,
    gender: 'unisex',
    category: 'clothing',
    subcategory: 'jackets',
    brand: 'BM Sartorial',
    mainImage: blazerImg,
    images: {
      front: blazerImg,
      back: blazerImg,
      detail: blazerImg,
      model: heroLifestyleImg
    },
    colors: [
      { nameEN: 'Warm Oat Beige', nameLA: 'ສີເບດອ່ອນ', hex: '#E6DEC9' },
      { nameEN: 'Navy Blue', nameLA: 'ສີກົມມະທ່າ', hex: '#1E293B' },
      { nameEN: 'Slate Olive', nameLA: 'ຂຽວຂີ້ມ້າອ່ອນ', hex: '#5E6B58' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    variants: [
      { color: 'Warm Oat Beige', size: 'S', stock: 4 },
      { color: 'Warm Oat Beige', size: 'M', stock: 8 },
      { color: 'Warm Oat Beige', size: 'L', stock: 10 },
      { color: 'Warm Oat Beige', size: 'XL', stock: 7 },
      { color: 'Warm Oat Beige', size: '2XL', stock: 4 },
      { color: 'Navy Blue', size: 'M', stock: 6 },
      { color: 'Navy Blue', size: 'L', stock: 9 },
      { color: 'Navy Blue', size: 'XL', stock: 8 },
      { color: 'Slate Olive', size: 'L', stock: 5 },
      { color: 'Slate Olive', size: 'XL', stock: 4 }
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    isSale: true,
    featured: true,
    active: true,
    targetAge: 'all'
  },
  {
    id: 'cloth-02',
    sku: 'BM-CL-002',
    nameEN: 'Crisp Long-Staple Cotton Oxford Shirt',
    nameLA: 'ເສື້ອເຊີ້ດຜ້າຝ້າຍອັອກຟອດ ແຂນຍາວ ພຣີມ່ຽມ',
    descriptionEN: 'Woven from 100% long-staple combed cotton with subtle texture, reinforced collar points, and mother-of-pearl buttons. Wrinkle-resistant and easy to iron.',
    descriptionLA: 'ເສື້ອເຊີ້ດແຂນຍາວ ຜ້າຝ້າຍທຳມະຊາດຄຸນນະພາບສູງ ຜ້າຢືດຢຸ່ນບໍ່ຍັບງ່າຍ ໃສ່ສະບາຍຕະຫຼອດມື້ ເໝາະສຳລັບໃສ່ເຮັດວຽກ ແລະ ພົບປະທາງການ.',
    price: 520000,
    oldPrice: 650000,
    discountPercent: 20,
    gender: 'men',
    category: 'clothing',
    subcategory: 'shirts',
    brand: 'BM Essential',
    mainImage: oxfordShirtImg,
    images: {
      front: oxfordShirtImg,
      back: oxfordShirtImg,
      detail: oxfordShirtImg,
      model: heroLifestyleImg
    },
    colors: [
      { nameEN: 'Deep Navy', nameLA: 'ກົມມະທ່າເຂັ້ມ', hex: '#0F1E36' },
      { nameEN: 'Pure White', nameLA: 'ຂາວສະອາດ', hex: '#FFFFFF' },
      { nameEN: 'Sky Blue', nameLA: 'ຟ້າອ່ອນ', hex: '#93C5FD' }
    ],
    sizes: ['M', 'L', 'XL', '2XL', '3XL'],
    variants: [
      { color: 'Deep Navy', size: 'M', stock: 6 },
      { color: 'Deep Navy', size: 'L', stock: 12 },
      { color: 'Deep Navy', size: 'XL', stock: 10 },
      { color: 'Deep Navy', size: '2XL', stock: 7 },
      { color: 'Deep Navy', size: '3XL', stock: 4 },
      { color: 'Pure White', size: 'M', stock: 8 },
      { color: 'Pure White', size: 'L', stock: 14 },
      { color: 'Pure White', size: 'XL', stock: 12 },
      { color: 'Sky Blue', size: 'L', stock: 9 },
      { color: 'Sky Blue', size: 'XL', stock: 8 }
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    isSale: true,
    featured: true,
    active: true,
    targetAge: 'all'
  },
  {
    id: 'cloth-03',
    sku: 'BM-CL-003',
    nameEN: 'Heavyweight Mercerized Cotton Tee',
    nameLA: 'ເສື້ອຍືດຄໍກົມ ຜ້າຝ້າຍ ໜານຸ້ມ ພຣີມ່ຽມ',
    descriptionEN: '240 GSM dense combed cotton with clean mercerized sheen, ribbed collar that retains shape after dozens of washes.',
    descriptionLA: 'ເສື້ອຍືດຄໍກົມຜ້າໜານຸ້ມ ບໍ່ບາງ ບໍ່ຫົດ ບໍ່ຍວບ ໃສ່ສະບາຍ ຊົງງາມ ເໝາະກັບທັງໄວໜຸ່ມ ແລະ ຜູ້ໃຫຍ່.',
    price: 280000,
    gender: 'unisex',
    category: 'clothing',
    subcategory: 't-shirts',
    brand: 'BM Daily',
    mainImage: oxfordShirtImg,
    images: {
      front: oxfordShirtImg,
      back: oxfordShirtImg,
      detail: oxfordShirtImg
    },
    colors: [
      { nameEN: 'Off-White', nameLA: 'ຂາວຄຣີມ', hex: '#F4F4F0' },
      { nameEN: 'Charcoal Black', nameLA: 'ດຳຊາໂຄລ', hex: '#262626' },
      { nameEN: 'Sage Mist', nameLA: 'ຂຽວເຊດອ່ອນ', hex: '#9CAF88' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    variants: [
      { color: 'Off-White', size: 'M', stock: 15 },
      { color: 'Off-White', size: 'L', stock: 20 },
      { color: 'Off-White', size: 'XL', stock: 14 },
      { color: 'Charcoal Black', size: 'M', stock: 12 },
      { color: 'Charcoal Black', size: 'L', stock: 18 },
      { color: 'Charcoal Black', size: 'XL', stock: 12 }
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    isSale: false,
    featured: false,
    active: true,
    targetAge: 'all'
  },
  {
    id: 'cloth-04',
    sku: 'BM-CL-004',
    nameEN: 'Women Graceful Belted Linen Midi Dress',
    nameLA: 'ຊຸດເດຣສຜ້າລິນິນຍາວ ມີສາຍຮັດແອວ ລຽບຫຼູ',
    descriptionEN: 'Sophisticated V-neck silhouette with self-fabric waist tie, side pockets, and modest midi length. Timeless elegance for women of all ages.',
    descriptionLA: 'ຊຸດເດຣສຍາວຜ້າລິນິນ ຄໍວີ ສຸພາບ ງົດງາມ ມີກະເປົ໋າຂ້າງ ໃສ່ສະບາຍ ບໍ່ຮ້ອນ ເໝາະກັບງານລ້ຽງ ແລະ ໄປເຮັດວຽກ.',
    price: 780000,
    oldPrice: 920000,
    discountPercent: 15,
    gender: 'women',
    category: 'clothing',
    subcategory: 'dresses',
    brand: 'BM Studio',
    mainImage: blazerImg,
    images: {
      front: blazerImg,
      back: blazerImg,
      detail: blazerImg
    },
    colors: [
      { nameEN: 'Almond Beige', nameLA: 'ສີອານມອນ', hex: '#DEC8AB' },
      { nameEN: 'Terracotta Rust', nameLA: 'ສີດິນເຜົາ', hex: '#C25A3F' },
      { nameEN: 'Midnight Black', nameLA: 'ດຳສະໜິດ', hex: '#111827' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Almond Beige', size: 'S', stock: 4 },
      { color: 'Almond Beige', size: 'M', stock: 7 },
      { color: 'Almond Beige', size: 'L', stock: 9 },
      { color: 'Almond Beige', size: 'XL', stock: 5 },
      { color: 'Terracotta Rust', size: 'M', stock: 5 },
      { color: 'Terracotta Rust', size: 'L', stock: 6 }
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    isSale: true,
    featured: true,
    active: true,
    targetAge: 'all'
  },
  {
    id: 'cloth-05',
    sku: 'BM-CL-005',
    nameEN: 'Pleated Comfort Stretch Smart Trousers',
    nameLA: 'ສົ້ງສະແລັກຂາຍາວ ຜ້າຢືດຢຸ່ນ ມີຈີບໜ້າ ໃສ່ສະບາຍ',
    descriptionEN: 'Four-way stretch fabric with hidden expandable waistband and single front pleat. Keeps you sharp during long drives, office days, and travels.',
    descriptionLA: 'ສົ້ງສະແລັກຂາຍາວ ເອວຢືດຢຸ່ນໄດ້ ເນື້ອຜ້າຍືດ 4 ທິດທາງ ບໍ່ອຶດອັດ ນັ່ງສະບາຍ ໃສ່ໄປວຽກ ຫຼື ອອກງານກໍເບິ່ງດີ.',
    price: 590000,
    gender: 'men',
    category: 'clothing',
    subcategory: 'trousers',
    brand: 'BM Classic',
    mainImage: blazerImg,
    images: {
      front: blazerImg,
      back: blazerImg,
      detail: blazerImg
    },
    colors: [
      { nameEN: 'Graphite Grey', nameLA: 'ເທົາເຂັ້ມ', hex: '#374151' },
      { nameEN: 'Khaki Beige', nameLA: 'ກາກີ', hex: '#C2B280' },
      { nameEN: 'Deep Black', nameLA: 'ດຳ', hex: '#09090B' }
    ],
    sizes: ['30', '31', '32', '33', '34', '36', '38'],
    variants: [
      { color: 'Graphite Grey', size: '31', stock: 4 },
      { color: 'Graphite Grey', size: '32', stock: 8 },
      { color: 'Graphite Grey', size: '33', stock: 7 },
      { color: 'Graphite Grey', size: '34', stock: 6 },
      { color: 'Graphite Grey', size: '36', stock: 5 },
      { color: 'Khaki Beige', size: '32', stock: 6 },
      { color: 'Khaki Beige', size: '34', stock: 5 }
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    isSale: false,
    featured: false,
    active: true,
    targetAge: 'all'
  },
  {
    id: 'cloth-06',
    sku: 'BM-CL-006',
    nameEN: 'Classic Knit Pique Polo Shirt',
    nameLA: 'ເສື້ອໂປໂລຄໍປົກ ຜ້າປີເກ້ ຄຸນນະພາບພຣີມ່ຽມ',
    descriptionEN: 'Breathable honeycomb cotton knit with mother-of-pearl buttons and ribbed cuffs that do not curl.',
    descriptionLA: 'ເສື້ອໂປໂລຄໍປົກຜ້າປີເກ້ ລະບາຍອາກາດໄດ້ດີ ປົກຄໍບໍ່ມ້ວນ ໃສ່ສະບາຍ ບໍ່ຮ້ອນ ເໝາະກັບການຕີກັອບ ຫຼື ໃສ່ປະຈຳວັນ.',
    price: 430000,
    oldPrice: 500000,
    discountPercent: 14,
    gender: 'men',
    category: 'clothing',
    subcategory: 'polo',
    brand: 'BM Classic',
    mainImage: oxfordShirtImg,
    images: {
      front: oxfordShirtImg,
      back: oxfordShirtImg,
      detail: oxfordShirtImg
    },
    colors: [
      { nameEN: 'Forest Green', nameLA: 'ຂຽວເຂັ້ມ', hex: '#1C3F35' },
      { nameEN: 'Burgundy Wine', nameLA: 'ແດງເລືອດໝູ', hex: '#581825' },
      { nameEN: 'Snow White', nameLA: 'ຂາວຫິມະ', hex: '#FFFFFF' }
    ],
    sizes: ['M', 'L', 'XL', '2XL', '3XL'],
    variants: [
      { color: 'Forest Green', size: 'M', stock: 5 },
      { color: 'Forest Green', size: 'L', stock: 9 },
      { color: 'Forest Green', size: 'XL', stock: 8 },
      { color: 'Forest Green', size: '2XL', stock: 6 },
      { color: 'Burgundy Wine', size: 'L', stock: 7 },
      { color: 'Burgundy Wine', size: 'XL', stock: 6 }
    ],
    inStock: true,
    isNew: false,
    isPopular: false,
    isSale: true,
    featured: false,
    active: true,
    targetAge: 'mature'
  },
  {
    id: 'cloth-07',
    sku: 'BM-CL-007',
    nameEN: 'Women Wide-Leg Flowy Drape Trousers',
    nameLA: 'ສົ້ງຂາກວ້າງຜູ້ຍິງ ຜ້າຖິ້ງຕົວ ຊົງງາມ',
    descriptionEN: 'High-waisted elegant drape trousers with subtle pleating and elastic back waist for effortless comfort.',
    descriptionLA: 'ສົ້ງຂາກວ້າງຜ້າເນື້ອນຸ້ມຖິ້ງຕົວດີ ຊ່ວຍພາງຫຸ່ນ ເອວສູງ ດ້ານຫຼັງເປັນຢາງຢືດ ໃສ່ສະບາຍ ສວຍງາມ.',
    price: 560000,
    gender: 'women',
    category: 'clothing',
    subcategory: 'trousers',
    brand: 'BM Studio',
    mainImage: blazerImg,
    images: {
      front: blazerImg,
      back: blazerImg,
      detail: blazerImg
    },
    colors: [
      { nameEN: 'Sand Dune', nameLA: 'ສີຊາຍ', hex: '#C2B69D' },
      { nameEN: 'Espresso', nameLA: 'ສີນ້ຳຕານເຂັ້ມ', hex: '#3E2F28' },
      { nameEN: 'Black', nameLA: 'ດຳ', hex: '#18181B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Sand Dune', size: 'S', stock: 4 },
      { color: 'Sand Dune', size: 'M', stock: 8 },
      { color: 'Sand Dune', size: 'L', stock: 7 },
      { color: 'Sand Dune', size: 'XL', stock: 4 },
      { color: 'Black', size: 'M', stock: 6 },
      { color: 'Black', size: 'L', stock: 7 }
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    isSale: false,
    featured: false,
    active: true,
    targetAge: 'all'
  },
  {
    id: 'cloth-08',
    sku: 'BM-CL-008',
    nameEN: 'Premium Selvedge Straight-Leg Denim Jeans',
    nameLA: 'ໂສ້ງຢີນສ໌ຂາກະບອກ ຜ້າເຊວເວດ ພຣີມ່ຽມ',
    descriptionEN: '12.5 oz Japanese selvedge denim woven with a touch of stretch for modern comfort without losing heritage ruggedness.',
    descriptionLA: 'ໂສ້ງຢີນສ໌ຊົງຂາກະບອກຜ້າແທ້ຄຸນນະພາບສູງ ຜ້າຢືດນ້ອຍໆ ໃສ່ສະບາຍ ທົນທານ ໃສ່ໄດ້ທຸກຍຸກສະໄໝ.',
    price: 890000,
    oldPrice: 1100000,
    discountPercent: 19,
    gender: 'unisex',
    category: 'clothing',
    subcategory: 'jeans',
    brand: 'BM Denim',
    mainImage: blazerImg,
    images: {
      front: blazerImg,
      back: blazerImg,
      detail: blazerImg
    },
    colors: [
      { nameEN: 'Raw Indigo', nameLA: 'ສີຍີນສ໌ເຂັ້ມ', hex: '#1E293B' },
      { nameEN: 'Washed Vintage Blue', nameLA: 'ສີຍີນສ໌ຟອກ', hex: '#4B6B94' }
    ],
    sizes: ['30', '31', '32', '33', '34', '36'],
    variants: [
      { color: 'Raw Indigo', size: '31', stock: 5 },
      { color: 'Raw Indigo', size: '32', stock: 9 },
      { color: 'Raw Indigo', size: '33', stock: 8 },
      { color: 'Raw Indigo', size: '34', stock: 6 },
      { color: 'Washed Vintage Blue', size: '32', stock: 7 },
      { color: 'Washed Vintage Blue', size: '34', stock: 5 }
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    isSale: true,
    featured: false,
    active: true,
    targetAge: 'all'
  },
  {
    id: 'cloth-09',
    sku: 'BM-CL-009',
    nameEN: 'Lao Modern Silk-Cotton Short Sleeve Shirt',
    nameLA: 'ເສື້ອເຊີ້ດແຂນສັ້ນ ຜ້າຝ້າຍປະສົມໄໝລາວ ຮ່ວມສະໄໝ',
    descriptionEN: 'Breathable Lao silk and combed cotton blend with clean minimalist band collar and delicate tone-on-tone weave.',
    descriptionLA: 'ເສື້ອແຂນສັ້ນ ຄໍຈີນຮ່ວມສະໄໝ ຜ້າຝ້າຍປະສົມໄໝລາວ ລະບາຍອາກາດໄດ້ດີ ໃສ່ສະບາຍ ສຸພາບ ແລະ ພູມຖານ.',
    price: 650000,
    gender: 'men',
    category: 'clothing',
    subcategory: 'shirts',
    brand: 'BM Heritage',
    mainImage: oxfordShirtImg,
    images: {
      front: oxfordShirtImg,
      back: oxfordShirtImg,
      detail: oxfordShirtImg
    },
    colors: [
      { nameEN: 'Pearl White', nameLA: 'ຂາວມຸກ', hex: '#F8F6F0' },
      { nameEN: 'Soft Champagne', nameLA: 'ຄຳແຊມເປນອ່ອນ', hex: '#E6D7B9' },
      { nameEN: 'Steel Blue', nameLA: 'ຟ້າຕຸ່ນ', hex: '#4682B4' }
    ],
    sizes: ['M', 'L', 'XL', '2XL', '3XL'],
    variants: [
      { color: 'Pearl White', size: 'M', stock: 5 },
      { color: 'Pearl White', size: 'L', stock: 9 },
      { color: 'Pearl White', size: 'XL', stock: 8 },
      { color: 'Pearl White', size: '2XL', stock: 5 },
      { color: 'Soft Champagne', size: 'L', stock: 6 },
      { color: 'Soft Champagne', size: 'XL', stock: 6 }
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    isSale: false,
    featured: true,
    active: true,
    targetAge: 'all'
  },
  {
    id: 'cloth-10',
    sku: 'BM-CL-010',
    nameEN: 'Lightweight Weatherproof Windbreaker Jacket',
    nameLA: 'ເສື້ອແຈັກເກັດກັນລົມ ກັນລະອອງຝົນ ນ້ຳໜັກເບົາ',
    descriptionEN: 'Packable jacket crafted from recycled water-repellent shell with breathable mesh back vent and interior passport pocket.',
    descriptionLA: 'ເສື້ອກັນລົມກັນຝົນ ນ້ຳໜັກເບົາ ພັບເກັບງ່າຍ ມີຊ່ອງລະບາຍອາກາດດ້ານຫຼັງ ເໝາະສຳລັບຂີ່ລົດຈັກ ແລະ ເດີນທາງ.',
    price: 620000,
    oldPrice: 750000,
    discountPercent: 17,
    gender: 'unisex',
    category: 'clothing',
    subcategory: 'jackets',
    brand: 'BM Motion',
    mainImage: blazerImg,
    images: {
      front: blazerImg,
      back: blazerImg,
      detail: blazerImg
    },
    colors: [
      { nameEN: 'Matte Black', nameLA: 'ດຳດ້ານ', hex: '#1C1917' },
      { nameEN: 'Stone Grey', nameLA: 'ເທົາຫີນ', hex: '#78716C' },
      { nameEN: 'Dark Olive', nameLA: 'ຂຽວໂອລີຟ', hex: '#3F4436' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    variants: [
      { color: 'Matte Black', size: 'M', stock: 7 },
      { color: 'Matte Black', size: 'L', stock: 10 },
      { color: 'Matte Black', size: 'XL', stock: 8 },
      { color: 'Matte Black', size: '2XL', stock: 5 },
      { color: 'Stone Grey', size: 'L', stock: 6 },
      { color: 'Stone Grey', size: 'XL', stock: 6 }
    ],
    inStock: true,
    isNew: false,
    isPopular: false,
    isSale: true,
    featured: false,
    active: true,
    targetAge: 'all'
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  shopName: 'BM SHOP — Shoes & Clothing',
  bankName: 'BCEL (Banque Pour Le Commerce Exterieur Lao)',
  accountOwner: 'BM SHOP / BOUNMY S.',
  accountNumber: '010-12-00-01234567-001',
  qrCodeImage: 'https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=00020101021129370016A00000067701011101130101200012345670015802LA530341854068500005802LA5914BM%20SHOP%20LAOS6009VIENTIANE62170813BM20261003001630489AB',
  fixedDeliveryFee: 25000, // ₭25,000 standard delivery
  freeDeliveryThreshold: 500000, // Free over ₭500,000
  phone: '020 5555 9988 / WhatsApp: +856 20 5555 9988',
  whatsappNumber: '8562055559988',
  address: 'Souphanouvong Avenue, Ban Sihom, Chanthabouly District, Vientiane Capital, Laos',
  facebook: 'https://facebook.com/bmshoplaos',
  tiktok: 'https://tiktok.com/@bmshoplaos',
  reservationDurationHours: 24
};

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'Khamphanh V.',
    rating: 5,
    comment: 'ສັ່ງຊື້ເກີບໜັງໂລບເຟີມາໃສ່ເຮັດວຽກ ໜັງແທ້ນຸ້ມຫຼາຍ ໃສ່ສະບາຍບໍ່ເຈັບສົ້ນຕີນເລີຍ ຈັດສົ່ງຮອດວຽງຈັນພາຍໃນມື້ດຽວ. ປະທັບໃຈຫຼາຍ!',
    productName: 'Handcrafted Heritage Leather Penny Loafers',
    date: '2026-09-24',
    approved: true,
    ageGroup: '45-54'
  },
  {
    id: 'rev-2',
    customerName: 'Souphaphone D.',
    rating: 5,
    comment: 'The linen blazer is beautiful and lightweight. Perfect for hot weather meetings in Vientiane. Will order the navy color next!',
    productName: 'Tailored Relaxed Linen Blazer',
    date: '2026-09-28',
    approved: true,
    ageGroup: '25-34'
  },
  {
    id: 'rev-3',
    customerName: 'Bounthavy P.',
    rating: 5,
    comment: 'ຂ້ອຍອາຍຸ 52 ປີ ໃສ່ເກີບແລ່ນນ້ຳໜັກເບົາຂອງ BM SHOP ແລ້ວຮູ້ສຶກສະບາຍຫົວເຂົ່າຫຼາຍ ບໍ່ປວດຂາເລີຍ. ການໂອນເງິນ QR ສະດວກ ທີມງານຕອບແຊັດໄວ.',
    productName: 'Ultralight All-Day Walking & Running Shoes',
    date: '2026-09-30',
    approved: true,
    ageGroup: '45-54'
  },
  {
    id: 'rev-4',
    customerName: 'Alounny K.',
    rating: 5,
    comment: 'ເກີບຜ້າໃບຂາວໃສ່ກັບຊຸດໃດກໍງາມ ລາຄາສົມເຫດສົມຜົນ ບໍ່ແພງເກີນໄປ ຄຸນນະພາບເກີນລາຄາແທ້ໆ.',
    productName: 'Classic Minimal Leather Sneakers',
    date: '2026-10-01',
    approved: true,
    ageGroup: '18-24'
  }
];

export const LAO_PROVINCES = [
  { id: 'vientiane_capital', nameEN: 'Vientiane Capital', nameLA: 'ນະຄອນຫຼວງວຽງຈັນ' },
  { id: 'luang_prabang', nameEN: 'Luang Prabang', nameLA: 'ແຂວງ ຫຼວງພະບາງ' },
  { id: 'champasak', nameEN: 'Champasak', nameLA: 'ແຂວງ ຈຳປາສັກ' },
  { id: 'savannakhet', nameEN: 'Savannakhet', nameLA: 'ແຂວງ ສະຫວັນນະເຂດ' },
  { id: 'vientiane_province', nameEN: 'Vientiane Province', nameLA: 'ແຂວງ ວຽງຈັນ' },
  { id: 'khammouane', nameEN: 'Khammouane', nameLA: 'ແຂວງ ຄຳມ່ວນ' },
  { id: 'bolikhamxay', nameEN: 'Bolikhamxay', nameLA: 'ແຂວງ ບໍລິຄຳໄຊ' },
  { id: 'oudomxay', nameEN: 'Oudomxay', nameLA: 'ແຂວງ ອຸດົມໄຊ' },
  { id: 'bokeo', nameEN: 'Bokeo', nameLA: 'ແຂວງ ບໍ່ແກ້ວ' },
  { id: 'luang_namtha', nameEN: 'Luang Namtha', nameLA: 'ແຂວງ ຫຼວງນ້ຳທາ' },
  { id: 'sayaboury', nameEN: 'Sayaboury', nameLA: 'ແຂວງ ໄຊຍະບູລີ' },
  { id: 'saravane', nameEN: 'Saravane', nameLA: 'ແຂວງ ສາລະວັນ' },
  { id: 'sekong', nameEN: 'Sekong', nameLA: 'ແຂວງ ເຊກອງ' },
  { id: 'attapeu', nameEN: 'Attapeu', nameLA: 'ແຂວງ ອັດຕະປື' },
  { id: 'houaphanh', nameEN: 'Houaphanh', nameLA: 'ແຂວງ ຫົວພັນ' },
  { id: 'phongsaly', nameEN: 'Phongsaly', nameLA: 'ແຂວງ ຜົ້ງສາລີ' },
  { id: 'xieng_khouang', nameEN: 'Xieng Khouang', nameLA: 'ແຂວງ ຊຽງຂວາງ' },
  { id: 'xaysomboun', nameEN: 'Xaysomboun', nameLA: 'ແຂວງ ໄຊສົມບູນ' }
];

export const VIENTIANE_DISTRICTS = [
  { id: 'chanthabouly', nameEN: 'Chanthabouly', nameLA: 'ເມືອງ ຈັນທະບູລີ' },
  { id: 'sikhottabong', nameEN: 'Sikhottabong', nameLA: 'ເມືອງ ສີໂຄດຕະບອງ' },
  { id: 'xaysettha', nameEN: 'Xaysettha', nameLA: 'ເມືອງ ໄຊເສດຖາ' },
  { id: 'sisattanak', nameEN: 'Sisattanak', nameLA: 'ເມືອງ ສີສັດຕະນາກ' },
  { id: 'hadxayfong', nameEN: 'Hadxayfong', nameLA: 'ເມືອງ ຫາດຊາຍຟອງ' },
  { id: 'xaythany', nameEN: 'Xaythany', nameLA: 'ເມືອງ ໄຊທານີ' },
  { id: 'parkngum', nameEN: 'Parkngum', nameLA: 'ເມືອງ ປາກງື່ມ' },
  { id: 'nasaythong', nameEN: 'Nasaythong', nameLA: 'ເມືອງ ນາຊາຍທອງ' },
  { id: 'sangthong', nameEN: 'Sangthong', nameLA: 'ເມືອງ ສັງທອງ' }
];
