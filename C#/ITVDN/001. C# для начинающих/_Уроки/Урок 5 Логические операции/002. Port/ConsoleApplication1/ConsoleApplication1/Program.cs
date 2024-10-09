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
            byte port = 0xF0;  // 1111 0000
            byte mask = 0x02;  // 0000 0010

            Console.WriteLine("port = {0:X}", port);

            port = (byte)(port | mask);
            Console.WriteLine("port = {0:X}", port);

            mask = 0xFD;       // 1111 1101

            port = (byte)(port & mask);
            Console.WriteLine("port = {0:X}", port);

            Console.ReadKey();
             
        }
    }
}
