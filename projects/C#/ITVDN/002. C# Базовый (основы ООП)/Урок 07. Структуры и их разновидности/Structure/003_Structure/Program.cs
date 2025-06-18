using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _003_Structure
{
    struct MyStruct
    {
        public int field;

        // конструкторы по умолчанию нельзя задавать явно
        //public MyStruct()
        //{
        //}

        // если в структуре имеется пользовательский конструктор, 
        // то требуется в нем инициализировать все поля
        public MyStruct(int value)
        {
            Console.WriteLine("Constructor");
            field = value;
        }
    }


    class Program
    {
        static void Main(string[] args)
        {
                // создание экземпляра структурного типа с вызовом конструктора по умолчанию
                MyStruct instance = new MyStruct(444);

                Console.WriteLine(instance.field);

                Console.ReadKey();
        }
    }
}
