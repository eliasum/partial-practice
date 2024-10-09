using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// в структурах нельзя инициализировать поля непосредственно в месте создания

namespace _001_Structure
{
    class Program
    {
        struct MyStruct
        {
            public int field;
        }

        static void Main(string[] args)
        {
            // создание экземпляра структурного типа без вызова конструктора
            MyStruct instance;

            instance.field = 1;  // если закоментировать, то будет ошибка в отличие от второго примера, 
                                 // т.к. не вызван конструктор по умолчанию, инициализирующий поле
                                 // значением по умолчанию

            Console.WriteLine(instance.field);

            Console.ReadKey();
        }
    }
}
