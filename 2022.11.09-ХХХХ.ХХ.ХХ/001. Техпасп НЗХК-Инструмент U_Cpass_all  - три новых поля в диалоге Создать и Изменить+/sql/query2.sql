select * from hydadm.u_createpass_gl order by log_id desc	

select * from hydadm.u_createpass_gl where process_status='C' order by passport		--редактируется
select * from hydadm.u_createpass_gl where process_status='S' order by passport		--готовый
select * from hydadm.u_createpass_gl where process_status='W' order by passport		--отгружен

select process_status from hydadm.u_vw_cpass_all_passports_list