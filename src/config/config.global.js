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
                signIn: 'http://AUBOTD9X94HD2:3001/signin',
                verifyPassword: 'http://AUBOTD9X94HD2:3001/user/me/verifypassword',
                changePassword: '/user/me/changepassword',
                emailResetPasswordLink: '/user/me/emailpasswordresetlink',
            },
            getDrawings: '/getdrawings',
            verifyToken: '/verifytoken'
        }
    }
}