using System;

namespace Task_3
{
    class Book
    {
        public class Note
        {
            string text = "";
            public string Text
            {
                get { return text; }
                set
                {
                    if (text != "")
                        text += "\n";
                    text += value;
                }

            }
        }

        public void FindNext(string str)
        {
            Console.WriteLine("Поиск строки : " + str);
        }

    }

    static class FindAndReplaceManager
    {
        static public void FindNext(string str)
        {
            Book a = new Book();
            a.FindNext(str);
        }
    }

    class Program
    {
        static void Main()
        {
            Book.Note note = new Book.Note();

            note.Text = "Good book";
            note.Text = "I like it!";

            Console.WriteLine(note.Text);

            // Delay.
            Console.ReadKey();

        }
    }
}
