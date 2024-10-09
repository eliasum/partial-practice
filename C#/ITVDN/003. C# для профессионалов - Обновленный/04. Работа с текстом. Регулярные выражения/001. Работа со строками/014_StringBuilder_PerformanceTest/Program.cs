using System;
using System.Text;

// Использование StringBuilder и замеры производительности.

namespace StringBasics
{
    public class EntryPoint
    {
        static void Main()
        {
            // пустая строка
            string simpleString = "";

            // текущее время
            DateTime time = DateTime.Now;

            // Замер скорости построения обычных строк.
            for (int i = 0; i < 100000; i++)
            {
                simpleString += "a";
            }

            /*
            разница между временем после построения строки и временем до
            построения строки
            */
            TimeSpan timeSS = DateTime.Now - time;

            Console.WriteLine("Обычная строка построилась за {0}.", timeSS);

            /*
            создать экземпляр класса StringBuilder, который является аналогом
            оператора конкатенации строк "+", но работает быстрее и позволяет
            строить текст из строк
            */
            var builder = new StringBuilder();

            // текущее время
            time = DateTime.Now;

            // Замер скорости построения строк с использованием StringBuilder.
            for (int i = 0; i < 100000; i++)
            {
                builder.Append("a");
            }

            /*
            разница между временем после построения строки и временем до
            построения строки
            */
            TimeSpan timeSB = DateTime.Now - time;

            Console.WriteLine("При помощи StringBuilder построилась за {0}.", timeSB);

            Console.WriteLine("Длина обычной строки: {0} символов", simpleString.Length);

            /*
            преобразовать значение данного экземпляра класса StringBuilder
            в System.String
            */
            simpleString = builder.ToString();

            Console.WriteLine("Длина StringBuilder строки: {0} символов", simpleString.Length);

            // Delay.
            Console.ReadKey();
        }
    }
}