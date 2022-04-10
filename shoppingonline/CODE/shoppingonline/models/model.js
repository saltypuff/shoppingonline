import sql from 'mssql';
import config from '../utils/db.js';
import randomstring from 'randomstring';

export default {
    async getAllClient() {
        try {
            await sql.connect(config);
            const result = await sql.query('select * from doitac');
            return result.recordset;
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async getProduct(clientId) {
        try {
            await sql.connect(config);
            const result = await sql.query(`exec KH_XEMSANPHAM '${clientId}'`);
            return result.recordset;
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async getDetailProduct(id) {
        try {
            await sql.connect(config);
            const result = await sql.query(`select * from sanpham where masp = '${id}'`);
            return result.recordset[0];
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async checkoutOrder(userId, proId, quantity, price, address, method) {
        try {
            const orderId = randomstring.generate(5);
            const priceCal = +price * +quantity;
            await sql.connect(config);
            await sql.query(`exec KH_DATHANG '${orderId}', '${userId}', '${proId}', ${quantity}, N'${method}', N'${address}'`);
            return orderId;
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async updateOrderState(orderId, price, quantity) {
        try {
            const priceCal = +price * +quantity;
            await sql.connect(config);
            await sql.query(`update donhang set phisanpham = ${priceCal}, tinhtrang = N'ĐÃ ĐẶT', phivanchuyen = ${randomstring.generate({charset: 'numeric', length: 5})}  where madh = '${orderId}'`);
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async getOrderInfo(orderId) {
        try {
            await sql.connect(config);
            const result = await sql.query(`select * from donhang dh join sanpham sp on dh.sanpham = sp.masp where madh = '${orderId}'`);
            return result.recordset[0];
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async getOrder(userId) {
        try {
            await sql.connect(config);
            const result = await sql.query(`select * from donhang dh join sanpham sp on dh.sanpham = sp.masp where khachhang = '${userId}'`);
            return result.recordset;
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async cancelOrder(userId, orderId) {
        try {
            await sql.connect(config);
            await sql.query(`exec KH_HUYDONHANG '${userId}', '${orderId}'`);
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async getAccount(user, pass) {
        try {
            await sql.connect(config);
            const result = await sql.query(`select * from taikhoan where taikhoan = '${user}' and matkhau = '${pass}'`);
            return result.recordset[0];
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async getProfileCustomer(id) {
        try {
            await sql.connect(config);
            const result = await sql.query(`select * from khachhang where makh = '${id}'`);
            return result.recordset[0];
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async getProfileDriver(id) {
        try {
            await sql.connect(config);
            const result = await sql.query(`select * from taixe where manv = '${id}'`);
            return result.recordset[0];
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async getTotalPendingOrder(area) {
        try {
            await sql.connect(config);
            const result = await sql.query(`exec TX_DONHANGCOTHENHAN '${area}'`);
            return result;
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async takeOrder(userId, orderId) {
        try {
            await sql.connect(config);
            const result = await sql.query(`exec TX_NHANDONHANG '${userId}', '${orderId}'`);
            return result;
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async getDetailOrder(id) {
        try {
            await sql.connect(config);
            const result = await sql.query(`select * from donhang dh join sanpham sp on dh.sanpham = sp.masp join khachhang kh on dh.khachhang = kh.makh join doitac dt on sp.madt = dt.madt where dh.madh = '${id}'`);
            return result.recordset[0];
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async getReceivedOrder(id) {
        try {
            await sql.connect(config);
            const result = await sql.query(`select * from donhang where nguoigiao = '${id}'`);
            return result.recordset;
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async getBranch(id) {
        try {
            await sql.connect(config);
            const result = await sql.query(`select * from chinhanh where madt = '${id}'`);
            return result.recordset;
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async getProductByBranch(id, address) {
        try {
            await sql.connect(config);
            const result = await sql.query(`select * from sanpham where madt = '${id}' and chinhanh = N'${address}'`);
            return result.recordset;
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async addProduct(name, price, clientId, address) {
        try {
            const proId = randomstring.generate(5);
            await sql.connect(config);
            await sql.query(`exec DT_THEMSANPHAM '${proId}', N'${name}', ${price}, '${clientId}', N'${address}'`);
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async getOrderByClient(clientId) {
        try {
            await sql.connect(config);
            const result = await sql.query(`select * from donhang dh join sanpham sp on dh.sanpham=sp.masp where sp.madt = '${clientId}'`);
            return result.recordset;
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async updateOrder(clientId, orderId, status) {
        try {
            await sql.connect(config);
            await sql.query(`exec DT_CAPNHATDONHANG '${clientId}', '${orderId}', N'${status}'`);
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async getTotalOrderClient(clientId) {
        try {
            await sql.connect(config);
            const result = await sql.query(`select * from doitac where madt = '${clientId}'`);
            return result.recordset
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async getProfileClient(id) {
        try {
            await sql.connect(config);
            const result = await sql.query(`select * from doitac where madt = '${id}'`);
            return result.recordset[0];
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async changePasswordClient(id, password) {
        try {
            await sql.connect(config);
            await sql.query(`exec DT_CAPNHATTAIKHOAN '${id}', '${password}'`);
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async getAllAccount() {
        try {
            await sql.connect(config);
            const result = await sql.query(`select * from taikhoan`);
            return result.recordset;
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
    async editAccount(user, password) {
        try {
            await sql.connect(config);
            await sql.query(`exec AD_CAPNHATTAIKHOAN '${user}', '${password}'`);
        } catch (e) {
            console.error(e);
        } finally {
            sql.close()
        }
    },
};