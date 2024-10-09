/*2024.02.12 22:55 IMM*/
using System.IO;

// Запись в файл.

namespace StreamWriterDemo
{
	class Program
	{
		static void Main(string[] args)
		{
			// Создание файла.
			FileStream file = File.Create(@"D:\test.txt");

			// 1.
			var writer = new StreamWriter(file);
			writer.WriteLine("Hello");
			writer.Close();
		//	file.Close();

			// 2.
			writer = File.CreateText(@"D:\test.txt");
			writer.WriteLine("Hello");
			writer.Close();

			// 3.
			File.WriteAllText(@"D:\test.txt", "Hello");

			// 4.
			file = null;
			file = File.Open(@"D:\test.txt", FileMode.Open, FileAccess.Write,FileShare.Write);
			file.Close();

			// 5.
			file = File.OpenWrite(@"D:\test.txt");
			// file.Close();

			// 6. Будет исключение, так как файл занят!
			file = File.Open(@"D:\test.txt", FileMode.OpenOrCreate, FileAccess.Write,FileShare.Write);
			// file.Close();

			// Streams - необходимо закрывать!!!
		}
	}
}
