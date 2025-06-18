using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ADONET
{
    class Program
    {
        static void Main(string[] args)
        {
            //string connectionString = @"Data Source=.\ELIASUM-MAIN-ПК\SQLEXPRESS;Initial Catalog=usersdb;Integrated Security=True";

            string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            Console.WriteLine(connectionString);

            Console.Read();
        }
    }
}
