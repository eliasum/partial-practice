using System;

namespace Task_4
{
    class Program
    {
        static void Main()
        {
            Console.WriteLine("Введите ключ");
            string key = Console.ReadLine();
            DocumentWorker doc = null;

            switch (key)
            {
                case "prof": doc = new ProDocumentWorker();
                    break;
                case "expert": doc = new ExpertDocumentWorker();
                    break;
                default: Console.WriteLine("Ключ неверен");
                    doc = new DocumentWorker();
                    break;
            }

            doc.OpenDocument();
            doc.EditDocument();
            doc.SaveDocument();

            Console.ReadKey();
        }

    }
}
