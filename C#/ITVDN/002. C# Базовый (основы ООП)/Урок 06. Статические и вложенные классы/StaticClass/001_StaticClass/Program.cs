using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _001_StaticClass
{
    class Program
    {
        static class StaticClass // : object // наследование только от object (явно или неявно)
        {
            static StaticClass()
            {
                Console.WriteLine("StaticConstructor");
            }

            public static void StaticMethod()
            {
                Console.WriteLine("StaticMethod");
            }
        }
        static void Main(string[] args)
        {
            StaticClass.StaticMethod(); // StaticClass - класс-объект

            Console.ReadKey(); 
        }
    }
}
