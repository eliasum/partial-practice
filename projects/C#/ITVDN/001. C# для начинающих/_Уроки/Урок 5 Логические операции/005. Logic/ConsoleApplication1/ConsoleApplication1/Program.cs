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
            int A = 0, B = 5, x = 3;

            if (A < x && x < B) // A < x < B
            {
                Console.WriteLine("Число {0} находится в диапазоне чисел от {1} до {2}.", x, A, B);
            }
            else
            {
                Console.WriteLine("Число {0} не попадает в диапазон чисел от {1} до {2}.", x, A, B);
            }

            Console.ReadKey();
             
        }
    }
}
