/*2022.10.06 11:28 IMM*/
using System;
using System.Collections;

namespace Yield
{
    class Program
    {
        static void Main()
        {
            foreach (string element in UserCollection.Power())
                Console.WriteLine(element);
                       
            // Delay. 
            Console.ReadKey();
        }
    }
}
