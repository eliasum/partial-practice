/*2025.09.24 15:58 IMM*/

using System;

namespace AdHocPolimorfizm
{
    //три класса (Class1, Class2, Class3), каждый из которых имеет метод с одинаковым именем Method
    public class Class1 { public void Method() { Console.WriteLine("Class 1"); } }
    public class Class2 { public void Method() { Console.WriteLine("Class 2"); } }
    public class Class3 { public void Method() { Console.WriteLine("Class 3"); } }

    class Program
    {
        static void Main()
        {
            // динамическая подстановка объектов разных классов но одного типа
            /*
            ad hoc полиморфизм (динамический полиморфизм или полиморфизм во время выполнения)
            ad hoc полиморфизм = классический принудительный полиморфизм - 2я форма инкапсуляции
            ad hoc полиморфизм - это возможность функции работать с разными типами данных, но при
            этом выполнять разные реализации в зависимости от типа.

            В C# dynamic позволяет обойти проверку типов во время компиляции и разрешить вызовы
            методов во время выполнения. Это отличается от классического полиморфизма, который 
            достигается через наследование и виртуальные методы.

            Ключевые моменты:
            - dynamic откладывает разрешение типов до runtime (времени выполнения)
            - Нет общего интерфейса или наследования между классами
            - Вызов метода определяется динамически в момент выполнения
            */
            dynamic instance = new Class1();    // Dynamic binding
            instance.Method();                  // Вызывается Class1.Method

            instance = new Class2();
            instance.Method();                  // Вызывается Class2.Method

            instance = new Class3();
            instance.Method();                  // Вызывается Class3.Method

            //------------------------------------------------------------------------------------------

            dynamic[] array = { new Class1(), new Class2(), new Class3() };

            foreach (var item in array) // var - для работы с анонимными типами
                item.Method();

            // Delay
            Console.ReadKey();
        }
    }
}
