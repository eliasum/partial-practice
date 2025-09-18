/*2025.09.18 15:09 IMM*/

using System;

namespace NVI
{
    public class BaseClass
    {
        public virtual void DoWork() { Console.WriteLine("1"); }
    }

    public sealed class Derived : BaseClass
    {
        /*Первая форма классического принудительного полиморфизма - переопределение виртуальных членов*/
        // Переопределение виртуального метода
        public override void DoWork() { Console.WriteLine("2"); }
    }

    class Program
    {
        static void Main()
        {
            /*Вторая форма классического принудительного полиморфизма - приведение (апкаст) к базовому типу*/
            BaseClass instance = new Derived();

            /*Первая форма классического принудительного полиморфизма доминирует над второй. Если убрать ключевые
            слова virtual и override, то будет не переопределение, а замещение, которое не является полиморфизмом.
            Соответственно после апкаста сработает метод базового класса.*/
            instance.DoWork();  // 2

            // Delay
            Console.ReadKey();
        }
    }
}
