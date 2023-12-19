const BASEURL = 'http://localhost:3001/api/v1'

/**
 * Save new created project
 * @param {*} name
 * @param {*} description
 * @param {*} studentId
 * @param {*} students, contains array of added students to project
 * @returns 200
 */
export async function createProject(data) {

    const projectData = {
        name: data.project.name,
        description: data.project.description,
        creator: 24, // this data needs to come from a session id.
        students: data.members
    }

    return new Promise(async (resolve, reject) => {
        await fetch(`${BASEURL}/projects/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        })
            .then(res => {
                if (res.ok) return res.json()
                return Promise.reject(res)
            })
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

/** 
 * 
 */
export async function editProject(data) {

    const projectData = {
        id: parseInt(data.id),
        name: data.project.name,
        description: data.project.description,
        students: data.members
    }

    return new Promise(async (resolve, reject) => {
        await fetch(`${BASEURL}/projects/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        })
            .then(res => {
                if (res.ok) return res.json()
                return Promise.reject(res)
            })
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

/**
 * Remove student from project
 * @param {*} id 
 * @returns 
 */
export async function removeStudentFromProject(id) {

    return new Promise(async (resolve, reject) => {
        await fetch(`${BASEURL}/projects/remove/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id
            }),
        })
            .then(res => {
                if (res.ok) return res.json()
                return Promise.reject(res)
            })
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
export async function addOperatingSystem(data) {

    let detail = data.data
    const operatingSystemDetails = {
        name: detail.name,
        image: data.image,
        isoUrl: detail.iso,
        version: detail.version
    }

    return new Promise(async (resolve, reject) => {
        await fetch(`${BASEURL}/os/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(operatingSystemDetails),
        })
            .then(res => {
                if (res.ok) return res.json()
                return Promise.reject(res)
            })
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

export async function createAccount(data) {

    const accountData = {
        firstname: data.firstname,
        surname: data.surname,
        studentId: parseInt(data.studentnumber),
        password: data.password
    }

    return new Promise(async (resolve, reject) => {
        await fetch(`${BASEURL}/account/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accountData),
        })
            .then(response => {
                if (response.ok) return response.json()
                return Promise.reject()
            })
            .then(res => {
                if (res.error) return Promise.reject(res.message)
                return resolve(res)
            })
            .catch(err => reject(err))
    })
}

export async function loginAccount(data) {

    const accountData = {
        username: data.username,
        password: data.password,
    }

    return new Promise(async (resolve, reject) => {
        await fetch(`${BASEURL}/account/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accountData),
        })
            .then(response => {
                if (response.ok) return response.json()
                return Promise.reject()
            })
            .then(res => {
                if (res.error) return Promise.reject(res.message)
                return resolve(res)
            })
            .catch(err => reject(err))
    })
}

export async function createVM(data) {

    const machineData = {
        vmName: data.data.serverName,
        storage: data.storage,
        operatingSystem: data.OS,
        projectId: data.projectId
    }

    return new Promise(async (resolve, reject) => {
        await fetch(`${BASEURL}/vsphere/new/vm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(machineData),
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                return Promise.reject()
            })
            .then(res => {
                if (res.error) {
                    return Promise.reject(res.message)
                }
                return resolve(res)
            })
            .catch(err => reject(err))
    })
}

export async function power(data) {

    const machineStatus = {
        vmName: data.id,
        state: data.state,
    }

    return new Promise(async (resolve, reject) => {
        await fetch(`${BASEURL}/vsphere/vm/power`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(machineStatus),
        })
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return "OK"
                }
                return Promise.reject()
            })
            .then(res => {
                if (res.error) {
                    return Promise.reject(res.message)
                }
                return resolve(res)
            })
            .catch(err => reject(err))
    })
}