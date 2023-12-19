import Head from 'next/head'
import React, { useEffect } from "react";
import Router from 'next/router'
import { getLayout } from '../components/Layout/defaultLayout'

const Index = () => {

	useEffect(() => {
		const { pathname } = Router
		if (pathname == '/') {
			Router.push('/instances/new')
		}
	})

	return (
		<>
			<Head>
				<title>Home - HU</title>
			</Head>
			<div className="w-full">
				<div className="container_wrapper">
					index
				</div>
			</div>
		</>
	)
}

// Import the default styling layout
Index.getLayout = getLayout

export default Index