using System;

namespace Task_3
{
    class Vehicle
    {
        readonly int xLocation;
        public int XLocation
        {
            get { return xLocation; }
        }

        readonly int yLocation;
        public int YLocation
        {
            get { return yLocation; }
        }

        readonly uint price;
        public uint Price
        {
            get { return price; }
        }

        readonly uint speed;
        public uint Speed
        {
            get { return speed; }
        }

        readonly uint year;
        public uint Year
        {
            get { return year; }
        }

        public Vehicle(int xLocation, int yLocation, uint price, uint speed, uint year)
        {
            this.xLocation = xLocation;
            this.yLocation = yLocation;
            this.price = price;
            this.speed = speed;
            this.year = year;
        }

        public Vehicle(uint price, uint speed, uint year)
            :this(0,0, price,  speed,  year)
        {
            
        }
    }

    class Car : Vehicle
    {
        public Car(int xLocation, int yLocation, uint price, uint speed, uint year)
            : base(xLocation, yLocation, price, speed, year)
        {

        }
        public Car(uint price, uint speed, uint year)
            : base(price, speed, year)
        {

        }
    }

    class Ship : Vehicle
    {
        public Ship(int xLocation, int yLocation, uint price, uint speed, uint year)
            : base(xLocation, yLocation, price, speed, year)
        {

        }
        public Ship(uint price, uint speed, uint year)
            : base(price, speed, year)
        {

        }
        private int passengers;
        public int Passengers
        {
            get { return passengers; }
            set
            {
                if (passengers < 0)
                {
                    Console.WriteLine("Количетво пасажиров не может быть отрицательным");
                }
                else
                {
                    passengers = value;
                }
            }
        }

        private string port;
        public string Port
        {
            get
            {
                if (port == null)
                    return "Порт не задан";
                return port;
            }
            set
            {
                if (value == null)
                {
                    Console.WriteLine("Значение пустое");
                }
                else
                {
                    port = value;
                }
            }
        }
    }

    class Plane : Vehicle
    {
        public Plane(int xLocation, int yLocation, uint price, uint speed, uint year)
            : base(xLocation, yLocation, price, speed, year)
        {

        }
        public Plane(uint price, uint speed, uint year)
            : base(price, speed, year)
        {

        }

        public int Hight { get; set; }

        private int passengers;
        public int Passengers
        {
            get { return passengers; }
            set
            {
                if (passengers < 0)
                {
                    Console.WriteLine("Количетво пасажиров не может быть отрицательным");
                }
                else
                {
                    passengers = value;
                }
            }
        }
    }
}
