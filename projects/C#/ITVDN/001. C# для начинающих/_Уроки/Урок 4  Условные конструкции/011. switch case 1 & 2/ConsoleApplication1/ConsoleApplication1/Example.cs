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
            Console.WriteLine("Введите число 1 или 2: ");

            string number = Console.ReadLine();

            switch (number)
            { 
                case "1":
                    Console.WriteLine("Один");
                    break;

                case "2":
                    Console.WriteLine("Два");
                    break;

                default:
                    Console.WriteLine("Вы ввели значение, отличное от 1 или 2.");
                    break;
            }


            Console.ReadKey();
        }
    }
}