import { useState, useEffect, useReducer } from 'react'
import Head from 'next/head'
import { getLayout } from '../../../components/Layout/defaultLayout'
import useFetchProjectById from '../../../hooks/useFetchProjectsById'
import SuccessPlaceholder from '../../../components/Placeholders/Success'
import ErrorPlaceholder from '../../../components/Placeholders/Error'
import LoadingPlaceholder from '../../../components/Placeholders/Loading'
import { editProject, removeStudentFromProject } from '../../../hooks/useApi'

export function getServerSideProps(context) {
    return {
        props: {
            params: context.params
        }
    }
}

const Project = ({ params }) => {

    const { id } = params

    const MEMBER_MAX = 8

    const handleInputChange = (e, i) => {
        const { name, value } = e.target
        const list = [...projectMembers]
        list[i][name] = value
        setProjectMembers(list)
    }

    const handleRemoveClick = i => {
        const list = [...projectMembers]
        list.splice(i, 1)
        setProjectMembers(list)

		// // Call remove student, if there is no set ID return since it wasn't saved yet.
		if([...projectMembers][i].id === undefined) 
			return

		removeStudentFromProject([...projectMembers][i].id).then(res => setSuccess(true))
			.catch((error) => setError(true))
    }

    const handleAddClick = () => {
        if (projectMembers.length >= MEMBER_MAX) {
            return
        }

        setProjectMembers([...projectMembers, { studentId: "" }])
    }

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

    const { data, loading, error } = useFetchProjectById(id)
    const [projectMembers, setProjectMembers] = useState([])

    useEffect(() => {
        if (!data)
            return

        setProjectMembers(data[0]?.collaborators)
        setFormData({ name: 'name', value: data[0]?.name })
        setFormData({ name: 'description', value: data[0]?.description })
    }, [data])

    const [errorMsg, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const handleSubmit = event => {
        event.preventDefault()
        console.log('Submitting')

        const projectInformation = {
            id: id,
            project: formData,
            members: projectMembers
        }

        editProject(projectInformation).then(res => setSuccess(true))
            .catch((error) => setError(true))
    }

    return (
        <>
            <Head>
                <title>Project {id} - HU</title>
            </Head>
            <div className="w-full">
                {loading && <LoadingPlaceholder />}
                {(error || errorMsg) && <ErrorPlaceholder message={'kan geen project ophalen'}/>}
                <form onSubmit={handleSubmit}>
                    {data && <div className="container_wrapper">
                        {success && <SuccessPlaceholder />}

                        <span className="text_label text-lg mt-0">Project {id} aanpassen</span>
                        <hr className="my-4" />
                        <div className="flex mb-4 gap-8 relative">
                            <div className="w-1/2">
                                <span className="text_label text-lg">Project details</span>
                                <p className="text_paragraph">
                                    Pas de omschrijving van je project aan.
                                </p>
                                <input
                                    type="text"
                                    placeholder="Projectnaam"
                                    className="input_field mb-2"
                                    name="name"
                                    value={formData.name || ""}
                                    onChange={e => handleChange(e)}
                                />
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={e => handleChange(e)}
                                    placeholder="Project beschrijving"
                                    className="relative outline-none p-15 border-1 border-border-grey-100 w-full rounded-standard shadow-sm transition duration-400 hover:border-blue-100 dark-states min-h-[150px]"
                                >
                                </textarea>
                            </div>
                            <div className="w-1/2">
                                <span className="text_label text-lg">Studenten beheren</span>
                                <p className="text_paragraph">
                                    Beheer studenten met toegang tot het project.
                                </p>

                                {
                                    projectMembers?.map((x, i) => {
                                        return (
                                            <div className="relative mt-3" key={i}>
                                                <input type="text_paragraph"
                                                    placeholder="Studentnummer"
                                                    name="studentId"
                                                    onChange={e => handleInputChange(e, i)}
                                                    className="outline-none p-12 border-1 border-border-grey-100 w-full rounded-standard shadow-sm transition duration-400 
													hover:border-blue-100 focus:border-blue-100 dark-states"
                                                    value={x.studentId}
                                                />
                                                <span className="absolute inline-block z-10 right-5 top-[50%] translate-y-[-50%]">
                                                    {
                                                        projectMembers.length !== 1 &&
                                                        <span className={`btn-primary-round minus h-sm w-sm ${projectMembers.length - 1 === i && projectMembers.length !== MEMBER_MAX ? 'absolute right-[30px]' : ''}`} onClick={() => handleRemoveClick(i)}></span>
                                                    }
                                                    {
                                                        projectMembers.length - 1 === i && projectMembers.length !== MEMBER_MAX &&
                                                        <span className="btn-primary-round plus h-sm w-sm" onClick={handleAddClick}></span>
                                                    }
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex gap-8 relative">
                            <button className="btn-primary blue w-full">Project aanpassen</button>
                        </div>
                    </div>}
                </form>
            </div>
        </>
    )
}

// Import the default styling layout
Project.getLayout = getLayout

export default Project