import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'

const Layout = ({ children }) => (
	<>
		<Header />
		<div className="w-full max-w-screen-xl mx-auto">
			<div className="flex mb-4 gap-4 relative">
				<Sidebar />
				{children}
			</div>
		</div>
	</>
)

export const getLayout = page => <Layout>{page}</Layout>

export default Layout