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
            Console.WriteLine("Введите число.");
            string s = Console.ReadLine();
            int n = Convert.ToInt32(s);

            int m = 1;
            int p = n;

            while (true)
            {
                if (p == 0) break;

                int r = p & m;

                if (r == 0)
                {
                    p >>= 1;
                    continue;
                }
                else break;
            }
          
            if ((p == 1)&&(n!=1)) Console.WriteLine("Число {0} является степенью числа 2.", n);
            else                  Console.WriteLine("Число {0} не является степенью числа 2.", n);
           
            Console.ReadKey();
        }
    }
}
