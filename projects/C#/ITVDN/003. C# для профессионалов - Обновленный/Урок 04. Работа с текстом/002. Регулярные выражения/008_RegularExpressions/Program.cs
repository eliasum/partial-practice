﻿/*2024.11.19 18:02 IMM*/

using System;
using System.Text.RegularExpressions;

// Регулярные выражения.

/*
   МЕТАСИМВОЛЫ - это символы для составления Шаблона поиска.
       
  \d    Определяет символы цифр. 
  \D 	Определяет любой символ, который не является цифрой. 
  \w 	Определяет любой символ цифры, буквы или подчеркивания. 
  \W    Определяет любой символ, который не является цифрой, буквой или подчеркиванием. 
  \s 	Определяет любой непечатный символ, включая пробел. 
  \S 	Определяет любой символ, кроме символов табуляции, новой строки и возврата каретки.
   .    Определяет любой символ кроме символа новой строки. 
  \.    Определяет символ точки.
 
  
  КВАНТИФИКАТОРЫ - это символы которые определяют, где и сколько раз необходимое 
  вхождение символов может встречаться.
 
  ^ - c начала строки. 
  $ - с конца строки. 
  + - одно и более вхождений подшаблона в строке.  
 

  Match представляет подстроку соответсвующую шаблону.
  Match.Success - булево значение, которое показывает найдено вхождение или нет.
  Все переменные обьявленные в шаблоне( (?<mylink>) и (?<mylnktext>) ) хранятся
  в колекции Mathes.Groups.
  В нашем случае нам придется использовать m.Groups["mylink"] и 
  m.Groups["mylnktext"], для вывода значения каждой переменной. 
*/

namespace RegularExpressions
{
    class Program
    {
        static void Main()
        {
            /*
            Создаем экземпляр класса Regex и передаем в качестве аргумента конструктора
            шаблон pattern, представляющий адрес электронной почты, который состоит из:
            - [0-9A-Za-z_.-]+ - все цифры, все маленькие и большие буквы, знак _, любой
            символ кроме символа новой строки, знак -
            - символ @
            - [0-9a-zA-Z-]+ - все цифры, все маленькие и большие буквы, знак -
            - \. - символ точки
            - [a-zA-Z]{2,4} - от 2х до 4х символов из любой маленькой и большой буквы
            */
            Regex regex = new Regex(@"[0-9A-Za-z_.-]+@[0-9a-zA-Z-]+\.[a-zA-Z]{2,4}");

            /*
            Экземпляр collection класса MatchCollection представляет набор успешных
            совпадений, обнаруженных путем итеративного применения шаблона 
            регулярного выражения к входной строке.
            Метод public MatchCollection Matches(string input); ищет в указанной входной
            строке все вхождения регулярного выражения.
            */
            MatchCollection collection = regex.Matches(
        "русский edu@cbsystematics.com текст123ещерусскийsupport@cbsystematics.comтекст");

            /*
            Перебор всех вхождений регулярного выражения в указанной строке
            */
            foreach (Match element in collection)
            {
                // {0,-25} - значит что выделить 25 знакомест консоли под вывод {0}.
                // (-) - значит "прижаться" влево :)
                Console.WriteLine("{0,-25}  на {1,-3} позиции.", 
                    element.Value, element.Index);
            }

            // Delay.
            Console.ReadKey();
        }
    }
}
