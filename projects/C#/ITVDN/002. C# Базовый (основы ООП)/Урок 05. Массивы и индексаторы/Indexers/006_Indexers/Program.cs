/*2022.10.13 18:11 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _006_Indexers
{
    class BaseClass
    {
        private string[] baseArray = null;

        // конструктор
        public BaseClass()
        {
            baseArray = new string[3];
            baseArray[0] = "нуль";
            baseArray[1] = "один";
            baseArray[2] = "два";
        }

        // виртуальный индексатор
        public virtual string this[int index]
        {
            get { return baseArray[index]; }

        }
    }

    class DerivedClass : BaseClass
    {
        private string[] derivedArray = null;

        // конструктор
        public DerivedClass()
        {
            derivedArray = new string[3];
            derivedArray[0] = "zero";
            derivedArray[1] = "one";
            derivedArray[2] = "two";
        }

        // переопределенный индексатор
        public override string this[int index]
        {
            get { return base[index] + " - " + derivedArray[index]; }

        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            DerivedClass instance = new DerivedClass();
            BaseClass instance1 = instance;

            for(int i=0; i<3; i++)
            {
                Console.WriteLine(instance1[i]);
            }

            Console.ReadKey();
        }
    }
}
