export const animationVariants = {
    'fade-up': {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    'slide-left': {
      hidden: { opacity: 0, x: 100 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    'zoom-in': {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    'slide-right': {
      hidden: { opacity: 0, x: -100 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    'slide-up': {
      hidden: { opacity: 0, y: 100 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    'slide-down': {
      hidden: { opacity: 0, y: -100 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    'fade-in': {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeIn' } },
    },
    'zoom-out': {
      hidden: { opacity: 0, scale: 1.2 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    'rotate-in': {
      hidden: { opacity: 0, rotate: -90, scale: 0.5 },
      visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    },
    'flip-in-x': {
      hidden: { opacity: 0, rotateX: -90 },
      visible: { opacity: 1, rotateX: 0, transition: { duration: 0.7, ease: 'easeOut' } },
    },
    'flip-in-y': {
      hidden: { opacity: 0, rotateY: -90 },
      visible: { opacity: 1, rotateY: 0, transition: { duration: 0.7, ease: 'easeOut' } },
    },
    'scale-up': {
      hidden: { opacity: 0, scale: 0.5 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    'scale-down': {
      hidden: { opacity: 0, scale: 1.5 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    'blur-in': {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: 'easeOut' } },
    },
  };
  
  // ✅ Automatically derived type
  export type AnimationVariantType = keyof typeof animationVariants;
  