CREATE
--ALTER
PROC KH_DATHANG
	@MADH CHAR(5),
	@MAKH CHAR(5),
	@SANPHAM CHAR(5),
	@SOLUONG INT,
	@HINHTHUC NVARCHAR(50),
	@DCHI NVARCHAR(50)
AS
BEGIN TRAN
	BEGIN TRY
		IF NOT EXISTS(SELECT * FROM KHACHHANG KH WHERE KH.MAKH=@MAKH)
		BEGIN
			PRINT @MAKH + N' KHÔNG TỒN TẠI'
			ROLLBACK TRAN
			RETURN 0
		END
		IF NOT EXISTS(SELECT * FROM SANPHAM SP WHERE SP.MASP=@SANPHAM)
		BEGIN
			PRINT @SANPHAM + N' KHÔNG TỒN TẠI'
			ROLLBACK TRAN
			RETURN 0
		END
		IF @SOLUONG <= 0
		BEGIN
			PRINT N'SỐ LƯỢNG KHÔNG HỢP LỆ'
			ROLLBACK TRAN
			RETURN 0
		END
		IF @HINHTHUC NOT IN(N'TIỀN MẶT', N'CHUYỂN KHOẢN')
		BEGIN
			PRINT N'HÌNH THỨC THANH TOÁN KHÔNG HỢP LỆ'
			ROLLBACK TRAN
			RETURN 0
		END
		UPDATE DOITAC
		SET SLDON = SLDON + 1
		WHERE MADT = (SELECT SP.MADT FROM SANPHAM SP WHERE SP.MASP = @SANPHAM)
		INSERT INTO DONHANG VALUES (@MADH, @MAKH, @SANPHAM, @SOLUONG, @HINHTHUC, @DCHI, NULL, NULL, NULL, NULL)
	END TRY
	BEGIN CATCH
		PRINT N'LỖI HỆ THỐNG'
		ROLLBACK TRAN
		RETURN 0
	END CATCH
COMMIT TRAN
RETURN 1
GO

CREATE
--ALTER
PROC TX_DONHANGCOTHENHAN
	@KVUC NVARCHAR(50)
AS
BEGIN TRAN
		DECLARE @TONG INT
		SET @TONG = (SELECT COUNT(*) FROM DONHANG DH WHERE DH.NGUOIGIAO IS NULL AND DH.DCHIGIAO LIKE '%' + @KVUC)
		SELECT @TONG TONG
		WAITFOR DELAY '0:00:10'
		SELECT DH.MADH, DH.DCHIGIAO
		FROM DONHANG DH
		WHERE DH.NGUOIGIAO IS NULL AND DH.DCHIGIAO LIKE '%' + @KVUC
COMMIT TRAN
RETURN 1
