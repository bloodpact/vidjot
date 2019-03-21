module.exports ={
    hbsOpts: {
        viewEngine: {
        layoutsDir: 'views/',
        defaultLayout : 'email',
        partialsDir : 'views/partials/'
        },
     viewPath:'./views/'
    },
    transportOpts: {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'user',
            pass:'pass'
        }
    }
};
