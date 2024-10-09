/*2020.09.25 16:47 IMM*/
/*
� ����� ���� �������� ASP.NET Core, ��� � � ������� ����������� ����������, �� ����� 
����� ���� Program.cs, � ������� ��������� ����������� ����� Program � � ��������
�� ���� ���������� ���������� ����������. � ASP.NET Core 3 ���� ���� �������� 
��������� �������: 
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
        ����� Startup �������� ������� ������ � ���������� ASP.NET Core. 
        ���� ����� ���������� ������������ ����������, ����������� �������, 
        ������� ���������� ����� ������������, ������������� ���������� ���
        ��������� ������� ��� middleware.

        ���� �� ��������� � ����� Program.cs, �� ��� ���� ����� ������:
        */
        public static void Main(string[] args)
        {
            // ������ ����������
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)

        .ConfigureWebHostDefaults(webBuilder =>
        {
            // ����� Startup ������ � ����� Startup.cs
            webBuilder.UseStartup<Startup>();
        });
        /*
        ����� webBuilder.UseStartup<Startup>() ������������� ����� Startup � 
        �������� ����������. � ��� ������� ���������� ����� ASP.NET ����� ������
        � ������ ���������� ����� � ������ Startup � ��������� ���.

        ������ � �������� �������������, ��� ����� ��������� ������ Startup. 
        ��� �� ����� �������� ��������������� ����� � ����� Program.cs �� ���������:
	
        webBuilder.UseStartup<Proccessor>()

        ������ ����� ����� ������ ��� ������� ���������� ����� Proccessor.
        � � ���� ������ ��� ���� ����� ���������� � ������� ����� � ������ 
        Proccessor, ������� ����� ���������� ����� Startup.

        ����� Startup ������ ���������� ����� Configure(), � ����� ����������� 
        � Startup ����� ���������� ����������� ������ � ����� ConfigureServices().

        ��� ������� ���������� ������� ����������� �����������, ����� �����
        ConfigureServices() � � ����� ����� Configure(). ��� ������ ����������
        ������ ���������� ASP.NET.
        */
    }
}
