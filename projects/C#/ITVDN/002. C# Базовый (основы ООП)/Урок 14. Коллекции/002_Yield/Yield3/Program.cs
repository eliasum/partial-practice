/*2022.10.06 11:14 IMM*/
using System;

namespace Yield
{
    class Program
    {
        static void Main()
        {
            foreach (string element in UserCollection.Power())
                Console.Write(element);

            // Delay. 
            Console.ReadKey();
        }
    }
}
