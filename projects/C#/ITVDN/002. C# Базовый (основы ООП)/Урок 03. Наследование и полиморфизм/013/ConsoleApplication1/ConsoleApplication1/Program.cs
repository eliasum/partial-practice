using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class BaseClass
    { 
    
    }

    class Der1 : BaseClass
    { 
    
    }

    class Der2 : BaseClass
    {

    }

    class Container
    {
        public BaseClass field;
    }

    class Program
    {
        static void Main(string[] args)
        {
            Container container = new Container();

            container.field = new Der1();
            Console.WriteLine(container.field.GetHashCode());

            container.field = new Der2();
            Console.WriteLine(container.field.GetHashCode());

            Console.ReadKey();
        }
    }
}
