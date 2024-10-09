using System;

namespace Task_2
{
    class Converter
    {
        double usd, eur, rub;

        public Converter(double usd, double eur, double rub)
        {
            this.usd = usd;
            this.eur = eur;
            this.rub = rub;
        }

        public void ToUsd(double uahSum)
        {
            Console.WriteLine(uahSum / usd);
        }

        public void FromUsd(double usdSum)
        {
            Console.WriteLine(usdSum * usd);
        }

        public void ToEur(double uahSum)
        {
            Console.WriteLine(uahSum / eur);
        }

        public void FromEur(double eurSum)
        {
            Console.WriteLine(eurSum * usd);
        }

        public void ToRub(double uahSum)
        {
            Console.WriteLine(uahSum / rub);
        }

        public void FromRub(double rubSum)
        {
            Console.WriteLine(rubSum * usd);
        }
    }
}
