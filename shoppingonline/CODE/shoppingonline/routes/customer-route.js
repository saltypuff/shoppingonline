import express from 'express';
import clientModel from '../models/model.js'

const router = express.Router();

router.get('/', async function (req, res) {
    if (req.session.info.VAITRO !== 'customer')
        return res.redirect(`/${req.session.info.VAITRO}`);
    res.render('customer/home', {
        title: 'Home',
        layout: false
    });
});
router.get('/buy',async function (req, res) {
    if (req.session.info.VAITRO !== 'customer')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const sellerList = await clientModel.getAllClient();
    res.render('customer/buy', {
        sellerList,
        title: 'View seller',
        layout: false
    });
});
router.get('/buy/:id',async function (req, res) {
    if (req.session.info.VAITRO !== 'customer')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const productList = await clientModel.getProduct(req.params.id);
    res.render('customer/buy-product', {
        user: req.session.info,
        productList,
        title: 'View seller',
        layout: false
    });
});
router.post('/checkout',async function (req, res) {
    const orderId = await clientModel.checkoutOrder(req.session.info.MANGUOIDUNG, req.body.proid, req.body.quantity, req.body.price, req.body.address, req.body.method);
    await clientModel.updateOrderState(orderId, req.body.price, req.body.quantity);
    res.redirect(`/customer/order/${orderId}`);
});
router.get('/order', async function (req, res) {
    if (req.session.info.VAITRO !== 'customer')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const orderList = await clientModel.getOrder(req.session.info.MANGUOIDUNG);
    res.render('customer/order', {
        orderList,
        title: 'View order',
        layout: false
    });
});
router.get('/order/:id', async function (req, res) {
    if (req.session.info.VAITRO !== 'customer')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const item = await clientModel.getOrderInfo(req.params.id);
    res.render('customer/order-detail', {
        item,
        title: 'Order detail',
        layout: false
    });
});
router.get('/profile',async function (req, res) {
    if (req.session.info.VAITRO !== 'customer')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const profile = await clientModel.getProfileCustomer(req.session.info.MANGUOIDUNG);
    res.render('customer/profile', {
        profile,
        title: 'Profile',
        layout: false
    });
});
router.get('/cancel/:id', async function (req, res) {
    if (req.session.info.VAITRO !== 'customer')
        return res.redirect(`/${req.session.info.VAITRO}`);
    await clientModel.cancelOrder(req.session.info.MANGUOIDUNG,req.params.id);
    res.redirect('/customer/order');
});

router.get('/product/:id', async function (req, res) {
    if (req.session.info.VAITRO !== 'customer')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const product = await clientModel.getDetailProduct(req.params.id);
    res.render('customer/product-detail', {
        title: 'Product detail',
        product,
        layout: false
    });

});

export default router;