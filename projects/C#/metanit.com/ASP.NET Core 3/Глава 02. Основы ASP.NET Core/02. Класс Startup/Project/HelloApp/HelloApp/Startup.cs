/*2020.09.28 23:44 IMM*/

// В проекте ASP.NET Core по шаблону Empty класс Startup выглядит следующим образом:

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
        Метод ConfigureServices

        Необязательный метод ConfigureServices() регистрирует сервисы,
        которые используются приложением. В качестве параметра он принимает 
        объект IServiceCollection, который и представляет коллекцию сервисов
        в приложении. С помощью методов расширений этого объекта производится
        конфигурация приложения для использования сервисов. Все методы имеют
        форму Add[название_сервиса].

        В проекте по типу Empty данный метод не выполняет каких-либо действий:
        */
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }
        /*
        А, к примеру, в проекте по типу Web Application (Model-View-Controller)
        данный метод имеет следующее определение
	
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
        }

        Метод services.AddControllersWithViews(); добавляет в коллекцию сервисов
        сервисы, которые необходимы для работы контроллеров MVC. После добавления 
        в коллекцию сервисов добавленные сервисы становятся доступными для
        приложения. Как правило, встроенные методы, которые добавляют встроенные
        сервисы, начинаются с префикса Add, например, AddControllersWithViews().
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
