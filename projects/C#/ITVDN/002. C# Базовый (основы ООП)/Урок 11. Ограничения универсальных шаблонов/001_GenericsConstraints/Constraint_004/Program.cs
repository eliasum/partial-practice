/*2021.12.29 23:13 IMM*/

using System;

// Ограничения параметров типа

namespace GenericsConstraints
{
    // перегрузка интерфейса IInterface:

    interface IInterface
    {
        /* ... */
    }

    /*
        interface IInterface параметризированный указателем места заполнения типом U
    */
    interface IInterface<U>
    {
        /* ... */
    }

    /*
        class Derived реализует интерфейсы IInterface и IInterface<object>.
        Обобщённый (generic) IInterface закрываем типом object.
    */
    class Derived : IInterface, IInterface<object>
    {
        /* ... */
    }

    /*
        class MyClass параметризированный указателем места заполнения типом T.

        where T : IInterface, IInterface<object>  -  Аргумент типа (T) должен ЯВЛЯТЬСЯ 
        или РЕАЛИЗОВЫВАТЬ ОБА указанных интерфейса. 
    */
    // Можно установить несколько ограничений интерфейса.
    // Ограничивающий интерфейс также может быть универсальным.
    class MyClass<T> where T : IInterface, IInterface<object>
    {
        /* ... */
    }

    class MyClass2<T> where T : IInterface
    {
        /* ... */
    }

    class MyClass3<T> where T : IInterface<object>
    {
        /* ... */
    }


    class Program
    {
        static void Main()
        {
            /*
                В качестве аргумента типа подходит Derived, т.к., он наследуется 
                от обоих интерфейсов.
            */
            MyClass<Derived> my1 = new MyClass<Derived>();
            // MyClass<IInterface> my1 = new MyClass<IInterface>();   // Ошибка.
            // MyClass<IInterface<object>> my1 = new MyClass<IInterface<object>>();   // Ошибка.

            MyClass2<IInterface> my2 = new MyClass2<IInterface>();
            MyClass2<Derived> my3 = new MyClass2<Derived>();

            MyClass3<IInterface<object>> my4 = new MyClass3<IInterface<object>>();
            MyClass3<Derived> my5 = new MyClass3<Derived>();

            // Delay.
            Console.ReadKey();
        }
    }
}
