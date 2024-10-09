using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Loop
{
    class Program
    {
        static void Main(string[] args)
        {
            char character = '\0';

            for (; ; )
            {
                character = Console.ReadKey().KeyChar;

                switch (character)
                {
                    case 'l': // 'l' - охраняющее условие 1
                        {
                            Console.WriteLine("Go left"); // охраняемая команда
                            continue;
                        }

                    case 'r': // 'r' - охраняющее условие 2
                        {
                            Console.WriteLine("Go right"); // охраняемая команда
                            continue;
                        }
                }

                switch (character)
                {
                    case 'x': // 'x' - условие выхода 1
                        {
                            Console.WriteLine("Exit"); // охраняемая команда
                            break;
                        }

                    case 'q': // 'q' - условие выхода 2
                        {
                            Console.WriteLine("Quit"); // охраняемая команда
                            break;
                        }
                    default:  // ветвь альтернативного завершения 
                        {
                            Console.WriteLine("Alternative exit"); break;
                        }
                }
                break; // прерывание цикла
            }
            Console.ReadKey();
        }
    }
}
