using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// если в структуре имеются члены, которые обращаются к полю и нет пользовательского конструктора,
// то требуется при создании экземпляра вызывать конструктор по умолчанию

namespace _002_Structure
{
    struct MyStruct
    {
        private int field;

        public int Field
        {
            get
            {
                return field;
            }

            set
            {
                field = value;
            }
        }

        public void Show()
        {
            Console.WriteLine(field);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // создание экземпляра структурного типа с вызовом конструктора по умолчанию

            MyStruct instance = new MyStruct();

            instance.Field = 1;  // если закоментировать, то ошибки не будет в отличие от первого примера, 
                                 // т.к. вызван конструктор по умолчанию, проинициализировавший поле
                                 // значением по умолчанию

            Console.WriteLine(instance.Field);

            Console.ReadKey();
        }
    }
}
