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
            string @string = "Hello ";

            Console.WriteLine("Введите свой логин");

            string login = Console.ReadLine();

            @string += login == "Admin" ? "Administrator" : "User";  // max = (a > b) ? a : b;

            Console.WriteLine(@string);

            Console.ReadKey();
        }
    }
}