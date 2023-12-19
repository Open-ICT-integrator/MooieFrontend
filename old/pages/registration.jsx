import { useState, useReducer } from 'react'
import { NavLink } from '../components/NavLink'
import { getLayout } from '../components/Layout/subLayout'
import { createAccount } from "../hooks/useApi"
import ErrorPlaceholder from '../components/Placeholders/Error'
import SuccessPlaceholder from '../components/Placeholders/Success'
import LoadingPlaceholder from '../components/Placeholders/Loading'

const Registration = () => {

    const [studentNumber, setStudentNumber] = useState('')
    const formReducer = (state, event) => {
        return {
            ...state,
            [event.name]: event.value
        }
    }

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useReducer(formReducer, {})
    const handleChange = (event, i) => {
        const { name, value } = event.target
        if (name === "studentnumber") {
            setStudentNumber(value)
        }
        setFormData({
            name: name,
            value: value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        setLoading(true)
        createAccount(formData)
            .then(res => setSuccess(true))
            .catch((error) => setError(true))
            .finally(() => setLoading(false))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container_wrapper">
                {success && <SuccessPlaceholder message="Succesvol een acount aangemaakt" />}
                {error && <ErrorPlaceholder />}
                {!success && <div>
                    <label htmlFor="studentnumber" className="block font-base-font-dark mb-2 font-bold">HU studentnummer</label>
                    <p className="text_paragraph">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <input
                        type="number"
                        name="studentnumber"
                        placeholder="Studentnummer"
                        className="input_field mt-0"
                        onChange={e => handleChange(e)}
                    />

                    <div className="mt-5">
                        <label className="block font-base-font-dark mb-2 font-bold">Gegevens</label>
                        <input
                            type="text"
                            placeholder="Voornaam"
                            className="input_field"
                            name="firstname"
                            onChange={e => handleChange(e)}
                        />
                        <input
                            type="text"
                            placeholder="Achternaam"
                            className="input_field"
                            name="surname"
                            onChange={e => handleChange(e)}
                        />
                    </div>

                    <div className="mt-5">
                        <label className="block font-base-font-dark mb-2 font-bold">Wachtwoord</label>
                        <input
                            type="password"
                            placeholder="Wachtwoord"
                            className="input_field"
                            name="password"
                            onChange={e => handleChange(e)}
                        />

                        {/* <input type="password" placeholder="Wachtwoord herhalen"
                        className="input_field"
                    /> */}
                    </div>

                    <div className="mt-5">
                        <span className="block font-base-font-dark mb-2 font-bold">E-mail</span>
                        <p className="text_paragraph">
                            Een account kan enkel gevalideerd worden met een geldig HU e-mail adres. Dit e-mailadres is niet aanpasbaar.
                        </p>

                        <div className="w-full relative cursor-not-allowed bg-[#f6f8fa] border-[#e5e8ee] border-1 rounded-standard grid grid-cols-6 dark:bg-dark-400 dark:border-dark-400 dark:text-white">
                            <div className="py-10 px-s col-start-1 col-end-4">
                                {studentNumber}
                            </div>

                            <div className="py-10 px-xl border-l-[1px] border-[#e5e8ee] col-end-12 dark:border-dark-300 ">
                                @student.hu.nl
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {loading && <LoadingPlaceholder />}
                    {!loading && <button className="btn-primary blue w-full mt-5">Account aanmaken</button>}
                </div>}
            </div>
            <span className="text-center block mt-5">
                <NavLink href="/login">
                    Al een account? <span className="text-blue-700 mt-3">Login</span>
                </NavLink>
            </span>
        </form>
    )
}

// Import the default styling layout
Registration.getLayout = getLayout

export default Registration