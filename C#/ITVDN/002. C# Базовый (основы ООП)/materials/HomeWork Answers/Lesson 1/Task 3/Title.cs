using System;

namespace Task_3
{
    class Title
    {
        readonly string title;

        public Title(string title)
        {
            this.title = title;
        }

        public void Show()
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("Title: " + title);
        }
    }
}
