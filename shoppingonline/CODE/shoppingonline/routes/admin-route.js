import express from 'express';
import adminModel from '../models/model.js'

const router = express.Router();

router.get('/', async function (req, res) {
    if (req.session.info.VAITRO !== 'admin')
        return res.redirect(`/${req.session.info.VAITRO}`);
    res.render('admin/home', {
        title: 'Home',
        layout: false
    });
});

router.get('/account', async function (req, res) {
    if (req.session.info.VAITRO !== 'admin')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const accountList = await adminModel.getAllAccount();
    for (const account of accountList) {
        if(account.KICHHOAT === 1)
            account.active = true;
        else
            account.active = false;
    }
    res.render('admin/account', {
        title: 'Account management',
        accountList,
        layout: false
    });
});

router.get('/account/:user', async function (req, res) {
    if (req.session.info.VAITRO !== 'admin')
        return res.redirect(`/${req.session.info.VAITRO}`);
    res.render('admin/edit-account', {
        title: 'Edit account',
        user: req.params.user,
        layout: false
    });
});

router.post('/edit', async function (req, res) {
    await adminModel.editAccount(req.body.user, req.body.password);
    res.redirect('/admin/account');
});

export default router;