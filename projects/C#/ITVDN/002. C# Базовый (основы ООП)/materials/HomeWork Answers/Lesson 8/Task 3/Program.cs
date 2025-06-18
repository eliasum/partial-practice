using System;

namespace Task_3
{
    class Program
    {
        static void Main()
        {
            Console.Write("Введите количество отработаных часов: ");
            int hours = Convert.ToInt32(Console.ReadLine());

            Accauntant a = new Accauntant();

            if (a.AskForBonus(Post.Cleaner, hours))
            {
                Console.WriteLine("Дать премию");
            }
            else
            {
                Console.WriteLine("Не выдавать премию");
            }

            //Delay.
            Console.ReadKey();
        }
    }
}
