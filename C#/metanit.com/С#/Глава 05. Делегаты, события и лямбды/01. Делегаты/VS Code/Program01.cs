using System;

namespace Project
{
    public class Program01
    {
        delegate int Operation(int x, int y);

        static void Main(string[] args)
        {
            // присваивание адреса метода через контруктор
            Operation del = Add; // делегат указывает на метод Add
            int result = del(4, 5); // фактически Add(4, 5)
            Console.WriteLine(result);

            del = Multiply; // теперь делегат указывает на метод Multiply
            result = del(4, 5); // фактически Multiply(4, 5)
            Console.WriteLine(result);

            Console.Read();
        }
        private static int Add(int x, int y)
        {
            return x + y;
        }
        private static int Multiply(int x, int y)
        {
            return x * y;
        }
    }
}
/*
В данном случае делегат Operation возвращает значение типа int и имеет два
параметра типа int. Поэтому этому делегату соответствует любой метод, который
возвращает значение типа int и принимает два параметра типа int. В данном 
случае это методы Add и Multiply. То есть мы можем присвоить переменной делегата
любой из этих методов и вызывать.

Поскольку делегат принимает два параметра типа int, то при его вызове необходимо
передать значения для этих параметров: del(4,5).
*/