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
            sbyte a = 127;

            checked
            {
                a++;
            }

            // 127 + 1 = 128
            Console.WriteLine(a);

            // Delay
            Console.ReadKey();
        }
    }
}
