/*2021.12.30 17:13 IMM*/

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
        interface IInterface параметризированный указателем места заполнения типом U,
        который наследуется от non-generic IInterface. Т.е., если в IInterface будут 
        какие-либо методы, они так же будут и в интерфейсе IInterface<U>.
    */
    interface IInterface<U> : IInterface
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
        class Derived2 реализует интерфейс IInterface<object>, который в свою очередь 
        наследуется от IInterface.
        Обобщённый (generic) IInterface закрываем типом object.

        А т.к. IInterface параметризированный указателем места заполнения типом
        U наследуется от non-generic IInterface, то в классе Derived2 должны быть 
        реализованы не только методы из IInterface, но и методы из IInterface<object>
    */
    class Derived2 : IInterface<object>
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

    class MyClass2<T> where T : IInterface<object>
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
            //MyClass<IInterface> my1 = new MyClass<IInterface>();   // Ошибка.

            //  Аргумент типа подходит, т.к., IInterface<object> наследуется от IInterface
            MyClass<IInterface<object>> my2 = new MyClass<IInterface<object>>();

            MyClass2<Derived> my3 = new MyClass2<Derived>();
            MyClass2<Derived2> my4 = new MyClass2<Derived2>();
            MyClass2<IInterface<object>> my5 = new MyClass2<IInterface<object>>();

            // Delay.
            Console.ReadKey();
        }
    }
}
