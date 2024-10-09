using System;

namespace Project
{
    /*
Делегаты необязательно могут указывать только на методы, которые определены
в том же классе, где определена переменная делегата. Это могут быть также 
методы из других классов и структур.
    */
    class Math
    {
        public int Sum(int x, int y) { return x + y; }
    }
    public class Program02
    {    delegate int Operation(int x, int y);
 
    static void Main(string[] args)
    {
        Math math = new Math();
        Operation del = math.Sum;
        int result = del(4, 5);     // math.Sum(4, 5)
        Console.WriteLine(result);  // 9
 
        Console.Read();
    }
    }
}