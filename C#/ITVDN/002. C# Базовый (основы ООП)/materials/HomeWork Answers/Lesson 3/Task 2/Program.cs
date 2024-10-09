using System;

namespace Task_2
{
    class Program
    {
        static void Main()
        {
            Pupil p1 = new BadPupil();
            Pupil p2 = new ExcelentPupil();

            ClassRoom group = new ClassRoom(p1, p2);

            group.Study();
            Console.WriteLine(new string('-', 30));
            group.Read();
            Console.WriteLine(new string('-', 30));
            group.Write();
            Console.WriteLine(new string('-', 30));
            group.Relax();

            Console.ReadKey();
        }
    }
}
