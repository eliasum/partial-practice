using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Inheritance
{
    class DerivedClass : BaseClass
    {
        // замещение метода базового класса в производном классе
        public void Method()
        {
            Console.WriteLine("Method from DerivedClass");
        }
    }
}