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
            bool condition = false;

            if (condition == true)
            {
                goto Label;
            }

            Console.WriteLine("First line");

        Label:
            Console.WriteLine("Second line");

            Console.ReadKey();
             
        }
    }
}
