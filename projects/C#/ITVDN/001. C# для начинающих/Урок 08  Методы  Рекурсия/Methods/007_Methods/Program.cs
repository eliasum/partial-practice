using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// рекурсия (простая рекурсия)

namespace Methods
{
    class Program
    {
        static void Recursion(int counter)
        {
            counter--;

            Console.WriteLine("Первая половина метода: {0}", counter);

            if (counter != 0)
                Recursion(counter);

            Console.WriteLine("Вторая половина метода: {0}", counter);
        }

        static void Main(string[] args)
        {
            Recursion(3);

            Console.ReadKey();  
        }
    }
}
