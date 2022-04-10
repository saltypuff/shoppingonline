import express from 'express';
import clientModel from '../models/model.js'

const router = express.Router();

router.get('/', async function (req, res) {
    if (req.session.info.VAITRO !== 'client')
        return res.redirect(`/${req.session.info.VAITRO}`);
    res.render('client/home', {
        title: 'Home',
        layout: false
    });
});

router.get('/branch', async function (req, res) {
    if (req.session.info.VAITRO !== 'client')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const branchList = await clientModel.getBranch(req.session.info.MANGUOIDUNG);
    res.render('client/branch', {
        title: 'Branch',
        branchList,
        layout: false
    });
});

router.get('/branch/:address', async function (req, res) {
    if (req.session.info.VAITRO !== 'client')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const productList = await clientModel.getProductByBranch(req.session.info.MANGUOIDUNG, req.params.address);
    res.render('client/branch-product', {
        title: 'Branch product',
        productList,
        address: req.params.address,
        layout: false
    });
});

router.get('/branch/:address/addproduct', async function (req, res) {
    if (req.session.info.VAITRO !== 'client')
        return res.redirect(`/${req.session.info.VAITRO}`);
    res.render('client/branch-product-add', {
        title: 'Add product',
        id: req.session.info.MANGUOIDUNG,
        address: req.params.address,
        layout: false
    });
});

router.post('/branch/addproduct', async function (req, res) {
    await clientModel.addProduct(req.body.name, req.body.price, req.body.id, req.body.address);
    res.redirect(`/client/branch/${req.body.address}`);
});

router.get('/order', async function (req, res) {
    if (req.session.info.VAITRO !== 'client')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const orderList = await clientModel.getOrderByClient(req.session.info.MANGUOIDUNG);
    const total = await clientModel.getTotalOrderClient(req.session.info.MANGUOIDUNG);
    res.render('client/order', {
        title: 'Order',
        orderList,
        total: total[0].SLDON,
        layout: false
    });
});

router.get('/order/:id', async function (req, res) {
    if (req.session.info.VAITRO !== 'client')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const order = await clientModel.getDetailOrder(req.params.id);
    res.render('client/order-detail', {
        title: 'Order detail',
        order,
        MADT: order.MADT[0],
        layout: false
    });
});

router.post('/order/update', async function (req, res) {
    await clientModel.updateOrder(req.body.clientId, req.body.orderId, req.body.status);
    res.redirect('/client');
});

router.get('/profile', async function (req, res) {
    if (req.session.info.VAITRO !== 'client')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const profile = await clientModel.getProfileClient(req.session.info.MANGUOIDUNG);
    res.render('client/profile', {
        title: 'Profile',
        profile,
        layout: false
    });
});

router.get('/profile/changepassword', async function (req, res) {
    if (req.session.info.VAITRO !== 'client')
        return res.redirect(`/${req.session.info.VAITRO}`);
    res.render('client/change-password', {
        title: 'Change password',
        id: req.session.info.MANGUOIDUNG,
        layout: false
    });
});

router.post('/profile/changepassword', async function (req, res) {
    await clientModel.changePasswordClient(req.body.id, req.body.password);
    res.redirect('/client');
});

export default router;