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
            ushort secretKey = 0x0088;
            char character = 'A';

            Console.WriteLine("Исходный символ: {0}, его код в кодовой таблице: {1:X}", character, (byte)character);
            Console.WriteLine("Размер символа: {0} = {1} бит", character, sizeof(char) * 8);

            // зашифровываем символ
            character = (char)(character ^ secretKey);
            Console.WriteLine("Зашифрованный символ: {0}, его код в кодовой таблице: {1:X}", character, (byte)character);

            // расшифровываем символ
            character = (char)(character ^ secretKey);
            Console.WriteLine("Расшифрованный символ: {0}, его код в кодовой таблице: {1:X}", character, (byte)character);

            Console.ReadKey();
             
        }
    }
}
