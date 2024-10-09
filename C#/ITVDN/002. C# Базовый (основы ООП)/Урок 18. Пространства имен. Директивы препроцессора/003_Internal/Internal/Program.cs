/*2022.10.12 15:22 IMM*/
using System;
using LibraryA;

namespace Internal
{
    class cl : MyPublicClass
    {
        public void MyMethod()
        {
            this.InternalProtectedMethod();
        }
    }

    class Program
    {
        static void Main()
        {
            // 1.

            MyPublicClass instanceA = new MyPublicClass();
            instanceA.PublicMethod();
            //instanceA.InternalMethod();             // Недоступен.
            //instanceA.InternalProtectedMethod();    // Недоступен.

            cl instanceB = new cl();
            instanceB.MyMethod();    

            //MyInternalClass instance = new MyInternalClass();   // Недоступен.


            Console.WriteLine(new string('-', 20));


            // 2.

            MyClass instance = new MyClass();
            instance.PublicMethod();
            instance.MyMethod();     // Вызов InternalProtectedMethod().
            //instance.InternalMethod();     // Недоступен.
            

            // Delay.
            Console.ReadKey();
        }
    }
}
