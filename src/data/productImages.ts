// Product images mapping - Maps product slugs to their generated images
import ssRoundPipe from '@/assets/products/ss-round-pipe.jpg';
import ssRoundPipeCatalogue from '@/assets/products/ss-round-pipe-catalogue.png';
import ssRoundPipePolished from '@/assets/products/ss-round-pipe-polished.png';
import ssRoundPipeCloseup from '@/assets/products/ss-round-pipe-closeup.png';
import ssSquarePipe from '@/assets/products/ss-square-pipe.jpg';
import ssSquarePipePolished from '@/assets/products/ss-square-pipe-polished.png';
import ssSquarePipeStack from '@/assets/products/ss-square-pipe-stack.jpg';
import ssSquarePipeCloseup from '@/assets/products/ss-square-pipe-closeup.png';
import ssRectPipe from '@/assets/products/ss-rect-pipe.jpg';
import ssRectPipeStack from '@/assets/products/ss-rect-pipe-stack.png';
import ssRectPipeBrushed from '@/assets/products/ss-rect-pipe-brushed.png';
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
import glassClamp2 from '@/assets/products/glass-clamp-2.jpg';
import glassClamp3 from '@/assets/products/glass-clamp-3.jpg';
import aluSliding from '@/assets/products/alu-sliding.jpg';
import aluDoor from '@/assets/products/alu-door.jpg';
import showerFrameless from '@/assets/products/shower-frameless.jpg';
import showerSliding from '@/assets/products/shower-sliding.jpg';
import showerPartition from '@/assets/products/shower-partition.jpg';
import toughenedPanel from '@/assets/products/toughened-panel.jpg';
import laminatedGlass from '@/assets/products/laminated-glass.jpg';
import frostedGlass from '@/assets/products/frosted-glass.jpg';
import ssMainGate from '@/assets/products/ss-main-gate.jpg';
import ssWindowGrill from '@/assets/products/ss-window-grill.jpg';
import ssBalconyGrill from '@/assets/products/ss-balcony-grill.jpg';
import glassUChannel from '@/assets/products/glass-u-channel.jpg';
import glassTopRail from '@/assets/products/glass-top-rail.jpg';
import glassCoverPlate from '@/assets/products/glass-cover-plate.jpg';
import glassPatchFitting from '@/assets/products/glass-patch-fitting.jpg';
import ssRailingBracket from '@/assets/products/ss-railing-bracket.jpg';
import ssBasePlate from '@/assets/products/ss-base-plate.jpg';
import ssElbowConnector from '@/assets/products/ss-elbow-connector.jpg';
import ssEndCap from '@/assets/products/ss-end-cap.jpg';

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
  'shower-frameless': showerFrameless,
  'shower-sliding': showerSliding,
  'shower-partition': showerPartition,
  'toughened-panel': toughenedPanel,
  'laminated-glass': laminatedGlass,
  'frosted-glass': frostedGlass,
  'ss-main-gate': ssMainGate,
  'ss-window-grill': ssWindowGrill,
  'ss-balcony-grill': ssBalconyGrill,
  'glass-u-channel': glassUChannel,
  'glass-top-rail': glassTopRail,
  'glass-cover-plate': glassCoverPlate,
  'glass-patch-fitting': glassPatchFitting,
  'ss-railing-bracket': ssRailingBracket,
  'ss-base-plate': ssBasePlate,
  'ss-elbow-connector': ssElbowConnector,
  'ss-end-cap': ssEndCap,
};

// Product gallery images (multiple images per product)
export const productGalleryImages: Record<string, string[]> = {
  'glass-clamp': [glassClamp, glassClamp2, glassClamp3],
  'ss-round-pipe': [ssRoundPipe, ssRoundPipeCatalogue, ssRoundPipePolished, ssRoundPipeCloseup],
  'ss-square-pipe': [ssSquarePipe, ssSquarePipePolished, ssSquarePipeStack, ssSquarePipeCloseup],
  'ss-rect-pipe': [ssRectPipeStack, ssRectPipeBrushed],
};

// Default fallback image
export const defaultProductImage = ssRoundPipe;

// Get image for a product by slug
export const getProductImage = (slug: string): string => {
  return productImages[slug] || defaultProductImage;
};

// Get all gallery images for a product
export const getProductGalleryImages = (slug: string): string[] => {
  return productGalleryImages[slug] || [getProductImage(slug)];
};
