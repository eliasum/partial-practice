using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// полиморфизм 

namespace Inheritance
{
    class DerivedClass : BaseClass
    {
        // переопределение метода базового класса
        public override void Method()
        {
            // вызов метода базового класса
            base.Method();

            Console.WriteLine("Method from DerivedClass");
        }
    }
}