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
            int counter = 0;

        Label:
            counter++;
            Console.WriteLine("Counter = {0}", counter);

            if (counter < 3)
            {
                goto Label;
            }

            Console.WriteLine("End");

            Console.ReadKey();
             
        }
    }
}
