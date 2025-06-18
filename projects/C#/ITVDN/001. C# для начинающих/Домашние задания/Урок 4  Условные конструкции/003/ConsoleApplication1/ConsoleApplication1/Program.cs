using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            for (; ; )
            {
                Console.Write("Введите число от 0 до 100: ");
                string s = Console.ReadLine();
                int n = Convert.ToInt32(s);

                if ((n >= 0) && (n <= 14))
                {
                    Console.WriteLine("Вы ввели число от 0 до 14");
                }

                if ((n >= 15) && (n <= 35))
                {
                    Console.WriteLine("Вы ввели число от 15 до 35");
                }

                if ((n >= 36) && (n <= 50))
                {
                    Console.WriteLine("Вы ввели число от 36 до 50");
                }

                if ((n >= 50) && (n <= 100))
                {
                    Console.WriteLine("Вы ввели число от 50 до 100");
                }

                if ((n >= 101) || (n <= -1))
                {
                    Console.WriteLine("Вы ввели число вне диапазона от 0 до 100");
                }

                Console.WriteLine("Продолжить вычисления?");
                if (Console.ReadKey().KeyChar == 'y')
                {
                    Console.WriteLine();
                    Console.WriteLine();
                    continue;
                }
                else break;

 
            }
        }
    }
}
