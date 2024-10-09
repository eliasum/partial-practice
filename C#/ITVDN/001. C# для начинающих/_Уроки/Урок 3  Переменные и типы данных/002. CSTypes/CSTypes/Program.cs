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
            // тип данных C# (псевдоним)
            byte a = 2;

            // системный тип данных
            Byte b = 4;

            short с = 256;

            float   var1 = 0.12345678901234567890f;
            double  var2 = 0.12345678901234567890d;
            decimal var3 = 0.12345678901234567890m;

            char d = 'A';
            char e = '\x0041';
            char f = '\u0041';

            Console.WriteLine(a);
            Console.WriteLine(b);
            Console.WriteLine(с);

            Console.WriteLine(var1);
            Console.WriteLine(var2);
            Console.WriteLine(var3);

            Console.WriteLine(d);
            Console.WriteLine(e);
            Console.WriteLine(f);

            Console.ReadKey();
        }
    }
}
