/*2022.10.13 14:28 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Indexers
{
    class MyClass
    {
        private int[] array = new int[5];

        // индексатор - конструкция C# для безопасной работы с массивами
        public int this[int index]
        {
            get // аксессор
            {
                return array[index]; 
            }

            set // мутатор
            {
                array[index] = value;
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            MyClass my = new MyClass();

            my[0] = 1;
            my[1] = 2;
            my[2] = 3;
            my[3] = 4;
            my[4] = 5;

            Console.WriteLine(my[0]);
            Console.WriteLine(my[1]);
            Console.WriteLine(my[2]);
            Console.WriteLine(my[3]);
            Console.WriteLine(my[4]);

            Console.ReadKey();
        }
    }
}
