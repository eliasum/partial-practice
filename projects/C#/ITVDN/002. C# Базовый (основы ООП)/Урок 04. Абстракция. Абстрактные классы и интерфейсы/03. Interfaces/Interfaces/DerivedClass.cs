using System;

namespace Interfaces
{
    class DerivedClass : Interface1, Interface2
    {
        void Interface1.Method()
        {
            Console.WriteLine("Реализация метода Method() из Interface1");
        }

        void Interface2.Method()
        {
            Console.WriteLine("Реализация метода Method() из Interface2");
        }

    }
}