using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// герметизированнные классы

namespace Inheritance
{
    sealed class SealedClass
    {
        public int x;
        public int y;
    }

    class DerivedClass //: SealedClass  // Error
    {
    }

    class Program
    {
        static void Main(string[] args)
        {
            SealedClass instance = new SealedClass();
            instance.x = 100;
            instance.y = 200;

            Console.WriteLine("x = {0}, y = {1}", instance.x, instance.y);
                                  

            Console.ReadKey();
        }
    }
}
