const passport = require('passport');

module.exports = (app) =>{
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account'
        })
    );
    
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req,res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req,res) => {
        console.log("Logout");  
        req.logout();   //where is the logout from?
        res.redirect('/');
    });

    app.get('/api/current_user', (req,res)=>{
        console.log("Current user");
        res.send(req.user);
    });

};