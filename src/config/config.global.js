const serverUrl = 'http://localhost:3001'
module.exports = {
    showClientDevelopmentErros: true,
    cookieExpiresIn: 14,
    app: {
        name: 'IBOS'
    },
    theme: {
        boxRadius: '12px',
        buttonRadius: '6px'
    },
    urls: {
        home: {
            path: '/',
            name: 'Home'
        },
        signIn: {
            path: '/signin',
            name: 'Sign in'
        },
        changePassword: {
            path: '/changepassword',
            name: 'Change password'
        },
        drawings: { 
            path: '/drawings',
            name: 'Loop PDFs'
        }
    },
    api: {
        urls: {
            server: 'http://AUBOTD9X94HD2:3001',
            user: {
                signIn: serverUrl + '/signin',
                verifyPassword: serverUrl + '/user/me/verifypassword',
                changePassword: serverUrl + '/user/me/changepassword',
                emailResetPasswordLink: serverUrl + '/user/me/emailpasswordresetlink',
            },
            getDrawings: '/getdrawings',
            verifyToken: '/verifytoken'
        }
    }
}