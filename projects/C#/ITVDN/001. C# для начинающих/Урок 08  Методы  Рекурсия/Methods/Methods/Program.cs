using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Methods
{
    class Program
    {
        // перегруженные методы могут отличаться типом и количеством аргументов,
        // а так же ref и out параметрами


        static void Function()
        {
            Console.WriteLine("Hello!");
        }

        static void Function(string s)
        {
            Console.WriteLine(s);
        }

        static void Function(int i)
        {
            Console.WriteLine(i);
        }

        static void Function(double d)
        {
            Console.WriteLine(d);
        }

        static void Function(string s, int i)
        {
            Console.WriteLine(s + i);
        }

        static void Function(int i, string s)
        {
            Console.WriteLine(i + s);
        }

        static void Function(ref int i, string s)
        {
            Console.WriteLine(i + s);
        }

        // перегруженные методы не могут отличаться возвращаемыми значениями
        /*
        static string Function(string s)
        {
            return s;
        }

        // перегруженные методы не могут отличаться друг от друга только параметрами ref и out
        static void Function(out int i, string s)
        {
            i = 5;
            Console.WriteLine(i + s);
        }
        */
        static void Main(string[] args)
        {
            Function();
            Function("A");
            Function(1);
            Function(3.14);
            Function("B", 2);
            Function(3, "C");

            int variable = 5;
            Function(ref variable, "D");

            Console.ReadKey();
        }
    }
}
