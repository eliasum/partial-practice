/*2022.10.13 14:41 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Indexers
{
    class MyClass
    {
        private string[] array = new string[5];

        // индексатор
        public string this[int index]
        {
            get // аксессор
            {
                if (index >= 0 && index < array.Length)
                    return array[index];
                else
                    return "Попытка обращения за пределы массива";
            }

            set
            {
                if (index >= 0 && index < array.Length)
                    array[index] = value;
                else
                    Console.WriteLine("Попытка записи за пределы массива");
            }
        }
    } 

    class Program
    {
        static void Main(string[] args)
        {
            MyClass my = new MyClass();

            my[0] = "string1";
            my[1] = "string2";
            my[2] = "string3";
            my[3] = "string4";
            my[4] = "string5";
            my[5] = "string6";  // Попытка записи за пределы массива

            Console.WriteLine(my[0]);
            Console.WriteLine(my[1]);
            Console.WriteLine(my[2]);
            Console.WriteLine(my[3]);
            Console.WriteLine(my[4]);
            Console.WriteLine(my[5]);   // Попытка обращения за пределы массива

            Console.ReadKey();
        }
    }
}
