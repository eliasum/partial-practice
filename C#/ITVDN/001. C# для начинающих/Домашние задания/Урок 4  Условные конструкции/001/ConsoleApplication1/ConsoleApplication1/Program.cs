using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            for (; ; )
            {
                Console.WriteLine("Введите слово о погоде для перевода на английский: ");

                string s = Console.ReadLine();

                switch (s)
                {
                    case "погода":
                        {
                            Console.WriteLine("weaver");
                            break;
                        }

                    case "солнце":
                        {
                            Console.WriteLine("sun");
                            break;
                        }

                    case "луна":
                        {
                            Console.WriteLine("moon");
                            break;
                        }

                    case "дождь":
                        {
                            Console.WriteLine("rain");
                            break;
                        }

                    case "снег":
                        {
                            Console.WriteLine("snow");
                            break;
                        }

                    case "день":
                        {
                            Console.WriteLine("day");
                            break;
                        }

                    case "ночь":
                        {
                            Console.WriteLine("night");
                            break;
                        }

                    case "небо":
                        {
                            Console.WriteLine("sky");
                            break;
                        }

                    case "град":
                        {
                            Console.WriteLine("hail");
                            break;
                        }

                    case "буря":
                        {
                            Console.WriteLine("storm");
                            break;
                        }

                    case "exit":
                        {
                            break;
                        }

                    default:
                        {
                            Console.WriteLine("нет такого слова");
                            break;
                        }
                }

                Console.WriteLine();
                if (s == "exit") break;
            }
        }
    }
}
