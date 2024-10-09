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

            while (counter < 3)
            {
                counter++;
                Console.WriteLine("Counter {0}", counter);

                break;

                Console.WriteLine("Эта строка не выполнится.");
            }

            Console.WriteLine("Произведено {0} итераций", counter);

            Console.ReadKey();
             
        }
    }
}
