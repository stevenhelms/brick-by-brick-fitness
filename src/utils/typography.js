import Typography from 'typography'
// import kirkhamTheme from "typography-theme-kirkham"
// import lawtonTheme from "typography-theme-lawton"

// import grandViewTheme from "typography-theme-grand-view"
// import oceanBeachTheme from "typography-theme-ocean-beach" // weird title in header
// import parnassusTheme from "typography-theme-parnassus"
import sutroTheme from 'typography-theme-sutro'

const typography = new Typography(sutroTheme)

export default typography
export const rhythm = typography.rhythm
