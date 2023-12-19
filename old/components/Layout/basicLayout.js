// Loads layout used on pages without sidebar and header, the loggedOff pages.
import {
    getLayout as getDefaultLayout
} from './subLayout'

const defaultLayout = ({ children }) => { children }

export const getLayout = page =>
    getDefaultLayout(<>{page}</>)

export default defaultLayout