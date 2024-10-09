/*2020.06.22 22:42 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// универсальные шаблоны

namespace Generics_002
{
    // создаем класс с именем MyGeneric, ... параметризированный двумя указателями места заполнения типом - TYPE1 и TYPE2
    //                                   ... с открытыми типами TYPE1 и TYPE2
    class MyGeneric<TYPE1, TYPE2>       // параметризированный класс, обобщенный класс, класс generic
    {
        // поля типа указателей места заполнения типом - TYPE1 и TYPE2
        private TYPE1 variable1;
        private TYPE2 variable2;

        // конструктор
        public MyGeneric(TYPE1 argument1, TYPE2 argument2)
        {
            this.variable1 = argument1;
            this.variable2 = argument2;
        }

        // свойства
        public TYPE1 Variable1
        {
            get { return this.variable1; }
            set { this.variable1 = value; }
        }

        public TYPE2 Variable2
        {
            get { return this.variable2; }
            set { this.variable2 = value; }
        }
    }

        class Program
        {
            static void Main(string[] args)
            {
                // создаем экземпляр класса MyGeneric... и в качестве параметров типа передаем 2 типа int
                //                                   ... и закрываем его 2-мя типами int
                MyGeneric<int, int> instance1 = new MyGeneric<int, int>(1, 2);
                Console.WriteLine(instance1.Variable1 + instance1.Variable2);

                // создаем экземпляр класса MyGeneric... и в качестве параметров типа передаем тип string и тип int
                //                                   ... и закрываем его типом string и типом int
                MyGeneric<string, int> instance2 = new MyGeneric<string, int>("Number ", 1);
                Console.WriteLine(instance2.Variable1 + instance2.Variable2);

                // создаем экземпляр класса MyGeneric... и в качестве параметров типа передаем 2 типа string
                //                                   ... и закрываем его 2-мя типами string
                MyGeneric<string, string> instance3 = new MyGeneric<string, string>("Hello ", "world!");
                Console.WriteLine(instance3.Variable1 + instance3.Variable2);

                Console.ReadKey();
            }
        }
    }
