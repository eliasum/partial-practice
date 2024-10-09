/*2022.10.12 10:25 IMM*/
using System;

// Динамические типы данных. 

namespace Dynamic
{
    class MyClass
    {
        
    }

    class Program
    {
        static dynamic FactoryMethod()
        {
            return new MyClass();
        }

        static void Main()
        {
            // приведение к динамическому типу
            dynamic instance = FactoryMethod() as dynamic;

            // закрываем вход в if
            if (false)
            {
                // несуществующие Method, field и другие сущности
                instance.Method(7);                  // Вызов метода.
                instance.field = instance.Property;  // Получение и установка значений полей и свойств.
                instance["one"] = instance[2];       // Получение и установка значений через индексаторы.
                dynamic variable = instance + 3;     // Вызов операторов.
                variable = instance(5, 7);           // Вызов делегатов.
            }

            // Delay.
            Console.ReadKey();
        }
    }
}
