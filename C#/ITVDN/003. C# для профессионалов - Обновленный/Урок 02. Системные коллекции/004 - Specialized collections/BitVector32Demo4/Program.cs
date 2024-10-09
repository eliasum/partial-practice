/*2022.10.19 13:40 IMM*/
using System;
using System.Collections.Specialized;

namespace BitVector32Demo4
{
	class Program
	{
		static void Main()
		{
            /*
                для одновременной работы с несколькими битами их упаковывают в секции BitVector32.Section. 
                Это используется, например, в устройствах ввода/вывода.
                Метод CreateSection(short maxValue); принимает максимальное значение, которое может быть записано в секцию.
                Метод reateSection(short maxValue, Section previous); так же принимает предыдущую секцию.

                Создание секций:
            */
            BitVector32.Section firstSection = BitVector32.CreateSection(10); // 0xA Hex - 1010 Bin 
			BitVector32.Section secondSection = BitVector32.CreateSection(50, firstSection); // 0x32 Hex - 110010 Bin
			BitVector32.Section thirdSection = BitVector32.CreateSection(500, secondSection); // 0x1F4 Hex - 111110100 Bin
            BitVector32.Section fourthSection = BitVector32.CreateSection(500, thirdSection);

            // создание битового вектора:
            var packedBits = new BitVector32(0);

            // занесение значений в битовый вектор по каждой секции:
			packedBits[firstSection] = 10;
			packedBits[secondSection] = 50;
			packedBits[thirdSection] = 500;
            packedBits[fourthSection] = 499;

            // вывод значений по каждой секции:
			Console.WriteLine(packedBits[firstSection]);
			Console.WriteLine(packedBits[secondSection]);
			Console.WriteLine(packedBits[thirdSection]);
            Console.WriteLine(packedBits[fourthSection]);

			Console.WriteLine(packedBits);  // packedBits = {BitVector32{0000000000000 111110100 110010 1010}}
			
			Console.WriteLine(packedBits.Data);
			// packedBits.Data = 512 810

			// Delay.
			Console.ReadKey();
		}
	}
}
