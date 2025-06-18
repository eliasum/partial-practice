/*2022.10.10 16:20 IMM*/
using System;

// Анонимные типы.

namespace Anonymous
{
    /*
        класс-делегат с именем MyDelegate. Метод, который будет сообщен с 
        этим делегатом, будет принимать один аргумент типа string и 
        ничего не возвращать
    */
    delegate void MyDelegate(string @string);

    class Program
    {
        static void Main()
        {
            /*
                неявно типизированная локальная переменная, которой присваивается 
                ссылка на экземпляр анонимного типа, в блоке инициализатора которого
                свойству MyDel присваивается ссылка на экземпляр делегата, с которым
                сообщено лямбда-выражение (анонимный метод)
            */
            var instance = new
            {
                MyDel = new MyDelegate((string @string) => Console.WriteLine(@string))
            };

            // обращение к экземпляру анонимного типа
            instance.MyDel("Hello world!");

            // Delay.
            Console.ReadKey();
        }
    }
}
