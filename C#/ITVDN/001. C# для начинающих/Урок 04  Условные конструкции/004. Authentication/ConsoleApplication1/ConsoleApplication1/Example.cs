using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class Example
    {
        static void Main(string[] args)
        {
            string login = "Admin";
            string password = "P@ssw0rd";

            Console.Write("Введите login: ");

            string userLogin = Console.ReadLine();

            if (login == userLogin)
            {
                Console.Write("Введите password: ");
                string userPassword = Console.ReadLine();

                if (password == userPassword)
                {
                    Console.WriteLine("Здравствуйте {0}, Вы вошли в систему.", userLogin);
                }
                else
                {
                    Console.WriteLine("Вы ввели неверный пароль.");
                }
            }
            else
            {
                Console.WriteLine("Нет пользователя с таким именем.");
            }

            Console.ReadKey();
        }
    }
}