﻿/*2022.10.12 09:22 IMM*/
using System;

// Динамические типы данных.

namespace Dynamic
{
    class Program
    {
        static void Main()
        {
            for (dynamic i = 0; i < 10; i++)
            {
                Console.WriteLine("Hello world!");
            }

            // Delay.
            Console.ReadKey();
        }
    }
}
