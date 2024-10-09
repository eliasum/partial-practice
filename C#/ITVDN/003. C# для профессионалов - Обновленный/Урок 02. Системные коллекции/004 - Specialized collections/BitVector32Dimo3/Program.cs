/*2022.10.18 18:03 IMM*/
using System;
using System.Collections.Specialized;

namespace BitVector32Dimo3
{
	class Program
	{
		static void Main()
		{
            // значение vector по умолчанию - 32 нуля, т.к. данные = 0
            var vector = new BitVector32(0);

            // маска для первого бита
			int firstBit = BitVector32.CreateMask();           // ... 0000 0001 B - 1D

            // маска для второго бита
            int secondBit = BitVector32.CreateMask(firstBit);  // ... 0000 0010 B - 2D

            // маска для третьего бита
            int thirdBit = BitVector32.CreateMask(secondBit);  // ... 0000 0100 B - 4D

			Console.WriteLine(firstBit + " " + secondBit + " " + thirdBit); // Test

            // запись по первой маске 1
			vector[firstBit] = true;

            // запись по второй маске 1
            vector[secondBit] = true;

			Console.WriteLine("{0} должно быть 3", vector.Data);
			Console.WriteLine(vector.ToString());

            // создать новый экземпляр вектора и записать в него 4
			var newVector = new BitVector32(4);
			Console.WriteLine(newVector);

			bool bit1 = newVector[firstBit];
			bool bit2 = newVector[secondBit];
			bool bit3 = newVector[thirdBit];

			Console.WriteLine("bit1 = {0}, bit2 = {1}, bit3 = {2}", bit1, bit2, bit3);

			// Delay.
			Console.ReadKey();
		}
	}
}
