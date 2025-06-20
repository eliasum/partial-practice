﻿/*2024.11.12 14:54 IMM*/

using System;
using System.Globalization;

namespace StringBasics
{
    public class Program
    {
        static void Main()
        {
            // Получение информации о текущей культуре.
            CultureInfo currentCulture = CultureInfo.CurrentCulture;
            Console.WriteLine("Текущая локаль: {0}.", currentCulture);

            Console.ReadKey();

            // Информация о всех культурах доступных в системе.
            CultureInfo[] cultureInfo = CultureInfo.GetCultures(CultureTypes.);
            Console.WriteLine("В системе определены {0} различные культуры.", 
                cultureInfo.Length);

            // перебор всех элементов cultureInfo[] в цикле foreach
            foreach (CultureInfo ci in cultureInfo)
            {
                Console.WriteLine(ci.EnglishName + " | " + ci.ToString());
            }

            // Все культуры созданные пользователем.
            cultureInfo = CultureInfo.GetCultures(CultureTypes.UserCustomCulture);

            if (cultureInfo.Length < 1)
            {
                Console.WriteLine("Пользователь не создавал собственные локали.");
            }
            else
            {
                Console.WriteLine("Локали, созданные пользователем:");

                // перебор всех элементов cultureInfo[] в цикле foreach
                foreach (CultureInfo ci in cultureInfo)
                {
                    Console.WriteLine(ci.EnglishName + " | " + ci.ToString());
                }
            }

            // Delay.
            Console.ReadKey();
        }
    }
}