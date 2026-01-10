// Product images mapping - Maps product slugs to their generated images
import ssRoundPipe from '@/assets/products/ss-round-pipe.jpg';
import ssSquarePipe from '@/assets/products/ss-square-pipe.jpg';
import ssRectPipe from '@/assets/products/ss-rect-pipe.jpg';
import ssOvalPipe from '@/assets/products/ss-oval-pipe.jpg';
import ssSheetPlain from '@/assets/products/ss-sheet-plain.jpg';
import ssSheetMirror from '@/assets/products/ss-sheet-mirror.jpg';
import ssSheetHairline from '@/assets/products/ss-sheet-hairline.jpg';
import designerGold from '@/assets/products/designer-gold.jpg';
import designerRosegold from '@/assets/products/designer-rosegold.jpg';
import designerBlack from '@/assets/products/designer-black.jpg';
import ssBaluster from '@/assets/products/ss-baluster.jpg';
import ssHandrail from '@/assets/products/ss-handrail.jpg';
import glassSpider from '@/assets/products/glass-spider.jpg';
import glassClamp from '@/assets/products/glass-clamp.jpg';
import aluSliding from '@/assets/products/alu-sliding.jpg';
import aluDoor from '@/assets/products/alu-door.jpg';

// Map product slugs to their images
export const productImages: Record<string, string> = {
  'ss-round-pipe': ssRoundPipe,
  'ss-square-pipe': ssSquarePipe,
  'ss-rect-pipe': ssRectPipe,
  'ss-oval-pipe': ssOvalPipe,
  'ss-sheet-plain': ssSheetPlain,
  'ss-sheet-mirror': ssSheetMirror,
  'ss-sheet-hairline': ssSheetHairline,
  'designer-gold': designerGold,
  'designer-rosegold': designerRosegold,
  'designer-black': designerBlack,
  'ss-baluster': ssBaluster,
  'ss-handrail': ssHandrail,
  'glass-spider': glassSpider,
  'glass-clamp': glassClamp,
  'alu-sliding': aluSliding,
  'alu-door': aluDoor,
};

// Default fallback image
export const defaultProductImage = ssRoundPipe;

// Get image for a product by slug
export const getProductImage = (slug: string): string => {
  return productImages[slug] || defaultProductImage;
};