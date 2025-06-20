/*2020.09.28 23:44 IMM*/

// � ������� ASP.NET Core �� ������� Empty ����� Startup �������� ��������� �������:

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace HelloApp
{
    public class Startup
    {
        /*
        ����� ConfigureServices

        �������������� ����� ConfigureServices() ������������ �������,
        ������� ������������ �����������. � �������� ��������� �� ��������� 
        ������ IServiceCollection, ������� � ������������ ��������� ��������
        � ����������. � ������� ������� ���������� ����� ������� ������������
        ������������ ���������� ��� ������������� ��������. ��� ������ �����
        ����� Add[��������_�������].

        � ������� �� ���� Empty ������ ����� �� ��������� �����-���� ��������:
        */
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }
        /*
        �, � �������, � ������� �� ���� Web Application (Model-View-Controller)
        ������ ����� ����� ��������� �����������
	
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
        }

        ����� services.AddControllersWithViews(); ��������� � ��������� ��������
        �������, ������� ���������� ��� ������ ������������ MVC. ����� ���������� 
        � ��������� �������� ����������� ������� ���������� ���������� ���
        ����������. ��� �������, ���������� ������, ������� ��������� ����������
        �������, ���������� � �������� Add, ��������, AddControllersWithViews().
        */

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Hello World!");
                });
            });
        }
    }
}
