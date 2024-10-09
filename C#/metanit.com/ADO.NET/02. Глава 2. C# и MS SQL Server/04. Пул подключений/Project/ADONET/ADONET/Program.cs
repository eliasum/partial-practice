using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ADONET
{
    class Program
    {
        static void Main(string[] args)
        {
            string connectionString = @"Data Source=.\SQLEXPRESS;Initial Catalog=usersdb;Integrated Security=True";
            string connectionString2 = @"Data Source=.\SQLEXPRESS;Initial Catalog=players;Integrated Security=True";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); // создается первый пул
                Console.WriteLine(connection.ClientConnectionId);
                Console.WriteLine("1");
            }
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); // подключение извлекается из первого пула
                Console.WriteLine(connection.ClientConnectionId);
                Console.WriteLine("2");
            }
            using (SqlConnection connection = new SqlConnection(connectionString2))
            {
                connection.Open(); // создается второй пул, т.к. строка подключения отличается
                Console.WriteLine(connection.ClientConnectionId);
                Console.WriteLine("3");
            }

            Console.Read();
        }
    }
}
