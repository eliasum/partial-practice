using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// бесконечные циклы

namespace Loop
{
    class Program
    {
        static void Main(string[] args)
        {
            // 1.
            while (true)
            { }

            // 2.
            do
            { }
            while (true);

            // 3. 
            for (; ; )
            { }
   
            Console.ReadKey();
        }
    }
}
