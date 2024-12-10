/*2024.12.10 16:53 IMM*/

using System;

// используем типы из CarLibrary.
using CarLibrary;

// использование собственной библиотеки кода.

namespace CSharpCarClient
{
    class Program
    {
        public static void Main()
        {
            // создаем автомобиль спортивной модели.
            SportsCar sportcar = new SportsCar("Jaguar", 240, 40);
            sportcar.Acceleration();

            // создаем мини-вэн.
            MiniVan minivan = new MiniVan();
            minivan.Acceleration();

            // Delay.
            Console.ReadKey();            
        }
    }
}
