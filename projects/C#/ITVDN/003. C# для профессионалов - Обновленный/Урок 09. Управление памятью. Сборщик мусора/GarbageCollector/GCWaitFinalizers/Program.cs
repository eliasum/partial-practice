/*2024.12.27 12:40 IMM*/

using System;

// Для успешной работы метода GC.WaitForPendingFinalizers() - 
// требуется включить оптимизацию:  
// В свойствах проекта, вкладка Build -> группа General -> установить флаг Optimize Code.

namespace GCWaitFinalizers
{
    class MyClass
    {
        ~ MyClass()
        {
            for (int i = 0; i < 80; i++)            
                Console.Write("|");
        }
    }

    class Program
    {       
        static void Main()
        {
            MyClass my = new MyClass();

            GC.Collect();   // принудительно приступить к сборке мусора, продолжить выполнения первичного потока программы
            GC.WaitForPendingFinalizers(); // приостановить выполнение первичного потока, пока GC не соберет весь мусор

            for (int i = 0; i < 80; i++)            
                Console.Write(".");        // признак выполнения первичного потока         
        }
    }
}
