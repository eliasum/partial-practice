/*2020.10.20 20:02 IMM*/

using System;

// Необработанное исключение в деструкторе,
// приводит к остановке его работы.

namespace DestructorTryCatch
{
    class MyClass
    {
        ~ MyClass()
        {
            try
            {
                throw new Exception("Some Exception");  // бросаем исключение
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);  // обработка исключения
            }
            /*
            Блок Finally последовательности Try/Catch/Finally всегда выполняется, 
            независимо от того произошла ошибка или нет
            */
            finally
            {
                Console.WriteLine("Succeeded!");
            }
        }
    }

    class Program
    {
        static void Main()
        {
            MyClass my = new MyClass();
        }
    }
}
