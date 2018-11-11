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

    const formBody = Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')

    let response = await fetch(
        '/member/login',
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody
        }
    )
    return await response
}

export const get_self = async () => {
    const data = { 'token': localStorage.getItem('forum-token') }
    const formBody = Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
    let response = await fetch(
        '/member/selfInfo',
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem('forum-token'),
            },
            body: formBody
        }
    )
    return await response.json()

}