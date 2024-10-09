using System;

namespace Lessons_11
{
    class MyClass<T> where T : new()
    {
        public static T FacrotyMethod()
        {
            return new T();
        }
    }

    class Program
    {
        static void Main()
        {
            int i = MyClass<int>.FacrotyMethod();

            Console.WriteLine(i.GetType().Name);

            Program p = MyClass<Program>.FacrotyMethod();

            Console.WriteLine(p.GetType().Name);

            Console.ReadKey();
        }
    }
}
