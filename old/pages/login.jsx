import { useState, useReducer } from 'react'
import { getLayout } from '../components/Layout/basicLayout'
import { loginAccount } from "../hooks/useApi"
import Router from 'next/router'
import ErrorPlaceholder from '../components/Placeholders/Error'
import SuccessPlaceholder from '../components/Placeholders/Success'
import LoadingPlaceholder from '../components/Placeholders/Loading'

const Login = () => {

    const formReducer = (state, event) => {
        return {
            ...state,
            [event.name]: event.value
        }
    }

    const [formData, setFormData] = useReducer(formReducer, {})
    const handleChange = (event, i) => {
        const { name, value } = event.target

        setFormData({
            name: name,
            value: value
        })
    }

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = event => {
        event.preventDefault()

        setLoading(true)
        loginAccount(formData)
            .then(res => {
                setTimeout(() => {
                    const { pathname } = Router
                    if (pathname == '/login') {
                        Router.push('/instances/new')
                    }
                }, 1000)
                setSuccess(true)
            })
            .catch((error) => setError(true))
            .finally(() => setLoading(false))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container_wrapper">
                {success && <SuccessPlaceholder message="Succesvol ingelogd, je wordt doorgestuurd." />}
                {error && <ErrorPlaceholder message="Incorrect login gegevens" />}
                <input type="number"
                    placeholder="Studentnummer" className="input_field"
                    name="username"
                    onChange={e => handleChange(e)}
                />
                <input type="password" placeholder="Wachtwoord" className="input_field mt-3"
                    name="password"
                    onChange={e => handleChange(e)}
                />
                {loading && <LoadingPlaceholder />}
                {!loading && <button type="submit" className="btn-primary blue w-full mt-5 rounded-xl">Inloggen</button>}
                {/* <hr className="my-4" />
                <span className="text-center block">
                    <a href="/reset_password">
                        Wachtwoord vergeten?
                    </a>
                </span> */}
            </div>
            <span className="text-center block mt-5">
                <a href="/registration">
                    Nog geen account? <span className="text-blue-700">Registreer</span>.
                </a>
            </span>
        </form>
    )
}

// Import the default styling layout
Login.getLayout = getLayout

export default Login