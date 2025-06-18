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
        Label:
            Console.WriteLine("Hello!");
            goto Label;

            Console.ReadKey();
             
        }
    }
}
