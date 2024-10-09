/*2022.10.20 13:53 IMM*/
/*2023.12.14 22:18 IMM*/
using System;
using System.IO;
using System.Reflection;

// Получение информации о файлах, хранящихся в директории.
// Для тестирования данного примера требуется в папку с исполнимым 
// файлом поместить некоторое количество файлов с расширением .txt.

namespace InputOutput
{
    class Program
    {
        static void Main()
        {
            // новый экземпляр ТЕКУЩЕЙ директории, из которой запускается приложение (исполняемый файл)
            var directory = new DirectoryInfo(@".");
           
            // Проверка на существование указанной директории.
            if (directory.Exists)
            {
                // Выводим информацию о каталоге.                
                Console.WriteLine("FullName      : {0}", directory.FullName);              // Полное Имя директории, (включая путь).
                Console.WriteLine("Name          : {0}", directory.Name);                  // Имя директории, (НЕ включая путь).
                Console.WriteLine("Parent        : {0}", directory.Parent);                // Родительская директория. 
                Console.WriteLine("CreationTime  : {0}", directory.CreationTime);          // Время создания директории.
                Console.WriteLine("Attributes    : {0}", directory.Attributes.ToString()); // Аттрибуты.
                Console.WriteLine("Root          : {0}", directory.Root);                  // Корневой диск, на котором находится директория.
                Console.Write("\n");

                // Получаем все файлы с расширением .txt.
                FileInfo[] files = directory.GetFiles("*.txt");

                // Сколько файлов с расширением .txt в данной директории.
                Console.WriteLine("Найдено {0} *.txt файлов\n", files.Length);

                // Выводим информацию о каждом файле.
                foreach (FileInfo file in files)
                {
                    Console.WriteLine("File name : {0}", file.Name);
                    Console.WriteLine("File size : {0}", file.Length);
                    Console.WriteLine("Creation  : {0}", file.CreationTime);
                    Console.WriteLine("Attributes: {0}", file.Attributes.ToString());
                    Console.Write("\n");
                }
            }
            else
            {
                Console.WriteLine("Директория с именем: {0}  не существует.", directory.FullName);
            }

            // Delay.
            Console.ReadKey();
        }
    }
}
