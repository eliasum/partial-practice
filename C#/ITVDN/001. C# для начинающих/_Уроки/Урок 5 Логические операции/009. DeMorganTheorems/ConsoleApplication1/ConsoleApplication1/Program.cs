using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
        
namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            // преобразование логических переменных в соответствии с теоремами Де Моргана
            /*
             *Для применения теорем Де Моргана к логическому оператору AND или OR и паре операндов,
             *требуется инвертировать оба операнда, заменить AND на OR или OR на AND и 
             *инвертировать всё выражение полностью.
             * Исходное выражение                    Эквивалентное выражение
             * !A && !B                   =           !(A || B) 
             * A  ||  B                   =           !(!A && !B)
            */

            bool A = true;
            bool B = false;

            // условие до применения теоремы Де Моргана
            if (!A || !B)
            {
                Console.WriteLine("!A || !B = {0}", !A || !B);
            }
            else
            {
                Console.WriteLine("!A || !B = {0}", !A || !B);
            }

            // условие после применения теоремы Де Моргана
            if (!(A && B))
            {
                Console.WriteLine("!(A && B) = {0}", !(A && B));
            }
            else
            {
                Console.WriteLine("!(A && B) = {0}", !(A && B));
            }

            Console.ReadKey();
             
        }
    }
}
