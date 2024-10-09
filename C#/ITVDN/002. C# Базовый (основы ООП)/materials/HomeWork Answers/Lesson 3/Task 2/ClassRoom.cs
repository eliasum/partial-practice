using System;

namespace Task_2
{
    class ClassRoom
    {
        Random rand = new Random();
        Pupil[] pupils = new Pupil[4];
        
        public ClassRoom(Pupil p0, Pupil p1)
        {
            pupils[0] = p0;
            pupils[1] = p1;
            pupils[2] = GeneratePupil();
            pupils[3] = GeneratePupil();
        }

        public ClassRoom(Pupil p0, Pupil p1, Pupil p2)
        {
            pupils[0] = p0;
            pupils[1] = p1;
            pupils[2] = p2;
            pupils[3] = GeneratePupil();
        }
        public ClassRoom(Pupil p0, Pupil p1, Pupil p2, Pupil p3)
        {
            pupils[0] = p0;
            pupils[1] = p1;
            pupils[2] = p2;
            pupils[3] = p3;
        }

        private Pupil GeneratePupil()
        {
            int r = rand.Next(1, 4);
            
            switch (r)
            {
                case 1: return new ExcelentPupil();
                case 2: return new GoodPupil();
                case 3: return new BadPupil();
            }
            return new BadPupil();
        }

        public void Study()
        {
            foreach (Pupil p in pupils)
            {
                p.Study();
            }
        }
        public void Write()
        {
            foreach (Pupil p in pupils)
            {
                p.Write();
            }
        }
        public void Read()
        {
            foreach (Pupil p in pupils)
            {
                p.Read();
            }
        }
        public void Relax()
        {
            foreach (Pupil p in pupils)
            {
                p.Relax();
            }
        }

    }
}
