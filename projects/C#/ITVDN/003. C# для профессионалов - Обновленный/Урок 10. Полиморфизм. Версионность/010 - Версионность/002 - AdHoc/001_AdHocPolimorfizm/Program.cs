/*2025.09.24 17:19 IMM*/

using System;

// AdHoc полиморфизм

namespace AdHocPolimorfizm
{
    //три класса (Class1, Class2, Class3), каждый из которых имеет метод с одинаковым именем Method
    //три класса (Class1, Class2, Class3) с одинаковым интерфейсом
    public class Class1 { public void Method() { Console.WriteLine("Class 1"); } }
    public class Class2 { public void Method() { Console.WriteLine("Class 2"); } }
    public class Class3 { public void Method() { Console.WriteLine("Class 3"); } }

    interface IInterface { void Method(); }

    // Установка соответствия интерфейса и реализации
    class MyClass1 : Class1, IInterface { }
    class MyClass2 : Class2, IInterface { }
    class MyClass3 : Class3, IInterface { }

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

            полиморфизм технически называется динамическим связыванием.
            полиморфизм - это возможость динамически во время выполнения программы подменять объекты
            */
            IInterface instance = new MyClass1();
            instance.Method();

            instance = new MyClass2();
            instance.Method();

            instance = new MyClass3();
            instance.Method();

            //-------------------------------------------------------------------------------------------

            IInterface[] array = { new MyClass1(), new MyClass2(), new MyClass3() };

            for (var i = 0; i < 3; i++)
                array[i].Method();

            // Delay
            Console.ReadKey();
        }
    }
}
