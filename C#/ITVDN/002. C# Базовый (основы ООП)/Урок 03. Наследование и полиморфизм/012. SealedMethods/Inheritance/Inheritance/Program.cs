using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// sealed методы

namespace Inheritance
{
    partial class ClassA
    {
        public virtual void Method1() { Console.WriteLine("ClassA.Method1"); }
        public virtual void Method2() { Console.WriteLine("ClassA.Method2"); }
    }

    partial class ClassA
    {

    }

    class ClassB : ClassA
    {
        sealed public override void Method1() { Console.WriteLine("ClassB.Method1"); }
        public override void Method2() { Console.WriteLine("ClassB.Method2"); }
    }

    class ClassC : ClassB
    {
        // попытка переопределить Method1 приводит к ошибке компилятора: CS0239.
        //public override void Method1() { Console.WriteLine("ClassC.Method1"); }

        // переопределение Method2 позволено
        public override void Method2() { Console.WriteLine("ClassС.Method2"); }
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
