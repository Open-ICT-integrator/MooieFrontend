import { NavLink } from '../NavLink'
import Logo from '../../assets/svg/hu-logo.svg'

const SubLayout = ({ children }) => (
	<div className="w-full max-w-screen-xl mx-auto md:w-full">
		<div className="flex h-screen justify-center items-center relative">
			<div className="w-1/2">
				<NavLink href="/login">
					<Logo width={200} height={120} className="mx-auto block" />
				</NavLink>
				{children}
			</div>
		</div>
	</div>
)

export const getLayout = page => <SubLayout>{page}</SubLayout>

export default SubLayout