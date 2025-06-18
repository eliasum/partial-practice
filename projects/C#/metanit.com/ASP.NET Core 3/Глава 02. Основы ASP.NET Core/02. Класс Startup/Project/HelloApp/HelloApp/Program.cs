/*2020.09.25 16:47 IMM*/
/*
¬ любом типе проектов ASP.NET Core, как и в проекте консольного приложени€, мы можем 
найти файл Program.cs, в котором определен одноименный класс Program и с которого
по сути начинаетс€ выполнение приложени€. ¬ ASP.NET Core 3 этот файл выгл€дит 
следующим образом: 
*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace HelloApp
{
    public class Program
    {
        /*
         ласс Startup €вл€етс€ входной точкой в приложение ASP.NET Core. 
        Ётот класс производит конфигурацию приложени€, настраивает сервисы, 
        которые приложение будет использовать, устанавливает компоненты дл€
        обработки запроса или middleware.

        ≈сли мы обратимс€ к файлу Program.cs, то там есть такие строки:
        */
        public static void Main(string[] args)
        {
            // запуск приложени€
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)

        .ConfigureWebHostDefaults(webBuilder =>
        {
            // класс Startup описан в файле Startup.cs
            webBuilder.UseStartup<Startup>();
        });
        /*
        ћетод webBuilder.UseStartup<Startup>() устанавливает класс Startup в 
        качестве стартового. » при запуске приложени€ среда ASP.NET будет искать
        в сборке приложени€ класс с именем Startup и загружать его.

        ќднако в принципе необ€зательно, что класс называлс€ именно Startup. 
        “ак мы можем изменить соответствующий вызов в файле Program.cs на следующий:
	
        webBuilder.UseStartup<Proccessor>()

        “еперь среда будет искать при запуске приложени€ класс Proccessor.
        » в этом случае нам надо будет определить в проекте класс с именем 
        Proccessor, который будет аналогичен файлу Startup.

         ласс Startup должен определ€ть метод Configure(), и также опционально 
        в Startup можно определить конструктор класса и метод ConfigureServices().

        ѕри запуске приложени€ сначала срабатывает конструктор, затем метод
        ConfigureServices() и в конце метод Configure(). Ёти методы вызываютс€
        средой выполнени€ ASP.NET.
        */
    }
}
