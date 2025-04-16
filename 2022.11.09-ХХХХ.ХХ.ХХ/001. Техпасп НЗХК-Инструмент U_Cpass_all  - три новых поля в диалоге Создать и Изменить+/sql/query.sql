select DISTINCT fio_pp from hydadm.u_vw_cpass_all_passports_list 

select * from hydadm.u_createpass_gl where process_status='W' order by date_p desc				
select * from hydadm.u_createpass_gl order by log_id desc				--таблица

select * from hydadm.u_vw_cpass_all_drawlist
select * from hydadm.u_vw_cpass_drawlistwarehouse
select * from hydadm.mat_puffer order by bearb_date desc	
select * from hydadm.u_vw_los_bestand order by verfueg_dat desc	
select * from hydadm.u_createpass_additions

--представитель заказчика
select fio_pp from hydadm.u_createpass_gl order by log_id desc	

--примеры boolean
select * from hydadm.arbplan_zusatz where stueli_version is not null;
select * from hydadm.arbplan_zusatz where auftrag_nr='REMONT00000000PUCHOK';

select user_n_04, *  from hydadm.caq_merkmal where user_n_04='1'

