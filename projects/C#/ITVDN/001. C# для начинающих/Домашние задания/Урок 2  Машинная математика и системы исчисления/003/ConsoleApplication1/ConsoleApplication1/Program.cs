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
            string s1 = "\nмоя строка 1";
            string s2 = "\tмоя строка 2";
            string s3 = "\aмоя строка 3";

            Console.WriteLine(s1);
            Console.WriteLine(s2);
            Console.WriteLine(s3);

            Console.ReadKey();
        }
    }
}
