DECLARE @RT INT
EXEC @RT = DT_THEMSANPHAM 'SP010', N'Áo thun', -99000, 'DT001', N'Chi nhánh TP.HCM'
IF @RT = 1
	PRINT N'THÊM THÀNH CÔNG'
ELSE
	PRINT N'THÊM THẤT BẠI'