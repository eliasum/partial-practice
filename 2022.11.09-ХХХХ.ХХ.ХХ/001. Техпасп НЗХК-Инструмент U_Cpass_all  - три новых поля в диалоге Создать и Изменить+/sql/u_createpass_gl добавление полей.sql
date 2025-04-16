ALTER TABLE [hydadm].[u_createpass_gl]
	
ADD [zadel_desc] [nvarchar](50) NULL,	--Обозначение задела
	[mark] [nvarchar](50) NULL,			--Маркировка для ПС СУЗ
	[sign_fs] [nvarchar](12) NULL		--Признак "Зарубежная станция"
go