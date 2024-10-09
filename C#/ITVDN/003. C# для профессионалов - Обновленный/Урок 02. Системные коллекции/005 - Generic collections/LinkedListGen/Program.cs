/*2022.10.19 16:24 IMM*/
using System;
using System.Collections.Generic;

namespace LinkedListGen
{
    class Program
    {
        static void Main()
        {
            // инициализация связанного списка
            var links = new LinkedList<string>();

            // добавить первый узел first
            LinkedListNode<string> first = links.AddFirst("First");

            // добавить последний узел last
            LinkedListNode<string> last = links.AddLast("Last");

            // добавить узел afterlast после последнего last
            LinkedListNode<string> afterlast = links.AddAfter(last,"After last");

            // добавить узел secondперед последним last
            LinkedListNode<string> second = links.AddBefore(last, "Second");

            // добавить узел Third после узла second
            links.AddAfter(second, "Third");
   
            foreach (string s in links)
            {
                Console.WriteLine(s);
            }

            // Delay.
            Console.ReadKey();
        }
    }
}
