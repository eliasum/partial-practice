﻿/*2022.10.14 10:30 IMM*/
using System;
using System.Collections;

// Создание простой пользовательской коллекции.

namespace Collection
{
    class Program
    {
        static void Main()
        {
            var сollection = new UserCollection();

            сollection[0] = new Element(1, 2);
            сollection[1] = new Element(3, 4);
            сollection[2] = new Element(5, 6);
            сollection[3] = new Element(7, 8);

            foreach (Element element in сollection)
            {
                Console.WriteLine("{0}, {1}", element.FieldA, element.FieldB);
            }
                        
            // Delay.
            Console.ReadKey();
        }
    }
}
