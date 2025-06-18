using System;

namespace Task_3
{
    class Content
    {
        readonly string content;

        public Content(string content)
        {
            this.content = content;
        }

        public void Show()
        {
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("Content: " + content);
        }
    }
}
