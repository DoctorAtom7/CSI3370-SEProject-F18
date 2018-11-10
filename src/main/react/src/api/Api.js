export const create_account = async (username, email, password) => {
    let data = {
        username,
        email,
        password
    }

    let response = await fetch(
        '/member/createMember',
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify(data)
        }
    )
    let status = await response.status
    return status
}

export const login = async (username, password) => {
    let data = {
        username,
        password
    }

    let response = await fetch(
        '/member/login',
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify(data)
        }
    )
    return await response
}