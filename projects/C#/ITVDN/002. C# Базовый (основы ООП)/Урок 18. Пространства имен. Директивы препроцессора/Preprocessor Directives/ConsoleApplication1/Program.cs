/*2022.10.12 15:42 IMM*/
//#define DEBUG

using System;

// Директивы препроцессора.

namespace PreprocessorDirectives
{
    class Program
    {
        static void Main()
        {

#if DEBUG
            Console.WriteLine("Debug version");
#endif

            // TODO: Посмотрите в Task List
            // HACK: Посмотрите в Task List

            Console.WriteLine("Release version");

            // Delay.
            Console.ReadKey();
        }
    }
}
