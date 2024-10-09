/*2022.10.11 15:26 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;

// Собственная реализация where и select.

namespace LINQ
{
    public static class MySet
    {
        public static IEnumerable<T> Where<T>(this IEnumerable<T> source, Func<T, bool> predicate)
        {
            Console.WriteLine("Вызвана собственная реализация Where.");
            return System.Linq.Enumerable.Where(source, predicate);
        }

        public static IEnumerable<R> Select<T, R>(this IEnumerable<T> source, Func<T, R> selector)
        {
            Console.WriteLine("Вызвана собственная реализация Select.");
            return System.Linq.Enumerable.Select(source, selector);
        }
    }

    class Program
    {
        static void Main()
        {
            int[] numbers = { 1, 2, 3, 4 };

            // запрос linq
            var query = from x in numbers       // from - объявляет переменную диапазона x.
                        where x % 2 == 0        // where - фильтр
                        select x * 2;           // select - Операция проекции.

            foreach (var item in query)
                Console.WriteLine(item);

            // Delay.
            Console.ReadKey();
        }
    }
}
