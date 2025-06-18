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
            int s = 0;
            Console.WriteLine("Введите число для проверки: ");
            int x = Convert.ToInt32(Console.ReadLine());
            s = x&(x - 1);

            if ((s == 0) && (x >= 2)) Console.WriteLine("Число является степенью двойки.");
            else                      Console.WriteLine("Число не является степенью двойки.");

            Console.ReadKey();
        }
    }
}
