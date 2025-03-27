declare module '*.jpg' {
    const content: string;
    export default content;
}

declare module '*.jpeg' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.gif' {
    const content: string;
    export default content;
}

declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.webp' {
    const content: string;
    export default content;
}

declare module '*.mp4' {
    const content: string;
    export default content;
}

// responsive-loader.d.ts

declare module 'responsive-loader' {
    export interface ResponsiveLoaderOptions {
      adapter?: any;
      sizes?: number[];
      quality?: number;
      name?: string;
      format?: string | ((query: string) => string | undefined);
      placeholder?: boolean;
      placeholderSize?: number;
    }
  
    type ResponsiveLoaderCallback = (err: Error | null, data: any) => void;
  
    function responsiveLoader(
      this: any,
      content: Buffer | string,
      options: ResponsiveLoaderOptions,
      callback: ResponsiveLoaderCallback
    ): void;
  
    export = responsiveLoader;
  }
  
  declare module 'responsive-loader/sharp.js' {
    const sharpAdapter: any;
    export default sharpAdapter;
  }
  