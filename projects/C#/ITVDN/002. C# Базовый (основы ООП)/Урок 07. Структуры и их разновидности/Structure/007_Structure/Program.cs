using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// структуры. конструкторы

namespace _007_Structure
{
    struct MyStruct
    {
        public int field;

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
            // создание экземпляра структурного типа без вызова конструктора
            MyStruct instance;

            Console.WriteLine(instance.field);

            Console.ReadKey();
    }
}
