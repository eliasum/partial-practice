/*2022.10.07 11:51 IMM*/
using System;

// Базовый класс Object.

namespace ClassObject
{
    class MyClassA : Object
    {
    }

    class MyClassB : object
    {
    }

    class Program
    {
        static void Main()
        {
            Object instanceA = new MyClassA();
            object instanceB = new MyClassB();

            // Delay.
            Console.ReadKey();
        }
    }
}
