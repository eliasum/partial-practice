/*2020.06.22 22:58 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generics_004
{
    // создаем класс-делегат с именем MyDelegate - универсальный делегат
    delegate R MyDelegate<T, R>(T t); // класс-делегат MyDelegate, параметризированный двумя указателями 
    // места заполнения типом. Параметр типа возвращаемого значения всегда стоит последним в списке параметров
    // типа, в данном случе <T, R>, R - возвращаемое знаечение, поэтому последнее в списке.
    // метод, который будет сообщен с делегатом MyDelegate,
    // будет принимать 1 аргумент типа указателя места заполнения типом - T и возвращать
    // тип указателя места заполнения типом - R

    class Program
    {
        public static int Add(int i)
        {
            return ++i;
        }

        public static string Concatenation(string s)
        {
            return "Hello " + s + "!";
        }

        static void Main(string[] args)
        {
            // создаем экземпляр класса-делегата MyDelegate, закрываем его типами <int, int> 
            // и сообщаем с ним метод Add
            MyDelegate<int, int> myDelegate1 = new MyDelegate<int, int>(Add);
            int i = myDelegate1.Invoke(1);
            Console.WriteLine(i);

            // создаем экземпляр класса-делегата MyDelegate, закрываем его типами <string, string> 
            // и сообщаем с ним метод Concatenation
            MyDelegate<string, string> myDelegate2 = new MyDelegate<string, string>(Concatenation);
            string s = myDelegate2.Invoke("Alex");
            Console.WriteLine(s);

            Console.ReadKey();

        }
    }
}
