/*2022.10.11 18:17 IMM*/
using System;
using System.Linq;

// into - подобно let, позволяет определить локальный по отношению к запросу идентификатор.

namespace LINQ
{
    class Program
    {
        static void Main()
        {
            int[] numbers = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

            // Построить запрос.
            // Разделение чисел на четные и нечетные.
            /*
                присвоить переменной запроса linq возвращаемое значение выражения запроса, которое 
                трансформируется в последовательность вызовов расширяющих методов
            */
            var query = from x in numbers                                                                           // from - объявляет переменную диапазона x.
                        group x by x % 2 into partition                                                             // group - является средством для разделения ввода запроса.
                        select new { Key = partition.Key, Count = partition.Count(), Group = partition };           // select - Операция проекции.
                        // into - подобно let, позволяет определить локальный по отношению к запросу идентификатор.
                        // сгруппировать по экземплярам анонимного типа

            foreach (var item in query)                                                                             // item - переменная итерации 
            {
                Console.WriteLine("mod2 == {0}", item.Key);
                Console.WriteLine("Count == {0}", item.Count);

                foreach (var number in item.Group)                                                                  // number - переменная итерации 
                    Console.Write("{0}, ", number);

                Console.WriteLine("\n");
            }

            // Delay.
            Console.ReadKey();
        }
    }
}
