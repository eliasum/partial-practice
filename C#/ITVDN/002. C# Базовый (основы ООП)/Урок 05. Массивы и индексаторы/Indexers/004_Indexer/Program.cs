/*2022.10.13 14:50 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _004_Indexer
{
    class MyClass
    {
        private int[,] array = new int[3,3];

        public int this[int index1, int index2]
        {
            get
            {
                return array[index1, index2];
            }

            set
            {
                array[index1, index2] = value;
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            MyClass my = new MyClass();

            my[1, 1] = 2;

            Console.WriteLine(my[1, 1]);
            Console.WriteLine(my[0, 0]);

            Console.ReadKey(); 
        }
    }
}
