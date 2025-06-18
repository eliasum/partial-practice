using System;

namespace Task_2
{
    public struct Train
    {
        private string punkt;
        private int nomer;
        private DateTime time;

        public Train(string punkt, int nomer, DateTime time)
        {
            this.punkt = punkt;
            this.nomer = nomer;
            this.time = time;
        }

        public string Punkt
        {
            get { return punkt; }
        }

        public int Nomer
        {
            get { return nomer; }
        }

        public DateTime Time
        {
            get { return time; }
        }
    }
}
