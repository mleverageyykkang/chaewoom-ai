import type { CSSProperties } from 'react';

/** style 에 CSS 변수(--d, --i 등)를 넣을 때 쓰는 도우미 */
export const cssVar = (vars: Record<string, string | number>, rest?: CSSProperties) =>
    ({ ...vars, ...rest }) as CSSProperties;
