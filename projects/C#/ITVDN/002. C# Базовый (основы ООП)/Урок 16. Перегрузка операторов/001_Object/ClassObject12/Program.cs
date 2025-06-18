/*2022.10.10 08:42 IMM*/
using System;

// Базовый класс Object.

// Клонирование ассоциации происходит поверхностно.

namespace ClassObject
{
    class A { public int a = 1; }
    class B { public int b = 2;  }
    class C { public B B = new B(); }

    class X
    {
        public A A = new A();
        public C C = new C();
    }

    class Program : X
    {
        static void Main()
        {
            Program original = new Program();
            Console.WriteLine("Оригинал : " + original.A.a + " " + original.C.B.b);

            // Клонирование объекта. 
            /*
                клонируется только граф наследования, т.е. классы Program и X,
                от которого наследуется Program, а в клонированном классе X
                объекты классов A и C остаются теже самые. Т.е. граф наследования
                копируется глубоко, а все ассоциации - поверхностно.
            */
            Program clone = original.MemberwiseClone() as Program;
            Console.WriteLine("Клон : " + clone.A.a + " " + clone.C.B.b + "\n");

            // Проверка на глубокое клонирование.
            clone.A.a = clone.C.B.b = 7;

            Console.WriteLine("Оригинал : " + original.A.a + " " + original.C.B.b);
            Console.WriteLine("Клон : " + clone.A.a + " " + clone.C.B.b);

            // Delay.
            Console.ReadKey();
        }
    }
}
