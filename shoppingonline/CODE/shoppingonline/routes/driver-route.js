import express from 'express';
import driverModel from '../models/model.js'

const router = express.Router();

router.get('/', async function (req, res) {
    if (req.session.info.VAITRO !== 'driver')
        return res.redirect(`/${req.session.info.VAITRO}`);
    res.render('driver/home', {
        title: 'Home',
        layout: false
    });
});
router.get('/pendingorder', async function (req, res) {
    if (req.session.info.VAITRO !== 'driver')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const profile = await driverModel.getProfileDriver(req.session.info.MANGUOIDUNG);
    const result = await driverModel.getTotalPendingOrder(profile.KHUVUC);
    res.render('driver/pending-order', {
        total: result.recordsets[0][0],
        orderList: result.recordsets[1],
        title: 'Pending order',
        layout: false
    });
});
router.get('/pendingorder/:id', async function (req, res) {
    if (req.session.info.VAITRO !== 'driver')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const order = await driverModel.getDetailOrder(req.params.id);
    res.render('driver/order-confirm', {
        MADT: order.MADT[0],
        order,
        title: 'Pending order detail',
        layout: false
    });
});
router.get('/received/:id', async function (req, res) {
    if (req.session.info.VAITRO !== 'driver')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const result = await driverModel.takeOrder(req.session.info.MANGUOIDUNG, req.params.id);
    if (result.rowsAffected[0] === 0)
        res.render('driver/notification', {
            title: 'Notification',
            text: 'Receive order failed.',
            layout: false
        });
    else
        res.render('driver/notification', {
            title: 'Notification',
            text: 'Receive order successfully! Please go check on Order Tab.',
            layout: false
        });
});
router.get('/receivedorder', async function (req, res) {
    if (req.session.info.VAITRO !== 'driver')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const orderList = await driverModel.getReceivedOrder(req.session.info.MANGUOIDUNG);
    res.render('driver/order', {
        orderList,
        title: 'Pending order',
        layout: false
    });
});
router.get('/receivedorder/:id', async function (req, res) {
    if (req.session.info.VAITRO !== 'driver')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const order = await driverModel.getDetailOrder(req.params.id);
    res.render('driver/order-detail', {
        MADT: order.MADT[0],
        order,
        title: 'Order detail',
        layout: false
    });
});
router.get('/profile',async function (req, res) {
    if (req.session.info.VAITRO !== 'driver')
        return res.redirect(`/${req.session.info.VAITRO}`);
    const profile = await driverModel.getProfileDriver(req.session.info.MANGUOIDUNG);
    res.render('driver/profile', {
        profile,
        title: 'Profile',
        layout: false
    });
});

export default router;