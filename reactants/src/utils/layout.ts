export const GAP_SCALE = ['4', '8', '12', '16', '20', '24', '32', '40', '48', '56', '64', '72', '80'] as const

export type Gap = (typeof GAP_SCALE)[number]

export interface LayoutProps {
  m?: Gap
  mx?: Gap
  my?: Gap
  mt?: Gap
  mb?: Gap
  ml?: Gap
  mr?: Gap

  p?: Gap
  px?: Gap
  py?: Gap
  pt?: Gap
  pb?: Gap
  pl?: Gap
  pr?: Gap
}

export function useLayoutProps<RestProps>({
  m,
  mt,
  mr,
  mb,
  ml,
  my,
  mx,
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  ...cleanedRest
}: LayoutProps & RestProps) {
  const layoutClassName = Object.entries({ m, mt, mr, mb, ml, my, mx, p, px, py, pt, pb, pl, pr })
    .map(([key, value]) => {
      const gap = GAP_SCALE.find((gap) => gap === value)
      return gap ? `${key}-${gap}` : null
    })
    .filter(Boolean)
    .join(' ')

  return { layoutClassName, cleanedRest }
}
