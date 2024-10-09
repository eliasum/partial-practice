/*2022.10.13 14:46 IMM*/
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

            // запись в массив
            for(int i=0; i<6; i++)
            {
                my[i] = string.Format("string {0}", i);
            }

            // считывание из массива
            for (int i = 0; i < 6; i++)
            {
                Console.WriteLine(my[i]);
            }

            Console.ReadKey();
        }
    }
}
