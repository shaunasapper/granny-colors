export const ALL_YARN_COLORS = {
  brown: '#3b200a',
  lightBrown: '#ab8c72',
  white: '#fffcfa',
  darkBlue: '#2e48a6',
  lightBlue: '#217cde',
  darkGreen: '#23400a',
  lightGreen: '#c6e3ac',
  orange: '#c45a0e',
  yellow: '#d4a20d',
}

// all colors excluding the base color
export const colorPalette = Object.values(ALL_YARN_COLORS).slice(1)

export const colorWeights = {
  [ALL_YARN_COLORS.lightBrown]: 1,
  [ALL_YARN_COLORS.white]: 1,
  [ALL_YARN_COLORS.darkBlue]: 3,
  [ALL_YARN_COLORS.lightBlue]: 3,
  [ALL_YARN_COLORS.darkGreen]: 3,
  [ALL_YARN_COLORS.lightGreen]: 3,
  [ALL_YARN_COLORS.orange]: 3,
  [ALL_YARN_COLORS.yellow]: 3,
}
