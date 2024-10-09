/*2022.10.17 18:20 IMM*/
using System;
using System.Collections;

namespace StackDemo
{
    class Program
    {
        static void Main()
        {
            Stack stack = new Stack();
            stack.Push("An item");          // Push() - добавляет элемент в конец стека.
            Console.WriteLine(stack.Pop()); // Pop() - возвращает первый элемент стека, удаляя его.

            // Delay.
            Console.ReadKey();
        }
    }
}
