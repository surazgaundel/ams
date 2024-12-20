
module.exports=(req, res) => {
    req.session.destroy(function(err){
        if(err){
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ message: 'You are successfully logout' })
        req.end();
        res.redirect('/');
    })
}