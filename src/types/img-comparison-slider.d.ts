import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'img-comparison-slider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        value?: number;
        hover?: boolean;
        direction?: 'horizontal' | 'vertical';
        keyboard?: 'enabled' | 'disabled';
        handle?: boolean;
      };
    }
  }
}

