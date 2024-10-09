using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// структуры. наследование
// наследование структур разрешено только от интерфейсов

namespace _001_Inheritance
{
    interface IInterface
    {
        void Method();
    }

    struct MyStruct
    {
        public void Method()
        {
            Console.WriteLine("Method");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            MyStruct instance;

            instance.Method();

            Console.ReadKey();
        }
    }
}
