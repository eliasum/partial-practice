﻿/*2022.10.06 10:40 IMM*/
using System;
using System.Collections;

namespace Yield
{
    class Program
    {
        static void Main()
        {
            foreach (string element in UserCollection.Power())
                Console.WriteLine(element);

            Console.WriteLine(new string('-', 12));

            //-----------------------------------------------------------------------------------------------
            // Так работает foreach.

            IEnumerable enumerable = UserCollection.Power();        // перечисляемая коллекция  

            IEnumerator enumerator = enumerable.GetEnumerator();    // перечислитель (энумератор)

            while (enumerator.MoveNext())                           // Перемещаем курсор на 1 шаг вперед.
            {
                String element = enumerator.Current as String;

                Console.WriteLine(element);
            }

            // Delay. 
            Console.ReadKey();
        }
    }
}
