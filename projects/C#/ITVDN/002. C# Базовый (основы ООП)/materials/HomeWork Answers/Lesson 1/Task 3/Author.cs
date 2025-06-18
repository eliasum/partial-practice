using System;

namespace Task_3
{
    class Author
    {
        readonly string name;
            
        public Author(string name)
        {
            this.name = name;
        }

        public void Show()
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("Author: " + name);
        }
    }
}
