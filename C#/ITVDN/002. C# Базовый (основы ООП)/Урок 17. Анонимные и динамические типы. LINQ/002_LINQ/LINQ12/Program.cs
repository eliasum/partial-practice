/*2022.10.11 16:51 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;

// let - представляет новый локальный идентификатор, на который можно ссылаться в остальной части запроса.
// Его можно представить, как локальную переменную видимую только внутри выражения запроса.

namespace LINQ
{
    class Program
    {
        static void Main()
        {
            // Построить запрос.
            /*
                присвоить переменной запроса linq возвращаемое значение выражения запроса, которое 
                трансформируется в последовательность вызовов расширяющих методов
            */
            var query = from x in Enumerable.Range(0, 10)                           // from - объявляет переменную диапазона x.
                        let innerRange = Enumerable.Range(0, 10)                    // let - новый локальный идентификатор.
                        from y in innerRange                                        // from - объявляет переменную диапазона y.
                        select new { X = x, Y = y, Product = x * y };               // select - Операция проекции. 
            /*
                new { X = x, Y = y, Product = x * y }; - экземпляр анонимного типа
                X, Y, Product - свойства анонимного типа
            */

            foreach (var item in query)                                             // item - переменная итерации 
                Console.WriteLine("{0} * {1} = {2}", item.X, item.Y, item.Product);

            // Delay.
            Console.ReadKey();
        }
    }
}
