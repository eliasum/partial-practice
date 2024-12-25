/*2020.10.20 18:39 IMM*/
/*2024.12.25 14:47 IMM*/

using System;
using System.Threading;

namespace DestructorRunTime
{
    class MyClass
    {
        // Время жизни деструктора ограничено 
        // (индивидуально для разных конфигураций систем).
        ~ MyClass()
        {
            for (int i = 0; i < 10; i++)
            {
                Console.WriteLine(i);
                Thread.Sleep(1000);
            }
        }
    }

    class Program
    {
        static void Main()
        {
            MyClass my = new MyClass();

            // Принудительно запускает немедленную сборку мусора для всех поколений.
            GC.Collect();
            Console.ReadKey();
        }
    }
}
