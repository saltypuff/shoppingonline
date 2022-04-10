import express from 'express';
import model from '../models/model.js'


const router = express.Router();

router.get('/', function (req, res) {
    if(req.session.auth === true) {
        res.redirect(`/${req.session.info.VAITRO}`);
    }
    res.render('login', {
        layout: false
    });
});

router.post('/login', async function(req, res) {
    const result = await model.getAccount(req.body.user, req.body.pass);
    if (typeof (result) === 'undefined') {
        res.redirect('/');
    }
    else {
        req.session.auth = true;
        req.session.info = result;
        res.redirect(req.session.retUrl || `/${req.session.info.VAITRO}`);
    }
})

export default router;