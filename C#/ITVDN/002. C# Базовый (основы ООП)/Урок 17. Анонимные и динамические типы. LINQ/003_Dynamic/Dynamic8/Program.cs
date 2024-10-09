/*2022.10.12 09:32 IMM*/
using System;

// Динамические типы данных. (Динамические типы в параметризированных делегатах)

namespace Dynamic
{
    /*
        инициализация класса-делегата с именем MyDelegate. Метод, сообщенный с данным
        делегатом, параметризован указателями места заполнения типов T и R, принимает
        один аргумент типа T и возвращает значение типа R
    */
    delegate R MyDelegate<T, R>(T argument);

    class Program
    {
        static dynamic Method(dynamic argument)
        {
            return argument;
        }

        static void Main()
        {
            dynamic myDelegate = new MyDelegate<dynamic, dynamic>(Method);

            dynamic @string = myDelegate("Hello world!");

            Console.WriteLine(@string);

            // Delay.
            Console.ReadKey();
        }
    }
}
