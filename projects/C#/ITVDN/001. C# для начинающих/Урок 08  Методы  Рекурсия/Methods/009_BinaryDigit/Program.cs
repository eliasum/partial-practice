using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// вывод в двоичном формате числа, переданного в десятичном формате

namespace BinaryDigit
{
    class Program
    {
        static void Converter(int n)
        {
            int temp = n % 2;

            if (n >= 2) Converter(n/2);

            Console.Write(temp);
        }

        static void Main(string[] args)
        {
            int n = 12;

            Converter(n);

            Console.ReadKey();
        }
    }
}
