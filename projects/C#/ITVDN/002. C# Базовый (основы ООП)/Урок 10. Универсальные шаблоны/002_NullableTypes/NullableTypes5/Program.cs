/*2020.07.02 17:44 IMM*/

using System;

namespace NullableTypes
{
    class Program
    {
        static void Main()
        {
            /*
            Создаем переменную a типа Nullable, параметризированную указателем места
            заполнения типом int
            */
            Nullable<int> a = 1;    // int? a = 1

            /*
            если переменная a имеет какое-либо значение
            Метод HasValue принадлежит структуре Nullable. 
            */
            if (a.HasValue == true)
            {
                Console.WriteLine("a is {0}.", a.Value);
            }

            // Короткая нотация Nullable типа - "?", доступна только для C#.
            int? b = 1;

            if (b.HasValue == true)
            {
                Console.WriteLine("b is {0}", b.Value);
            }

            // Неявно типизированная локальная переменная не может быть - Nullable.
            // var? c = null;        

            // Delay.
            Console.ReadKey();
        }
    }
}
