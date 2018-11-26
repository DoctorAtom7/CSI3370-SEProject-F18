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

export const get_member = async (member) => {
    const data = { 'token': localStorage.getItem('forum-token'), 'username': member }
    const formBody = Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
    let response = await fetch(
        '/member/memberInfo',
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

export const create_post = async (title, body) => {
    const data = {
        'title': title,
        'body': body,
        token: localStorage.getItem('forum-token')
    }

    const formBody = Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')

    let response = await fetch(
        '/member/createPost',
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
}

export const get_top_posts = async (username) => {
    const data = {
        username
    }

    const formBody = Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')

    let response = await fetch(
        '/member/topPosts',
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem('forum-token'),
            },
            body: formBody
        },
    )

    return await response.json()
}

export const home_posts = async () => {
    let response = await fetch(
        '/post/topPosts',
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem('forum-token'),
            }
        }
    )
    return await response.json()
}