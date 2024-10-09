using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// статический конструктор

namespace _006_Structure
{
    class Program
    {
        struct MyStruct
        {
            public int field;

            // статический конструктор всегда отрабатывает первым
            static MyStruct()
            {
                Console.WriteLine("Static Constructor");
            }

            // если в структуре имеется пользовательский конструктор, 
            // то требуется в нем инициализировать все поля
            public MyStruct(int value)
            {
                Console.WriteLine("Constructor");
                field = value;
            }
        }

        static void Main(string[] args)
        {
            // создание экземпляра структурного типа с вызовом пользовательского конструктора

            MyStruct instance = new MyStruct { field = 555 }; // отработает конструктор по умолчанию и блок инициализации
            //MyStruct instance = new MyStruct(333) { field = 555 }; // отработает статический и пользовательский конструктор
            // статический конструктор вызывается только в связке с пользовательским конструктором
            Console.WriteLine(instance.field);

            Console.ReadKey();
        }
    }
}
