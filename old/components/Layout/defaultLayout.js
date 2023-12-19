// Loads the default layout used on the majority of pages with a header and sidebar.
import { 
    getLayout as getDefaultLayout
} from './layout'

const defaultLayout = ({ children }) => {children}

export const getLayout = page =>
    getDefaultLayout(<>{page}</>)

export default defaultLayout