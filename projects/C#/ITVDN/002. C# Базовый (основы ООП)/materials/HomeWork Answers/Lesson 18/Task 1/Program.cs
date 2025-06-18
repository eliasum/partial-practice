using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


using Dictionary;

namespace Task_1
{
    class Program
    {
        static void Main()
        {
            MyDictionary<char, string> dictionary = new MyDictionary<char, string>();
            dictionary.Add('a', "Эй");
            dictionary.Add('b', "Би");
            dictionary.Add('c', "Си");
            dictionary.Add('d', "Ди");

            Console.WriteLine(dictionary['b']);

            foreach (string pair in dictionary)
                Console.WriteLine(pair);

            Console.ReadKey();
        }
    }
}
