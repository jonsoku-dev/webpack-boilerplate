import '@emotion/react';

import { ProjectDefaultThemeType } from '@/emotion';

declare module '@emotion/react' {
  export interface Theme extends ProjectDefaultThemeType {}
}
