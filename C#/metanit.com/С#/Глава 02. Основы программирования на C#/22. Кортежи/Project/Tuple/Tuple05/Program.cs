using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tuple05
{
    class Program
    {
        //И также кортеж может передаваться в качестве параметра в метод:

        static void Main(string[] args)
        {
            var (name, age) = GetTuple(("Tom", 23), 12);

            Console.WriteLine(name);    // Tom
            Console.WriteLine(age);     // 35

            Console.Read();
        }

        private static (string name, int age) GetTuple((string n, int a) tuple, int x)
        {
            var result = (name: tuple.n, age: tuple.a + x);
            return result;
        }
    }
}




