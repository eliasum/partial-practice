/*2025.09.24 13:52 IMM*/

using System;

// Перекрытие.

namespace ConsoleApplication1
{
    class BaseClass
    {
        public virtual void SomeMetod1() { Console.WriteLine("1"); }
        public virtual void SomeMetod2() { Console.WriteLine("2"); }
    }

    class DerivedClass : BaseClass
    {
        // Не является переопределением. NEW метод - (перекрытие)
        public new void SomeMetod1() { Console.WriteLine("3"); }                // замещение - "убийство" полиморфизма, нет полиморфизма
        public sealed override void SomeMetod2() { Console.WriteLine("4"); }    // sealed - "кастрация" полиморфизма, он остается, но запрещается дальнейшее наследование
    }

    /*
    переопределение - virtual->override
    замещение - замещение обчного метода другим обычным методом (new)
    перекрытие - замещение virtual (полиморфного) метода, virtual->new
        
    */

    class Program
    {
        static void Main()
        {
            /*Вторая форма классического принудительного полиморфизма - приведение (апкаст) к базовому типу*/
            BaseClass instance = new DerivedClass();

            /*после замещения (стирания первой формы классического принудительного полиморфизма вторая форма 
            классического принудительного полиморфизма берет верх (срабатывает) и происходит приведение к базовому типу)*/
            instance.SomeMetod1();  // 1
            instance.SomeMetod2();  // 4

            // Delay
            Console.ReadKey();
        }
    }
}
