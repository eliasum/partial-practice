using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CSTypes
{
    class Program
    {
        static void Main(string[] args)
        {
            // константа
            const double pi = 3.141;
            Console.WriteLine(pi);

            // возведение в степень
            double x = 2, y = 8;
            double z = Math.Pow(x, y);
            Console.WriteLine(z);

            // операторы сравнения
            byte value1 = 0, value2 = 1;
            bool result = false;
            result = value1 < value2;
            Console.WriteLine(result);


            Console.ReadKey();
        }
    }
}
