USE [hydra1]
GO

/****** Object:  View [hydadm].[u_vw_cpass_all_passports_list]    Script Date: 08.02.2023 16:39:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




ALTER    VIEW [hydadm].[u_vw_cpass_all_passports_list]
AS

select 
	N'S' as status_s
	,up.bearb
	,up.bearb_date
	,up.bundling_info
	,up.country
	,up.date_p as [date]
	,up.draw
	,up.fio_department
	,up.fio_executor
	,up.fio_otk
	,up.fio_pp  -- добавлено Габова СМ 24.11.2022
	,up.is_empty
	,up.log_id as [log]
	,up.packing_set_number
	,up.passport
	,up.passport_date
	,up.process_status
	,up.transfer as [transfer]
	,up.zadel	
	,up.mark		-- добавлено Минин ИМ 17.02.2023
	,up.sign_fs		-- добавлено Минин ИМ 17.02.2023
	,up.zadel_desc	-- добавлено Минин ИМ 17.02.2023
	,um.code
	,um.no_kd
	,um.nom_chert
	,mt.hz_typ
	,doc.n_ch as assembly_drawing_change -- doc.n_ch
	,doc.n_doc as assembly_drawing 
	,doc3.n_ch as teh_conditions_change -- doc3.n_ch
	,doc2.n_ch as teh_process_change -- doc2.n_ch
	,doc_tu.n_tp as teh_process
	,doc_tu.n_ty as teh_conditions
from hydadm.u_createpass_gl up 
left join hydadm.u_mat um on up.draw=um.no_kd and up.code=um.code 
join hydadm.mat_mattyp mt on um.code = mt.material 
left join hydadm.u_docchanges doc on um.nom_chert = doc.n_doc and doc.n_ch = (select max(n_ch) from hydadm.u_docchanges group by n_doc having n_doc = doc.n_doc)
left join (select distinct [n_draw], [n_sb],[n_tp], [n_ty] from hydadm.u_doc where n_sb is not null and n_tp is not null) doc_tu on um.nom_chert = doc_tu.n_sb and um.no_kd = doc_tu.n_draw
left join hydadm.u_docchanges doc2 on doc_tu.n_tp = doc2.n_doc and doc2.n_ch = (select max(n_ch) from hydadm.u_docchanges where cast(date_ch as datetime) < GETDATE() group by n_doc having n_doc = doc2.n_doc) 
left join hydadm.u_docchanges doc3 on doc_tu.n_ty = doc3.n_doc and doc3.n_ch = (select max(n_ch) from hydadm.u_docchanges group by n_doc having n_doc = doc3.n_doc)

--select * from hydadm.u_docchanges
GO


